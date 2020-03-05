/* eslint-disable camelcase */
import merge from 'lodash/merge';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import moment from 'moment';
import { fetchDataFromApi$ } from './observables';
import { formatDate } from './formatDate';

export const fetchFlows = (flowsApiCall, start, end) => {
  const flowsDataPromise = async () =>
    fetchDataFromApi$(flowsApiCall)
      .pipe(
        map(response => response.data.ta_response),
        map(flows => {
          const inFlow = flows.inflow.map(entry => {
            const inFlowEntry = formatDate(entry, [
              'date',
              'inflow',
              'inflow_usd',
              'avg_txn_value_usd',
            ]);
            inFlowEntry.inflow_avg_txn_value_usd =
              inFlowEntry.avg_txn_value_usd;
            return inFlowEntry;
          });

          const outFlow = flows.outflow.map(entry => {
            const outFlowEntry = formatDate(entry, [
              'date',
              'outflow',
              'outflow_usd',
              'avg_txn_value_usd',
            ]);
            outFlowEntry.outflow_avg_txn_value_usd =
              outFlowEntry.avg_txn_value_usd;
            return outFlowEntry;
          });
          const netFlow = flows.netflow
            .filter(value => value) // Hack to fix data as the private API may return a different number of items for inflow and outflow, even if from and to date a set
            .map(entry => {
              return formatDate(entry, ['date', 'value']);
            });

          const allFlows = merge(inFlow, outFlow, netFlow);
          return merge(allFlows);
        }),
        map(flows => {
          const flowsData = flows
            .map(item => {
              const {
                date,
                inflow,
                outflow,
                inflow_avg_txn_value_usd,
                outflow_avg_txn_value_usd,
                value,
              } = item;
              const time = moment.utc(date).valueOf();

              return {
                time,
                open: Number(inflow),
                close: Number(outflow),
                high: Number(inflow_avg_txn_value_usd),
                low: Number(outflow_avg_txn_value_usd),
                volume: Number(value),
              };
            })
            .filter(item => item.time > start && item.time < end);
          return flowsData;
        }),
        catchError(() => of([]))
      )
      .toPromise();

  return flowsDataPromise();
};

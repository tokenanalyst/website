// eslint-disable-next-line no-restricted-imports
import './table.css';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactTable from 'react-table';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

import Cookies from 'js-cookie';
import { LoginContext } from '../../../../contexts/Login';
import { ExchangeRegisterDialog } from '../ExchangeRegisterDialog';
import {
  LOGGED_OUT_SUPPORTED_EXCHANGES,
  EXCHANGE_NAMES,
  EXCHANGE_DISPLAY_NAME,
} from '../../../../constants/exchanges';

import { NextButton, PreviousButton } from './renderers';
import { getIoTableData } from '../../../../utils/data-transformers/tables';
import { filterCaseInsensitive } from '../../../../utils';
import { makeColumns } from './helpers';
import { colors } from '../../../../constants/styles/colors';
import { COOKIES } from '../../../../constants/cookies';

const TABLE_DATA = getIoTableData();

export const FlowsTable = ({
  data,
  dataWindow,
  units,
  pageSize,
  showPagination,
  showPageSizeOptions,
  compactLayout,
}) => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);
  const TIER = Cookies.get(COOKIES.tier);

  return (
    <div className="container">
      {data && (
        <>
          <ExchangeRegisterDialog
            isOpen={isRegisterDialogShown}
            onClose={() => setIsRegisterDialogShown(false)}
          />
          <ReactTable
            showPagination={showPagination}
            showPageSizeOptions={showPageSizeOptions}
            PreviousComponent={PreviousButton}
            NextComponent={NextButton}
            data={data.filter(datum => datum.window === dataWindow)}
            columns={makeColumns(units, compactLayout)}
            defaultSorted={[
              { id: TABLE_DATA.accessors[units].inflow, desc: true },
            ]}
            noDataText="No results"
            className="-highlight"
            defaultPageSize={pageSize}
            filterable
            defaultFilterMethod={filterCaseInsensitive}
            style={{ cursor: 'pointer' }}
            getTrProps={(_, rowInfo) => ({
              onClick: () => {
                const { token, exchange } = rowInfo.original;
                if (
                  loginCtx.isLoggedIn ||
                  LOGGED_OUT_SUPPORTED_EXCHANGES.map(name =>
                    name.toUpperCase()
                  ).indexOf(exchange.toUpperCase()) >= 0
                ) {
                  ReactGA.event({
                    category: 'User',
                    action: `Select IO table value ${token} ${exchange}`,
                    label: `IO table select`,
                  });
                  router.push(
                    `/exchange/[token]/[exchange]`,
                    `/exchange/${token}/${
                      EXCHANGE_NAMES[
                        EXCHANGE_DISPLAY_NAME[exchange] || exchange
                      ]
                    }?tier=${TIER}`
                  );
                } else {
                  setIsRegisterDialogShown(true);
                }
              },
              style: {
                border: 'none',
              },
            })}
            getProps={() => ({
              style: {
                border: 'none',
              },
            })}
            getTdProps={() => ({
              style: {
                border: 'none',
              },
            })}
            getTheadFilterProps={() => ({
              onKeyUp: e =>
                ReactGA.event({
                  category: 'User',
                  action: `Filter IO table - Chars: ${e.target.value}`,
                  label: `IO table filter`,
                }),
            })}
            getTheadThProps={(state, row, column) => {
              return {
                style: {
                  border: 'none',
                },
                onMouseUp: () => {
                  ReactGA.event({
                    category: 'User',
                    action: `Sort IO table: ${column.id}`,
                    label: `IO table sort`,
                  });
                },
              };
            }}
            getTheadProps={() => {
              return {
                style: {
                  boxShadow: 'none',
                  border: 'none',
                },
              };
            }}
            getTableProps={() => ({
              style: {
                border: 'none',
              },
            })}
            getPaginationProps={() => ({
              style: {
                color: `black`,
                boxShadow: 'none',
                border: 'none',
                textTransform: 'uppercase',
                fontSize: '14px',
              },
            })}
            getNoDataProps={() => ({
              style: {
                color: `rgba(${colors.primaryRed}, 1)`,
              },
            })}
          />
        </>
      )}

      <style jsx>
        {`
          .container {
            font-family: Open Sans;
          }
          .section-header {
            font-size: 22px;
            font-weight: bold;
            opacity: 0.4;
            padding-bottom: 20px;
            padding-top: 20px;
            padding-left: 5px;
          }
          @media only screen and (max-width: 768px) {
            .information-header {
              padding: 30px 30px;
            }
          }
        `}
      </style>
    </div>
  );
};

FlowsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataWindow: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  showPagination: PropTypes.bool,
  showPageSizeOptions: PropTypes.bool,
  compactLayout: PropTypes.bool,
};

FlowsTable.defaultProps = {
  pageSize: 25,
  showPagination: true,
  showPageSizeOptions: true,
  compactLayout: false,
};

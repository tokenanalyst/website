/* eslint-disable react/prop-types */
// eslint-disable-next-line no-restricted-imports
import '../table.css';
import React from 'react';

import { AmountCell, ChangeCell, ExchangeCell, HeaderCell } from '../renderers';
import { getIoTableData } from '../../../../../data-transformers/tables';

const TABLE_DATA = getIoTableData();
const standardStyle = {
  exchange: {
    width: 150,
  },
  token: {
    width: 135,
  },
  inflow: {
    width: '100%',
  },
  inflowChange: {
    width: 150,
  },
  outflow: {
    width: '100%',
  },
  outflowChange: {
    width: 150,
  },
};

const compactStyle = {
  exchange: {
    width: 100,
  },
  token: {
    width: 100,
  },
  inflow: {
    width: 100,
  },
  inflowChange: {
    width: 100,
  },
  outflow: {
    width: 100,
  },
  outflowChange: {
    width: 100,
  },
};

export const makeColumns = (units, compact = false) => {
  const style = compact ? compactStyle : standardStyle;

  return [
    {
      Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.exchange} />,
      accessor: TABLE_DATA.accessors.exchange,
      Cell: ({ value }) => <ExchangeCell value={value} />,
      width: style.exchange.width,
    },
    {
      Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.token} />,
      accessor: TABLE_DATA.accessors.token,
      width: style.token.width,
    },
    {
      Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.inflow} />,
      accessor: TABLE_DATA.accessors[units].inflow,
      Cell: ({ value }) => <AmountCell value={value} units={units} />,
      filterable: false,
      width: style.inflow.width,
    },
    {
      Header: () => (
        <HeaderCell value={TABLE_DATA.columnHeaders.inflowChange} />
      ),
      accessor: TABLE_DATA.accessors[units].inflowChange,
      Cell: ({ value }) => <ChangeCell value={value} />,
      filterable: false,
      width: style.inflowChange.width,
    },
    {
      Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.outflow} />,
      accessor: TABLE_DATA.accessors[units].outflow,
      Cell: ({ value }) => <AmountCell value={value} units={units} />,
      filterable: false,
      width: style.outflow.width,
    },
    {
      Header: () => (
        <HeaderCell value={TABLE_DATA.columnHeaders.outflowChange} />
      ),
      accessor: TABLE_DATA.accessors[units].outflowChange,
      Cell: ({ value }) => <ChangeCell value={value} />,
      filterable: false,
      width: style.outflowChange.width,
    },
  ];
};

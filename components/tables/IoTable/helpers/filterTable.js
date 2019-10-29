import { FILTERED_IO_ROWS } from '../../../../constants/filteredExchanges';

export const filterTable = data =>
  FILTERED_IO_ROWS.reduce(
    (acc, curr) =>
      acc.filter(row => {
        if (row.exchange === curr.exchange) {
          if (row.token === curr.token) {
            return false;
          }
        }
        return true;
      }),
    data
  );

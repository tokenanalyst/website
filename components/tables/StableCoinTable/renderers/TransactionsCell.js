import numeral from "numeral";

export const TransactionsCell = ({ value }) => (
  <div>{numeral(Number(value)).format("0,0")}</div>
);

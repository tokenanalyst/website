import numeral from "numeral";

export const SupplyCell = ({ value }) => (
  <div>{numeral(Number(value).toFixed(2)).format("0,0")}</div>
);

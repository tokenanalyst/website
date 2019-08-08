import numeral from "numeral";

export const AmountCell = ({ value, units }) => (
  <span>
    {units === "USD" ? "$" : ""}
    {numeral(value).format("0,0") || "0"}
  </span>
);

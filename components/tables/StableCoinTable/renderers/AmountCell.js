import numeral from "numeral";

export const AmountCell = ({ value }) => (
  <div style={{ textAlign: "right" }}>
    ${numeral(Number(value).toFixed(2)).format("0,0")}
  </div>
);

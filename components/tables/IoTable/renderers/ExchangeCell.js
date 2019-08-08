import { EXCHANGE_IMAGES } from "../../../../constants/image-paths";

export const ExchangeCell = ({ value }) => (
  <span style={{ display: "flex", alignItems: "center" }}>
    <img
      style={{ height: "16px", width: "16px", paddingRight: "5px" }}
      src={`/static/png/${EXCHANGE_IMAGES[value]}`}
    />
    {value}
  </span>
);

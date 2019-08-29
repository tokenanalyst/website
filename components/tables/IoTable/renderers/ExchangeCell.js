import { EXCHANGE_IMAGES } from "../../../../constants/image-paths";
import { Icon } from "@blueprintjs/core";

export const ExchangeCell = ({ value }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <span>
      <img
        style={{ height: "16px", width: "20px", paddingRight: "5px" }}
        src={`/static/png/${EXCHANGE_IMAGES[value]}`}
      />
      {value}
    </span>
    <Icon icon="chart" iconSize={12} color="#3fcdab" />
  </span>
);

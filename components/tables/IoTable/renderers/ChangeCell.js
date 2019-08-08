export const ChangeCell = ({ value }) => (
  <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
    {value || "0.00"}%
  </span>
);

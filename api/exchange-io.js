import axios from "axios";

module.exports = async (_, res) => {
  console.log(process.env);
  console.log("fewf");
  const { data } = await axios.get(
    "https://api.tokenanalyst.io/analytics/last?job=exchange_flows_all_tokens_v5&format=json"
  );
  res.send({ ta_response: data });
};

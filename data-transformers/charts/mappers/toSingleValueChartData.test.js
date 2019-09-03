import { toSingleValueChartData } from "./toSingleValueChartData";

describe("toSingleValueChartData function", () => {
  it("maps data success", () => {
    const mockData = [
      { timeTestKey: "1", valueTestKey: "2" },
      { timeTestKey: "3", valueTestKey: "4" }
    ];
    const expectedData = [{ time: "1", value: "2" }, { time: "3", value: "4" }];
    const mappedData = toSingleValueChartData(
      mockData,
      "timeTestKey",
      "valueTestKey"
    );
    expect(mappedData).toEqual(expectedData);
  });
});

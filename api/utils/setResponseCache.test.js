import { setResponseCache } from "./setResponseCache";

describe("setResponseCache function", () => {
  it("should return default headers", () => {
    const expectedHeaders = [
      ["Cache-Control", "s-maxage=600, stale-while-revalidate"]
    ];
    const headers = setResponseCache();
    expect(headers).toEqual(expectedHeaders);
  });

  it("should return custom headers", () => {
    const expectedHeaders = [
      ["Cache-Control", "s-maxage=100, stale-while-revalidate"],
    ];
    const headers = setResponseCache(100);
    expect(headers).toEqual(expectedHeaders);
  });
});

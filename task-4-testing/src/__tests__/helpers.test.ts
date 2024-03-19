import { validateInput, shortenPublicHoliday } from "../helpers";

describe("helpers", () => {
  it("validateInput should be true for GB, FR, DE, NL and current year", () => {
    expect(
      validateInput({ year: new Date().getFullYear(), country: "GB" })
    ).toBe(true);
    expect(
      validateInput({ year: new Date().getFullYear(), country: "FR" })
    ).toBe(true);
    expect(
      validateInput({ year: new Date().getFullYear(), country: "DE" })
    ).toBe(true);
    expect(
      validateInput({ year: new Date().getFullYear(), country: "NL" })
    ).toBe(true);
  });

  it("validateCountry should throw en error for other countries or not current year", () => {
    expect(() =>
      validateInput({ year: new Date().getFullYear(), country: "US" })
    ).toThrow("Country provided is not supported, received: US");
    expect(() =>
      validateInput({
        year: new Date("2023-01-01").getFullYear(),
        country: "GB",
      })
    ).toThrow("Year provided not the current, received: 2023");
  });

  it("shortenPublicHoliday should return shorten public holiday", () => {
    const publicHoliday = {
      date: "2024-01-01",
      localName: "new year",
      name: "new year",
      countryCode: "new year",
      fixed: true,
      global: true,
      counties: ["GB", "FR", "DE", "NL"],
      launchYear: 1900,
      types: [],
    };

    expect(shortenPublicHoliday(publicHoliday)).toMatchObject({
      date: "2024-01-01",
      localName: "new year",
      name: "new year",
    });
  });
});

import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "../config";

describe("e2e tests of nager date api ", () => {
  it("check if PublicHolidays endpoind succeed", (done) => {
    request(PUBLIC_HOLIDAYS_API_URL)
      .get("/PublicHolidays/2024/FR")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("check if PublicHolidays endpoind returns correct data about holidays in France", async () => {
    const response = await request(PUBLIC_HOLIDAYS_API_URL)
      .get("/PublicHolidays/2024/FR")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject([
      {
        name: "New Year's Day",
        localName: "Jour de l'an",
        date: "2024-01-01",
      },
      {
        name: "Easter Monday",
        localName: "Lundi de Pâques",
        date: "2024-04-01",
      },
      {
        name: "Labour Day",
        localName: "Fête du Travail",
        date: "2024-05-01",
      },
      {
        name: "Victory in Europe Day",
        localName: "Victoire 1945",
        date: "2024-05-08",
      },
      { name: "Ascension Day", localName: "Ascension", date: "2024-05-09" },
      {
        name: "Whit Monday",
        localName: "Lundi de Pentecôte",
        date: "2024-05-20",
      },
      {
        name: "Bastille Day",
        localName: "Fête nationale",
        date: "2024-07-14",
      },
      {
        name: "Assumption Day",
        localName: "Assomption",
        date: "2024-08-15",
      },
      {
        name: "All Saints' Day",
        localName: "Toussaint",
        date: "2024-11-01",
      },
      {
        name: "Armistice Day",
        localName: "Armistice 1918",
        date: "2024-11-11",
      },
      { name: "Christmas Day", localName: "Noël", date: "2024-12-25" },
    ]);
  });

  it("check if CountryInfo endpoind returns correct information about France", async () => {
    const { body } = await request(PUBLIC_HOLIDAYS_API_URL)
      .get("/CountryInfo/FR")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(body.commonName).toBe("France");
    expect(body.officialName).toBe("French Republic");
    expect(body.countryCode).toBe("FR");
    expect(body.region).toBe("Europe");
    expect(body.borders.length).toBe(8);
  });
});

import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../public-holidays.service";
import axios from "axios";

describe("public holiday service", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("getListOfPublicHolidays should return shortened response ", async () => {
    expect(await getListOfPublicHolidays(2024, "FR")).toMatchObject([
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

  it("getListOfPublicHolidays should return shortened response ", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    expect(await getListOfPublicHolidays(2024, "FR")).toMatchObject([]);
  });

  it("checkIfTodayIsPublicHoliday should return true if response succeed", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ status: 200 });
    expect(await checkIfTodayIsPublicHoliday("FR")).toBe(true);
  });

  it("checkIfTodayIsPublicHoliday should return true if response succeed", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    expect(await checkIfTodayIsPublicHoliday("FR")).toBe(false);
  });

  it("getNextPublicHolidays should return next public holidays", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: [
        {
          date: "2024-07-14",
          localName: "Fête nationale",
          name: "Bastille Day",
          countryCode: "FR",
          fixed: false,
          global: true,
          counties: null,
          launchYear: null,
          types: ["Public"],
        },
        {
          date: "2024-08-15",
          localName: "Assomption",
          name: "Assumption Day",
          countryCode: "FR",
          fixed: false,
          global: true,
          counties: null,
          launchYear: null,
          types: ["Public"],
        },
      ],
    });
    expect(await getNextPublicHolidays("FR")).toMatchObject([
      {
        date: "2024-07-14",
        localName: "Fête nationale",
        name: "Bastille Day",
      },
      {
        date: "2024-08-15",
        localName: "Assomption",
        name: "Assumption Day",
      },
    ]);
  });
});

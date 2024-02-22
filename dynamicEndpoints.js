// const KEY = "2414149e-cd81-41ba-926c-a8ed890f3503";
// const dataTypeSites = "MeasureSites";
// const dataTypeMeasurements = "Measurements";
// const site = "Eriksberg";
// const measurementParam = "RainFall";
// const startDate = "2024-01-01";
// const endDate = "2024-01-04";

const sites = {
  Eriksberg: "Eriksberg",
  Arketjarn: "Arketjärn",
  Agnesberg: "Agnesberg",
  Garda: "Gårda dämme",
  Harsjo: "Härsjö dämme",
  Kalleredsbacken: "Kålleredsbäcken",
  Landvetter: "Landvettersjöns dämme",
  Levgrensvagen: "Levgrensvägen",
  Larjean: "Lärjeholm",
  MolndalCentrum: "Mölndal C",
  Nedsjon: "Nedsjöns dämme",
  Rada: "Rådasjön",
  Skars_led: "Skårs led",
  Slussen: "Slussen",
  Stensjon: "Stensjö dämme",
  Tingstad: "Tingstad",
  Torshamnen: "Torshamnen",
};

Object.entries(sites).forEach(([key, value]) => {
  console.log("Key:", key, ", Value:", value);
});

export class Fetcher {
  constructor(site, startDate, endDate, selectedParameter) {
    this.baseUrl = "https://data.goteborg.se/RiverService/v1.1/";
    this.KEY = "2414149e-cd81-41ba-926c-a8ed890f3503";
    this.dataTypeSites = "MeasureSites";
    this.dataTypeMeasurements = "Measurements";
    this.site = site;
    this.measurementParam = selectedParameter;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  async getMeasurements() {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.dataTypeMeasurements}/${this.KEY}/${this.site}/${this.measurementParam}/${this.startDate}/${this.endDate}?format=json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error during data fetching:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }
}

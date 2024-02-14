const KEY = "2414149e-cd81-41ba-926c-a8ed890f3503";
const dataTypeSites = "MeasureSites";
const dataTypeMeasurements = "Measurements";
const site = "Landvetter";
const measurementParam = "RainFall";
const startDate = "2024-01-01";
const endDate = "2024-01-04";

const sites = {
  Agnesberg: "Agnesberg",
  Arketjarn: "Arketjärn",
  Eriksberg: "Eriksberg",
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

class Fetcher {
  constructor() {
    this.baseUrl = "https://data.goteborg.se/RiverService/v1.1/";
  }

  async getSites() {
    const response = await fetch(
      `${this.baseUrl}/${dataTypeMeasurements}/${KEY}/${site}/${measurementParam}/${startDate}/${endDate}?format=json`
    );
    return response.json();
  }
}

// Usage:
const fetcher = new Fetcher();
fetcher.getSites().then((data) => console.log(data));

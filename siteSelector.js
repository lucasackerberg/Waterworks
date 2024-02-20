let site = "notSet";

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

const createSiteSelector = () => {
  const select = document.getElementById("siteSelector");
  Object.entries(sites).forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = value;
    select.appendChild(option);
  });
};

export { createSiteSelector };

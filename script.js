import { createSiteSelector } from "./siteSelector.js";

createSiteSelector();

const select = document.getElementById("siteSelector");

select.addEventListener("change", function () {
  let site = select.value;
  console.log(site);
});

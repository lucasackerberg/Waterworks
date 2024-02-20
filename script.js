import { createSiteSelector } from "./siteSelector.js";

createSiteSelector();

const select = document.getElementById("siteSelector");

select.addEventListener("change", function () {
  let site = select.value;
  console.log(site);
});

// Tab logic
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Getting index of clicked tab
    const index = getElementIndex(tab) + 1;

    // Adding "selected" class to clicked tab, and removing from the nonselected
    const selectedTab = document.querySelector(".tab.selected");
    selectedTab.classList.remove("selected");
    tab.classList.add("selected");

    // Adding "selected" class to graph with chosen index, and removing from the nonselected
    const selectedGraph = document.querySelector(".graph-container.selected");
    selectedGraph.classList.remove("selected");
    const nextGraph = document.querySelector(
      ".graph-container:nth-of-type(" + index + ")"
    );
    nextGraph.classList.add("selected");
  });
});

// Function to get clicked element's index.
function getElementIndex(el) {
  return [...el.parentElement.children].indexOf(el);
}

// Date picker values
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");

let today = new Date();
today = today.toISOString().split("T")[0];
const numberOfDays = 14;
let passedDate = new Date(Date.now() - numberOfDays * 24 * 60 * 60 * 1000);
passedDate = passedDate.toISOString().split("T")[0];

startDateInput.value = passedDate;
endDateInput.value = today;

let startDate = startDateInput.value;
let endDate = endDateInput.value;

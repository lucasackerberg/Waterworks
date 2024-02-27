import { createSiteSelector } from "./siteSelector.js";
import { Fetcher } from "./dynamicEndpoints.js";
import { testChart } from "./chart.js";

let myData;
let site = "Eriksberg";
let startDate = "2024-01-01";
let endDate = "2024-01-08";
let selectedParameter = "Level";
let currentChart;

createSiteSelector();

const selectSite = document.getElementById("siteSelector");
site = selectSite.value;

selectSite.addEventListener("change", function () {
  site = selectSite.value;
  console.log(site);
});

//Function to generate chart
function fetchDataAndDrawChart(site, startDate, endDate, selectedParameter) {
  const fetcher = new Fetcher(site, startDate, endDate, selectedParameter);
  fetcher
    .getMeasurements()
    .then((data) => {
      myData = data;
      // Destroy existing Chart Instance to reuse <canvas> element
      const chartStatus = Chart.getChart("myChart");
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      currentChart = new testChart();
      currentChart.fetchAllData(myData);
    })
    .catch((error) => console.error(error));
}

// Scroll to result
function smoothScroll() {
  document.querySelector("#results").scrollIntoView({
    behavior: "smooth",
  });
}

const getDataBtn = document.getElementById("get-data-btn");

getDataBtn.addEventListener("click", function () {
  // Check which measurment property tab is selected
  const selectedTab = document.querySelector(".tab.selected");
  // Get data attribute value from selecte tab
  selectedParameter = selectedTab.getAttribute("data");
  console.log(site);

  fetchDataAndDrawChart(site, startDate, endDate, selectedParameter);
  smoothScroll();
});

// Tab logic
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    //Getting index of clicked tab
    const index = getElementIndex(tab) + 1;

    //Adding "selected" class to clicked tab, and removing from the nonselected
    const selectedTab = document.querySelector(".tab.selected");
    selectedTab.classList.remove("selected");
    tab.classList.add("selected");
    selectedParameter = tab.getAttribute("data");

    const graphContainer = document.querySelector(".graph-container");

    fetchDataAndDrawChart(site, startDate, endDate, selectedParameter);

    // !!!!Call method to generate graph here, selectedParameter is the parameter to be used
    if (selectedParameter === "Level") {
      graphContainer.style.backgroundColor = "var(--grey)";
    }
    if (selectedParameter === "RainFall") {
      graphContainer.style.backgroundColor = "var(--medium-grey)";
    }
    if (selectedParameter === "Flow") {
      graphContainer.style.backgroundColor = "var(--medium-lightgrey)";
    }
    if (selectedParameter === "Tapping") {
      graphContainer.style.backgroundColor = "var(--lightgrey)";
    }
  });
});

//Function to get clicked element's index.
function getElementIndex(el) {
  return [...el.parentElement.children].indexOf(el);
}

// class for fetching data from API
/* const fetcher = new Fetcher(site, startDate, endDate, selectedParameter);

fetcher
  .getMeasurements()
  .then((data) => {
    myData = data;
    // Class for Dynamic chart
    currentChart = new testChart();
    currentChart.fetchAllData(myData);
  })
  .catch((error) => console.error(error)); */
/* Function for converting API timestamp to ISO date, eg "2024-01-01" */
const timeStampsIntoDate = (timestamp) => {
  timestamp = dataPoint.TimeStamp.split("(");
  timestamp = timestamp[1].split("+");
  timestamp = parseInt(timestamp[0]);
  let date = new Date(timestamp);
  date = date.toISOString().split("T")[0];
  return date;
};

// const timeStampsIntoDate = (data) => {
//   data.forEach((dataPoint) =>{
//     let timestamp = dataPoint.TimeStamp.split('(');
//     timestamp = timestamp[1].split('+');
//     timestamp = parseInt(timestamp[0]);
//     console.log(timestamp);
//     let date = new Date(timestamp);
//     date = date.toISOString().split("T")[0];
//   });
//}

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

startDate = startDateInput.value;
endDate = endDateInput.value;

//Date picker max date value = today (sorry, can't look into the future)
startDateInput.max = today;
endDateInput.max = today;

startDateInput.addEventListener("change", function () {
  startDate = startDateInput.value;
  console.log(startDate);
});

endDateInput.addEventListener("change", function () {
  endDate = endDateInput.value;
  console.log(endDate);
});

//Show graph when loading page
Window.onload = fetchDataAndDrawChart(
  site,
  startDate,
  endDate,
  selectedParameter
);

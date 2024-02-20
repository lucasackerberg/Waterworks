const baseUrl =
  "https://data.goteborg.se/RiverService/v1.1/Measurements/dc8ceeae-fb76-4667-a8f3-3029010bbb7f/Landvetter/Rainfall/2023-01-01/2023-01-15?format=json";

const fetchAllData = async () => {
  const response = await fetch(baseUrl);
  const waterData = await response.json();
  const dataArray = parseData(waterData);
  renderChart(dataArray);
};

const parseData = (waterData) => {
  return waterData.map((element) => {
    const date = new Date(parseInt(element.TimeStamp.substr(6)));
    const formattedDate = formatDate(date);
    return {
      date: formattedDate,
      value: element.Value,
    };
  });
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const renderChart = (dataArray) => {
  new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: dataArray.map((row) => row.date),
      datasets: [
        {
          label: "Uppmätt regn XX",
          data: dataArray.map((row) => row.value),
          fill: true,
          borderColor: "#4A9DFF",
          backgroundColor: "#CCE4FF",
          tension: 0.3,
        },
      ],
    },
  });
};

document.addEventListener("DOMContentLoaded", fetchAllData);

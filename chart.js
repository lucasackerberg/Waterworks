export class testChart {
  constructor() {}
  async fetchAllData(waterData) {
    const dataArray = this.parseData(waterData);
    this.renderChart(dataArray);
  }

  parseData(waterData) {
    return waterData.map((element) => {
      const date = new Date(parseInt(element.TimeStamp.substr(6)));
      const formattedDate = this.formatDate(date);
      return {
        date: formattedDate,
        value: element.Value,
      };
    });
  }

  formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  }

  renderChart(dataArray) {
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
  }
}

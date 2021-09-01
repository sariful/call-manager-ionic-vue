<template>
  <base-layout page-title="Home">
    <ion-content :fullscreen="true">
      <h1>Hello</h1>
      <canvas id="planet-chart" width="1200" height="800"></canvas>
      <pre>Last 7days: {{ last7DaysCalls }}</pre>
    </ion-content>
  </base-layout>
</template>

<script>
import Chart from "chart.js";
import moment from "moment";
import { IonContent } from "@ionic/vue";

export default {
  name: "Home",
  components: {
    IonContent,
  },
  computed: {
    last7DaysCalls() {
      const last7DaysCalls = this.$store.getters.getLast7DaysCalls;

      return last7DaysCalls;
    },
  },
  watch: {
    last7DaysCalls(newVal) {
      this.renderChart(newVal);
    }
  },
  async created() {
    this.$store.dispatch("setLast7DaysCalls");
  },
  methods: {
    renderChart(chartData) {
      console.log("chart rendered");
      const ctx = document.getElementById("planet-chart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "No of Calls",
              data: chartData.data,
              backgroundColor: "rgba(78, 115, 223, 0)",
              borderColor: "rgba(166, 166, 166, 1)",
              borderWidth: 1,
              type: "line",
            },
            {
              label: "No of Actual Calls",
              data: chartData.actual_call_count,
              backgroundColor: "rgba(78, 115, 223, 0)",
              borderColor: "rgba(78, 115, 223, 1)",
              borderWidth: 2,
              type: "line",
            },
            {
              label: "Call Duration",
              data: chartData.call_duration,
              backgroundColor: "rgba(227, 227, 227)",
              borderColor: "rgba(227, 227, 227)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          legend: {
            labels: {
              fontSize: 8,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
					tooltips: {
						mode: 'index',
						intersect: true
					},
          elements: {
            line: {
              tension: 0.25,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  display: false,
                },
                gridLines: {
                  drawBorder: false,
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 8,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      });
    },
    getLastNDays() {
      let days;
      if (arguments.length > 0) {
        days = arguments[0];
      } else {
        days = 7;
      }
      var result = [];
      for (var i = 0; i < days; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push(moment(d).format("YYYY-MM-DD"));
      }
      return result;
    },
  },
};
</script>
<template>
  <base-layout page-title="Home">
    <ion-content :fullscreen="true">
      <ion-row>
        <ion-col>
          <ion-card>
            <ion-card-header>
              <ion-card-title>Call Duration:</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <h1>
                {{ last7DaysCalls.last_day_call_duration_minute }}
                <small>Min</small>
              </h1>
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col>
          <ion-card>
            <ion-card-header>
              <ion-card-title>Total Calls:</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <h1>{{ last7DaysCalls.last_day_total_no_of_call_count }}</h1>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Weekly Calls Report</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <canvas id="planet-chart" width="600" height="400"></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </base-layout>
</template>

<script>
import Chart from "chart.js";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonRow,
} from "@ionic/vue";

export default {
  name: "Dashboard",
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCol,
    IonRow,
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
    },
  },
  methods: {
    renderChart(chartData) {
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
            mode: "index",
            intersect: true,
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
  },
};
</script>

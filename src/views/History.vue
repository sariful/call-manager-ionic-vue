<template>
  <base-layout page-title="History">
    <ion-content :fullscreen="true">
      <ion-list v-for="dailyLogs in last7DaysCalls.all_data" :key="dailyLogs" class="ion-margin-bottom">
        <ion-list-header>
          <ion-label>{{dailyLogs.date}}</ion-label>
        </ion-list-header>
        <ion-item v-for="singleLog in dailyLogs.data" :key="singleLog">
          <ion-avatar slot="start">
            <img src="/assets/img/user.png" />
          </ion-avatar>
          <ion-label>
            <h2>{{ singleLog.name }}</h2>
            <h3>{{ singleLog.number }}</h3>
            <p>Type: {{ singleLog.type }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </base-layout>
</template>

<script>
import { IonContent } from "@ionic/vue";

export default {
  name: "History",
  components: {
    IonContent,
  },
  computed: {
    last7DaysCalls() {
      const last7DaysCalls = this.$store.getters.getLast7DaysCalls;
      console.log(last7DaysCalls);
      return last7DaysCalls;
    },
  },
};
</script>

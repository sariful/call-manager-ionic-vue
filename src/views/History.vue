<template>
  <base-layout page-title="History">
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="singleLog in callLogs" :key="singleLog">
          <ion-avatar slot="start">
            <img src="/assets/img/user.png" />
          </ion-avatar>
          <ion-label>
            <h2>{{singleLog.name}}</h2>
            <h3>{{singleLog.number}}</h3>
            <p>Type: {{singleLog.type}}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </base-layout>
</template>

<script>
import { IonContent } from "@ionic/vue";
import moment from "moment";

export default {
  name: "History",
  components: {
    IonContent,
  },
  computed: {
    callLogs() {
      const callLogs = this.$store.getters.getCallLogs;
      return callLogs;
    },
  },
  async created() {
    // this.$store.dispatch("getCallLogPermission");
    this.$store.dispatch("fetchCallLogs", {
      start_date: moment().format("YYYY-MM-DD"),
      end_date: moment().subtract(7, "d").format("YYYY-MM-DD"),
    });
    // console.log(result);
  },
};
</script>
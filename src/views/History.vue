<template>
  <base-layout page-title="Home">
    <ion-content :fullscreen="true">
      <h1>History</h1>
      <pre>Last 7days: {{last7DaysCalls}}</pre>
    </ion-content>
  </base-layout>
</template>

<script>
import { IonContent } from "@ionic/vue";

export default {
  name: "Home",
  components: {
    IonContent,
  },
  computed: {
    last7DaysCalls() {
      const last7DaysCalls = this.$store.getters.getLast7DaysCalls;
      console.log({last7DaysCalls});
      return last7DaysCalls;
    }
  },
  async created() {
    // this.$store.dispatch("getCallLogPermission");
    this.$store.dispatch("setLast7DaysCalls");
    // console.log(result);
  }
};
</script>
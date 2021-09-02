<template>
  <base-layout page-title="Home">
    <ion-content :fullscreen="true">
      <h1>Contacts</h1>
      <pre>Last 7days: {{contacts}}</pre>
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
    contacts() {
      const contacts = this.$store.getters.getcontacts;
      return contacts;
    }
  },
  async created() {
    this.$store.dispatch("fetchContacts");
  }
};
</script>
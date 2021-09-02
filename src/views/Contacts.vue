<template>
  <base-layout page-title="Contacts">
    <ion-content :fullscreen="true">
      <h2 v-if="contacts.length <= 0">Loading . . .</h2>
      <ion-list>
        <ion-item v-for="contact in contacts" :key="contact.id">
          <ion-avatar slot="start">
            <img :src="contact.url || '/assets/img/user.png'">
          </ion-avatar>
          <ion-label>
            <h2>{{contact.displayName}}</h2>
            <h3 v-if="contact.phoneNumbers">{{contact.phoneNumbers[0].value}}</h3>
          </ion-label>
        </ion-item>
      </ion-list>
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
      const contacts = this.$store.getters.getContacts;
      return contacts;
    },
  },
  async created() {
    this.$store.dispatch("fetchContacts");
  },
};
</script>
<template>
  <base-layout page-title="Contacts">
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-searchbar
            v-model="search_query"
            show-cancel-button="focus"
            animated
          >
          </ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <h2 v-if="contacts.length <= 0">Loading . . .</h2>

      <ion-list v-if="contacts.length > 0">
        <ion-item v-for="contact in searched_contacts" :key="contact.id">
          <ion-avatar slot="start">
            <img :src="contact.url || '/assets/img/user.png'" />
          </ion-avatar>
          <ion-label>
            <h2>{{ contact.displayName }}</h2>
            <h3 v-if="contact.phoneNumbers">
              {{ contact.phoneNumbers[0].value }}
            </h3>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </base-layout>
</template>

<script>
import {
  IonContent,
  IonSearchbar,
  IonItem,
  IonAvatar,
  IonLabel,
  IonList,
  IonHeader,
  IonToolbar,
} from "@ionic/vue";

export default {
  name: "Contacts",
  components: {
    IonContent,
    IonSearchbar,
    IonItem,
    IonAvatar,
    IonLabel,
    IonList,
    IonHeader,
    IonToolbar,
  },
  data() {
    return {
      search_query: "",
      searched_contacts: [],
    };
  },
  computed: {
    contacts() {
      const contacts = this.$store.getters.getContacts;
      return contacts;
    },
  },
  watch: {
    contacts(newValues) {
      this.searched_contacts = newValues;
    },
    search_query() {
      const self = this;
      const search_query = this.search_query.toString().toLowerCase().trim();

      const contacts = self.contacts;

      if (search_query.length > 0) {
        const searched_contacts = contacts.filter(function (obj) {
          if (obj.displayName) {
            if (obj.displayName.toLowerCase().indexOf(search_query) >= 0) {
              return 1;
            }
          }
        });

        this.searched_contacts = searched_contacts;
      } else {
        this.searched_contacts = contacts;
      }
    },
  },
  async created() {
    this.$store.dispatch("fetchContacts");
  },
};
</script>
<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" href="/dashboard">
          <ion-icon :icon="pieChartOutline"></ion-icon>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="history" href="/history">
          <ion-icon :icon="footstepsOutline"></ion-icon>
          <ion-label>History</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="contacts" href="/contacts">
          <ion-icon :icon="peopleOutline"></ion-icon>
          <ion-label>Contacts</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import {
  pieChartOutline,
  footstepsOutline,
  peopleOutline,
} from "ionicons/icons";

export default {
  components: { IonIcon, IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs },
  setup() {
    return {
      pieChartOutline,
      footstepsOutline,
      peopleOutline,
    };
  },
};
</script>
<template>
  <ion-footer>
    <ion-toolbar>
      <ion-tabs>
        <ion-tab-bar>
          <ion-tab-button tab="dashboard" href="/dashboard">
            <ion-icon :icon="pieChartOutline"></ion-icon>
            <ion-label>Dashboard</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="history" href="/history">
            <ion-icon :icon="gitCompareOutline"></ion-icon>
            <ion-label>History</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="contacts" href="/contacts">
            <ion-icon :icon="peopleOutline"></ion-icon>
            <ion-label>Contacts</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import {
  IonIcon,
  IonLabel,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
} from "@ionic/vue";
import {
  pieChartOutline,
  gitCompareOutline,
  peopleOutline,
} from "ionicons/icons";

export default {
  components: {
    IonIcon,
    IonLabel,
    IonToolbar,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonFooter,
  },
  setup() {
    return {
      pieChartOutline,
      gitCompareOutline,
      peopleOutline,
    };
  },
};
</script>
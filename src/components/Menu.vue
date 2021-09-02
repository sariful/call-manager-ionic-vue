<template>
  <ion-menu side="start" content-id="main-content" type="overlay">
    <ion-content>
      <ion-list id="inbox-list">
        <ion-list-header>Welcome</ion-list-header>
        <ion-note>{{ userDetails.name }}</ion-note>

        <ion-menu-toggle auto-hide="false">
          <ion-item
            detail="false"
            lines="none"
            class="hydrated selected"
            router-link="/home"
          >
            <ion-icon :icon="homeOutline" slot="start"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-item>
          <ion-item
            detail="false"
            lines="none"
            class="hydrated"
            router-link="/history"
          >
            <ion-icon :icon="layersOutline" slot="start"></ion-icon>
            <ion-label>Call History</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-item>
          <ion-icon :icon="moon"></ion-icon>
          <ion-label class="ion-margin-start">Toggle Dark Mode</ion-label>
          <ion-toggle @ionChange="toggleDarkMode($event)" :checked="$store.getters.getThemeOption == 'dark' ? true : false"></ion-toggle>
        </ion-item>
      </ion-toolbar>
      <ion-toolbar>
        <ion-title>
          <ion-icon
            class="footer-icons"
            color="primary"
            :icon="logInOutline"
          ></ion-icon>
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-menu>
</template>
<script>
import { layersOutline, logInOutline, moon, homeOutline } from "ionicons/icons";
import {
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonMenuToggle,
  IonListHeader,
  IonIcon,
  IonLabel,
  IonNote,
  IonTitle,
  IonFooter,
  IonToolbar,
  IonToggle,
} from "@ionic/vue";

export default {
  name: "Menu",
  components: {
    IonContent,
    IonMenu,
    IonList,
    IonItem,
    IonMenuToggle,
    IonListHeader,
    IonIcon,
    IonLabel,
    IonNote,
    IonTitle,
    IonFooter,
    IonToolbar,
    IonToggle,
  },
  data() {
    return {
      layersOutline,
      logInOutline,
      moon,
      homeOutline
      // userDetails: {},
    };
  },
  computed: {
    userDetails() {
      let userDetails = this.$store.getters.getUserDetails;
      return userDetails;
    },
  },
  methods: {
    menuItemClicked() {
      // console.log("Menu Item Clicked");
    },
    toggleDarkMode(event) {
      let themeOption;
      if (event.detail.checked) {
        themeOption = "dark";
      } else {
        themeOption = "light";
      }
      this.$store.dispatch("setThemeOption", themeOption);
    },
  },
};
</script>


<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

ion-icon.footer-icons {
  font-size: 2em;
}
</style>
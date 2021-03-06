<template>
  <ion-app>
    <IonSplitPane content-id="main-content">
      <Menu />
      <ion-router-outlet id="main-content" />
    </IonSplitPane>
  </ion-app>
</template>

<script>
import Menu from "./components/Menu";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/vue";
import axios from "axios";
// import { defineComponent } from 'vue';

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    Menu,
  },
  data() {
    return {};
  },
  async mounted() {
    // this.$store.dispatch("setUserDetails");
    // this.$store.dispatch("setCartContents");
    // this.$store.dispatch("setProducts");
    this.$store.dispatch("setThemeOption", localStorage.themeOption);
    return {};
  },
  async created() {
    const token = localStorage.jwt_token;
    if (token == "" || typeof token == "undefined") {
      console.log("not logged in");
      // this.$router.push("/welcome");
    } else {
      axios.interceptors.request.use(function (config) {
        config.headers["jwt-token"] = token;
        return config;
      });
    }
  },
};
</script>
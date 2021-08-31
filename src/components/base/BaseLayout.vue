<template>
  <ion-page>
    <PageHeader
      :page-title="pageTitle"
    />
    <slot />
    <Tabs />
  </ion-page>
</template>

<script>
import PageHeader from "../Header";
import Tabs from "../Tabs";

import { IonPage } from "@ionic/vue";

export default {
  props: ["pageTitle", "showMenu"],
  components: {
    IonPage,
    Tabs,
    PageHeader,
  },
};
</script>
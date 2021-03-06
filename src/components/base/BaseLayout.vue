<template>
  <ion-page>
    <PageHeader
      :page-title="pageTitle"
    />
    <slot />
  </ion-page>
</template>

<script>
import PageHeader from "../Header";

import { IonPage } from "@ionic/vue";

export default {
  props: ["pageTitle", "showMenu"],
  components: {
    IonPage,
    PageHeader,
  },
};
</script>
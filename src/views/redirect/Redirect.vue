<template>
  <div></div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

defineComponent({ name: "RedirectView" });

const route = useRoute();
const router = useRouter();

const { params, query } = route;
const { pathMatch } = params;

router.replace({ path: "/" + pathMatch, query });
</script>

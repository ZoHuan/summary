<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive v-if="keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-else />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const keepAlive = computed(() => {
  return route.meta.noCache;
});
</script>

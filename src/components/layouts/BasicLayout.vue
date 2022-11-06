<template>
  <global-layout>
    <router-view v-slot="{ Component }">
      <transition name="page-transition">
        <keep-alive v-if="keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-else />
      </transition>
    </router-view>
  </global-layout>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import GlobalLayout from "@/components/page/GlobalLayout.vue";

const route = useRoute();

const keepAlive = computed(() => {
  return route.meta.noCache;
});
</script>

<style lang="less" scoped>
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

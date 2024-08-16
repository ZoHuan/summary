<template>
	<div class="account-center-main">
		<CronTab />
	</div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { CronTab } from "@/components/CronTab";

defineComponent({ name: "AccountCenter" });
</script>

<style lang="less" scoped></style>

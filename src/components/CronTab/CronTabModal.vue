<template>
	<el-dialog
		title="Cron表达式"
		width="800px"
		class="cron-modal"
		v-model="dialogVisible"
		@close="onCloseDialog"
	>
		<CronTab v-bind="$attrs" />
		<template #footer>
			<el-button @click="onCloseDialog">取消</el-button>
			<el-button type="primary" @click="onConfirm">确定</el-button>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import CronTab from "./CronTabInner.vue";

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(["update:visible"]);
const dialogVisible = ref(props.visible);

function onConfirm() {
	emit("update:visible", false);
}

function onCloseDialog() {
	emit("update:visible", false);
}

watch(
	() => props.visible,
	(newVal) => {
		dialogVisible.value = newVal;
	}
);
</script>

<style lang="less">
.cron-modal {
	.el-dialog__header {
		margin-right: 0;
		padding: 16px;
		border-bottom: 1px solid #f0f0f0;
	}
	.el-dialog__body {
		padding: 14px;
	}

	.el-dialog__footer {
		padding: 10px 16px;
		border-top: 1px solid #f0f0f0;
	}
}
</style>

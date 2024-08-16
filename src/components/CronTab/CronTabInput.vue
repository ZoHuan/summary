<template>
	<div>
		<el-input
			v-model="editCronValue"
			:placeholder="placeholder"
			:disabled="disabled"
		>
			<template #append>
				<el-button
					:icon="Setting"
					:disabled="disabled ? 'disabled' : null"
					@click="showConfigModal"
					>选择</el-button
				>
			</template>
		</el-input>

		<CronTabModal
			v-model:value="editCronValue"
			v-model:visible="isModalVisible"
			:exe-start-time="exeStartTime"
			:hide-year="hideYear"
			:hide-second="hideSecond"
			:remote="remote"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { Setting } from "@element-plus/icons-vue";
import { cronEmits, cronProps } from "./cron.data";
import CronTabModal from "./CronTabModal.vue";

const props = defineProps({
	...cronProps,
	placeholder: { type: String, default: "请输入cron表达式" },
	exeStartTime: { type: [Number, String, Object], default: 0 },
});
const emit = defineEmits([...cronEmits]);
const isModalVisible = ref(false);
const editCronValue = ref(props.value);

watch(
	() => props.value,
	(newVal) => {
		if (newVal !== editCronValue.value) editCronValue.value = newVal;
	}
);
watch(editCronValue, (newVal) => {
	emit("change", newVal);
	emit("update:value", newVal);
});

function showConfigModal() {
	if (!props.disabled) {
		isModalVisible.value = true;
	}
}
</script>

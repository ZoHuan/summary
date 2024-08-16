<template>
	<div class="config-list">
		<el-radio-group v-model="type">
			<div class="item">
				<el-radio :value="TypeEnum.every" v-bind="beforeRadioAttrs">
					每年
				</el-radio>
			</div>
			<div class="item">
				<el-radio :value="TypeEnum.range" v-bind="beforeRadioAttrs">
					区间
				</el-radio>
				<span> 从 </span>
				<el-input
					v-model.number="valueRange.start"
					type="number"
					class="w80"
					v-bind="typeRangeAttrs"
				/>
				<span> 年 至 </span>
				<el-input
					v-model.number="valueRange.end"
					type="number"
					class="w80"
					v-bind="typeRangeAttrs"
				/>
				<span> 年 </span>
			</div>
			<div class="item">
				<el-radio :value="TypeEnum.loop" v-bind="beforeRadioAttrs">
					循环
				</el-radio>
				<span> 从 </span>
				<el-input
					v-model.number="valueLoop.start"
					type="number"
					class="w80"
					v-bind="typeLoopAttrs"
				/>
				<span> 年开始，间隔 </span>
				<el-input
					v-model.number="valueLoop.interval"
					type="number"
					class="w80"
					v-bind="typeLoopAttrs"
				/>
				<span> 年 </span>
			</div>
		</el-radio-group>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTabEmits, useTabProps, useTabSetup } from "./useTabMixin";

export default defineComponent({
	name: "YearUI",
	props: useTabProps({
		defaultValue: "*",
	}),
	emits: useTabEmits(),
	setup(props, context) {
		const nowYear = new Date().getFullYear();
		return useTabSetup(props, context, {
			defaultValue: "*",
			minValue: 0,
			valueRange: { start: nowYear, end: nowYear + 100 },
			valueLoop: { start: nowYear, interval: 1 },
		});
	},
});
</script>

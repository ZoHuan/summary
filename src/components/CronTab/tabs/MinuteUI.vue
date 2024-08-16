<template>
	<div class="config-list">
		<el-radio-group v-model="type">
			<div class="item">
				<el-radio :value="TypeEnum.every" v-bind="beforeRadioAttrs">
					每分
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
					v-bind="typeRangeAttrs"
				/>
				<span> 分 至 </span>
				<el-input
					v-model.number="valueRange.end"
					type="number"
					v-bind="typeRangeAttrs"
				/>
				<span> 分 </span>
			</div>
			<div class="item">
				<el-radio :value="TypeEnum.loop" v-bind="beforeRadioAttrs">
					循环
				</el-radio>
				<span> 从 </span>
				<el-input
					v-model.number="valueLoop.start"
					type="number"
					v-bind="typeLoopAttrs"
				/>
				<span> 分开始，间隔 </span>
				<el-input
					v-model.number="valueLoop.interval"
					type="number"
					v-bind="typeLoopAttrs"
				/>
				<span> 分 </span>
			</div>
			<div class="item">
				<el-radio :value="TypeEnum.specify" v-bind="beforeRadioAttrs">
					指定
				</el-radio>
				<div class="list">
					<el-checkbox-group v-model="valueList">
						<template v-for="i in specifyRange" :key="i">
							<el-checkbox :value="i" v-bind="typeSpecifyAttrs">
								{{ i }}
							</el-checkbox>
						</template>
					</el-checkbox-group>
				</div>
			</div>
		</el-radio-group>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTabEmits, useTabProps, useTabSetup } from "./useTabMixin";

export default defineComponent({
	name: "MinuteUI",
	props: useTabProps({
		defaultValue: "*",
	}),
	emits: useTabEmits(),
	setup(props, context) {
		return useTabSetup(props, context, {
			defaultValue: "*",
			minValue: 0,
			maxValue: 59,
			valueRange: { start: 0, end: 59 },
			valueLoop: { start: 0, interval: 1 },
		});
	},
});
</script>

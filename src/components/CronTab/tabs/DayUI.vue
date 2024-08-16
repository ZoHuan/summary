<template>
	<div class="config-list">
		<el-radio-group v-model="type">
			<div class="item">
				<el-radio :value="TypeEnum.unset" v-bind="beforeRadioAttrs">
					不设置
				</el-radio>
				<span class="tip-info">日和周只能设置其中之一</span>
			</div>
			<div class="item">
				<el-radio :value="TypeEnum.every" v-bind="beforeRadioAttrs">
					每日
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
				<span> 日 至 </span>
				<el-input
					v-model.number="valueRange.end"
					type="number"
					v-bind="typeRangeAttrs"
				/>
				<span> 日 </span>
			</div>
			<div class="item">
				<el-radio :value="TypeEnum.loop" v-bind="beforeRadioAttrs">
					循环
				</el-radio>
				<span> 从 </span>
				<el-input
					v-model.number="valueLoop.start"
					type="number"
					class="w-4"
					v-bind="typeLoopAttrs"
				/>
				<span> 日开始，间隔 </span>
				<el-input
					v-model.number="valueLoop.interval"
					type="number"
					v-bind="typeLoopAttrs"
				/>
				<span> 日 </span>
			</div>
			<div class="item">
				<el-radio :value="TypeEnum.last" v-bind="beforeRadioAttrs">
					最后一日
				</el-radio>
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
import { computed, defineComponent, watch } from "vue";
import { TypeEnum, useTabEmits, useTabProps, useTabSetup } from "./useTabMixin";

export default defineComponent({
	name: "DayUI",
	props: useTabProps({
		defaultValue: "*",
		props: {
			week: { type: String, default: "?" },
		},
	}),
	emits: useTabEmits(),
	setup(props, context) {
		const disabledChoice = computed(() => {
			return (props.week && props.week !== "?") || props.disabled;
		});
		const setup = useTabSetup(props, context, {
			defaultValue: "*",
			valueWork: 1,
			minValue: 1,
			maxValue: 31,
			valueRange: { start: 1, end: 31 },
			valueLoop: { start: 1, interval: 1 },
			disabled: disabledChoice,
		});
		const typeWorkAttrs = computed(() => ({
			disabled:
				setup.type.value !== TypeEnum.work ||
				props.disabled ||
				disabledChoice.value,
			...setup.inputNumberAttrs.value,
		}));

		watch(
			() => props.week,
			() => {
				setup.updateValue(
					disabledChoice.value ? "?" : setup.computeValue.value
				);
			}
		);

		return { ...setup, typeWorkAttrs };
	},
});
</script>

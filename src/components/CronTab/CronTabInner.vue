<template>
	<div class="cron-inner">
		<div class="content">
			<el-tabs v-model="activeKey" size="small">
				<el-tab-pane v-if="!hideSecond" name="second" label="秒">
					<SecondUI v-model:value="second" :disabled="disabled" />
				</el-tab-pane>
				<el-tab-pane name="minute" label="分">
					<MinuteUI v-model:value="minute" :disabled="disabled" />
				</el-tab-pane>
				<el-tab-pane name="hour" label="时">
					<HourUI v-model:value="hour" :disabled="disabled" />
				</el-tab-pane>
				<el-tab-pane name="day" label="日">
					<DayUI v-model:value="day" :week="week" :disabled="disabled" />
				</el-tab-pane>
				<el-tab-pane name="month" label="月">
					<MonthUI v-model:value="month" :disabled="disabled" />
				</el-tab-pane>
				<el-tab-pane name="week" label="周">
					<WeekUI v-model:value="week" :day="day" :disabled="disabled" />
				</el-tab-pane>
				<el-tab-pane v-if="!hideYear && !hideSecond" name="year" label="年">
					<YearUI v-model:value="year" :disabled="disabled" />
				</el-tab-pane>
			</el-tabs>
			<el-divider />
			<!-- 执行时间预览 -->
			<el-row :gutter="8">
				<el-col :span="18" style="margin-top: 22px">
					<el-row :gutter="8">
						<el-col
							v-for="item in timeItems"
							:key="item.key"
							:span="8"
							style="margin-bottom: 10px"
						>
							<el-input v-model="inputValues[item.key]" @blur="onInputBlur">
								<template #prepend>
									<span class="allow-click" @click="activeKey = item.key">{{
										item.label
									}}</span>
								</template>
							</el-input>
						</el-col>
						<el-col :span="16">
							<el-input v-model="inputValues.cron" @blur="onInputCronBlur">
								<template #prepend>
									<el-tooltip content="Cron表达式">
										<span>式</span>
									</el-tooltip>
								</template>
							</el-input>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<div class="execution-time-title">近十次执行时间（不含年）</div>
					<el-input type="textarea" v-model="preTimeList" :rows="5" />
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import CronParser from "cron-parser";
import moment from "moment";
import { simpleDebounce } from "@/utils/util";
import { cronEmits, cronProps } from "./cron.data";
import { InputValues, TimeItem } from "./types";
import SecondUI from "./tabs/SecondUI.vue";
import MinuteUI from "./tabs/MinuteUI.vue";
import HourUI from "./tabs/HourUI.vue";
import DayUI from "./tabs/DayUI.vue";
import MonthUI from "./tabs/MonthUI.vue";
import WeekUI from "./tabs/WeekUI.vue";
import YearUI from "./tabs/YearUI.vue";

const props = defineProps({ ...cronProps });
const emit = defineEmits([...cronEmits]);

const activeKey = ref(props.hideSecond ? "minute" : "second");
const second = ref("*");
const minute = ref("*");
const hour = ref("*");
const day = ref("*");
const month = ref("*");
const week = ref("?");
const year = ref("*");
const inputValues = reactive<InputValues>({
	second: "",
	minute: "",
	hour: "",
	day: "",
	month: "",
	week: "",
	year: "",
	cron: "",
});
const timeItems = reactive<TimeItem[]>([
	{ key: "second", label: "秒" },
	{ key: "minute", label: "分" },
	{ key: "hour", label: "时" },
	{ key: "day", label: "日" },
	{ key: "month", label: "月" },
	{ key: "week", label: "周" },
	{ key: "year", label: "年" },
]);
const preTimeList = ref("执行预览，会忽略年份参数。");

// cron表达式
const cronValueInner = computed(() => {
	const result: string[] = [];
	if (!props.hideSecond) result.push(second.value ? second.value : "*");

	result.push(minute.value ? minute.value : "*");
	result.push(hour.value ? hour.value : "*");
	result.push(day.value ? day.value : "*");
	result.push(month.value ? month.value : "*");
	result.push(week.value ? week.value : "?");
	if (!props.hideYear && !props.hideSecond)
		result.push(year.value ? year.value : "*");
	return result.join(" ");
});
// 不含年
const cronValueNoYear = computed(() => {
	const cronValue = cronValueInner.value;
	if (props.hideYear || props.hideSecond) return cronValue;
	const cronValues = cronValue.split(" ");
	if (cronValues.length >= 6) {
		// 转成 Quartz 的规则
		cronValues[5] = convertWeekToQuartz(cronValues[5]);
	}
	return cronValues.slice(0, cronValues.length - 1).join(" ");
});
const calTriggerList = simpleDebounce(calTriggerListInner, 500);

watch(
	() => props.value,
	(newVal) => {
		if (newVal === cronValueInner.value) return;
		formatValue();
	}
);

watch(cronValueInner, (newValue) => {
	calTriggerList();
	emitValue(newValue);
	assignInput();
});

assignInput();
formatValue();
calTriggerListInner();

function assignInput() {
	inputValues.second = second.value;
	inputValues.minute = minute.value;
	inputValues.hour = hour.value;
	inputValues.day = day.value;
	inputValues.month = month.value;
	inputValues.week = week.value;
	inputValues.year = year.value;
	inputValues.cron = cronValueInner.value;
}

function formatValue() {
	if (!props.value) return;
	const values = props.value.split(" ").filter((item) => !!item);
	if (!values || values.length <= 0) return;
	let i = 0;
	if (!props.hideSecond) second.value = values[i++];
	if (values.length > i) minute.value = values[i++];
	if (values.length > i) hour.value = values[i++];
	if (values.length > i) day.value = values[i++];
	if (values.length > i) month.value = values[i++];
	if (values.length > i) week.value = values[i++];
	if (values.length > i) year.value = values[i];
	assignInput();
}

// Quartz 的规则：
// 1 = 周日，2 = 周一，3 = 周二，4 = 周三，5 = 周四，6 = 周五，7 = 周六
function convertWeekToQuartz(week: string) {
	const convertDigit = (digit: string) => {
		if (digit === "0") return "1";
		if (digit === "1") return "0";
		return (Number.parseInt(digit) - 1).toString();
	};
	const patternSingleDigit = /^[0-7]$/;
	// 匹配示例 1-7 or 1/7
	const patternRange = /^([0-7])([-/])([0-7])$/;
	// 匹配示例 1,4,7
	const patternList = /^([0-7])(,[0-7])+$/;
	if (patternSingleDigit.test(week)) {
		return convertDigit(week);
	} else if (patternRange.test(week)) {
		return week.replace(patternRange, (_$0, before, separator, after) => {
			if (separator === "/") return convertDigit(before) + separator + after;
			else return convertDigit(before) + separator + convertDigit(after);
		});
	} else if (patternList.test(week)) {
		return week
			.split(",")
			.map((digit) => convertDigit(digit))
			.join(",");
	}
	return week;
}

function calTriggerListInner() {
	// 设置了回调函数
	if (props.remote) {
		props.remote(cronValueInner.value, +new Date(), (value: string) => {
			preTimeList.value = value;
		});
		return;
	}
	const format = "yyyy-MM-DD HH:mm:ss";
	const options = {
		currentDate: moment(new Date()).format(format),
	};

	const iter = CronParser.parseExpression(cronValueNoYear.value, options);
	const result: string[] = [];
	for (let i = 1; i <= 10; i++) {
		result.push(moment(new Date(iter.next() as any)).format(format));
	}
	preTimeList.value = result.length > 0 ? result.join("\n") : "无执行时间";
}

function onInputBlur() {
	second.value = inputValues.second;
	minute.value = inputValues.minute;
	hour.value = inputValues.hour;
	day.value = inputValues.day;
	month.value = inputValues.month;
	week.value = inputValues.week;
	year.value = inputValues.year;
}

function onInputCronBlur(value: string) {
	emitValue(value);
}

function emitValue(value: string) {
	emit("change", value);
	emit("update:value", value);
}
</script>

<style lang="less">
.cron-inner {
	.config-list {
		margin: 0 10px 10px;
		text-align: left;

		.el-radio-group {
			display: inline-block;
		}

		.item {
			margin-top: 5px;
			font-size: 14px;

			span {
				padding: 0 2px;
			}
		}

		.choice {
			padding: 5px 8px;
		}

		.w60 {
			width: 60px;
			min-width: 60px;
		}

		.w80 {
			width: 80px;
			min-width: 80px;
		}

		.list {
			margin: 0 20px;
		}

		.list-check-item {
			width: 4em;
			margin-right: 0;
			padding: 1px 3px;
		}

		.list-cn .list-check-item {
			width: 5em;
		}

		.tip-info {
			display: inline-flex;
			align-items: center;
			height: 32px;
			vertical-align: top;
			color: #999;
		}
	}

	.execution-time-title {
		height: 22px;
	}

	.allow-click {
		cursor: pointer;
	}
}
</style>

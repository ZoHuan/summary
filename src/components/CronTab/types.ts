export interface InputValues {
	second: string;
	minute: string;
	hour: string;
	day: string;
	month: string;
	week: string;
	year: string;
	cron: string;
}

export interface TimeItem {
	key: keyof InputValues;
	label: string;
}

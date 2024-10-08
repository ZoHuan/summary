interface LettersType {
	[key: string]: number;
}

interface VariationsType {
	digits: boolean;
	lower: boolean;
	upper: boolean;
	nonWords: boolean;
}
// 时间修理
export function timeFix() {
	const time = new Date();
	const hour = time.getHours();
	return hour < 9
		? "早上好"
		: hour <= 11
		? "上午好"
		: hour <= 13
		? "中午好"
		: hour < 20
		? "下午好"
		: "晚上好";
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
	const event = document.createEvent("HTMLEvents");
	event.initEvent("resize", true, true);
	// event.eventType = "message";
	window.dispatchEvent(event);
}

/**
 * 防抖
 */
export function simpleDebounce<T extends (...args: any[]) => void>(
	fn: T,
	delay = 100
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}

// 密码难度评分
export function scorePassword(pass: string) {
	let score = 0;
	if (!pass) {
		return score;
	}
	// award every unique letter until 5 repetitions
	const letters: LettersType = {};
	for (let i = 0; i < pass.length; i++) {
		letters[pass[i]] = ((letters[pass[i]] || 0) as number) + 1;
		score += 5.0 / (letters[pass[i]] as number);
	}

	// bonus points for mixing it up
	const variations: VariationsType = {
		digits: /\d/.test(pass),
		lower: /[a-z]/.test(pass),
		upper: /[A-Z]/.test(pass),
		nonWords: /\W/.test(pass),
	};

	const variationCount: number = Object.values(variations).filter(
		(value) => value
	).length;
	score += (variationCount - 1) * 10;

	return score;
}

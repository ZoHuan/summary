import type { ObjectType } from "@/types/request";

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent("HTMLEvents");
  event.initEvent("resize", true, true);
  // event.eventType = "message";
  window.dispatchEvent(event);
}

// 密码难度评分
export function scorePassword(pass: string) {
  let score = 0;
  if (!pass) {
    return score;
  }
  // award every unique letter until 5 repetitions
  const letters: ObjectType = {};
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = ((letters[pass[i]] || 0) as number) + 1;
    score += 5.0 / (letters[pass[i]] as number);
  }

  // bonus points for mixing it up
  const variations: ObjectType = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (const check in variations) {
    variationCount += variations[check] === true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return score;
}

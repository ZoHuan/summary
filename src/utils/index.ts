/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

/**
 * @param str 需要转驼峰的下划线字符串
 * @returns 字符串驼峰
 */
export const underlineToHump = (str: string): string => {
  return str.replace(/-(\w)/g, (_, letter: string) => {
    return letter.toUpperCase();
  });
};

export const decide = {
  isArray: function isArray(obj: Array<unknown>) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  },

  isObject: function isObject(obj: unknown) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  },

  isString: function isString(obj: unknown) {
    return Object.prototype.toString.call(obj) === "[object String]";
  },

  isNumber: function isNumber(obj: unknown) {
    return Object.prototype.toString.call(obj) === "[object Number]";
  },

  isFunction: function isFunction(obj: unknown) {
    return Object.prototype.toString.call(obj) === "[object Function]";
  },

  isEmptyObject: function isEmptyObject(o: unknown) {
    return JSON.stringify(o) === "{}";
  },

  isEmptyArray: function emptyArray(o: Array<unknown>) {
    return JSON.stringify(o) === "[]";
  },
};

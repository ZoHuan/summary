import type { DepartmentType } from "@/types/user";

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

/**
 * 递归-----根据属性查询当前节点
 * @param tree          树的源数据
 * @param nodeKey       判断的属性
 * @param nodeValue     判断的属性值
 * @returns temp        返回的匹配的节点数据
 */
export const queryNode = <T extends Record<string, unknown>>(
  tree: Array<T>,
  nodeKey: string,
  nodeValue: string,
  temp: Array<T> = []
) => {
  const forFn = (arr: Array<T>) => {
    for (let i = 0; i < arr.length; i++) {
      if ((arr[i][nodeKey] as string).includes(nodeValue)) {
        temp.push(arr[i]);
      } else {
        if (arr[i].children && (arr[i].children as Array<T>).length != 0) {
          forFn(arr[i].children as Array<T>);
        }
      }
    }
  };
  forFn(tree);
  return temp;
};

/**
 * 递归-----根据属性增加当前节点
 * @param tree          树的源数据
 * @param nodeKey       判断的属性
 * @param nodeValue     判断的属性值
 */
export const insertNode = (
  tree: Array<DepartmentType>,
  nodeKey: string,
  nodeValue: DepartmentType
) => {
  const forFn = (arr: Array<DepartmentType>) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][nodeKey as keyof DepartmentType] === nodeValue.parentId) {
        arr[i].children ? "" : (arr[i].children = []);
        arr[i].children?.push({
          parentId: arr[i].id as number,
          id: parseInt("" + arr[i].id + (arr[i].children?.length as number)),
          code: nodeValue.code,
          name: nodeValue.name,
        });
      } else {
        if (arr[i].children && arr[i].children?.length != 0) {
          forFn(arr[i].children as Array<DepartmentType>);
        }
      }
    }
  };
  forFn(tree);
};

/**
 * 递归-----根据属性修改当前节点
 * @param tree          树的源数据
 * @param nodeKey       判断的属性
 * @param nodeValue     判断的属性值
 */
export const updateNode = (
  tree: Array<DepartmentType>,
  nodeKey: string,
  nodeValue: DepartmentType
) => {
  deleteNode(tree, "id", nodeValue);
  if (nodeValue.parentId) {
    insertNode(tree, nodeKey, nodeValue);
  } else {
    tree.push({
      parentId: "",
      id: tree.length + 100,
      code: nodeValue.code,
      name: nodeValue.name,
    });
  }
};

/**
 * 递归-----根据属性删除当前节点
 * @param tree          树的源数据
 * @param nodeKey       判断的属性
 * @param nodeValue     判断的属性值
 */
export const deleteNode = (
  tree: Array<DepartmentType>,
  nodeKey: string,
  nodeValue: DepartmentType
) => {
  const forFn = (arr: Array<DepartmentType>) => {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i][nodeKey as keyof DepartmentType] ===
        nodeValue[nodeKey as keyof DepartmentType]
      ) {
        arr.splice(i, 1);
      } else {
        if (arr[i].children && arr[i].children?.length != 0) {
          forFn(arr[i].children as Array<DepartmentType>);
        }
      }
    }
  };
  forFn(tree);
};

import Mock from "mockjs";
import { builder, getQueryParameters, getBody } from "../util";
import { queryNode, insertNode, updateNode, deleteNode } from "@/utils/index";
import type { ParamType } from "@/types/request";
import type { DepartmentType } from "@/types/user";

const departmentList = [
  { parentId: "", id: 1, code: "RD", name: "研发部" },
  { parentId: "", id: 2, code: "MFG", name: "产品部" },
  { parentId: "", id: 3, code: "OC", name: "运营部" },
  {
    parentId: "",
    id: 4,
    code: "MKT",
    name: "市场部",
    children: [
      { parentId: 4, id: 40, code: "MT", name: "渠道部" },
      { parentId: 4, id: 41, code: "MOC", name: "商务部" },
    ],
  },
  {
    parentId: "",
    id: 5,
    code: "I.M.D",
    name: "综合部",
    children: [
      { parentId: 5, id: 50, code: "AD", name: "行政部" },
      { parentId: 5, id: 51, code: "FD", name: "财务部" },
    ],
  },
];

const list = (options: ParamType) => {
  let list: Array<DepartmentType>;
  const parameter = getQueryParameters(options);

  if (parameter.name) {
    list = queryNode(departmentList, "name", parameter.name);
  } else if (parameter.code) {
    list = queryNode(departmentList, "code", parameter.code);
  } else {
    list = departmentList;
  }

  return builder(list, "");
};

const insert = (options: ParamType) => {
  const parameter = getBody(options);
  if (parameter.parentId) {
    insertNode(departmentList, "id", parameter);
  } else {
    departmentList.push({
      parentId: "",
      id: departmentList.length + 1,
      code: parameter.code,
      name: parameter.name,
    });
  }

  return builder({}, "添加部门成功！");
};

const update = (options: ParamType) => {
  const parameter = getBody(options);
  updateNode(departmentList, "id", parameter);
  return builder({}, "修改部门成功！");
};

const deleted = (options: ParamType) => {
  const parameter = getBody(options);
  deleteNode(departmentList, "code", parameter);
  return builder({}, "删除部门成功！");
};

Mock.mock(/\/system\/department\/list/, "get", list);
Mock.mock(/\/system\/department\/insert/, "post", insert);
Mock.mock(/\/system\/department\/update/, "post", update);
Mock.mock(/\/system\/department\/delete/, "delete", deleted);

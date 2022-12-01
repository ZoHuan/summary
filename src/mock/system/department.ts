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

// const departmentList = [
//     {
//       id: 1,
//       code: "R&D",
//       name: "研发部",
//       children: [
//         {
//           id: 11,
//           code: "2016-05-01",
//           name: "后端开发工程师",
//         },
//         {
//           id: 12,
//           code: "2016-05-01",
//           name: "前端开发工程师",
//         },
//         {
//           id: 13,
//           code: "2016-05-01",
//           name: "测试工程师",
//         },
//         {
//           id: 14,
//           code: "2016-05-01",
//           name: "运维工程师",
//         },

//       ],
//     },
//     {
//       id: 2,
//       code: "2016-05-04",
//       name: "运营部",
//       children: [
//         {
//           id: 11,
//           code: "2016-05-01",
//           name: "产品运营",
//         },
//         {
//           id: 12,
//           code: "2016-05-01",
//           name: "内容运营",
//         },
//         {
//           id: 12,
//           code: "2016-05-01",
//           name: "活动策划",
//         },
//       ],
//     },
//     {
//       id: 2,
//       code: "2016-05-04",
//       name: "产品部",
//       children: [
//         {
//           id: 11,
//           code: "2016-05-01",
//           name: "产品经理",
//         },
//         {
//           id: 12,
//           code: "2016-05-01",
//           name: "UI设计师",
//         },
//       ],
//     },
//     {
//       id: 2,
//       code: "2016-05-04",
//       name: "市场部",
//       children: [
//         {
//           id: 11,
//           code: "2016-05-01",
//           name: "渠道",
//         },
//         {
//           id: 12,
//           code: "2016-05-01",
//           name: "商务",
//         },
//       ],
//     },
//     {
//       id: 2,
//       code: "2016-05-04",
//       name: "综合部",
//       children: [
//         {
//           id: 11,
//           code: "2016-05-01",
//           name: "行政部",
//         },
//         {
//           id: 12,
//           code: "2016-05-01",
//           name: "财务部",
//         },
//         {
//           id: 12,
//           code: "2016-05-01",
//           name: "人事部",
//         },
//       ],
//     },
//   ];

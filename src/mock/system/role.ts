import Mock from "mockjs";
import { builder } from "../util";

const list = () => {
  const roleList = [
    {
      id: 1,
      code: "admin",
      name: "超级管理员",
      date: "2022-12-01",
      describe: "超级管理员",
      disabled: true,
      permissions: [1, 11, 2, 21, 22, 23, 24, 3, 31, 32, 321, 322],
    },
    {
      id: 2,
      code: "RD",
      name: "开发工程师",
      date: "2022-12-01",
      describe: "开发工程师",
      disabled: false,
      permissions: [3, 31, 32, 321, 322],
    },
    {
      id: 3,
      code: "UI",
      name: "UI工程师",
      date: "2022-12-01",
      describe: "UI工程师",
      disabled: false,
      permissions: [1, 11, 3, 31, 32, 321, 322],
    },
  ];
  return builder(roleList, "");
};

Mock.mock(/\/system\/role\/list/, "get", list);

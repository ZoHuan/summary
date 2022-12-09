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
    },
    {
      id: 2,
      code: "RD",
      name: "开发工程师",
      date: "2022-12-01",
      describe: "开发工程师",
      disabled: false,
    },
    {
      id: 3,
      code: "UI",
      name: "UI工程师",
      date: "2022-12-01",
      describe: "UI工程师",
      disabled: false,
    },
  ];
  return builder(roleList, "");
};

Mock.mock(/\/system\/role\/list/, "get", list);

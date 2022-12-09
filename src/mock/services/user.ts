import Mock from "mockjs";
import { builder } from "../util";

const userInfo = () => {
  const userInfo = {
    id: "4291d7da9005377ec9aec4a71ea837f",
    username: "admin",
    name: "管理员",
    password: "",
    avatar: "@/assets/avatar.png",
    telephone: "",
    status: 1,
    creatorId: "admin",
    deleted: 0,
    roles: ["admin"],
  };

  return builder(userInfo, "");
};

Mock.mock(/\/user\/info/, "get", userInfo);

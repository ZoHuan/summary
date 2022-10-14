import Mock from "mockjs";
import { builder, getBody } from "../util";
import type { ParamType } from "@/types/request";

const username = ["admin"];
const password = ["e10adc3949ba59abbe56e057f20f883e"];

const login = (options: ParamType) => {
  const body = getBody(options);
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, "账户或密码错误", 401);
  }

  return builder(
    {
      id: Mock.mock("@guid"),
      name: Mock.mock("@name"),
      username: "admin",
      password: "",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
      status: 1,
      telephone: "",
      lastLoginIp: "27.154.74.117",
      lastLoginTime: 1534837621348,
      creatorId: "admin",
      createTime: 1497160610259,
      deleted: 0,
      roleId: "admin",
      lang: "zh-CN",
      token: "4291d7da9005377ec9aec4a71ea837f",
    },
    "",
    200,
    { "Custom-Header": Mock.mock("@guid") }
  );
};

const logout = () => {
  return builder({}, "注销成功");
};

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock("@integer(10000, 99999)") }, "");
};

Mock.mock(/\/auth\/login/, "post", login);
Mock.mock(/\/auth\/logout/, "post", logout);
Mock.mock(/\/account\/sms/, "post", smsCaptcha);

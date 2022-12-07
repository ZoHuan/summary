import Mock from "mockjs";
import { builder } from "../util";

const userList = Mock.mock({
  "userList|8": [
    {
      "id|1": "@guid",
      "username|1": "@name",
      "name|1": "@cname",
      "phone|10000000000-19999999999": 1,
      "email|1": "@email",
      "gender|0-1": 0,
      "departmentId|1": [1, 2, 3],
      "departmentName|1": ["研发部", "产品部", "运营部"],
      "roleId|1": [2, 3],
      "roleName|1": ["开发工程师", "UI工程师"],
      "status|0-1": 0,
    },
  ],
  total: 8,
});

const list = () => {
  return builder(userList, "");
};

Mock.mock(/\/system\/user\/list/, "get", list);

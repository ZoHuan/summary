import { ref } from "vue";
import { getDepartmentList } from "@/api/system/department";
import { getRoleList } from "@/api/system/role";

export default function () {
  // 部门配置
  const departmentProps = {
    children: "children",
    label: "name",
    value: "id",
  };
  // 部门数据
  const departmentList = ref();
  // 角色数据
  const roleList = ref();

  // 获取部门数据
  const getDepartmentData = () => {
    getDepartmentList().then((res) => {
      departmentList.value = res.data.result;
    });
  };

  // 获取数据
  const getRoleData = () => {
    getRoleList().then((res) => {
      roleList.value = res.data.result;
    });
  };

  return {
    departmentProps,
    departmentList,
    roleList,
    getDepartmentData,
    getRoleData,
  };
}

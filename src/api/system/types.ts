// 部门参数
export type getDepartmentType = {
  name: string;
  code: string;
};

export type departmentType = {
  parentId: number | string;
  name: string;
  code: string;
};

// 角色参数
export type getRoleType = {
  name: string;
  code: string;
  date: string;
};

export type roleType = {
  name: string;
  code: string;
  describe: string;
};

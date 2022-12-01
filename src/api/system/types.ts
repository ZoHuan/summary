export type getDepartmentType = {
  name: string;
  code: string;
};

export type departmentType = {
  parentId: number | string;
  name: string;
  code: string;
};

export type SmsType = {
  phone: string;
};

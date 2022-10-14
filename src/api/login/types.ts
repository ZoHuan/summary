export type LoginType = {
  username: string;
  password: string;
};

export type RegisterType = {
  username: string;
  password: string;
  phone: number;
  captcha: number;
};

export type SmsType = {
  phone: string;
};

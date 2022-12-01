export interface ResponseType<T> {
  result: T;
  message: string;
  code: number;
  timestamp: number;
  [propName: string]: boolean | number | string | object | Array<string>;
}
export interface ParamType {
  body: string | null;
  type: string;
  url: string | undefined;
}

export interface ObjectType {
  [propName: string]: boolean | number | string | object | Array<string>;
}

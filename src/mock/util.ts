import type { ResponseType, ParamType } from "@/types/request";

const responseBody: ResponseType<object> = {
  result: {},
  message: "",
  code: 0,
  timestamp: 0,
};

export const builder = (
  data: object,
  message: string,
  code = 0,
  headers = {}
) => {
  responseBody.result = data;
  if (message != undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }

  if (
    headers !== null &&
    typeof headers === "object" &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }

  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

export const getQueryParameters = (options: ParamType) => {
  const url = options.url;
  const search = url && url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export const getBody = (options: ParamType) => {
  return options.body && JSON.parse(options.body as string);
};

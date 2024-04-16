import axios from "axios";
import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from "axios";
import { ElNotification } from "element-plus";
import { useCache } from "@/hooks/web/useCache";
import { userStore } from "@/store/modules/user";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import type { ResponseType, ObjectType } from "@/types/request";

let baseUrl = "";
if (process.env.NODE_ENV === "production") {
	baseUrl = "https://zohuan.github.io/summary/";
} else if (process.env.NODE_ENV === "development") {
	baseUrl = "http://localhost:8080";
} else {
	baseUrl = "http://localhost:8080";
}

const { storage } = useCache();

// 创建 axios 实例
const request: AxiosInstance = axios.create({
	baseURL: baseUrl, // api base_url
	timeout: 6000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: AxiosError<ResponseType<ObjectType>>) => {
	if (error.response) {
		const data = error.response.data;
		const store = userStore();
		// 从 localstorage 获取 token
		const token = storage.get(ACCESS_TOKEN);
		if (error.response.status === 403) {
			ElNotification({
				title: "错误",
				message: data.message,
				type: "error",
			});
		}
		if (
			error.response.status === 401 &&
			!(data.result && data.result.isLogin)
		) {
			ElNotification({
				title: "错误",
				message: "未授权，请重新登录",
				type: "error",
			});
			if (token) {
				store.logout().then(() => {
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				});
			}
		}
	}
	return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = storage.get(ACCESS_TOKEN);
	// 如果 token 存在
	// 让每个请求携带自定义 token 请根据实际情况自行修改
	if (token && config && config.headers) {
		config.headers["Access-Token"] = token;
	}
	return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response: AxiosResponse) => {
	return response;
}, errorHandler);

export default request;

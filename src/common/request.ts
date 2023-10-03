import { useMemberStore } from '@/stores/modules/member';

// 基础请求地址
const base_url = import.meta.env.VITE_APP_BASE_API;
const url_rule = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;

/**
 * 添加拦截器
 */
const interceptor = {
	/**
	 * 拦截触发前
	 * @param  {UniApp.RequestOptions} options
	 */
	invoke(options: UniApp.RequestOptions) {
		// 判断请求url是否需要并且基础请求地址
		if (!url_rule.test(options.url)) {
			options.url = base_url + options.url;
		}
		options.timeout = 10000;
		options.header = {
			...options.header,
			'source-client': 'miniapp'
		};
		// 添加用户token信息
		const member_store = useMemberStore();
		const token = member_store.member_info?.token;
		if (token) options.header['Authorization'] = token;
	}
};

uni.addInterceptor('request', interceptor);
uni.addInterceptor('uploadFile', interceptor);

// 接口返回数据类型
interface Data<T> {
	code: string;
	msg: string;
	result: T;
}
/**
 * 发起请求
 * @param  {UniApp.RequestOptions} options
 */
const httpRquest = <T>(options: UniApp.RequestOptions) => {
	return new Promise<Data<T>>((resolve, reject) => {
		uni.request({
			...options,
			success(res) {
				const { statusCode, data } = res;
				if (statusCode >= 200 && statusCode < 300) {
					resolve(data as Data<T>);
				} else if (statusCode === 401) {
					// 401错误 --> 清理用户信息，跳转到登录页
					const member_store = useMemberStore();
					member_store.clearMemberInfo();
					uni.navigateTo({ url: '/pages/login/index' });
					reject(res);
				} else {
					// 其他状态码错误
					uni.showToast({ icon: 'none', title: (res.data as Data<T>).msg || '请求错误' });
				}
			},
			fail(err) {
				uni.showToast({ icon: 'none', title: '网络错误' });
				reject(err);
			}
		});
	});
};
const http = {
	/**
	 * get 请求
	 * @param  {String} url 接口地址
	 * @param  {Object} config 请求配置
	 */
	get: <T>(url: string, config: object = {}) => {
		return httpRquest<T>({ url, method: 'GET', ...config });
	},
	/**
	 * post 请求
	 * @param  {String} url 接口地址
	 * @param  {Object} config 请求配置
	 */
	post: <T>(url: string, config: object = {}) => {
		return httpRquest<T>({ url, method: 'POST', ...config });
	},
	/**
	 * delete 请求
	 * @param  {String} url 接口地址
	 * @param  {Object} config 请求配置
	 */
	delete: <T>(url: string, config: object = {}) => {
		return httpRquest<T>({ url, method: 'DELETE', ...config });
	},
	/**
	 * put 请求
	 * @param  {String} url 接口地址
	 * @param  {Object} config 请求配置
	 */
	put: <T>(url: string, config: object = {}) => {
		return httpRquest<T>({ url, method: 'PUT', ...config });
	}
};

export default http;

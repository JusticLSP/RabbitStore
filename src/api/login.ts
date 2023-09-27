import http from '@/common/request';
import type { LoginResult } from '@/types/member';

type LoginParams = {
	code: string;
	encryptedData: string;
	iv: string;
};
/**
 * 请求登录-已完成小程序认证可请求这接口
 * @param  {LoginParams} data
 */
export const postLoginAPI = async (data: LoginParams) => {
	try {
		const { result } = await http.post<LoginResult>('/login/wxMin', {
			data
		});
		return result;
	} catch (error) {
		return {} as LoginResult;
	}
};

/**
 * 模拟请求登录-开发版
 * @param  {string} phoneNumber
 */
export const simplePostLoginAPI = async (phoneNumber: string) => {
	try {
		const { result } = await http.post<LoginResult>('/login/wxMin/simple', {
			data: { phoneNumber }
		});
		return result;
	} catch (error) {
		return {} as LoginResult;
	}
};

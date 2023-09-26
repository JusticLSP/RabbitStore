import http from '@/common/request';
import type { PageParams } from '@/types/common';
import type { HotResult } from '@/types/hot';

type HotParams = PageParams & { subType?: string };
/**
 * 获取热门推荐
 * @param  {string} url api接口
 * @param  {HotParams} data 请求参数
 */
export const getHotRecommendAPI = async (url: string, data?: HotParams) => {
	try {
		const { result } = await http.get<HotResult>(url, {
			data
		});
		return result;
	} catch (error) {
		return {} as HotResult;
	}
};

import type { BannerItem } from '@/types/home';
import http from '../common/request';

/**
 * 获取区域展示图
 * @param  {number} distributionSite 区域展示位置 1 为首页（默认值） 2 为商品分类页
 */
export const getRegionBanner = async (distributionSite: number = 1) => {
	try {
		const { result } = await http.get<BannerItem[]>('/home/banner', {
			data: { distributionSite }
		});
		return result;
	} catch (error) {
		return [];
	}
};

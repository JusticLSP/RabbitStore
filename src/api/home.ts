import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home';
import http from '../common/request';
import type { PageParams, PageResult } from '@/types/common';

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

/**
 * 获取首页分类
 */
export const getHomeCategory = async () => {
	try {
		const { result } = await http.get<CategoryItem[]>('/home/category/mutli');
		return result;
	} catch (error) {
		return [];
	}
};

/**
 * 获取首页热门推荐
 */
export const getHomeHot = async () => {
	try {
		const { result } = await http.get<HotItem[]>('/home/hot/mutli');
		return result;
	} catch (error) {
		return [];
	}
};

/**
 * 获取首页猜你喜欢
 * @param  {PageParams} data? 分页参数
 */
export const getHomeGuessLike = async (data?: PageParams) => {
	try {
		const { result } = await http.get<PageResult<GuessItem>>('/home/goods/guessLike', {
			data
		});
		return result;
	} catch (error) {
		return {} as PageResult<GuessItem>;
	}
};

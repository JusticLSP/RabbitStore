import type { GoodsItem } from './common';

/**
 * 区域展示图数据类型
 */
export type BannerItem = {
	/** id */
	id: string;
	/** banner链接 */
	imgUrl: string;
	/** 跳转链接 */
	hrefUrl: string;
	/** 跳转类型 */
	type: number;
};

/**
 * 首页分类数据类型
 */
export type CategoryItem = {
	/** id */
	id: string;
	/** 分类名称 */
	name: string;
	/** 展示图片 */
	icon: string;
};

/** 首页热门推荐数据类型 */
export type HotItem = {
	/** 推荐说明 */
	alt: string;
	/** id */
	id: string;
	/** 图片合集 */
	pictures: string[];
	/** 跳转地址 */
	target: string;
	/** 推荐标题 */
	title: string;
	/** 推荐类型 */
	type: number;
};

/** 猜你喜欢数据类型 */
export type GuessItem = GoodsItem;

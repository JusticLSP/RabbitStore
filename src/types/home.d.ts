/**
 * 区域展示图数据类型
 */
export type BannerItem = {
	// id
	id: string;
	// banner链接
	imgUrl: string;
	// 跳转链接
	hrefUrl: string;
	// 跳转类型
	type: number;
};

/**
 * 首页分类数据类型
 */
export type CategoryItem = {
	// id
	id: string;
	// 分类名称
	name: string;
	// 展示图片
	icon: string;
};

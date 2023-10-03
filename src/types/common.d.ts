/** 通用分页结果类型 */
export type PageResult<T> = {
	/** 列表数据 */
	items: T[];
	/** 总条数 */
	counts: number;
	/** 当前页数 */
	page: number;
	/** 总页数 */
	pages: number;
	/** 每页条数 */
	pageSize: number;
};

/** 通用分页参数类型 */
export type PageParams = {
	/** 页码：默认值为 1 */
	page?: number;
	/** 页大小：默认值为 10 */
	pageSize?: number;
};

/** 通用商品类型 */
export type GoodsItem = {
	/** 商品描述 */
	desc: string;
	/** 商品折扣 */
	discount: number;
	/** id */
	id: string;
	/** 商品名称 */
	name: string;
	/** 商品已下单数量 */
	orderNum: number;
	/** 商品图片 */
	picture: string;
	/** 商品价格 */
	price: number;
};

/** 通用地址类型 */
export type AddressItem = {
	/** 收货人姓名 */
	receiver: string;
	/** 联系方式 */
	contact: string;
	/** 省份编码 */
	provinceCode: string;
	/** 城市编码 */
	cityCode: string;
	/** 区/县编码 */
	countyCode: string;
	/** 详细地址 */
	address: string;
	/** 默认地址，1为是，0为否 */
	isDefault: number;
	/** 收货地址 id */
	id: string;
	/** 省市区 */
	fullLocation: string;
};

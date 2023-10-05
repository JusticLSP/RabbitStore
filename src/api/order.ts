import http from '@/common/request';
import type { OrderCreateParams, OrderPreResult, OrderResult } from '@/types/order';

/**
 * 获取预付订单信息
 */
export const getMemberOrderInfoAPI = async () => {
	try {
		const { result } = await http.get<OrderPreResult>('/member/order/pre');
		return result;
	} catch (error) {
		return {} as OrderPreResult;
	}
};

/**
 * 获取立即购买订单
 * @param  {{skuId:string;count:string;addressId?:string}} data skuId->商品SKUID count->购买商品的数量 addressId->下单时已经选择好的地址id
 */
export const getMemberOrderNowAPI = async (data: { skuId: string; count: string; addressId?: string }) => {
	try {
		const { result } = await http.get<OrderPreResult>('/member/order/pre/now', {
			data
		});
		return result;
	} catch (error) {
		return {} as OrderPreResult;
	}
};

/**
 * 获取再次购买订单
 * @param  {string} id 订单ID
 */
export const getMemberOrderRepurchaseAPI = async (id: string) => {
	try {
		const { result } = await http.get<OrderPreResult>(`/member/order/repurchase/${id}`);
		return result;
	} catch (error) {
		return {} as OrderPreResult;
	}
};

/**
 * 提交订单信息
 * @param  {OrderCreateParams} data 提交订单所需数据格式
 */
export const postMemberOrderAPI = async (data: OrderCreateParams) => {
	try {
		const { result } = await http.post<{ id: string }>('/member/order', {
			data
		});
		return result;
	} catch (error) {
		return {} as { id: string };
	}
};

/**
 * 获取订单详情
 * @param  {string} id 订单ID
 */
export const getMemberOrderDateilAPI = async (id: string) => {
	try {
		const { result } = await http.get<OrderResult>(`/member/order/${id}`);
		return result;
	} catch (error) {
		return {} as OrderResult;
	}
};

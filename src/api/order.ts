import http from '@/common/request';
import type { OrderPreResult } from '@/types/order';

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

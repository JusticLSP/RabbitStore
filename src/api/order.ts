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

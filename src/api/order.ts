import http from '@/common/request';
import type { PageParams } from '@/types/common';
import type {
	OrderCreateParams,
	OrderListResult,
	OrderLogisticResult,
	OrderPreResult,
	OrderResult
} from '@/types/order';

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

/**
 * 模拟订单发货
 * @param  {string} id 订单ID
 */
export const getMemberOrderConsignmentAPI = async (id: string) => {
	try {
		const { result } = await http.get(`/member/order/consignment/${id}`);
	} catch (error) {}
};

/**
 * 订单确认收货
 * @param  {string} id 订单ID
 */
export const putMemberOrderReceiptAPI = async (id: string) => {
	try {
		const { result } = await http.put<OrderResult>(`/member/order/${id}/receipt`);
		return result;
	} catch (error) {
		return {} as OrderResult;
	}
};

/**
 * 获取订单物流信息
 * @param  {string} id 订单ID
 */
export const getMemberOrderLogisticsAPI = async (id: string) => {
	try {
		const { result } = await http.get<OrderLogisticResult>(`/member/order/${id}/logistics`);
		return result;
	} catch (error) {
		return {} as OrderLogisticResult;
	}
};

/**
 * 删除订单
 * @param  {string[]} ids 订单ID集合
 */
export const delMemberOrderAPI = async (ids: string[]) => {
	try {
		const { result } = await http.delete('/member/order', {
			data: { ids }
		});
	} catch (error) {}
};

/**
 * 取消订单
 * @param  {string} id 订单ID
 * @param  {string} cancelReason 取消理由
 */
export const putMemberOrderCancelAPI = async (id: string, cancelReason: string) => {
	try {
		const { result } = await http.put<OrderResult>(`/member/order/${id}/cancel`, {
			data: { cancelReason }
		});
		return result;
	} catch (error) {
		return {} as OrderResult;
	}
};

/**
 * 获取订单列表
 * @param  {PageParams} page? 请求分页
 * @param  {{orderState:number}} params? 请求参数
 */
export const getMemberOrderListAPI = async (page?: PageParams, params?: { orderState: number }) => {
	try {
		const { result } = await http.get<OrderListResult>('/member/order', {
			data: Object.assign({}, page, params)
		});
		return result;
	} catch (error) {
		return {} as OrderListResult;
	}
};

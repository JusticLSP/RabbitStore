import http from '@/common/request';

/**
 * 获取微信支付参数
 * @param  {string} orderId 订单ID
 */
export const getPayWxPayMiniPayAPI = async (orderId: string) => {
	try {
		const { result } = await http.get<WechatMiniprogram.RequestPaymentOption>('/pay/wxPay/miniPay', {
			data: { orderId }
		});
		return result;
	} catch (error) {
		return {} as WechatMiniprogram.RequestPaymentOption;
	}
};

/**
 * 获取模拟支付
 * @param  {string} orderId  订单ID
 */
export const getPayMockAPI = async (orderId: string) => {
	try {
		const { result } = await http.get('/pay/mock', {
			data: { orderId }
		});
	} catch (error) {}
};

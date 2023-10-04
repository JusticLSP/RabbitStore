import http from '@/common/request';

/**
 * 添加到购物车
 * @param  {{skuId:string;count:number}} data 添加所需数据
 */
export const postMemberCartAPI = async (data: { skuId: string; count: number }) => {
	try {
		const { result } = await http.post('/member/cart', {
			data
		});
		return result;
	} catch (error) {
		return {};
	}
};

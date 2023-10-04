import http from '@/common/request';
import type { CartItem } from '@/types/cart';

/**
 * 添加到购物车
 * @param  {{skuId:string;count:number}} data 添加所需数据
 */
export const postMemberCartAPI = async (data: { skuId: string; count: number }) => {
	try {
		const { result } = await http.post('/member/cart', {
			data
		});
	} catch (error) {}
};

/**
 * 获取购物车列表
 */
export const getMemberCartAPI = async () => {
	try {
		const { result } = await http.get<CartItem[]>('/member/cart');
		return result;
	} catch (error) {
		return [];
	}
};

/**
 * 删除购物车商品
 * @param  {string[]} ids SKUID集合
 */
export const delMemberCartAPI = async (ids: string[]) => {
	try {
		const { result } = await http.delete('/member/cart', {
			data: { ids }
		});
	} catch (error) {}
};

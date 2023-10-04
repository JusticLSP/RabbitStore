import http from '@/common/request';
import type { CartItem } from '@/types/cart';

/**
 * 添加到购物车
 * @param  {{skuId:string;count:number}} data skuId->SKUID count->商品数量
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

/**
 * 修改购物车商品信息
 * @param  {string} skuId SKUID
 * @param  {{selected?:boolean;count?:number}} data selected->选中状态 count->商品数量
 */
export const putMemberCartAPI = async (skuId: string, data: { selected?: boolean; count?: number }) => {
	try {
		const { result } = await http.put(`/member/cart/${skuId}`, {
			data
		});
	} catch (error) {}
};

/**
 * 修改购物车全选状态
 * @param  {boolean} selected 更改状态
 */
export const putMemberCartSelectAllAPI = async (selected: boolean) => {
	try {
		const { result } = await http.put('/member/cart/selected', {
			data: { selected }
		});
	} catch (error) {}
};

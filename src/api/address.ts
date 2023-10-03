import http from '@/common/request';
import type { AddressParams } from '@/types/address';
import type { AddressItem } from '@/types/common';

/**
 * 获取收获地址列表
 */
export const getMemberAddressAPI = async () => {
	try {
		const { result } = await http.get<AddressItem[]>('/member/address');
		return result;
	} catch (error) {
		return [];
	}
};

/**
 * 添加收获地址
 * @param  {AddressParams} data 添加地址参数
 */
export const addMemberAddressAPI = async (data: AddressParams) => {
	try {
		const { result } = await http.post<{ id: number }>('/member/address', {
			data
		});
		return result;
	} catch (error) {
		return {} as { id: number };
	}
};

/**
 * 修改收获地址
 * @param  {string} id 收获地址ID
 * @param  {AddressParams} data 修改地址参数
 */
export const putMemberAddressAPI = async (id: string, data: AddressParams) => {
	try {
		const { result } = await http.put<{ id: string }>(`/member/address/${id}`, {
			data
		});
		return result;
	} catch (error) {
		return {} as { id: string };
	}
};

/**
 * 删除收获地址
 * @param  {string} id 收获地址ID
 */
export const delMemberAddressAPI = async (id: string) => {
	try {
		const { result } = await http.delete<{ id: string }>(`/member/address/${id}`);
		return result;
	} catch (error) {
		return {} as { id: string };
	}
};

/**
 * 获取收获地址详情
 * @param  {string} id 收获地址ID
 */
export const getMemberAddressDetailAPI = async (id: string) => {
	try {
		const { result } = await http.get<AddressItem>(`/member/address/${id}`);
		return result;
	} catch (error) {
		return {} as AddressItem;
	}
};

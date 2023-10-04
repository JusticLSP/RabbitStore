import type { AddressItem } from '@/types/common';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { store } from '../index';

export const useAddressStroe = defineStore('address', () => {
	const change_address = ref<AddressItem>();

	/**
	 * 更改选择地址
	 * @param  {AddressItem} address 更改地址
	 */
	const changeSelectAddress = (address: AddressItem) => {
		change_address.value = address;
	};

	return { change_address, changeSelectAddress };
});

// 在组件setup函数外使用
export function useAddressStoreWithOut() {
	return useAddressStroe(store);
}

import { defineStore } from 'pinia';
import { store } from '../index';
import type { LoginResult } from '@/types/member';
import { storage_config } from '../persistConfig';
import { ref } from 'vue';

export const useMemberStore = defineStore(
	'member',
	() => {
		const member_info = ref<LoginResult>();

		/**
		 * 保存用户信息
		 * @param  {LoginResult} info 用户信息
		 */
		const setMemberInfo = (info: LoginResult) => {
			member_info.value = info;
		};

		return { member_info, setMemberInfo };
	},
	{
		persist: { storage: storage_config }
	}
);

// 在组件setup函数外使用
export function useMemberStoreWithOut() {
	return useMemberStore(store);
}

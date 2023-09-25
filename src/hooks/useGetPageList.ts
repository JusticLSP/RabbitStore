import type { PageParams, PageResult } from '@/types/common';
import { ref, type Ref } from 'vue';

/**
 * 获取分页列表
 * @param {Promise<PageResult<T>>} requestApi 分页列表请求接口
 */
export const useGetPageList = <T>(requestApi: (data: PageParams) => Promise<PageResult<T>>) => {
	const page_params: Required<PageParams> = {
		page: 1,
		pageSize: 10
	};
	const list = ref([]) as Ref<T[]>;
	const finish = ref(false);
	//获取分页列表数据
	const getPageListData = async () => {
		if (finish.value) return uni.showToast({ icon: 'none', title: '没有数据了~' });
		const { pages, items } = await requestApi(page_params);
		list.value.push(...items);
		// 当前页码是否小于总页数
		if (page_params.page < pages) {
			page_params.page++;
		} else {
			finish.value = true;
		}
	};

	return { list, finish, getPageListData };
};

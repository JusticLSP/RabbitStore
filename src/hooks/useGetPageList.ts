import type { PageParams, PageResult } from '@/types/common';
import { reactive, ref, type Ref } from 'vue';

/**
 * 获取分页列表
 * @param  {(page:PageParams,params?:K)=>Promise<PageResult<T>>} requestApi
 * @param  {K} params? 请求参数
 */
export const useGetPageList = <T, K>(
	requestApi: (page: PageParams, params?: K) => Promise<PageResult<T>>,
	params?: K
) => {
	const page_params: Required<PageParams> = reactive({
		page: 1,
		pageSize: 10
	});
	const list: Ref<T[]> = ref([]);
	const finish = ref(false);
	const loading = ref(false);
	// 获取分页列表数据
	const getPageListData = async () => {
		if (finish.value) return uni.showToast({ icon: 'none', title: '没有数据了~' });
		if (loading.value) return;
		loading.value = true;
		const { pages, items } = await requestApi(page_params, params);
		loading.value = false;
		list.value.push(...items);
		// 当前页码是否小于总页数
		if (page_params.page < pages) {
			page_params.page++;
		} else {
			finish.value = true;
		}
	};
	// 重置分页列表数据
	const resetPageListData = async () => {
		page_params.page = 1;
		list.value = [];
		finish.value = false;
		await getPageListData();
	};

	return { list, page_params, finish, getPageListData, resetPageListData };
};

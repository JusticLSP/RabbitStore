import http from '@/common/request';
import type { CategoryTopItem } from '@/types/category';

/**
 * 获取分类接口
 */
export const getCategoryTopAPI = async () => {
	try {
		const { result } = await http.get<CategoryTopItem[]>('/category/top');
		return result;
	} catch (error) {
		return [];
	}
};

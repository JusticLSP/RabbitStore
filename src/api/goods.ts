import http from '@/common/request';
import type { GoodsResult } from '@/types/goods';

export const getGoodsDetailsAPI = async (id: string) => {
	try {
		const { result } = await http.get<GoodsResult>('/goods', {
			data: { id }
		});
		return result;
	} catch (error) {
		return {} as GoodsResult;
	}
};

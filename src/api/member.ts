import http from '@/common/request';
import type { MemberInfoDetail, MemberInfoParams } from '@/types/member';

/**
 * 获取用户个人信息
 */
export const getMemberInfoApi = async () => {
	try {
		const { result } = await http.get<MemberInfoDetail>('/member/profile');
		return result;
	} catch (error) {
		return {} as MemberInfoDetail;
	}
};

/**
 * 修改个人信息
 * @param  {MemberInfoParams} data 请求参数
 */
export const putMemberInfoAPI = async (data: MemberInfoParams) => {
	try {
		const { result } = await http.put<MemberInfoDetail>('/member/profile', {
			data
		});
		return result;
	} catch (error) {
		return {} as MemberInfoDetail;
	}
};

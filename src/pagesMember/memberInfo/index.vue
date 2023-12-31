<template>
	<view class="viewport">
		<!-- 导航栏 -->
		<view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
			<navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
			<view class="title">个人信息</view>
		</view>
		<!-- 头像 -->
		<view class="avatar">
			<view class="avatar-content" @tap="onChangeAvatat">
				<image class="image" :src="member_info.avatar" mode="aspectFill" />
				<text class="text">点击修改头像</text>
			</view>
		</view>
		<!-- 表单 -->
		<view class="form">
			<!-- 表单内容 -->
			<view class="form-content">
				<view class="form-item">
					<text class="label">账号</text>
					<text class="account">{{ member_info.account }}</text>
				</view>
				<view class="form-item">
					<text class="label">昵称</text>
					<input class="input" type="text" placeholder="请填写昵称" v-model="member_info.nickname" />
				</view>
				<view class="form-item">
					<text class="label">性别</text>
					<radio-group @change="onChangeGender">
						<label class="radio">
							<radio value="男" color="#27ba9b" :checked="member_info.gender === '男'" />
							男
						</label>
						<label class="radio">
							<radio value="女" color="#27ba9b" :checked="member_info.gender === '女'" />
							女
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<text class="label">生日</text>
					<picker
						class="picker"
						mode="date"
						start="1900-01-01"
						:end="new Date()"
						:value="member_info.birthday"
						@change="onChangeBirthday">
						<view v-if="member_info.birthday">{{ member_info.birthday }}</view>
						<view class="placeholder" v-else>请选择日期</view>
					</picker>
				</view>
				<view class="form-item">
					<text class="label">城市</text>
					<picker
						class="picker"
						mode="region"
						:value="member_info.fullLocation?.split(' ')"
						@change="onChangeFullLocation">
						<view v-if="member_info.fullLocation">{{ member_info.fullLocation }}</view>
						<view class="placeholder" v-else>请选择城市</view>
					</picker>
				</view>
				<view class="form-item">
					<text class="label">职业</text>
					<input class="input" type="text" placeholder="请填写职业" v-model="member_info.profession" />
				</view>
			</view>
			<!-- 提交按钮 -->
			<button class="form-button" @tap="onSaveSubmit">保 存</button>
		</view>
	</view>
</template>
<script setup lang="ts">
import { getMemberInfoApi, putMemberInfoAPI } from '@/api/member';
import { useMemberStore } from '@/stores/modules/member';
import type { MemberInfoDetail, Gender } from '@/types/member';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

const member_store = useMemberStore();
// 获取用户个人信息, 初始化空对象用于修改
const member_info = ref({} as MemberInfoDetail);
const getMemberInfoData = async () => {
	const info = await getMemberInfoApi();
	member_info.value = info;
};
// 更改头像
const onChangeAvatat = () => {
	uni.chooseMedia({
		count: 1,
		mediaType: ['image'],
		success: (res) => {
			uni.showLoading({ title: '上传中', mask: true });
			const { tempFilePath } = res.tempFiles[0];
			uni.uploadFile({
				url: '/member/profile/avatar',
				name: 'file',
				filePath: tempFilePath,
				success: (res) => {
					uni.hideLoading();
					const { statusCode, data } = res;
					const { msg, result } = JSON.parse(data);
					if (statusCode === 200) {
						member_info.value!.avatar = result.avatar;
						// 修改store上用户头像
						member_store.member_info!.avatar = result.avatar;
						uni.showToast({ icon: 'success', title: '上传成功' });
					} else {
						uni.showToast({ icon: 'error', title: msg });
					}
				}
			});
		}
	});
};
// 更改用户性别
const onChangeGender: UniHelper.RadioGroupOnChange = (e) => {
	member_info.value.gender = e.detail.value as Gender;
};
// 更改用户生日
const onChangeBirthday: UniHelper.DatePickerOnChange = (e) => {
	member_info.value.birthday = e.detail.value;
};
// 更改省市区
let full_location_code: [string, string, string] = ['', '', ''];
const onChangeFullLocation: UniHelper.RegionPickerOnChange = (e) => {
	const { code, value } = e.detail;
	member_info.value.fullLocation = value.join(' ');
	full_location_code = code!;
};
// 保存提交表单
const onSaveSubmit = async () => {
	const { nickname, gender, birthday, profession } = member_info.value;
	const info = await putMemberInfoAPI({
		nickname,
		gender,
		birthday,
		profession,
		provinceCode: full_location_code[0],
		cityCode: full_location_code[1],
		countyCode: full_location_code[2]
	});
	// 修改store上用户昵称
	member_store.member_info!.nickname = info.nickname;
	uni.showToast({ icon: 'success', title: '保存成功' });
};

onLoad(() => {
	getMemberInfoData();
});
</script>
<style lang="scss">
page {
	background-color: #f4f4f4;
}
.viewport {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
	background-size: auto 420rpx;
	background-repeat: no-repeat;
}
// 导航栏
.navbar {
	position: relative;
	.title {
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: 500;
		color: #fff;
	}
	.back {
		position: absolute;
		height: 40px;
		width: 40px;
		left: 0;
		font-size: 20px;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
// 头像
.avatar {
	text-align: center;
	width: 100%;
	height: 260rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #eee;
	}
	.text {
		display: block;
		padding-top: 12rpx;
		line-height: 1;
		font-size: 26rpx;
		color: #fff;
	}
}
// 表单
.form {
	background-color: #f4f4f4;
	&-content {
		margin: 20rpx 20rpx 0;
		padding: 0 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
	}
	&-item {
		display: flex;
		height: 46rpx;
		line-height: 46rpx;
		padding: 25rpx 10rpx;
		background-color: #fff;
		font-size: 28rpx;
		border-bottom: 1rpx solid #ddd;
		&:last-child {
			border: none;
		}
		.label {
			width: 180rpx;
			color: #333;
		}
		.account {
			color: #666;
		}
		.input {
			flex: 1;
			display: block;
			height: 46rpx;
		}
		.radio {
			margin-right: 20rpx;
		}
		.picker {
			flex: 1;
		}
		.placeholder {
			color: #808080;
		}
	}
	&-button {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 30rpx 20rpx;
		color: #fff;
		border-radius: 80rpx;
		font-size: 30rpx;
		background-color: #27ba9b;
	}
}
</style>

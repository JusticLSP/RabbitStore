<template>
	<view class="viewport">
		<!-- 地址列表 -->
		<scroll-view class="scroll-view" scroll-y>
			<view v-if="address.length > 0" class="address">
				<uni-swipe-action class="address-list">
					<!-- 收货地址项 -->
					<template v-for="item in address" :key="item.id">
						<uni-swipe-action-item class="item">
							<view class="item-content" @tap="onChangeSelectAddress(item)">
								<view class="user">
									{{ item.receiver }}
									<text class="contact">{{ item.contact }}</text>
									<text v-if="item.isDefault" class="badge">默认</text>
								</view>
								<view class="locate">{{ item.fullLocation }} {{ item.address }}</view>
								<navigator
									class="edit"
									hover-class="none"
									:url="`/pagesMember/editAddress/index?id=${item.id}`"
									@tap.stop="">
									修改
								</navigator>
							</view>
							<template #right>
								<button class="delete-button" @tap="onDelAddress(item.id)">删除</button>
							</template>
						</uni-swipe-action-item>
					</template>
				</uni-swipe-action>
			</view>
			<view v-else class="blank">暂无收货地址</view>
		</scroll-view>
		<!-- 添加按钮 -->
		<view :style="{ bottom: safeAreaInsets!.bottom > 0 ? safeAreaInsets?.bottom + 'px' : '15px' }" class="add-btn">
			<navigator class="btn" hover-class="none" url="/pagesMember/editAddress/index">新建地址</navigator>
		</view>
	</view>
</template>
<script setup lang="ts">
import { delMemberAddressAPI, getMemberAddressAPI } from '@/api/address';
import { useAddressStroe } from '@/stores/modules/address';
import type { AddressItem } from '@/types/common';
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';

// 页面传递参数
const query = defineProps<{ from: string }>();

// 安全距离
const { safeAreaInsets } = uni.getSystemInfoSync();

// 获取收获地址列表
const address = ref<AddressItem[]>([]);
const getMemberAddressData = async () => {
	const result = await getMemberAddressAPI();
	address.value = result;
};

// 删除收获地址
const onDelAddress = (id: string) => {
	uni.showModal({
		content: '是否删除当前收获地址？',
		success: async (res) => {
			uni.showLoading({ title: '删除中...' });
			if (res.confirm) {
				const result = await delMemberAddressAPI(id);
				uni.hideLoading();
				uni.showToast({ icon: 'success', title: '删除成功' });
				getMemberAddressData();
			}
		}
	});
};

// 更改选择地址
const address_stroe = useAddressStroe();
const onChangeSelectAddress = (address: AddressItem) => {
	if (query.from !== 'order') return;
	address_stroe.changeSelectAddress(address);
	uni.navigateBack({ delta: 1 });
};

onShow(() => {
	getMemberAddressData();
});
</script>
<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
}
/* 删除按钮 */
.delete-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 100%;
	font-size: 28rpx;
	color: #fff;
	border-radius: 0;
	padding: 0;
	background-color: #cf4444;
}
.viewport {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #f4f4f4;
	.scroll-view {
		padding-top: 20rpx;
	}
}
.address {
	padding: 0 20rpx;
	margin: 0 20rpx;
	border-radius: 10rpx;
	background-color: #fff;
	.item-content {
		line-height: 1;
		padding: 40rpx 10rpx 38rpx;
		border-bottom: 1rpx solid #ddd;
		position: relative;
		.edit {
			position: absolute;
			top: 44rpx;
			right: 30rpx;
			padding: 2rpx 0 2rpx 20rpx;
			border-left: 1rpx solid #666;
			font-size: 26rpx;
			color: #666;
			line-height: 1;
		}
	}
	.item:last-child .item-content {
		border: none;
	}
	.user {
		font-size: 28rpx;
		margin-bottom: 20rpx;
		color: #333;

		.contact {
			color: #666;
		}
		.badge {
			display: inline-block;
			padding: 4rpx 10rpx 2rpx 14rpx;
			margin: 2rpx 0 0 10rpx;
			font-size: 26rpx;
			color: #27ba9b;
			border-radius: 6rpx;
			border: 1rpx solid #27ba9b;
		}
	}
	.locate {
		line-height: 1.6;
		font-size: 26rpx;
		color: #333;
	}
}
.blank {
	margin-top: 300rpx;
	text-align: center;
	font-size: 32rpx;
	color: #888;
}
.add-btn {
	position: fixed;
	right: 0;
	left: 0;
	margin: 0 20rpx;
	.btn {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		border-radius: 80rpx;
		font-size: 30rpx;
		background-color: #27ba9b;
	}
}
</style>

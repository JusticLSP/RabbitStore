<template>
	<view class="address-panel">
		<!-- 关闭按钮 -->
		<text class="close icon-close" @tap="emit('close')"></text>
		<!-- 标题 -->
		<view class="title">配送至</view>
		<!-- 内容 -->
		<view class="content" v-if="address.length > 0">
			<template v-for="(item, index) in address" :key="item.id">
				<view class="item" @tap="onConfirmAddresss(item)">
					<view class="user">{{ item.receiver }} {{ item.contact }}</view>
					<view class="address">{{ item.fullLocation }} {{ item.address }}</view>
					<text class="icon icon-checked" v-if="confirm_address === item.id"></text>
				</view>
			</template>
		</view>
		<view class="empty" v-else>暂无收获地址</view>
		<view class="footer">
			<navigator class="button primary" hover-class="none" url="/pagesMember/editAddress/index?from=goods">
				新建地址
			</navigator>
		</view>
	</view>
</template>
<script setup lang="ts">
import { useAddressStroe } from '@/stores/modules/address';
import type { AddressItem } from '@/types/common';
import { ref, watch } from 'vue';

// 组件传参
const props = defineProps<{ list: AddressItem[] }>();
// 组件自定义事件
const emit = defineEmits<{
	(event: 'close'): void;
	(event: 'confirm', address: AddressItem): void;
}>();

const address = ref<AddressItem[]>(props.list);
const confirm_address = ref<string>();
// 确定收获地址
const onConfirmAddresss = (item: AddressItem) => {
	confirm_address.value = item.id;
	emit('confirm', item);
	emit('close');
};

// 新建地址
const addresss_stroe = useAddressStroe();
watch(
	() => addresss_stroe.new_address,
	(val, oldval) => {
		if (val?.isDefault === 1) {
			address.value.unshift(val);
		} else {
			val && address.value.push(val);
		}
	}
);
</script>
<style lang="scss">
.address-panel {
	padding: 0 30rpx;
	border-radius: 10rpx 10rpx 0 0;
	position: relative;
	background-color: #fff;
}
.title {
	line-height: 1;
	padding: 40rpx 0;
	text-align: center;
	font-size: 32rpx;
	font-weight: normal;
	border-bottom: 1rpx solid #ddd;
	color: #444;
}
.close {
	position: absolute;
	right: 24rpx;
	top: 24rpx;
}
.content {
	min-height: 300rpx;
	max-height: 540rpx;
	overflow: auto;
	padding: 20rpx;
	.item {
		padding: 30rpx 50rpx 30rpx 60rpx;
		background-size: 40rpx;
		background-repeat: no-repeat;
		background-position: 0 center;
		background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
		position: relative;
	}
	.icon {
		color: #999;
		font-size: 40rpx;
		transform: translateY(-50%);
		position: absolute;
		top: 50%;
		right: 0;
	}
	.icon-checked {
		color: #27ba9b;
	}
	.icon-ring {
		color: #444;
	}
	.user {
		font-size: 28rpx;
		color: #444;
		font-weight: 500;
	}
	.address {
		font-size: 26rpx;
		color: #666;
	}
}
.empty {
	height: 300rpx;
	padding: 20rpx;
	line-height: 300rpx;
	text-align: center;
	color: #888;
}
.footer {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0 20prx;
	font-size: 28rpx;
	color: #444;
	.button {
		flex: 1;
		height: 72rpx;
		text-align: center;
		line-height: 72rpx;
		margin: 0 20rpx;
		color: #fff;
		border-radius: 72rpx;
	}
	.primary {
		color: #fff;
		background-color: #27ba9b;
	}
	.secondary {
		background-color: #ffa868;
	}
}
</style>

<template>
	<view class="viewport">
		<!-- tabs -->
		<view class="tabs">
			<text class="item" v-for="(item, index) in order_tabs" :key="item.title" @tap="active_index = index">
				{{ item.title }}
			</text>
			<!-- 游标 -->
			<view class="cursor" :style="{ left: active_index * 20 + '%' }"></view>
		</view>
		<!-- 滑动容器 -->
		<swiper class="swiper" :current="active_index" @change="active_index = $event.detail.current">
			<!-- 滑动项 -->
			<swiper-item v-for="item in order_tabs" :key="item.title">
				<!-- 订单列表 -->
				<OrderList></OrderList>
			</swiper-item>
		</swiper>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import OrderList from './components/OrderList.vue';

// 获取页面参数
const query = defineProps<{ type: string }>();

// tabs 数据
const order_tabs = ref([
	{ order_state: 0, title: '全部' },
	{ order_state: 1, title: '待付款' },
	{ order_state: 2, title: '待发货' },
	{ order_state: 3, title: '待收货' },
	{ order_state: 4, title: '待评价' }
]);
const active_index = ref(order_tabs.value.findIndex((item) => item.order_state === Number(query.type)));
</script>
<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
}
.viewport {
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #fff;
}
// tabs
.tabs {
	display: flex;
	justify-content: space-around;
	line-height: 60rpx;
	margin: 0 10rpx;
	background-color: #fff;
	box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
	position: relative;
	z-index: 9;
	.item {
		flex: 1;
		text-align: center;
		padding: 20rpx;
		font-size: 28rpx;
		color: #262626;
	}
	.cursor {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 20%;
		height: 6rpx;
		background-color: #27ba9b;
		/* 过渡效果 */
		transition: all 0.4s;
	}
}
// swiper
.swiper {
	background-color: #f7f7f8;
	flex: 1;
}
</style>

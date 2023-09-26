<template>
	<!-- 猜你喜欢 -->
	<view class="caption">
		<text class="text">猜你喜欢</text>
	</view>
	<view class="guess">
		<navigator class="guess-item" v-for="item in list" :key="item.id" :url="`/pages/goods/goods?id=4007498`">
			<image class="image" mode="aspectFill" :src="item.picture"></image>
			<view class="name ellipsis">{{ item.name }}</view>
			<view class="price">
				<text class="small">¥</text>
				<text>{{ item.price }}</text>
			</view>
		</navigator>
	</view>
	<view class="loading-text">{{ finish ? '没有数据了~' : '正在加载...' }}</view>
</template>
<script setup lang="ts">
import { useGetPageList } from '@/hooks/useGetPageList';
import { getHomeGuessLikeAPI } from '@/api/home';
import type { GuessItem } from '@/types/home';
import { onMounted } from 'vue';

const { list, finish, getPageListData, resetPageListData } = useGetPageList<GuessItem>(getHomeGuessLikeAPI);

onMounted(() => {
	getPageListData();
});
defineExpose({
	loadMore: getPageListData,
	resetData: resetPageListData
});
</script>
<style lang="scss">
:host {
	display: block;
}
/* 分类标题 */
.caption {
	display: flex;
	justify-content: center;
	line-height: 1;
	padding: 36rpx 0 40rpx;
	font-size: 32rpx;
	color: #262626;
	.text {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 28rpx 0 30rpx;

		&::before,
		&::after {
			content: '';
			width: 20rpx;
			height: 20rpx;
			background-image: url(@/static/images/bubble.png);
			background-size: contain;
			margin: 0 10rpx;
		}
	}
}

/* 猜你喜欢 */
.guess {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 20rpx;
	.guess-item {
		width: 345rpx;
		padding: 24rpx 20rpx 20rpx;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #fff;
		box-sizing: border-box;
	}
	.image {
		width: 304rpx;
		height: 304rpx;
	}
	.name {
		height: 75rpx;
		margin: 10rpx 0;
		font-size: 26rpx;
		color: #262626;
	}
	.price {
		line-height: 1;
		padding-top: 4rpx;
		color: #cf4444;
		font-size: 26rpx;
	}
	.small {
		font-size: 80%;
	}
}
// 加载提示文字
.loading-text {
	text-align: center;
	font-size: 28rpx;
	color: #666;
	padding: 20rpx 0;
}
</style>
@/hooks/useGetPageList

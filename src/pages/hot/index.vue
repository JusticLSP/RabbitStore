<template>
	<view class="viewport">
		<!-- 推荐封面图 -->
		<view class="cover">
			<image class="cover-image" :src="banner_picture"></image>
		</view>
		<!-- 推荐选项 -->
		<view class="tabs">
			<template v-for="(item, index) in sub_types" :key="item.id">
				<text class="text" :class="{ active: active_index === index }" @tap="active_index = index">
					{{ item.title }}
				</text>
			</template>
		</view>
		<!-- 推荐列表 -->
		<template v-for="(item, index) in sub_types" :key="item.id">
			<scroll-view class="scroll-view" scroll-y v-show="active_index === index" @scrolltolower="onScrolltolower">
				<view class="goods">
					<template v-for="goods in item.goodsItems.items" :key="goods.id">
						<navigator class="navigator" hover-class="none" :url="`/pages/goods/goods?id=${goods.id}`">
							<image class="thumb" :src="goods.picture"></image>
							<view class="name ellipsis">{{ goods.name }}</view>
							<view class="price">
								<text class="symbol">¥</text>
								<text class="number">{{ goods.price }}</text>
							</view>
						</navigator>
					</template>
				</view>
				<view class="loading-text">{{ item.finish ? '没有更多数据~' : '正在加载...' }}</view>
			</scroll-view>
		</template>
	</view>
</template>
<script setup lang="ts">
import { getHotRecommendAPI } from '@/api/hot';
import type { SubTypeItem } from '@/types/hot';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

// 热门推荐页 标题和url
const hot_map = [
	{ type: '1', title: '特惠推荐', url: '/hot/preference' },
	{ type: '2', title: '爆款推荐', url: '/hot/inVogue' },
	{ type: '3', title: '一站买全', url: '/hot/oneStop' },
	{ type: '4', title: '新鲜好物', url: '/hot/new' }
];

// uniapp获取页面参数
const query = defineProps<{ type: string }>();
const curr_hot_map = hot_map.find((value) => value.type === query.type);
uni.setNavigationBarTitle({ title: curr_hot_map!.title });

// 获取热门推荐数据
const banner_picture = ref('');
const sub_types = ref<(SubTypeItem & { finish?: boolean })[]>([]);
const active_index = ref(0);
const getHotRecommendData = async () => {
	const hot = await getHotRecommendAPI(curr_hot_map!.url);
	const { bannerPicture, subTypes } = hot;
	banner_picture.value = bannerPicture;
	sub_types.value = subTypes;
};

// 滚动触底时触发
const onScrolltolower = async () => {
	// 获取当前滚动项，page累加后请求接口
	const curr_sub_type = sub_types.value[active_index.value];
	const { page, pages } = curr_sub_type.goodsItems;
	// 当前页数是否小于总页数
	if (page < pages) {
		curr_sub_type.goodsItems.page++;
	} else {
		curr_sub_type.finish = true;
		return uni.showToast({ icon: 'none', title: '没有更多数据~' });
	}
	const hot = await getHotRecommendAPI(curr_hot_map!.url, {
		page: curr_sub_type.goodsItems.page,
		pageSize: curr_sub_type.goodsItems.pageSize,
		subType: curr_sub_type.id
	});
	// 获取到新的列表后追加到当前活跃分类
	const new_sub_type = hot.subTypes[active_index.value];
	curr_sub_type.goodsItems.items.push(...new_sub_type.goodsItems.items);
};

onLoad(() => {
	getHotRecommendData();
});
</script>
<style lang="scss">
page {
	height: 100%;
	background-color: #f4f4f4;
}
.viewport {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 180rpx 0 0;
	position: relative;
}
.cover {
	width: 750rpx;
	height: 225rpx;
	border-radius: 0 0 40rpx 40rpx;
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
	.cover-image {
		width: 100%;
		height: 100%;
	}
}
.scroll-view {
	flex: 1;
	overflow: hidden;
}
.tabs {
	display: flex;
	justify-content: space-evenly;
	height: 100rpx;
	line-height: 90rpx;
	margin: 0 20rpx;
	font-size: 28rpx;
	border-radius: 10rpx;
	box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
	color: #333;
	background-color: #fff;
	position: relative;
	z-index: 9;
	.text {
		margin: 0 20rpx;
		position: relative;
	}
	.active {
		&::after {
			content: '';
			width: 40rpx;
			height: 4rpx;
			transform: translate(-50%);
			background-color: #27ba9b;
			position: absolute;
			left: 50%;
			bottom: 24rpx;
		}
	}
}
.goods {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 20rpx 20rpx;
	.navigator {
		width: 345rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
		box-sizing: border-box;
	}
	.thumb {
		width: 305rpx;
		height: 305rpx;
	}
	.name {
		height: 88rpx;
		font-size: 26rpx;
	}
	.price {
		line-height: 1;
		color: #cf4444;
		font-size: 30rpx;
	}
	.symbol {
		font-size: 70%;
	}
	.decimal {
		font-size: 70%;
	}
}

.loading-text {
	text-align: center;
	font-size: 28rpx;
	color: #666;
	padding: 20rpx 0 50rpx;
}
</style>

<template>
	<pageSkeleton v-if="is_loading"></pageSkeleton>
	<view class="viewport" v-else>
		<!-- 搜索框 -->
		<view class="search">
			<view class="input">
				<text class="icon-search">女靴</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="categories">
			<!-- 左侧：一级分类 -->
			<scroll-view class="primary" scroll-y>
				<template v-for="(item, index) in category_list" :key="item.id">
					<view class="item" :class="{ active: active_index === index }" @tap="changeCategort(item, index)">
						<text class="name">{{ item.name }}</text>
					</view>
				</template>
			</scroll-view>
			<!-- 右侧：二级分类 -->
			<view class="secondary">
				<!-- 焦点图 -->
				<XtxSwiper class="banner" :list="banner_list" />
				<scroll-view class="secondary-scroll" scroll-y :scroll-top="sub_scroll.top" @scroll="onSubCategoryScroll">
					<!-- 内容区域 -->
					<view class="panel" v-for="child in sub_category_list" :key="child.id">
						<view class="title">
							<text class="name">{{ child.name }}</text>
							<navigator class="more" hover-class="none">全部</navigator>
						</view>
						<view class="section">
							<template v-for="goods in child.goods" :key="goods.id">
								<navigator class="goods" hover-class="none" :url="`/pages/goods/index?id=${goods.id}`">
									<image class="image" :src="goods.picture"></image>
									<view class="name ellipsis">{{ goods.name }}</view>
									<view class="price">
										<text class="symbol">¥</text>
										<text class="number">{{ goods.price }}</text>
									</view>
								</navigator>
							</template>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { getRegionBannerAPI } from '@/api/home';
import { getCategoryTopAPI } from '@/api/category';
import type { BannerItem } from '@/types/home';
import type { CategoryTopItem, CategoryChildItem } from '@/types/category';
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, nextTick } from 'vue';
import pageSkeleton from './components/PageSkeleton.vue';

// 获取轮播图
const banner_list = ref<BannerItem[]>([]);
const getBannerData = async () => {
	const banner = await getRegionBannerAPI(2);
	banner_list.value = banner;
};

// 二级分类滚动时触发
const sub_scroll = reactive({ top: 0, old: 0 });
const onSubCategoryScroll: UniHelper.ScrollViewOnScroll = (e) => {
	const { scrollTop } = e.detail;
	sub_scroll.old = scrollTop;
};

// 获取分类数据
const category_list = ref<CategoryTopItem[]>([]);
const sub_category_list = ref<CategoryChildItem[]>([]);
const active_index = ref(0);
const getCategoryTopData = async () => {
	const category = await getCategoryTopAPI();
	category_list.value = category;
	sub_category_list.value = category[0]?.children || [];
};
// 更改一级分类
const changeCategort = (item: CategoryTopItem, index: number) => {
	sub_scroll.top = sub_scroll.old;
	nextTick(() => {
		sub_scroll.top = 0;
	});
	// 更改二级分类
	active_index.value = index;
	sub_category_list.value = item.children;
};

// 页面加载
const is_loading = ref(false);
onLoad(async () => {
	is_loading.value = true;
	await Promise.all([getBannerData(), getCategoryTopData()]);
	is_loading.value = false;
});
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
}
.search {
	padding: 20rpx 30rpx;
	background-color: #fff;
	.input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64rpx;
		padding-left: 26rpx;
		color: #8b8b8b;
		font-size: 28rpx;
		border-radius: 32rpx;
		background-color: #f3f4f4;
	}
}
.icon-search {
	&::before {
		margin-right: 10rpx;
	}
}
/* 分类 */
.categories {
	flex: 1;
	min-height: 400rpx;
	display: flex;
}
/* 一级分类 */
.primary {
	overflow: hidden;
	width: 180rpx;
	flex: none;
	background-color: #f6f6f6;
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 96rpx;
		font-size: 26rpx;
		color: #595c63;
		position: relative;
		&::after {
			content: '';
			position: absolute;
			left: 42rpx;
			bottom: 0;
			width: 96rpx;
			border-top: 1rpx solid #e3e4e7;
		}
	}
	.active {
		background-color: #fff;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 8rpx;
			height: 100%;
			background-color: #27ba9b;
		}
	}
}
.primary .item:last-child::after,
.primary .active::after {
	display: none;
}
/* 二级分类 */
.secondary {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	.carousel {
		height: 250rpx;
		margin: 0 30rpx 20rpx;
		border-radius: 4rpx;
		overflow: hidden;
	}
	.secondary-scroll {
		flex: 1;
		overflow: hidden;
	}
	.panel {
		margin: 0 30rpx 0rpx;
	}
	.title {
		height: 60rpx;
		line-height: 60rpx;
		color: #333;
		font-size: 28rpx;
		border-bottom: 1rpx solid #f7f7f8;
		.more {
			float: right;
			padding-left: 20rpx;
			font-size: 24rpx;
			color: #999;
			&::after {
				font-family: 'erabbit' !important;
				content: '\e6c2';
			}
		}
	}
	.section {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 0;
		.goods {
			width: 150rpx;
			margin: 0rpx 30rpx 20rpx 0;
			&:nth-child(3n) {
				margin-right: 0;
			}
			image {
				width: 150rpx;
				height: 150rpx;
			}
			.name {
				padding: 5rpx;
				font-size: 22rpx;
				color: #333;
			}
			.price {
				padding: 5rpx;
				font-size: 18rpx;
				color: #cf4444;
			}
			.number {
				font-size: 24rpx;
				margin-left: 2rpx;
			}
		}
	}
}
</style>

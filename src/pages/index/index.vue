<template>
	<CustomNavbar></CustomNavbar>
	<scroll-view
		class="scroll-view"
		:scroll-y="true"
		refresher-enabled
		:refresher-triggered="is_triggered"
		@refresherrefresh="onRefresherrefresh"
		@scrolltolower="onScrolltolower">
		<template v-if="is_loading">
			<PageSkeleton></PageSkeleton>
		</template>
		<template v-else>
			<XtxSwiper :list="banner_list"></XtxSwiper>
			<CategoryPanel :list="category_list"></CategoryPanel>
			<HotPanel :list="hot_list"></HotPanel>
			<XtxGuess ref="guessRef"></XtxGuess>
		</template>
	</scroll-view>
</template>

<script setup lang="ts">
import { getRegionBanner, getHomeCategory, getHomeHot } from '@/api/home';
import CustomNavbar from './components/CustomNavbar.vue';
import CategoryPanel from './components/CategoryPanel.vue';
import HotPanel from './components/HotPanel.vue';
import PageSkeleton from './components/PageSkeleton.vue';
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem, CategoryItem, HotItem } from '@/types/home';
import { ref } from 'vue';
import type { XtxGuessInstance } from '@/types/components';

// 获取首页展示图
const banner_list = ref<BannerItem[]>([]);
const getHomeBannerData = async () => {
	const banner = await getRegionBanner();
	banner_list.value = banner;
};

// 获取首页分类
const category_list = ref<CategoryItem[]>([]);
const getHomeCategoryData = async () => {
	const category = await getHomeCategory();
	category_list.value = category;
};

// 获取首页热门推荐
const hot_list = ref<HotItem[]>([]);
const getHomeHotData = async () => {
	const hot = await getHomeHot();
	hot_list.value = hot;
};

// 滚到底部时触发
const guessRef = ref<XtxGuessInstance>();
const onScrolltolower = () => {
	guessRef.value?.loadMore();
};
// 自定义下拉触发
const is_triggered = ref(false);
const onRefresherrefresh = async () => {
	is_triggered.value = true;
	await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData(), guessRef.value?.resetData()]);
	is_triggered.value = false;
};

// 页面加载
const is_loading = ref(false);
onLoad(async () => {
	is_loading.value = true;
	await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()]);
	is_loading.value = false;
});
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
	height: 100%;
	display: flex;
	flex-direction: column;
	.scroll-view {
		flex: 1;
		overflow: hidden;
	}
}
</style>

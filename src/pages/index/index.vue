<template>
	<CustomNavbar></CustomNavbar>
	<XtxSwiper :list="banner_list"></XtxSwiper>
	<CategoryPanel :list="category_list"></CategoryPanel>
	<HotPanel :list="hot_list"></HotPanel>
</template>

<script setup lang="ts">
import { getRegionBanner, getHomeCategory, getHomeHot } from '@/api/home';
import CustomNavbar from './components/CustomNavbar.vue';
import CategoryPanel from './components/CategoryPanel.vue';
import HotPanel from './components/HotPanel.vue';
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem, CategoryItem, HotItem } from '@/types/home';
import { ref } from 'vue';

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

onLoad(() => {
	getHomeBannerData();
	getHomeCategoryData();
	getHomeHotData();
});
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
}
</style>

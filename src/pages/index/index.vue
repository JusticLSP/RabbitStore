<template>
	<CustomNavbar></CustomNavbar>
	<XtxSwiper :list="banner_list"></XtxSwiper>
	<CategoryPanel :list="category_list"></CategoryPanel>
</template>

<script setup lang="ts">
import { getRegionBanner, getHomeCategory } from '@/api/home';
import CustomNavbar from './components/CustomNavbar.vue';
import CategoryPanel from './components/CategoryPanel.vue';
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem, CategoryItem } from '@/types/home';
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

onLoad(() => {
	getHomeBannerData();
	getHomeCategoryData();
});
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
}
</style>

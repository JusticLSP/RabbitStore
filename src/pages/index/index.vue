<template>
	<customNavbar />
	<XtxSwiper :list="banner_list" />
</template>

<script setup lang="ts">
import { getRegionBanner } from '@/api/home';
import customNavbar from './components/CustomNavbar.vue';
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem } from '@/types/home';
import { ref } from 'vue';

const banner_list = ref<BannerItem[]>([]);
/**
 * 获取首页展示图
 */
const getHomeBannerData = async () => {
	const banner = await getRegionBanner();
	banner_list.value = banner;
};
onLoad(() => {
	getHomeBannerData();
});
</script>

<style></style>

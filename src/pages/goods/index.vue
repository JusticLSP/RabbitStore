<template>
	<scroll-view scroll-y class="viewport">
		<!-- 基本信息 -->
		<view class="goods">
			<!-- 商品主图 -->
			<view class="preview">
				<swiper class="swiper-container" circular>
					<template v-for="item in goods_details?.mainPictures" :key="item">
						<swiper-item>
							<image class="image" mode="heightFix" :src="item" />
						</swiper-item>
					</template>
				</swiper>
				<view class="indicator">
					<text class="current">1</text>
					<text class="split">/</text>
					<text class="total">5</text>
				</view>
			</view>
			<!-- 商品简介 -->
			<view class="meta">
				<view class="price">
					<text class="symbol">¥</text>
					<text class="number">{{ goods_details?.price }}</text>
				</view>
				<view class="name ellipsis">{{ goods_details?.name }}</view>
				<view class="desc" v-if="goods_details?.desc">{{ goods_details?.desc }}</view>
			</view>
			<!-- 操作面板 -->
			<view class="action">
				<view class="item arrow">
					<text class="label">选择</text>
					<text class="text ellipsis">请选择商品规格</text>
				</view>
				<view class="item arrow">
					<text class="label">送至</text>
					<text class="text ellipsis">请选择收获地址</text>
				</view>
				<view class="item arrow">
					<text class="label">服务</text>
					<text class="text ellipsis">无忧退 快速退款 免费包邮</text>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="detail panel">
			<view class="title">
				<text>详情</text>
			</view>
			<view class="content">
				<view class="properties">
					<!-- 属性详情 -->
					<template v-for="item in goods_details?.details.properties" :key="item.name">
						<view class="item">
							<text class="label">{{ item.name }}</text>
							<text class="value">{{ item.value }}</text>
						</view>
					</template>
				</view>
				<!-- 图片详情 -->
				<template v-for="item in goods_details?.details.pictures" :key="item">
					<image class="image" mode="widthFix" :src="item"></image>
				</template>
			</view>
		</view>
		<!-- 同类推荐 -->
		<view class="similar panel">
			<view class="title">
				<text>同类推荐</text>
			</view>
			<view class="content">
				<template v-for="item in goods_details?.similarProducts" :key="item.id">
					<navigator class="goods" hover-class="none" :url="`/pages/goods/index?id=${item.id}`">
						<image class="image" mode="aspectFill" :src="item.picture"></image>
						<view class="name ellipsis">{{ item.name }}</view>
						<view class="price">
							<text class="symbol">¥</text>
							<text class="number">{{ item.price }}</text>
						</view>
					</navigator>
				</template>
			</view>
		</view>
	</scroll-view>
	<!-- 用户操作 -->
	<view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
		<view class="icons">
			<button class="icons-button">
				<text class="icon-heart"></text>
				收藏
			</button>
			<button class="icons-button" open-type="contact">
				<text class="icon-handset"></text>
				客服
			</button>
			<navigator class="icons-button" url="/pages/cart/cart" open-type="switchTab">
				<text class="icon-cart"></text>
				购物车
			</navigator>
		</view>
		<view class="buttons">
			<view class="addcart">加入购物车</view>
			<view class="buynow">立即购买</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { getGoodsDetailsAPI } from '@/api/goods';
import type { GoodsResult } from '@/types/goods';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

// 接收页面参数
const query = defineProps<{ id: string }>();

// 获取商品详情信息
const goods_details = ref<GoodsResult>();
const getGoodsDetails = async () => {
	const detail = await getGoodsDetailsAPI(query.id);
	goods_details.value = detail;
};

onLoad(() => {
	getGoodsDetails();
});
</script>
<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
.viewport {
	background-color: #f4f4f4;
	overflow: hidden;
}
@import './styles/basic.scss';
@import './styles/bottom';
</style>
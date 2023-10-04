<template>
	<scroll-view scroll-y class="scroll-view">
		<!-- 已登录: 显示购物车 -->
		<template v-if="member_stroe.member_info">
			<!-- 购物车列表 -->
			<view class="cart-list" v-if="cart_list.length > 0">
				<!-- 优惠提示 -->
				<view class="tips">
					<text class="label">满减</text>
					<text class="desc">满1件, 即可享受9折优惠</text>
				</view>
				<!-- 滑动操作分区 -->
				<uni-swipe-action>
					<!-- 滑动操作项 -->
					<uni-swipe-action-item v-for="item in cart_list" :key="item.skuId" class="cart-swipe">
						<!-- 商品信息 -->
						<view class="goods">
							<!-- 选中状态 -->
							<text class="checkbox" :class="{ checked: true }"></text>
							<navigator :url="`/pages/goods/index?id=${item.id}`" hover-class="none" class="navigator">
								<image mode="aspectFill" class="picture" :src="item.picture"></image>
								<view class="meta">
									<view class="name ellipsis">{{ item.name }}</view>
									<view class="attrsText ellipsis">{{ item.attrsText }}</view>
									<view class="price">{{ item.price }}</view>
								</view>
							</navigator>
							<!-- 商品数量 -->
							<view class="count">
								<text class="text">-</text>
								<input class="input" type="number" :value="item.count.toString()" />
								<text class="text">+</text>
							</view>
						</view>
						<!-- 右侧删除按钮 -->
						<template #right>
							<view class="cart-swipe-right">
								<button class="button delete-button" @tap="onDelCart(item.skuId)">删除</button>
							</view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<!-- 购物车空状态 -->
			<view class="cart-blank" v-else>
				<image src="/static/images/blank_cart.png" class="image" />
				<text class="text">购物车还是空的，快来挑选好货吧</text>
				<navigator open-type="switchTab" url="/pages/index/index" hover-class="none">
					<button class="button">去首页看看</button>
				</navigator>
			</view>
			<!-- 吸底工具栏 -->
			<view class="toolbar">
				<text class="all" :class="{ checked: true }">全选</text>
				<text class="text">合计:</text>
				<text class="amount">100</text>
				<view class="button-grounp">
					<view class="button payment-button" :class="{ disabled: true }">去结算(10)</view>
				</view>
			</view>
		</template>
		<!-- 未登录: 提示登录 -->
		<view class="login-blank" v-else>
			<text class="text">登录后可查看购物车中的商品</text>
			<navigator url="/pages/login/index" hover-class="none">
				<button class="button">去登录</button>
			</navigator>
		</view>
		<!-- 猜你喜欢 -->
		<XtxGuess ref="guessRef"></XtxGuess>
		<!-- 底部占位空盒子 -->
		<view class="toolbar-height"></view>
	</scroll-view>
</template>
<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member';
import { getMemberCartAPI, delMemberCartAPI } from '@/api/cart';
import type { CartItem } from '@/types/cart';
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

// 用户信息
const member_stroe = useMemberStore();

// 获取购物车列表
const cart_list = ref<CartItem[]>([]);
const getMemberCartData = async () => {
	const result = await getMemberCartAPI();
	cart_list.value = result;
};
// 删除购物车商品
const onDelCart = (sku_id: string) => {
	uni.showModal({
		content: '是否确定删除？',
		success: async (res) => {
			if (res.confirm) {
				await delMemberCartAPI([sku_id]);
				getMemberCartData();
			}
		}
	});
};

onShow(() => {
	getMemberCartData();
});
</script>
<style lang="scss">
// 根元素
:host {
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background-color: #f7f7f8;
}
// 滚动容器
.scroll-view {
	flex: 1;
	overflow: hidden;
}
@import './styles/cart.scss';
@import './styles/empty.scss';
@import './styles/bottom.scss';
</style>

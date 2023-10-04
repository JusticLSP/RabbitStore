<template>
	<scroll-view scroll-y class="scroll-view" @scrolltolower="onScrolltolower">
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
							<text class="checkbox" :class="{ checked: item.selected }" @tap="onChangeSelectState(item)"></text>
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
								<vk-data-input-number-box
									v-model="item.count"
									:min="1"
									:max="item.stock"
									:index="item.skuId"
									@change="onChangeCount"></vk-data-input-number-box>
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
			<view :style="{ paddingBottom: toolbarSafeArea ? safeAreaInsets?.bottom + 'px' : 0 }" class="toolbar">
				<text class="all" :class="{ checked: is_select_all }" @tap="onChangeSelectAllState">全选</text>
				<text class="text">合计:</text>
				<text class="amount">{{ select_total_money }}</text>
				<view class="button-grounp">
					<view class="button payment-button" :class="{ disabled: select_total_num === 0 }" @tap="onPayment">
						去结算({{ select_total_num }})
					</view>
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
		<view :style="{ paddingBottom: toolbarSafeArea ? safeAreaInsets?.bottom + 'px' : 0 }" class="toolbar-height"></view>
	</scroll-view>
</template>
<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member';
import { getMemberCartAPI, delMemberCartAPI, putMemberCartAPI, putMemberCartSelectAllAPI } from '@/api/cart';
import type { CartItem } from '@/types/cart';
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import type { InputNumberBoxEvent } from '@/components/vk-data-input-number-box/vk-data-input-number-box';
import debounce from '@/common/debounce';
import type { XtxGuessInstance } from '@/types/components';

// 组件传递参数
defineProps<{ toolbarSafeArea?: boolean }>();

// 安全距离
const { safeAreaInsets } = uni.getSystemInfoSync();

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
// 更改购物车商品数量
const onChangeCount = debounce((e: InputNumberBoxEvent) => {
	const { value, index } = e;
	putMemberCartAPI(index, { count: value });
}, 500);
// 更改购物车商品选中状态
const onChangeSelectState = (item: CartItem) => {
	const { skuId, selected } = item;
	const state = !selected;
	item.selected = state;
	putMemberCartAPI(skuId, { selected: state });
};
// 更改购物车商品全部选中状态
const is_select_all = computed(() => {
	return cart_list.value.length && cart_list.value.every((item) => item.selected === true);
});
const onChangeSelectAllState = () => {
	const state = !is_select_all.value;
	cart_list.value.forEach((item) => (item.selected = state));
	putMemberCartSelectAllAPI(state);
};
// 计算底部结算信息
const select_total_num = computed(() => {
	return cart_list.value.reduce((curr, item) => {
		if (item.selected) curr = curr + item.count;
		return curr;
	}, 0);
});
const select_total_money = computed(() => {
	return cart_list.value
		.reduce((curr, item) => {
			if (item.selected) curr = curr + item.count * item.nowPrice;
			return curr;
		}, 0)
		.toFixed(2);
});
// 去结算
const onPayment = () => {
	if (select_total_num.value === 0) {
		uni.showToast({ icon: 'none', title: '请选择商品' });
	}
	uni.navigateTo({ url: '/pagesOrder/create/index' });
};

// 滚到底部时触发
const guessRef = ref<XtxGuessInstance>();
const onScrolltolower = () => {
	guessRef.value?.loadMore();
};

onShow(async () => {
	uni.showLoading({ title: '加载中...' });
	await getMemberCartData();
	uni.hideLoading();
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
@import '../styles/cart.scss';
@import '../styles/empty.scss';
@import '../styles/bottom.scss';
</style>

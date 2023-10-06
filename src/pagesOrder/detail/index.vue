<template>
	<!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
	<view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
		<view class="wrap">
			<navigator v-if="pages.length > 1" open-type="navigateBack" class="back icon-left"></navigator>
			<navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home"></navigator>
			<view class="title">订单详情</view>
		</view>
	</view>
	<scroll-view scroll-y class="viewport" id="scroller" @scrolltolower="onScrolltolower">
		<template v-if="!loading && order">
			<!-- 订单状态 -->
			<view class="overview" :style="{ paddingTop: safeAreaInsets!.top + 20 + 'px' }">
				<!-- 待付款状态:展示去支付按钮和倒计时 -->
				<template v-if="order.orderState === OrderState.DaiFuKuan">
					<view class="status icon-clock">等待付款</view>
					<view class="tips">
						<text class="money">应付金额: ¥ {{ order.payMoney }}</text>
						<text class="time">支付剩余</text>
						<uni-countdown
							:second="order.countdown"
							color="#fff"
							splitor-color="#fff"
							:show-day="false"
							:show-colon="false"
							@timeup="onTimeup"></uni-countdown>
					</view>
					<view class="button" @tap="onOrderPay">去支付</view>
				</template>
				<!-- 其他订单状态:展示再次购买按钮 -->
				<template v-else>
					<!-- 订单状态文字 -->
					<view class="status">{{ orderStateList[order.orderState].text }}</view>
					<view class="button-group">
						<navigator class="button" :url="`/pagesOrder/create/index?orderId=${query.id}`" hover-class="none">
							再次购买
						</navigator>
						<!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
						<view v-if="is_dev && order.orderState === OrderState.DaiFaHuo" class="button" @tap="onOrderSend">
							模拟发货
						</view>
					</view>
				</template>
			</view>
			<!-- 配送状态 -->
			<view class="shipment">
				<!-- 订单物流信息 -->
				<template v-if="logistics">
					<view v-for="item in logistics.list" :key="item.id" class="item">
						<view class="message">{{ item.text }}</view>
						<view class="date">{{ item.time }}</view>
					</view>
				</template>
				<!-- 用户收货地址 -->
				<view class="locate">
					<view class="user">{{ order.receiverContact }} {{ order.receiverMobile }}</view>
					<view class="address">{{ order.receiverAddress }}</view>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="goods">
				<view class="item">
					<navigator
						class="navigator"
						v-for="item in order.skus"
						:key="item.id"
						:url="`/pages/goods/index?id=${item.spuId}`"
						hover-class="none">
						<image class="cover" :src="item.image"></image>
						<view class="meta">
							<view class="name ellipsis">{{ item.name }}</view>
							<view class="type">{{ item.attrsText }}</view>
							<view class="price">
								<view class="actual">
									<text class="symbol">¥</text>
									<text>{{ item.curPrice }}</text>
								</view>
							</view>
							<view class="quantity">x{{ item.quantity }}</view>
						</view>
					</navigator>
					<!-- 待评价状态:展示按钮 -->
					<view class="action" v-if="order.orderState === OrderState.DaiPingJia">
						<view class="button primary">申请售后</view>
						<navigator url="" class="button">去评价</navigator>
					</view>
				</view>
				<!-- 合计 -->
				<view class="total">
					<view class="row">
						<view class="text">商品总价:</view>
						<view class="symbol">{{ order.totalMoney }}</view>
					</view>
					<view class="row">
						<view class="text">运费:</view>
						<view class="symbol">{{ order.postFee }}</view>
					</view>
					<view class="row">
						<view class="text">应付金额:</view>
						<view class="symbol primary">{{ order.payMoney }}</view>
					</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="detail">
				<view class="title">订单信息</view>
				<view class="row">
					<view class="item">
						订单编号: {{ query.id }}
						<text class="copy" @tap="onCopy(query.id)">复制</text>
					</view>
					<view class="item">下单时间: {{ order.createTime }}</view>
				</view>
			</view>
			<!-- 猜你喜欢 -->
			<XtxGuess ref="guessRef" />
			<!-- 底部操作栏 -->
			<view class="toolbar-height" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
			<view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
				<!-- 待付款状态:展示支付按钮 -->
				<template v-if="order.orderState === OrderState.DaiFuKuan">
					<view class="button primary">去支付</view>
					<view class="button" @tap="popup?.open?.()">取消订单</view>
				</template>
				<!-- 其他订单状态:按需展示按钮 -->
				<template v-else>
					<navigator class="button secondary" :url="`/pagesOrder/create/create?orderId=${query.id}`" hover-class="none">
						再次购买
					</navigator>
					<!-- 待收货状态: 展示确认收货 -->
					<view class="button primary" v-if="order.orderState === OrderState.DaiShouHuo" @tap="onOrderConfirm">
						确认收货
					</view>
					<!-- 待评价状态: 展示去评价 -->
					<view class="button" v-if="order.orderState === OrderState.DaiPingJia">去评价</view>
					<!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
					<view class="button delete" v-if="order.orderState >= OrderState.DaiPingJia" @tap="onDelOrder">删除订单</view>
				</template>
			</view>
		</template>
		<template v-else>
			<!-- 骨架屏组件 -->
			<PageSkeleton></PageSkeleton>
		</template>
	</scroll-view>
	<!-- 取消订单弹窗 -->
	<uni-popup ref="popup" type="bottom" background-color="#fff">
		<view class="popup-root">
			<view class="title">订单取消</view>
			<view class="description">
				<view class="tips">请选择取消订单的原因：</view>
				<view class="cell" v-for="item in reasonList" :key="item" @tap="reason = item">
					<text class="text">{{ item }}</text>
					<text class="icon" :class="{ checked: item === reason }"></text>
				</view>
			</view>
			<view class="footer">
				<view class="button" @tap="popup?.close?.()">取消</view>
				<view class="button primary" @tap="onConfirmCancel">确认</view>
			</view>
		</view>
	</uni-popup>
</template>
<script setup lang="ts">
import { OrderState, orderStateList } from '@/api/constants';
import {
	getMemberOrderDateilAPI,
	getMemberOrderConsignmentAPI,
	putMemberOrderReceiptAPI,
	getMemberOrderLogisticsAPI,
	delMemberOrderAPI,
	putMemberOrderCancelAPI
} from '@/api/order';
import { getPayWxPayMiniPayAPI, getPayMockAPI } from '@/api/pay';
import type { XtxGuessInstance } from '@/types/components';
import type { OrderResult, OrderLogisticResult } from '@/types/order';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { ref } from 'vue';
import PageSkeleton from './components/PageSkeleton.vue';

// 获取页面参数
const query = defineProps<{ id: string }>();

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();
// 开发环境
const is_dev = import.meta.env.DEV;

// 获取页面栈
const pages = getCurrentPages();
// 获取页面实例
type PageInstance = Page.PageInstance & WechatMiniprogram.Page.InstanceMethods<any>;
const pages_instance = pages.at(-1) as PageInstance;
onReady(() => {
	// #ifdef MP-WEIXIN
	const scroll_timeline = {
		scrollSource: '#scroller',
		timeRange: 1000,
		startScrollOffset: 0,
		endScrollOffset: 50
	};
	pages_instance.animate(
		'.navbar',
		[{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }],
		1000,
		scroll_timeline
	);
	pages_instance.animate('.navbar .title', [{ color: 'transparent' }, { color: '#000' }], 1000, scroll_timeline);
	pages_instance.animate('.navbar .back', [{ color: '#fff' }, { color: '#000' }], 1000, scroll_timeline);
	// #endif
});

// 滚到底部时触发
const guessRef = ref<XtxGuessInstance>();
const onScrolltolower = () => {
	guessRef.value?.loadMore();
};

// 弹出层组件
const popup = ref<UniHelper.UniPopupInstance>();
// 取消原因列表
const reasonList = ref(['商品无货', '不想要了', '商品信息填错了', '地址信息填写错误', '商品降价', '其它']);
// 订单取消原因
const reason = ref('');
// 取消订单
const onConfirmCancel = async () => {
	const result = await putMemberOrderCancelAPI(query.id, reason.value);
	popup.value?.close!();
	order.value = result;
	uni.showToast({ icon: 'success', title: '取消成功' });
};

// 复制内容
const onCopy = (id: string) => {
	uni.setClipboardData({ data: id });
};

// 获取物流信息
const logistics = ref<OrderLogisticResult>();
const getMemberOrderLogisticsData = async () => {
	const result = await getMemberOrderLogisticsAPI(query.id);
	logistics.value = result;
};

// 获取订单详情
const loading = ref(false);
const order = ref<OrderResult>();
const getMemberOrderDateilData = async () => {
	const result = await getMemberOrderDateilAPI(query.id);
	order.value = result;
	// 订单状态为待收货，待评价，已完成时，获取物流信息
	if ([OrderState.DaiShouHuo, OrderState.DaiPingJia, OrderState.YiWanCheng].includes(result.orderState)) {
		getMemberOrderLogisticsData();
	}
};
// 倒计时结束
const onTimeup = () => {
	order.value!.orderState = OrderState.YiQuXiao;
};
// 订单支付
const onOrderPay = async () => {
	try {
		uni.showLoading({ title: '支付中...' });
		if (import.meta.env.DEV) {
			await getPayMockAPI(query.id);
		}
		// #ifdef MP-WEIXIN
		else {
			const result = await getPayWxPayMiniPayAPI(query.id);
			await wx.requestPayment(result);
		}
		// #endif
		uni.hideLoading();
		uni.redirectTo({ url: `/pagesOrder/payment/index?id=${query.id}` });
	} catch (error) {}
};
// 模拟发货
const onOrderSend = async () => {
	if (is_dev) {
		await getMemberOrderConsignmentAPI(query.id);
		order.value!.orderState = OrderState.DaiShouHuo;
	}
};
// 订单确认收货
const onOrderConfirm = () => {
	uni.showModal({
		content: '为保障您的权益，请收到货并确认无误，再确认收货',
		success: async (res) => {
			if (res.confirm) {
				const result = await putMemberOrderReceiptAPI(query.id);
				order.value = result;
			}
		}
	});
};
// 删除订单
const onDelOrder = () => {
	uni.showModal({
		content: '是否删除订单？',
		success: async (res) => {
			if (res.confirm) {
				await delMemberOrderAPI([query.id]);
				uni.redirectTo({ url: '/pagesOrder/list/index' });
			}
		}
	});
};

onLoad(async () => {
	loading.value = true;
	await getMemberOrderDateilData();
	loading.value = false;
});
</script>
<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}
@import './styles/navbar.scss';
@import './styles/main.scss';
@import './styles/toolbar.scss';
@import './styles/popup.scss';
</style>

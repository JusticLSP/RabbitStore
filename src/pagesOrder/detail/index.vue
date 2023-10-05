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
						<text class="money">应付金额: ¥ 99.00</text>
						<text class="time">支付剩余</text>
						00 时 29 分 59 秒
					</view>
					<view class="button">去支付</view>
				</template>
				<!-- 其他订单状态:展示再次购买按钮 -->
				<template v-else>
					<!-- 订单状态文字 -->
					<view class="status">{{ orderStateList[order.orderState].text }}</view>
					<view class="button-group">
						<navigator class="button" :url="`/pagesOrder/create/create?orderId=${query.id}`" hover-class="none">
							再次购买
						</navigator>
						<!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
						<view v-if="false" class="button">模拟发货</view>
					</view>
				</template>
			</view>
			<!-- 配送状态 -->
			<view class="shipment">
				<!-- 订单物流信息 -->
				<view v-for="item in 1" :key="item" class="item">
					<view class="message">您已在广州市天河区黑马程序员完成取件，感谢使用菜鸟驿站，期待再次为您服务。</view>
					<view class="date">2023-04-14 13:14:20</view>
				</view>
				<!-- 用户收货地址 -->
				<view class="locate">
					<view class="user">张三 13333333333</view>
					<view class="address">广东省 广州市 天河区 黑马程序员</view>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="goods">
				<view class="item">
					<navigator
						class="navigator"
						v-for="item in 2"
						:key="item"
						:url="`/pages/goods/goods?id=${item}`"
						hover-class="none">
						<image class="cover" src="https://yanxuan-item.nosdn.127.net/c07edde1047fa1bd0b795bed136c2bb2.jpg"></image>
						<view class="meta">
							<view class="name ellipsis">ins风小碎花泡泡袖衬110-160cm</view>
							<view class="type">藏青小花， 130</view>
							<view class="price">
								<view class="actual">
									<text class="symbol">¥</text>
									<text>99.00</text>
								</view>
							</view>
							<view class="quantity">x1</view>
						</view>
					</navigator>
					<!-- 待评价状态:展示按钮 -->
					<view class="action" v-if="true">
						<view class="button primary">申请售后</view>
						<navigator url="" class="button">去评价</navigator>
					</view>
				</view>
				<!-- 合计 -->
				<view class="total">
					<view class="row">
						<view class="text">商品总价:</view>
						<view class="symbol">99.00</view>
					</view>
					<view class="row">
						<view class="text">运费:</view>
						<view class="symbol">10.00</view>
					</view>
					<view class="row">
						<view class="text">应付金额:</view>
						<view class="symbol primary">109.00</view>
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
					<view class="item">下单时间: 2023-04-14 13:14:20</view>
				</view>
			</view>
			<!-- 猜你喜欢 -->
			<XtxGuess ref="guessRef" />
			<!-- 底部操作栏 -->
			<view class="toolbar-height" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
			<view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
				<!-- 待付款状态:展示支付按钮 -->
				<template v-if="true">
					<view class="button primary">去支付</view>
					<view class="button" @tap="popup?.open?.()">取消订单</view>
				</template>
				<!-- 其他订单状态:按需展示按钮 -->
				<template v-else>
					<navigator class="button secondary" :url="`/pagesOrder/create/create?orderId=${query.id}`" hover-class="none">
						再次购买
					</navigator>
					<!-- 待收货状态: 展示确认收货 -->
					<view class="button primary">确认收货</view>
					<!-- 待评价状态: 展示去评价 -->
					<view class="button">去评价</view>
					<!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
					<view class="button delete">删除订单</view>
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
				<view class="button primary">确认</view>
			</view>
		</view>
	</uni-popup>
</template>
<script setup lang="ts">
import { OrderState, orderStateList } from '@/api/constants';
import { getMemberOrderDateilAPI } from '@/api/order';
import type { XtxGuessInstance } from '@/types/components';
import type { OrderResult } from '@/types/order';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { ref } from 'vue';
import PageSkeleton from './components/PageSkeleton.vue';

// 获取页面参数
const query = defineProps<{ id: string }>();

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

// 获取页面栈
const pages = getCurrentPages();
// 获取页面实例
type PageInstance = Page.PageInstance & WechatMiniprogram.Page.InstanceMethods<any>;
const pages_instance = pages.at(-1) as PageInstance;
onReady(() => {
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
// 复制内容
const onCopy = (id: string) => {
	uni.setClipboardData({ data: id });
};

// 获取订单详情
const loading = ref(false);
const order = ref<OrderResult>();
const getMemberOrderDateilData = async () => {
	const result = await getMemberOrderDateilAPI(query.id);
	order.value = result;
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

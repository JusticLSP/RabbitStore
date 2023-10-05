<template name="skeleton">
	<view class="navbar" style="padding-top: 44px">
		<view class="wrap">
			<navigator class="back icon-left sk-pseudo sk-pseudo-circle" open-type="navigateBack"></navigator>
			<view class="title sk-transparent sk-text-14-2857-126 sk-text">订单详情</view>
		</view>
	</view>
	<scroll-view :scroll-y="true" class="viewport" id="scroller">
		<view class="overview sk-image" style="padding-top: 64px">
			<view class="status icon-clock sk-transparent sk-text-0-0000-344 sk-text sk-pseudo sk-pseudo-circle">
				等待付款
			</view>
			<view class="tips sk-transparent">
				<text class="money sk-transparent sk-text-0-0000-295 sk-text">应付金额: ¥ 99.00</text>
				<text class="time sk-transparent sk-text-0-0000-281 sk-text">支付剩余</text>
				00 时 29 分 59 秒
			</view>
			<view class="button sk-transparent sk-text-28-1250-886 sk-text" style="background-position-x: 50%">去支付</view>
		</view>
		<view class="shipment">
			<view class="item sk-image">
				<view class="message sk-transparent sk-text-14-2857-857 sk-text">
					您已在广州市天河区黑马程序员完成取件，感谢使用菜鸟驿站，期待再次为您服务。
				</view>
				<view class="date sk-transparent sk-text-14-2857-230 sk-text">2023-04-14 13:14:20</view>
			</view>
			<view class="locate sk-image">
				<view class="user sk-transparent sk-text-14-2857-479 sk-text">张三 13333333333</view>
				<view class="address sk-transparent sk-text-14-2857-152 sk-text">广东省 广州市 天河区 黑马程序员</view>
			</view>
		</view>
		<view class="goods">
			<view class="item">
				<navigator class="navigator" hover-class="none">
					<image class="cover sk-image"></image>
					<view class="meta">
						<view class="name ellipsis sk-transparent sk-text-14-2857-559 sk-text">ins风小碎花泡泡袖衬110-160cm</view>
						<view class="type sk-transparent sk-text-22-2222-634 sk-text">藏青小花， 130</view>
						<view class="price">
							<view class="actual">
								<text class="symbol sk-transparent sk-opacity">¥</text>
								<text class="sk-transparent sk-text-14-2857-930 sk-text">99.00</text>
							</view>
						</view>
						<view class="quantity sk-transparent sk-opacity">x1</view>
					</view>
				</navigator>
				<navigator class="navigator" hover-class="none">
					<image class="cover sk-image"></image>
					<view class="meta">
						<view class="name ellipsis sk-transparent sk-text-14-2857-274 sk-text">ins风小碎花泡泡袖衬110-160cm</view>
						<view class="type sk-transparent sk-text-22-2222-915 sk-text">藏青小花， 130</view>
						<view class="price">
							<view class="actual">
								<text class="symbol sk-transparent sk-opacity">¥</text>
								<text class="sk-transparent sk-text-14-2857-848 sk-text">99.00</text>
							</view>
						</view>
						<view class="quantity sk-transparent sk-opacity">x1</view>
					</view>
				</navigator>
			</view>
			<view class="total">
				<view class="row">
					<view class="text sk-transparent sk-text-0-0000-593 sk-text">商品总价:</view>
					<view class="symbol sk-transparent sk-text-0-0000-870 sk-text sk-pseudo sk-pseudo-circle">99.00</view>
				</view>
				<view class="row">
					<view class="text sk-transparent sk-text-0-0000-949 sk-text">运费:</view>
					<view class="symbol sk-transparent sk-text-0-0000-443 sk-text sk-pseudo sk-pseudo-circle">10.00</view>
				</view>
				<view class="row">
					<view class="text sk-transparent sk-text-0-0000-20 sk-text">应付金额:</view>
					<view class="symbol primary sk-transparent sk-text-0-0000-972 sk-text sk-pseudo sk-pseudo-circle">
						109.00
					</view>
				</view>
			</view>
		</view>
		<view class="toolbar" style="padding-bottom: 34px"></view>
	</scroll-view>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.sk-transparent {
	color: transparent !important;
}
.sk-text-14-2857-126 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text {
	background-origin: content-box !important;
	background-clip: content-box !important;
	background-color: transparent !important;
	color: transparent !important;
	background-repeat: repeat-y !important;
}
.sk-text-0-0000-344 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 36rpx;
	position: relative !important;
}
.sk-text-0-0000-295 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 28rpx;
	position: relative !important;
}
.sk-text-0-0000-281 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 28rpx;
	position: relative !important;
}
.sk-text-28-1250-886 {
	background-image: linear-gradient(transparent 28.125%, #eeeeee 0%, #eeeeee 71.875%, transparent 0%) !important;
	background-size: 100% 64rpx;
	position: relative !important;
}
.sk-text-14-2857-857 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-230 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-479 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-152 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-559 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-22-2222-634 {
	background-image: linear-gradient(transparent 22.2222%, #eeeeee 0%, #eeeeee 77.7778%, transparent 0%) !important;
	background-size: 100% 43.2rpx;
	position: relative !important;
}
.sk-opacity {
	opacity: 0 !important;
}
.sk-text-14-2857-930 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-274 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-22-2222-915 {
	background-image: linear-gradient(transparent 22.2222%, #eeeeee 0%, #eeeeee 77.7778%, transparent 0%) !important;
	background-size: 100% 43.2rpx;
	position: relative !important;
}
.sk-text-14-2857-848 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-0-0000-593 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 26rpx;
	position: relative !important;
}
.sk-text-0-0000-870 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 26rpx;
	position: relative !important;
}
.sk-text-0-0000-949 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 26rpx;
	position: relative !important;
}
.sk-text-0-0000-443 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 26rpx;
	position: relative !important;
}
.sk-text-0-0000-20 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 26rpx;
	position: relative !important;
}
.sk-text-0-0000-972 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 36rpx;
	position: relative !important;
}
.sk-text-0-0000-515 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 30rpx;
	position: relative !important;
}
.sk-text-0-0000-859 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 20rpx;
	position: relative !important;
}
.sk-text-0-0000-482 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 26rpx;
	position: relative !important;
}
.sk-text-14-2857-432 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-472 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-image {
	background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
	background: #efefef !important;
	background-image: none !important;
	color: transparent !important;
	border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
	border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
	border-radius: 50% !important;
}
</style>

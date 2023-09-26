<template name="skeleton">
	<view class="sk-container">
		<view class="viewport">
			<view class="search">
				<view class="input">
					<text class="icon-search sk-transparent sk-text-14-2857-312 sk-text">女靴</text>
				</view>
			</view>
			<view class="categories">
				<scroll-view :scroll-y="true" class="primary">
					<view class="item active sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-861 sk-text">居家</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-115 sk-text">美食</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-362 sk-text">服饰</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-221 sk-text">母婴</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-652 sk-text">个护</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-579 sk-text">严选</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-774 sk-text">数码</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-814 sk-text">运动</text>
					</view>
					<view class="item sk-pseudo sk-pseudo-circle">
						<text class="name sk-transparent sk-text-14-2857-934 sk-text">杂项</text>
					</view>
				</scroll-view>
				<view class="secondary">
					<view is="components/XtxSwiper" class="banner">
						<view class="carousel XtxSwiper--carousel">
							<swiper :circular="true" :interval="3000" style="height: 100%" :current="0" :autoplay="false">
								<swiper-item
									style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px)">
									<image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
								</swiper-item>
								<swiper-item
									style="
										position: absolute;
										width: 100%;
										height: 100%;
										transform: translate(100%, 0px) translateZ(0px);
									">
									<image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
								</swiper-item>
							</swiper>
							<view class="indicator XtxSwiper--indicator">
								<text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
								<text class="dot XtxSwiper--dot"></text>
								<text class="dot XtxSwiper--dot"></text>
								<text class="dot XtxSwiper--dot"></text>
								<text class="dot XtxSwiper--dot"></text>
							</view>
						</view>
					</view>
					<scroll-view :scroll-y="true" class="secondary-scroll" scroll-top="0">
						<view class="panel">
							<view class="title">
								<text class="name sk-transparent sk-text-26-6667-601 sk-text">居家生活用品</text>
								<navigator
									class="more sk-transparent sk-text-30-0000-828 sk-text sk-pseudo sk-pseudo-circle"
									hover-class="none">
									全部
								</navigator>
							</view>
							<view class="section">
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-739 sk-text">极光限定 珠光蓝珐琅锅</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-840 sk-text">199.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-703 sk-text">泸州老窖特曲浓香型白酒</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-667 sk-text">280.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-435 sk-text">
										德国莫泽尔传统版雷司令干白2019750ml
									</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-987 sk-text">138.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-515 sk-text">冻干藤椒豚骨面74克*12盒</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-167 sk-text">79.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-462 sk-text">冻干藤椒牛肉面70克*12盒</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-969 sk-text">79.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-483 sk-text">
										木桐正牌干红葡萄酒750毫升2016年
									</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-817 sk-text">7799.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-563 sk-text">
										现泡免煮，螺蛳粉370克*6盒
									</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-163 sk-text">78.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-663 sk-text">梅乃宿柚子酒720毫升</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-295 sk-text">248.00</text>
									</view>
								</navigator>
								<navigator class="goods" hover-class="none">
									<image class="image sk-image"></image>
									<view class="name ellipsis sk-transparent sk-text-14-2857-996 sk-text">从江香猪油辣椒218克</view>
									<view class="price">
										<text class="symbol sk-transparent sk-opacity">¥</text>
										<text class="number sk-transparent sk-text-14-2857-548 sk-text">28.00</text>
									</view>
								</navigator>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts"></script>
<style>
.sk-transparent {
	color: transparent !important;
}
.sk-text-14-2857-312 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text {
	background-origin: content-box !important;
	background-clip: content-box !important;
	background-color: transparent !important;
	color: transparent !important;
	background-repeat: repeat-y !important;
}
.sk-text-14-2857-861 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-115 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-362 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-221 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-652 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-579 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-774 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-814 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-14-2857-934 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 36.4rpx;
	position: relative !important;
}
.sk-text-26-6667-601 {
	background-image: linear-gradient(transparent 26.6667%, #eeeeee 0%, #eeeeee 73.3333%, transparent 0%) !important;
	background-size: 100% 60rpx;
	position: relative !important;
}
.sk-text-30-0000-828 {
	background-image: linear-gradient(transparent 30%, #eeeeee 0%, #eeeeee 70%, transparent 0%) !important;
	background-size: 100% 60rpx;
	position: relative !important;
}
.sk-text-14-2857-739 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-opacity {
	opacity: 0 !important;
}
.sk-text-14-2857-840 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-703 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-667 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-435 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-987 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-515 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-167 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-462 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-969 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-483 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-817 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-563 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-163 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-663 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-295 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-996 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 30.8rpx;
	position: relative !important;
}
.sk-text-14-2857-548 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 33.6rpx;
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
.sk-container {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: transparent;
}
</style>

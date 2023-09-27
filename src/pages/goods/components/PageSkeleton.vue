<template name="skeleton">
	<view class="sk-container">
		<scroll-view :scroll-y="true" class="viewport" :enable-back-to-top="true">
			<view class="goods">
				<view class="preview">
					<swiper :circular="true" class="swiper-container" :current="0" :autoplay="false">
						<swiper-item
							style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px)">
							<image class="image sk-image" mode="heightFix" style="width: 414px"></image>
						</swiper-item>
					</swiper>
					<view class="indicator">
						<text class="current sk-transparent sk-opacity">1</text>
						<text class="split sk-transparent sk-opacity">/</text>
						<text class="total sk-transparent sk-opacity">5</text>
					</view>
				</view>
				<view class="meta">
					<view class="price">
						<text class="symbol sk-transparent sk-opacity">¥</text>
						<text class="number sk-transparent sk-text-14-2857-915 sk-text">40.00</text>
					</view>
					<view class="name ellipsis sk-transparent sk-text-14-2857-752 sk-text">运动健身跑步腰包</view>
					<view class="desc sk-transparent sk-text-0-0000-571 sk-text">
						防水反光设计，大容量双口袋收纳，运动跑步更时尚app
					</view>
				</view>
				<view class="action">
					<view class="item arrow sk-pseudo sk-pseudo-circle">
						<text class="label sk-transparent sk-text-14-2857-237 sk-text">选择</text>
						<text class="text ellipsis sk-transparent sk-text-14-2857-262 sk-text">请选择商品规格</text>
					</view>
					<view class="item arrow sk-pseudo sk-pseudo-circle">
						<text class="label sk-transparent sk-text-14-2857-182 sk-text">送至</text>
						<text class="text ellipsis sk-transparent sk-text-14-2857-550 sk-text">请选择收获地址</text>
					</view>
					<view class="item arrow sk-pseudo sk-pseudo-circle">
						<text class="label sk-transparent sk-text-14-2857-406 sk-text">服务</text>
						<text class="text ellipsis sk-transparent sk-text-14-2857-654 sk-text">无忧退 快速退款 免费包邮</text>
					</view>
				</view>
			</view>
			<view class="detail panel">
				<view class="title">
					<text class="sk-transparent sk-text-0-0000-997 sk-text">详情</text>
				</view>
				<view class="content">
					<view class="properties">
						<view class="item">
							<text class="label sk-transparent sk-text-25-0000-154 sk-text">品牌</text>
							<text class="value sk-transparent sk-text-25-0000-303 sk-text">
								网易严选推荐选品，本产品为甫士品牌，由厦门伊亚创新科技有限公司生产制造。
							</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="toolbar" style="padding-bottom: 34px">
			<view class="icons">
				<button class="icons-button sk-transparent sk-button sk-pseudo sk-pseudo-circle">
					<text class="icon-heart sk-pseudo sk-pseudo-circle"></text>
					收藏
				</button>
				<button class="icons-button sk-transparent sk-button sk-pseudo sk-pseudo-circle" open-type="contact">
					<text class="icon-handset sk-pseudo sk-pseudo-circle"></text>
					客服
				</button>
				<navigator class="icons-button sk-transparent" open-type="switchTab">
					<text class="icon-cart sk-pseudo sk-pseudo-circle"></text>
					购物车
				</navigator>
			</view>
			<view class="buttons">
				<view class="addcart sk-transparent sk-text-32-0513-233 sk-text" style="background-position-x: 50%">
					加入购物车
				</view>
				<view class="buynow sk-transparent sk-text-32-0513-862 sk-text" style="background-position-x: 50%">
					立即购买
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
.sk-opacity {
	opacity: 0 !important;
}
.sk-text-14-2857-915 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 76.087rpx;
	position: relative !important;
}
.sk-text {
	background-origin: content-box !important;
	background-clip: content-box !important;
	background-color: transparent !important;
	color: transparent !important;
	background-repeat: repeat-y !important;
}
.sk-text-14-2857-752 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 43.1159rpx;
	position: relative !important;
}
.sk-text-0-0000-571 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 23.5507rpx;
	position: relative !important;
}
.sk-text-14-2857-237 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-262 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-182 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-550 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-406 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-654 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-0-0000-997 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 27.1739rpx;
	position: relative !important;
}
.sk-text-25-0000-154 {
	background-image: linear-gradient(transparent 25%, #eeeeee 0%, #eeeeee 75%, transparent 0%) !important;
	background-size: 100% 50.7246rpx;
	position: relative !important;
}
.sk-text-25-0000-303 {
	background-image: linear-gradient(transparent 25%, #eeeeee 0%, #eeeeee 75%, transparent 0%) !important;
	background-size: 100% 50.7246rpx;
	position: relative !important;
}
.sk-text-32-0513-233 {
	background-image: linear-gradient(transparent 32.0513%, #eeeeee 0%, #eeeeee 67.9487%, transparent 0%) !important;
	background-size: 100% 70.6522rpx;
	position: relative !important;
}
.sk-text-32-0513-862 {
	background-image: linear-gradient(transparent 32.0513%, #eeeeee 0%, #eeeeee 67.9487%, transparent 0%) !important;
	background-size: 100% 70.6522rpx;
	position: relative !important;
}
.sk-button {
	color: #efefef !important;
	background: #efefef !important;
	border: none !important;
	box-shadow: none !important;
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

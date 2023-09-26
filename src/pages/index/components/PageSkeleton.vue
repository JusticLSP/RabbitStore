<template name="skeleton">
	<view is="components/XtxSwiper">
		<view class="carousel XtxSwiper--carousel">
			<swiper :circular="true" :interval="3000" :current="0" :autoplay="false">
				<swiper-item
					style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px)">
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
	<view is="pages/index/components/CategoryPanel">
		<view class="category CategoryPanel--category">
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-600 sk-text">居家</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-81 sk-text">锦鲤</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-616 sk-text">服饰</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-823 sk-text">母婴</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-259 sk-text">个护</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-269 sk-text">严选</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-815 sk-text">数码</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-98 sk-text">运动</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-915 sk-text">杂项</text>
			</navigator>
			<navigator class="category-item CategoryPanel--category-item" hover-class="none">
				<image class="icon CategoryPanel--icon sk-image"></image>
				<text class="text CategoryPanel--text sk-transparent sk-text-14-2857-813 sk-text">品牌</text>
			</navigator>
		</view>
	</view>
	<view is="pages/index/components/HotPanel">
		<view class="panel HotPanel--panel hot HotPanel--hot">
			<view class="item HotPanel--item">
				<view class="title HotPanel--title">
					<text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-223 sk-text">特惠推荐</text>
					<text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-541 sk-text">精选全攻略</text>
				</view>
				<navigator class="cards HotPanel--cards" hover-class="none">
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
				</navigator>
			</view>
			<view class="item HotPanel--item">
				<view class="title HotPanel--title">
					<text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-232 sk-text">爆款推荐</text>
					<text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-827 sk-text">最受欢迎</text>
				</view>
				<navigator class="cards HotPanel--cards" hover-class="none">
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
				</navigator>
			</view>
			<view class="item HotPanel--item">
				<view class="title HotPanel--title">
					<text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-307 sk-text">一站买全</text>
					<text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-116 sk-text">精心优选</text>
				</view>
				<navigator class="cards HotPanel--cards" hover-class="none">
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
				</navigator>
			</view>
			<view class="item HotPanel--item">
				<view class="title HotPanel--title">
					<text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-72 sk-text">新鲜好物</text>
					<text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-673 sk-text">生活加分项</text>
				</view>
				<navigator class="cards HotPanel--cards" hover-class="none">
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
					<image class="image HotPanel--image sk-image" mode="aspectFit"></image>
				</navigator>
			</view>
		</view>
	</view>
	<view is="components/XtxGuess" class="r">
		<view class="caption XtxGuess--caption">
			<text class="text XtxGuess--text sk-transparent sk-text-0-0000-705 sk-text sk-pseudo sk-pseudo-circle">
				猜你喜欢
			</text>
		</view>
	</view>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.sk-transparent {
	color: transparent !important;
}
.sk-text-3-3333-971 {
	background-image: linear-gradient(transparent 3.3333%, #eeeeee 0%, #eeeeee 96.6667%, transparent 0%) !important;
	background-size: 100% 27.1739rpx;
	position: relative !important;
}
.sk-text {
	background-origin: content-box !important;
	background-clip: content-box !important;
	background-color: transparent !important;
	color: transparent !important;
	background-repeat: repeat-y !important;
}
.sk-text-14-2857-769 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 38.0435rpx;
	position: relative !important;
}
.sk-text-14-2857-303 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-242 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-707 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-312 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-689 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-113 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-410 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-500 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-32 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-258 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 35.5072rpx;
	position: relative !important;
}
.sk-text-14-2857-996 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 43.1159rpx;
	position: relative !important;
}
.sk-text-14-2857-309 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 32.971rpx;
	position: relative !important;
}
.sk-text-14-2857-960 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 43.1159rpx;
	position: relative !important;
}
.sk-text-14-2857-561 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 32.971rpx;
	position: relative !important;
}
.sk-text-14-2857-151 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 43.1159rpx;
	position: relative !important;
}
.sk-text-14-2857-99 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 32.971rpx;
	position: relative !important;
}
.sk-text-14-2857-867 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 43.1159rpx;
	position: relative !important;
}
.sk-text-14-2857-489 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 32.971rpx;
	position: relative !important;
}
.sk-text-0-0000-705 {
	background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
	background-size: 100% 30.7971rpx;
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

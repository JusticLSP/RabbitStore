<template>
	<PageSkeleton v-if="is_loading"></PageSkeleton>
	<template v-else>
		<scroll-view scroll-y class="viewport">
			<!-- 基本信息 -->
			<view class="goods">
				<!-- 商品主图 -->
				<view class="preview">
					<swiper class="swiper-container" circular @change="onChangePictures">
						<template v-for="item in goods_details?.mainPictures" :key="item">
							<swiper-item>
								<image class="image" mode="heightFix" :src="item" @tap="onPreviewPictures(item)" />
							</swiper-item>
						</template>
					</swiper>
					<view class="indicator" v-if="goods_details?.mainPictures">
						<text class="current">{{ current_index + 1 }}</text>
						<text class="split">/</text>
						<text class="total">{{ goods_details?.mainPictures.length }}</text>
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
					<view class="item arrow" @tap="onOpenSkuPopup(SkuMode.Both)">
						<text class="label">选择</text>
						<text class="text ellipsis">{{ select_arr_text }}</text>
					</view>
					<view class="item arrow" @tap="openPopup('address')">
						<text class="label">送至</text>
						<text class="text ellipsis">请选择收获地址</text>
					</view>
					<view class="item arrow" @tap="openPopup('service')">
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
				<view class="addcart" @tap="onOpenSkuPopup(SkuMode.Cart)">加入购物车</view>
				<view class="buynow" @tap="onOpenSkuPopup(SkuMode.Buy)">立即购买</view>
			</view>
		</view>
	</template>
	<uni-popup ref="popup" type="bottom" background-color="#fff">
		<AddressPanel v-if="popup_name === 'address'" @close="popup?.close()"></AddressPanel>
		<ServicePanel v-if="popup_name === 'service'" @close="popup?.close()"></ServicePanel>
	</uni-popup>
	<!-- sku弹出层 -->
	<vk-data-goods-sku-popup
		ref="skuPopupRef"
		v-model="is_show_sku"
		:localdata="loacl_data"
		:mode="mode"
		add-cart-background-color="#ffa868"
		buy-now-background-color="#27ba98"
		:actived-style="{
			color: 'rgb(39, 186, 155)',
			borderColor: 'rgb(39, 186, 155)',
			backgroundColor: 'rgba(39, 186, 155,0.1)'
		}"
		@add-cart="onAddCart"></vk-data-goods-sku-popup>
</template>
<script setup lang="ts">
import { getGoodsDetailsAPI } from '@/api/goods';
import { postMemberCartAPI } from '@/api/cart';
import type { GoodsResult } from '@/types/goods';
import { onLoad } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';
import AddressPanel from './components/AddressPanel.vue';
import ServicePanel from './components/ServicePanel.vue';
import PageSkeleton from './components/PageSkeleton.vue';
import type {
	SkuPopupLocaldata,
	SkuPopupInstance,
	SkuPopupEvent
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup';

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

// 接收页面参数
const query = defineProps<{ id: string }>();

// 获取商品详情信息
const goods_details = ref<GoodsResult>();
const getGoodsDetails = async () => {
	const details = await getGoodsDetailsAPI(query.id);
	goods_details.value = details;
	// sku插件所需的数据格式
	loacl_data.value = {
		_id: details.id,
		goods_thumb: details.mainPictures[0],
		name: details.name,
		spec_list: details.specs.map((item) => {
			return { name: item.name, list: item.values };
		}),
		sku_list: details.skus.map((item) => {
			return {
				_id: item.id,
				goods_id: details.id,
				goods_name: details.name,
				image: item.picture,
				price: item.price * 100, // sku插件需要乘以100整数价格
				stock: item.inventory,
				sku_name_arr: item.specs.map((value) => {
					return value.valueName;
				})
			};
		})
	};
};

// 更改主图轮播图
const current_index = ref(0);
const onChangePictures: UniHelper.SwiperOnChange = (e) => {
	current_index.value = e.detail.current;
};
// 预览主图
const onPreviewPictures = (url: string) => {
	uni.previewImage({
		current: url,
		urls: goods_details.value!.mainPictures,
		loop: true
	});
};

// uni-ui 弹出层ref
const popup = ref<{ open: (type?: UniHelper.UniPopupType) => void; close: () => void }>();
const popup_name = ref<'address' | 'service'>();
// 打开弹出层
const openPopup = (name: typeof popup_name.value) => {
	popup_name.value = name;
	popup.value?.open();
};

// sku弹出层
enum SkuMode {
	Both = 1,
	Cart = 2,
	Buy = 3
}
const skuPopupRef = ref<SkuPopupInstance>();
const is_show_sku = ref(false);
const loacl_data = ref({} as SkuPopupLocaldata);
const mode = ref<SkuMode>(SkuMode.Both);
// 计算选中sku文本值
const select_arr_text = computed(() => {
	return skuPopupRef.value?.selectArr?.join(' ').trim() || '请选择商品规格';
});
// 打开sku弹出层
const onOpenSkuPopup = (type: SkuMode) => {
	mode.value = type;
	is_show_sku.value = true;
};
// 添加到购物车
const onAddCart = async (e: SkuPopupEvent) => {
	const { _id, buy_num } = e;
	await postMemberCartAPI({ skuId: _id, count: buy_num });
	uni.showToast({ icon: 'success', title: '添加成功' });
	is_show_sku.value = false;
};

// 页面加载
const is_loading = ref(false);
onLoad(async () => {
	is_loading.value = true;
	await getGoodsDetails();
	is_loading.value = false;
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
@import './styles/bottom.scss';
</style>

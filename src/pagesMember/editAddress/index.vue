<template>
	<view class="content">
		<uni-forms ref="formRef" :model="form" :rules="rules">
			<!-- 表单内容 -->
			<uni-forms-item class="form-item" name="receiver">
				<text class="label">收货人</text>
				<input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
			</uni-forms-item>
			<uni-forms-item class="form-item" name="contact">
				<text class="label">联系电话</text>
				<input class="input" placeholder="请填写收货人联系电话" v-model="form.contact" />
			</uni-forms-item>
			<uni-forms-item class="form-item" name="fullLocation">
				<text class="label">所在地区</text>
				<picker class="picker" mode="region" :value="form.fullLocation.split(' ')" @change="onChangeRegion">
					<view v-if="form.fullLocation">{{ form.fullLocation }}</view>
					<view v-else class="placeholder">请选择省/市/区(县)</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item class="form-item" name="address">
				<text class="label">详细地址</text>
				<input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
			</uni-forms-item>
			<uni-forms-item class="form-item" name="isDefault">
				<label class="label">设为默认地址</label>
				<switch class="switch" color="#27ba9b" :checked="form.isDefault === 1" @change="onChangeSwitch" />
			</uni-forms-item>
		</uni-forms>
	</view>
	<!-- 提交按钮 -->
	<button class="button" @tap="onSubmit">保存并使用</button>
</template>
<script setup lang="ts">
import { addMemberAddressAPI, putMemberAddressAPI, getMemberAddressDetailAPI } from '@/api/address';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

// 接收页面参数
const query = defineProps<{ id: string }>();

// 表单数据
const form = ref({
	receiver: '', // 收货人
	contact: '', // 联系电话
	fullLocation: '', // 省市区(前端展示)
	provinceCode: '', // 省份编码(后端参数)
	cityCode: '', // 城市编码(后端参数)
	countyCode: '', // 区/县编码(后端参数)
	address: '', // 详细地址
	isDefault: 0 // 默认地址，1为是，0为否
});
// 验证规则
const rules: UniHelper.UniFormsRules = {
	receiver: {
		rules: [{ required: true, errorMessage: '请输入收货人姓名' }]
	},
	contact: {
		rules: [
			{ required: true, errorMessage: '请输入联系电话' },
			{
				validateFunction: function (rule, value, data, callback) {
					const phone = /^1[3-9]\d{9}$/;
					const telephone = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
					if (phone.test(value) || telephone.test(value)) {
						callback();
					} else {
						callback('请输入正确联系电话');
					}
				}
			}
		]
	},
	fullLocation: {
		rules: [{ required: true, errorMessage: '请选择所在地区' }]
	},
	address: {
		rules: [{ required: true, errorMessage: '请输入详情地址' }]
	}
};
// 更改地区选择
const onChangeRegion: UniHelper.RegionPickerOnChange = (e) => {
	const { code, value } = e.detail;
	form.value.fullLocation = value.join(' ');
	const [provinceCode, cityCode, countyCode] = code!;
	Object.assign(form.value, { provinceCode, cityCode, countyCode });
};
// 更改默认地址
const onChangeSwitch: UniHelper.SwitchOnChange = (e) => {
	form.value.isDefault = e.detail.value ? 1 : 0;
};
// 提交表单
const formRef = ref<UniHelper.UniFormsInstance>();
const onSubmit = async () => {
	try {
		await formRef.value?.validate?.();
		if (query.id) {
			await putMemberAddressAPI(query.id, form.value);
		} else {
			await addMemberAddressAPI(form.value);
		}
		uni.showToast({ icon: 'success', title: '保存成功' });
		setTimeout(() => {
			uni.navigateBack({ delta: 1 });
		}, 500);
	} catch (error) {
		console.log(error);
	}
};

// 获取收获地址详情
const getMemberAddressDetailData = async () => {
	if (query.id) {
		const result = await getMemberAddressDetailAPI(query.id);
		Object.assign(form.value, result);
	}
};

onLoad(() => {
	getMemberAddressDetailData();
});
</script>
<style lang="scss">
page {
	background-color: #f4f4f4;
}
.content {
	margin: 20rpx 20rpx 0;
	padding: 0 20rpx;
	border-radius: 10rpx;
	background-color: #fff;
	.form-item,
	.uni-forms-item {
		display: flex;
		align-items: center;
		padding: 25rpx 10rpx 40rpx;
		background-color: #fff;
		font-size: 28rpx;
		border-bottom: 1rpx solid #ddd;
		position: relative;
		margin-bottom: 0;
		// 调整 uni-forms 样式
		.uni-forms-item__content {
			display: flex;
		}
		.uni-forms-item__error {
			margin-left: 200rpx;
		}
		&:last-child {
			border: none;
		}
		.label {
			width: 200rpx;
			color: #333;
		}
		.input {
			flex: 1;
			display: block;
			height: 46rpx;
		}
		.switch {
			position: absolute;
			right: -20rpx;
			transform: scale(0.8);
		}
		.picker {
			flex: 1;
		}
		.placeholder {
			color: #808080;
		}
	}
}
.button {
	height: 80rpx;
	margin: 30rpx 20rpx;
	color: #fff;
	border-radius: 80rpx;
	font-size: 30rpx;
	background-color: #27ba9b;
}
</style>

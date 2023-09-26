<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(() => {
	console.log('App Launch');
});
onShow(() => {
	console.log('App Show');
});
onHide(() => {
	console.log('App Hide');
});
</script>
<style lang="scss">
// 两行省略
.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>

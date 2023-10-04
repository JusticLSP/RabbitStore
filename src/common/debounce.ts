/**
 * 防抖
 * @param {Function} fu 函数
 * @param {Number} time 时间
 */
export default function debounce(fu: Function, time: number) {
	let timer: number | null = null;
	return function () {
		const that = this;
		const args = arguments;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fu.apply(that, args);
		}, time);
	};
}

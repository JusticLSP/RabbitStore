/**
 * 将网页端存储模式改为UniApp存储模式
 */
export const storage = {
	getItem: (key: string) => {
		return uni.getStorageSync(key);
	},
	setItem: (key: string, value: string) => {
		uni.setStorageSync(key, value);
	}
};

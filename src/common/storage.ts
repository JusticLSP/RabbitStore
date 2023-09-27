// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * 创建缓存对象
 * @param  {string=''} prefixKey
 */
export const createStorage = (prefix_key: string = '') => {
	class Storage {
		private prefix_key = prefix_key;

		/**
		 * 获取存储key
		 * @param  {string} key 存储key
		 */
		private getKey(key: string): string {
			return `${this.prefix_key}${key}`.toUpperCase();
		}
		/**
		 * 同步存储
		 * @param  {string} key 存储key
		 * @param  {unknown} value 存储值
		 * @param  {number=DEFAULT_CACHE_TIME} expire 到期时间
		 */
		setSync(key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME) {
			const storage_data = JSON.stringify({
				value,
				expire: expire !== null ? new Date().getTime() + expire * 1000 : null
			});
			uni.setStorageSync(this.getKey(key), storage_data);
		}
		/**
		 * 同步获取存储
		 * @param  {string} key 存储key
		 */
		getSync(key: string) {
			const item = uni.getStorageSync(this.getKey(key));
			if (item) {
				try {
					const parse = JSON.parse(item);
					const { value, expire } = parse;
					if (expire === null || expire >= Date.now()) {
						return value;
					}
					this.removeSync(key);
				} catch (error) {
					return null;
				}
			}
			return null;
		}
		/**
		 * 同步删除存储
		 * @param  {string} key 存储key
		 */
		removeSync(key: string) {
			uni.removeStorageSync(this.getKey(key));
		}
		/**
		 * 同步清空所有存储
		 */
		clearSync() {
			uni.clearStorageSync();
		}
	}
	return new Storage();
};

export const storage = createStorage();

export default storage;

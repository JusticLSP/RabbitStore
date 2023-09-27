import storage from '@/common/storage';

/**
 * 将网页端存储模式改为UniApp存储模式
 */
export const storage_config = {
	getItem: (key: string) => {
		return storage.getSync(key);
	},
	setItem: (key: string, value: string) => {
		storage.setSync(key, value);
	}
};

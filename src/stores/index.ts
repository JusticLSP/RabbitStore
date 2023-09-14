import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

const store = createPinia();
// 数据持久化
store.use(piniaPluginPersistedstate);

export const setupStore = (app: App) => {
	app.use(store);
};
export { store };

import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from './stores';
import { setupAssets, setupGlobalMethods } from './plugins';

export function createApp() {
	const app = createSSRApp(App);
	setupStore(app);
	setupAssets();
	setupGlobalMethods(app);

	return {
		app
	};
}

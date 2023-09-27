import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from './stores';
import { setupAssets, setupGlobalMethods, setupGlobalInject } from './plugins';

export function createApp() {
	const app = createSSRApp(App);
	setupStore(app);
	setupAssets();
	setupGlobalMethods(app);
	setupGlobalInject(app);

	return {
		app
	};
}

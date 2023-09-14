import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from './stores';
import { setupAssets, setupCustomComponents, setupGlobalMethods } from './plugins';

export function createApp() {
	const app = createSSRApp(App);
	setupStore(app);
	setupAssets();
	setupCustomComponents(app);
	setupGlobalMethods(app);

	return {
		app
	};
}

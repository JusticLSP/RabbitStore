import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [uni()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		}
	};
});

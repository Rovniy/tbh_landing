import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import path from 'path'
export default defineConfig({
	plugins: [ sveltekit() ],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'#components': path.resolve(__dirname, './src/components'),
			'#utils': path.resolve(__dirname, './src/utils'),
			'#store': path.resolve(__dirname, './src/store'),
			'#icon': path.resolve(__dirname, './static/icons'),
			'#root': path.resolve(__dirname, './'),
		}
	}
})

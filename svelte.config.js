import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		enableSourcemap: true
	},
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			fallback: 'index.html',
			precompress: true
		})
	},
	preprocess: sveltePreprocess({
		sourceMap: true,
		scss: {
			includePaths: [ 'src' ]
		}
	})
}
export default config

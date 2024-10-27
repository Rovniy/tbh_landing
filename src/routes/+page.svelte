<div class="wrapper" on:click={createFireFlies} on:mousemove="{parallax}">
	<Music />

	<Backgrounds {mouseX} {mouseY} />

	<canvas id="canvas" class="canvas" bind:this={canvas}></canvas>

	<main class="main">
		<Logo />

		<h1 class="title">
			Join Boo in mobile game on an exciting adventure through a dangerous forest!
		</h1>

		<div class="app_links">
			<!-- TODO replace to correct date -->
			<h2 class="sub_title">Coming this November...</h2>

			{#if false}
			<a href="https://play.google.com/store/apps/details?id=com.Ravy.TinyBooHomecoming" class="external_link"
			   target="_blank" rel="noopener">
				<img src="/images/google_play.svg" alt="Tine Boo: Homecoming in Google Play" class="network"
					 loading="lazy" />
			</a>

			<a href="#" class="external_link disabled" target="_blank" rel="noopener">
				<img src="/images/apple_store.svg" alt="Tine Boo: Homecoming in Apple Store" class="network"
					 loading="lazy" />
			</a>
			{/if}
		</div>
	</main>
</div>

<Footer />

<script lang="ts">
	import '../styles/main.sass'

	import Footer from '../components/footer.svelte'
	import Logo from '../components/logo.svelte'
	import Music from '../components/music.svelte'
	import Backgrounds from '../components/backgrounds.svelte'

	import { createFirefly, startFirefly } from '../utils/firefly.js'
	import { onMount } from 'svelte'

	let canvas, mouseX, mouseY

	const createFireFlies = event => createFirefly(event, 10)

	const parallax = event => {
		mouseX = event.clientX
		mouseY = event.clientY
	}

	onMount(() => {
		startFirefly(canvas)
	})
</script>

<style lang="sass">
	@import "../styles/shared/_vars.sass"

	.wrapper
		padding: 10px
		+square(100%)
		+flex_start_column
		+desktop
			padding: 25px 25px 20px
			max-width: 100vw
			max-height: 100vh
			position: relative
			overflow: hidden

		.canvas
			position: absolute
			top: 0
			left: 0
			+square(100%)

	.main
		+flex_start_center_column
		width: 100%
		margin: auto
		position: relative
		+landscape
			margin: 0 auto
		+tablet
			margin: auto
		+desktop
			+flex_center_column

		.title
			margin: 20px 0 0 0
			font: bold 24px/28px $main_font_family
			color: $uicolor_white
			text-shadow: 2px 2px 2px rgba($uicolor_black, .25)
			text-align: center
			+desktop
				max-width: 800px
				font: bold 44px/52px $main_font_family
				margin: 40px 0 0 0

		.app_links
			margin: 15px 0 0 0
			+flex_center
			gap: 40px
			+desktop
				gap: 60px
				margin: 40px 0 0 0

			.sub_title
				font: bold 18px/24px $main_font_family
				color: $uicolor_white
				text-shadow: 2px 2px 2px rgba($uicolor_black, .25)
				text-align: center
				+desktop
					font: bold 32px/38px $main_font_family

			.external_link
				border-radius: 10px
				max-width: 300px
				position: relative
				z-index: 1
				background: rgba(#000, .3)
				line-height: 0
				transition: background-color .2s ease-in-out

				.network
					width: 100%

				&:hover
					background: rgba(#000, .7)
</style>


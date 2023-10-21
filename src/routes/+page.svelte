<div class="wrapper" on:click={createFireFlies} on:mousemove="{parallax}">
	<div class="backgrounds">
		<div class="bg bg_1" bind:this={bg_1}></div>
		<div class="bg bg_2" bind:this={bg_2}></div>
		<div class="bg bg_3" bind:this={bg_3}></div>
		<div class="bg bg_4" bind:this={bg_4}></div>
		<div class="bg bg_5" bind:this={bg_5}></div>
	</div>

	<canvas id="canvas" class="canvas" bind:this={canvas}></canvas>

	<main class="main">
		<Logo />

		<h1 class="title">
			Join Boo in mobile game on an exciting adventure through a dangerous forest!
		</h1>

		<!--	<img src="/images/boo.png" alt="Tiny Boo" class="boo" />-->

		<div class="app_links">
			<a href="https://play.google.com/store/apps/details?id=com.Ravy.TinyBooHomecoming" class="external_link" target="_blank" rel="noopener">
				<img src="/images/google_play.svg" alt="Tine Boo: Homecoming in Google Play" class="network" loading="lazy" />
			</a>

			<a href="#" class="external_link disabled" target="_blank" rel="noopener">
				<img src="/images/apple_store.svg" alt="Tine Boo: Homecoming in Apple Store" class="network" loading="lazy" />
			</a>
		</div>
	</main>
</div>

<Footer />

<script lang="ts">
import Footer from "../components/footer.svelte"
import Logo from "../components/logo.svelte"

import '../styles/main.sass'
import {startFirefly, createFirefly} from '../utils/firefly.js'
import {onMount} from 'svelte'

let bg_1, bg_2, bg_3, bg_4, bg_5, canvas,
	is_mobile = /Mobile|Android|iP(hone|od)/.test(navigator?.userAgent)

const DELTA = {
	bg_1: 1.5,
	bg_2: 1.2,
	bg_3: 1.1,
	bg_4: 1,
	bg_5: 1,
}

const createFireFlies = event => {
	return createFirefly(event, 10)
}

const parallax = (event) => {
	if (is_mobile) return

	const mouseX = event.clientX
	const mouseY = event.clientY

	const offsetX = (window.innerWidth / 2 - mouseX) * 0.1
	const offsetY = (window.innerHeight / 2 - mouseY) * 0.1

	bg_1.style.transform = `translate(${offsetX * DELTA.bg_1}px, ${offsetY * DELTA.bg_1}px)`
	bg_2.style.transform = `translate(${offsetX * DELTA.bg_2}px, ${offsetY * DELTA.bg_2}px)`
	bg_3.style.transform = `translate(${offsetX * DELTA.bg_3}px, ${offsetY * DELTA.bg_3}px)`
	bg_4.style.transform = `translate(${offsetX * DELTA.bg_4}px, ${offsetY * DELTA.bg_4}px)`
	bg_5.style.transform = `translate(${offsetX * DELTA.bg_5}px, ${offsetY * DELTA.bg_5}px)`
}

onMount(() => {
	const r = document.querySelector('body')
	r.style.setProperty('--style_1', 'url("/bgs/3/1.png")')
	r.style.setProperty('--style_2', 'url("/bgs/3/2.png")')
	r.style.setProperty('--style_3', 'url("/bgs/3/3.png")')
	r.style.setProperty('--style_4', 'url("/bgs/3/4.png")')
	r.style.setProperty('--style_5', 'url("/bgs/3/5.png")')
	startFirefly(canvas)
})

</script>

<style lang="sass">
@import "../styles/shared/_vars.sass"
@import "../styles/shared/helpers"
@import "../styles/shared/responsive"

.wrapper
	padding: 25px 25px 20px
	+square(100%)
	+flex_start_column
	+desktop
		max-width: 100vw
		max-height: 100vh
		position: relative
		overflow: hidden

	.backgrounds
		position: absolute
		top: 0
		left: 0
		+square(100%)
		+flex_center
		overflow: hidden
		+desktop
			overflow: visible

		&:after
			content: ''
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: radial-gradient(circle, rgba($uicolor_black, 0.3), transparent 50%, transparent)

		.bg
			position: absolute
			height: 100%
			background-size: contain
			background-position-y: center
			background-position-x: 50%
			background-repeat: no-repeat
			transform: translate(0, 0)
			margin: auto
			+desktop
				+square(100%)
				background-size: cover

			&.bg_1
				z-index: -2
				+square(130%)
				background-position-y: 80%
				background-size: cover
				background-image: var(--style_1)
				+desktop
					+square(130%)

			&.bg_2
				z-index: -3
				height: 100%
				background-size: cover
				background-image: var(--style_2)
				+square(115%)

			&.bg_3
				z-index: -4
				height: 100%
				background-size: cover
				background-image: var(--style_3)
				+square(115%)

			&.bg_4
				z-index: -5
				height: 100%
				background-size: cover
				background-image: var(--style_4)
				+square(115%)

			&.bg_5
				z-index: -6
				height: 100%
				background-size: cover
				background-image: var(--style_5)
				+square(115%)

	.canvas
		position: absolute
		top: 0
		left: 0
		+square(100%)
.main
	+flex_center_column
	width: 100%
	margin: auto
	position: relative

	.logotype
		max-width: 320px
		+desktop
			max-width: 490px

		img
			width: 100%

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

	.boo
		position: absolute
		top: 100px
		left: calc(50% + 250px)

	.app_links
		margin: 15px 0 0 0
		+flex_center
		gap: 40px
		+desktop
			gap: 60px
			margin: 40px 0 0 0

		.external_link
			border-radius: 10px
			max-width: 300px
			position: relative
			z-index: 1


			.network
				width: 100%

			&:hover
				&:before
					z-index: -1
					content: ''
					position: absolute
					top: 0
					left: 0
					bottom: 4px
					width: 100%
					border-radius: 10px
					background: linear-gradient(to top, rgba($uicolor_black, 50%), transparent)

			&:before
				z-index: -1
				content: ''
				position: absolute
				top: 0
				left: 0
				bottom: 4px
				width: 100%
				border-radius: 10px
				background: linear-gradient(to top, rgba($uicolor_black, 50%), transparent)
				+desktop
					content: none

			&.disabled
				pointer-events: none
				opacity: .3
</style>


<div class="wrapper" on:mousemove="{parallax}" on:click={createFireFlies}>
	<div class="backgrounds">
		<div class="bg bg_1" bind:this={bg_1}></div>
		<div class="bg bg_2" bind:this={bg_2}></div>
		<div class="bg bg_3" bind:this={bg_3}></div>
		<div class="bg bg_4" bind:this={bg_4}></div>
		<div class="bg bg_5" bind:this={bg_5}></div>
	</div>

	<canvas id="canvas" class="canvas" bind:this={canvas}></canvas>

	<slot />
</div>

<script>
import '../styles/main.sass'
import { startFirefly, createFirefly } from '../utils/firefly.js'
import { randomInArray } from '../utils/helpers.js'
import {onMount} from "svelte";

let bg_1, bg_2, bg_3, bg_4, bg_5, canvas

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
	const mouseX = event.clientX;
	const mouseY = event.clientY;

	const offsetX = (window.innerWidth / 2 - mouseX) * 0.1;
	const offsetY = (window.innerHeight / 2 - mouseY) * 0.1;

	bg_1.style.transform = `translate(${offsetX * DELTA.bg_1}px, ${offsetY * DELTA.bg_1}px)`;
	bg_2.style.transform = `translate(${offsetX * DELTA.bg_2}px, ${offsetY * DELTA.bg_2}px)`;
	bg_3.style.transform = `translate(${offsetX * DELTA.bg_3}px, ${offsetY * DELTA.bg_3}px)`;
	bg_4.style.transform = `translate(${offsetX * DELTA.bg_4}px, ${offsetY * DELTA.bg_4}px)`;
	bg_5.style.transform = `translate(${offsetX * DELTA.bg_5}px, ${offsetY * DELTA.bg_5}px)`;
}

onMount(() => {
	const style = randomInArray([ 1,2,3,4,5,6 ])
	const r = document.querySelector('body')
	r.style.setProperty('--style_1', `url("/bgs/${style}/1.png")`)
	r.style.setProperty('--style_2', `url("/bgs/${style}/2.png")`)
	r.style.setProperty('--style_3', `url("/bgs/${style}/3.png")`)
	r.style.setProperty('--style_4', `url("/bgs/${style}/4.png")`)
	r.style.setProperty('--style_5', `url("/bgs/${style}/5.png")`)
	startFirefly(canvas)
})
</script>

<style lang="sass">
@import "../styles/main"

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
		overflow: visible
		+flex_center

		&:after
			content: ''
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: radial-gradient(circle, rgba($uicolor_black, .3), transparent 50%, transparent)

		.bg
			position: absolute
			+square(100%)
			background-size: cover
			background-position-y: center
			background-position-x: 50%
			background-repeat: no-repeat
			transform: translate(0, 0)
			margin: auto

			&.bg_1
				z-index: -2
				background-position-y: 80%
				background-size: 130%
				+square(130%)
				background-image: var(--style_1)
			&.bg_2
				z-index: -3
				background-size: 115%
				+square(115%)
				background-image: var(--style_2)
			&.bg_3
				z-index: -4
				background-size: 110%
				+square(110%)
				background-image: var(--style_3)
			&.bg_4
				z-index: -5
				background-size: 120%
				+square(120%)
				background-image: var(--style_4)
			&.bg_5
				z-index: -6
				background-size: 120%
				+square(120%)
				background-image: var(--style_5)

	.canvas
		position: absolute
		top: 0
		left: 0
		+square(100%)

</style>

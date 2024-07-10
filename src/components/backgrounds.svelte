<div class="backgrounds">
	<div class="bg bg_1" bind:this={bg_1}>
		<img src="{loadedImages?.at(0)?.src}" alt="">
	</div>
	<div class="bg bg_2" bind:this={bg_2}>
		<img src="{loadedImages?.at(1)?.src}" alt="">
	</div>
	<div class="bg bg_3" bind:this={bg_3}>
		<img src="{loadedImages?.at(2)?.src}" alt="">
	</div>
	<div class="bg bg_4" bind:this={bg_4}>
		<img src="{loadedImages?.at(3)?.src}" alt="">
	</div>
	<div class="bg bg_5" bind:this={bg_5}>
		<img src="{loadedImages?.at(4)?.src}" alt="">
	</div>
</div>

<script>
import { onMount } from 'svelte'

export let mouseX = 0
export let mouseY = 0

let progress = 0
let imagesLoaded = 0
let totalImages = 0

let images = [
	'/bgs/3/1.png',
	'/bgs/3/2.png',
	'/bgs/3/3.png',
	'/bgs/3/4.png',
	'/bgs/3/5.png',
]
let loadedImages = [], bg_1, bg_2, bg_3, bg_4, bg_5
let is_mobile = /Mobile|Android|iP(hone|od)/.test(navigator?.userAgent)

const DELTA = {
	bg_1: 1.5,
	bg_2: 1.2,
	bg_3: 1.1,
	bg_4: 1,
	bg_5: 1,
}

function updateProgress() {
	progress = Math.round((imagesLoaded / totalImages) * 100)

	const preloader = document.querySelector('.preloader')

	if (!preloader) return

	const progressNode = preloader.querySelector('.progress')
	if (!progressNode) return

	progressNode.style.width = `${progress}%`

	if (progress === 100) {
		setTimeout(() => {
			preloader.style.opacity = 0
		}, 500)
	}
}

$: parallax(mouseX, mouseY)

function parallax(mX, mY) {
	if (is_mobile) return

	const offsetX = (window.innerWidth / 2 - mX) * 0.1
	const offsetY = (window.innerHeight / 2 - mY) * 0.1

	if (!bg_1 || !bg_2 || !bg_3 || !bg_4 || !bg_5) return

	bg_1.style.transform = `translate(${offsetX * DELTA.bg_1}px, ${offsetY * DELTA.bg_1}px)`
	bg_2.style.transform = `translate(${offsetX * DELTA.bg_2}px, ${offsetY * DELTA.bg_2}px)`
	bg_3.style.transform = `translate(${offsetX * DELTA.bg_3}px, ${offsetY * DELTA.bg_3}px)`
	bg_4.style.transform = `translate(${offsetX * DELTA.bg_4}px, ${offsetY * DELTA.bg_4}px)`
	bg_5.style.transform = `translate(${offsetX * DELTA.bg_5}px, ${offsetY * DELTA.bg_5}px)`
}

function loadImages() {
	totalImages = images.length

	images.forEach((src, index) => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			imagesLoaded += 1
			loadedImages[index] = img

			updateProgress()
		}
	})
}

onMount(() => {
	loadImages()
})
</script>

<style lang="sass">
@import "../styles/shared/_vars.sass"

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
		transition: all .1s ease
		margin: auto
		+flex_center
		+desktop
			+square(100%)
			background-size: cover

		img
			@media (orientation: landscape)
				width: 100%
				height: unset
			@media (orientation: portrait)
				width: unset
				height: 100%

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
</style>

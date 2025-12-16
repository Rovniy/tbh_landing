<script>
</script>

<div class="video_player">
	<iframe width="280" class="video_frame" height="156" src="https://www.youtube.com/embed/TSHmVG3pZsg?autoplay=1&mute=1&playsinline=1&controls=0&loop=1&playlist=TSHmVG3pZsg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

<style lang="sass">
@import "../styles/shared/_vars.sass"

$indent: 10px

.video_player
	margin-top: 40px
	width: 100%
	aspect-ratio: 16/9
	+desktop
		margin: 0
		width: 280px
		position: fixed
		top: $indent
		right: $indent
		z-index: 10

	.video_frame
		width: 100%
		height: 100%
		aspect-ratio: 16/9
		border-radius: 10px
		overflow: hidden
		border: none
		+desktop
			width: auto
			height: auto
</style>



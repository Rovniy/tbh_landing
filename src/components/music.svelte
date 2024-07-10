<div class="player">
	<div class="left_area">
		<div class="cover_area">
			<img src="/images/music_cover.webp" alt="Music cover" class="cover">

			<div class="visual {isPlaying ? 'visible' : ''}">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="meta_area">
			<span class="title">Main theme</span>
			<span class="author">XPLOIT Music</span>
		</div>
	</div>
	<div class="right_area">
		<div class="controls">
			<button class="btn { !isPlaying ? 'pause' : '' }" on:click={togglePlay} />
		</div>
	</div>

	<audio src="/music/main_theme.mp3" bind:this={Player} loop />
</div>

<script lang="ts">
	let isPlaying = false
	let Player

	const togglePlay = () => {
		isPlaying = !isPlaying

		if (isPlaying) return setTimeout(() => Player.play(), 500)

		Player.pause()
	}
</script>

<style lang="sass">
	@import "../styles/shared/_vars.sass"

	.player
		$inner_indent: 10px
		$padding: 10px
		$border_radius: 8px

		position: absolute
		top: 0
		left: 0
		padding: $padding
		+flex_center
		z-index: 10

		.left_area
			+flex_center_start
			gap: 8px
			padding: 0 $inner_indent 0 0
			+tablet
				border-right: 1px solid rgba($uicolor_black, .2)

			.cover_area
				position: relative
				line-height: 0
				overflow: hidden

				.cover
					border-radius: $border_radius

				.visual
					$height: 20px

					position: absolute
					border-radius: 8px
					overflow: hidden
					left: 0
					bottom: 0
					width: 100%
					height: $height
					+flex_start
					justify-content: flex-end
					align-items: flex-end
					transform: translateY(100%)
					transition: transform 2s ease

					@keyframes music
						0%
							height: calc(#{$height} / 2)
						25%
							height: calc(#{$height} / 1.5)
							transform: translateZ(30px)
						50%
							height: $height

					span
						display: block
						width: 10%
						height: calc(#{$height} / 2)
						background: linear-gradient(to top, rgba($uicolor_orange, 1), rgba($uicolor_orange, .7))
						transform-style: preserve-3d
						animation: music 1.5s infinite ease-in-out
						+tablet
							background: linear-gradient(to top, rgba($uicolor_orange, 1), rgba($uicolor_orange, .7))

						@for $i from 2 through 10
							&:nth-of-type(#{$i})
								animation-delay: #{0.2 * ($i - 1)}s

					&.visible
						transform: translateY(0)

			.meta_area
				gap: 8px
				+flex_start_column

				.title
					font: 600 16px/14px $main_font_family
					color: $uicolor_white
					text-shadow: 2px 2px 2px rgba($uicolor_black, .5)
					letter-spacing: 1px

				.author
					font: 400 16px/14px $main_font_family
					color: $uicolor_white
					text-shadow: 2px 2px 2px rgba($uicolor_black, .5)
					letter-spacing: 1px

		.right_area
			position: absolute
			left: $padding
			top: $padding
			width: 58px
			height: 58px
			background: rgba($uicolor_black, .5)
			+flex_center
			border-radius: $border_radius
			overflow: hidden

			+tablet
				padding: 0 0 0 $inner_indent
				position: relative
				left: 0
				top: 0
				width: unset
				height: unset
				background: none

			.controls
				.btn
					cursor: pointer
					border: none
					+square(40px)
					+flex_center
					background: url('/images/player_pause_btn_mobile.svg') no-repeat 0 0 / cover
					opacity: .8
					transition: all .2s ease-in-out
					+tablet
						background: url('/images/player_pause_btn.svg') no-repeat 0 0 / cover

					&.pause
						background: url('/images/player_play_btn_mobile.svg') no-repeat 0 0 / cover
						+tablet
							background: url('/images/player_play_btn.svg') no-repeat 0 0 / cover

					&:hover
						opacity: 1
</style>


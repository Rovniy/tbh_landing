<footer class="footer {add}">
	<div class="copyright_area">
		<a href="https://xploit.ltd/" class="developer_link">
			<img src="/xploit_logo.svg" alt="xploit development" class="xploit" />
			<span class="copy">&copy; 2013-{new Date().getFullYear()} Xploit Ltd. All rights reserved.</span>
		</a>
	</div>

	<div class="social_area">
		<a href="/support" class="privacy">Support</a>
		<a href="/privacy-policy" class="privacy">Privacy Policy</a>
		<a href="https://ravy.pro/categories/tiny-boo" class="privacy" target="_blank">Developer website</a>
	</div>
</footer>

<script>
export let add = ''
</script>

<style lang="sass">
@import "../styles/shared/_vars.sass"

.footer
	+flex_start_center_column
	width: 100%
	margin-top: auto
	padding: 10px
	+tablet
		+flex_space_between
	+desktop
		z-index: 1
		position: fixed
		left: 0
		bottom: 0
		right: 0
		flex-grow: 0
		padding: 0 40px 20px

	.copyright_area
		width: 100%
		margin-top: auto
		+tablet
			margin: 0
			width: auto

		.developer_link
			line-height: 0
			text-decoration: none
			+flex_center_column
			gap: 10px
			+landscape
				+flex_center
			+tablet
				+flex_start
				margin: 0
				width: auto

			.xploit
				height: 15px

			.copy
				font: bold 14px/14px $main_font_family
				color: $uicolor_white
				text-shadow: 2px 2px 2px rgba($uicolor_black, .5)
				text-align: center
				letter-spacing: 1px
				+desktop
					margin: 0 0 0 10px
					text-align: left
					font: bold 16px/16px $main_font_family

	.social_area
		+flex_center_column
		order: -1
		margin: 0 0 20px 0
		gap: 8px
		+landscape
			+flex_center
		+tablet
			+flex_center
			order: 0
			margin: 0

		.privacy
			margin: 0
			text-align: center
			+desktop
				margin: 0 20px 0 0
</style>

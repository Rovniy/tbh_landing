<a href="/">
	<picture class="logotype">
		<!-- Изображение для экранов с шириной до 480px, поддерживающее webp -->
		<source media="(max-width: 487px)" srcset="/images/logo_2x.webp 2x, /images/logo_3x.webp 3x, /images/logo_4x.webp 4x" type="image/webp">
		<source media="(max-width: 487px)" srcset="/images/logo_2x.png 2x, /images/logo_3x.png 3x, /images/logo_4x.png 4x">

		<!-- Изображение для экранов с шириной от 481px до 768px, поддерживающее webp -->
		<source media="(min-width: 481px) and (max-width: 768px)" srcset="/images/logo_2x.webp 2x, /images/logo_3x.webp 3x, /images/logo_4x.webp 4x" type="image/webp">
		<source media="(min-width: 481px) and (max-width: 768px)" srcset="/images/logo_2x.png 2x, /images/logo_3x.png 3x, /images/logo_4x.png 4x">

		<!-- Изображение для экранов с шириной от 769px до 1200px, поддерживающее webp -->
		<source media="(min-width: 769px) and (max-width: 1200px)" srcset="/images/logo_2x.webp 2x, /images/logo_3x.webp 3x, /images/logo_4x.webp 4x" type="image/webp">
		<source media="(min-width: 769px) and (max-width: 1200px)" srcset="/images/logo_2x.png 2x, /images/logo_3x.png 3x, /images/logo_4x.png 4x">

		<!-- Изображение для экранов с шириной 1201px и более, поддерживающее webp -->
		<source media="(min-width: 1201px)" srcset="/images/logo_2x.webp 2x, /images/logo_3x.webp 3x, /images/logo_4x.webp 4x" type="image/webp">
		<source media="(min-width: 1201px)" srcset="/images/logo_2x.png 2x, /images/logo_3x.png 3x, /images/logo_4x.png 4x">

		<!-- Если ни один из вышеперечисленных source не сработал, показываем картинку по умолчанию для экранов с шириной до 480px -->
		<img src="/images/logo.png" alt="Логотип" />
	</picture>
</a>

<style lang="sass">
@import "../styles/shared/_vars.sass"
@import "../styles/shared/helpers"
@import "../styles/shared/responsive"

.logotype
	max-width: 320px
	+desktop
		max-width: 490px

	img
		width: 100%
</style>

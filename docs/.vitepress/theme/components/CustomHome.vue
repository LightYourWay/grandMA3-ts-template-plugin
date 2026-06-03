<script setup lang="ts">
import { computed, provide } from 'vue';
import { Content, useData } from 'vitepress';
import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue';
import VPHomeFeatures from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue';
import { layoutInfoInjectionKey } from 'vitepress/dist/client/theme-default/composables/layout';

// Custom home layout — picked up by VPContent when frontmatter declares
// `layout: CustomHome`. Mirrors VitePress's default `VPHome` but pipes
// the body markdown (`<Content />`) into the hero's `home-hero-image`
// slot, so the showcase renders next to the title text.
const { theme } = useData();

// VPHero gates the image column on `image || heroImageSlotExists`. The
// default Layout's `heroImageSlotExists` reflects slots passed to the
// Layout component, which our CustomHome bypasses. Override the
// injection so VPHero renders the column for the slot we provide below.
provide(layoutInfoInjectionKey, {
	heroImageSlotExists: computed(() => true),
});
</script>

<template>
	<div
		class="VPHome"
		:class="{
			'external-link-icon-enabled': theme.externalLinkIcon,
		}"
	>
		<VPHomeHero>
			<template #home-hero-image>
				<div class="hero-content">
					<Content />
				</div>
			</template>
		</VPHomeHero>
		<VPHomeFeatures />
	</div>
</template>

<style scoped>
.VPHome {
	margin-bottom: 96px;
}

@media (min-width: 768px) {
	.VPHome {
		margin-bottom: 128px;
	}
}

/* Lift the showcase above the hero's background blob and any sibling
   elements — without this the .image-bg glow can ghost the back card
   and the title text could end up sharing its stacking layer. */
.hero-content {
	position: relative;
	z-index: 10;
}

/* Reset margins on the markdown content rendered inside the hero so the
   CardStack sits flush in the image column. */
.hero-content :deep(> *:first-child) {
	margin-top: 0;
}
.hero-content :deep(> *:last-child) {
	margin-bottom: 0;
}
.hero-content :deep(.card-stack) {
	margin: 0;
}

/* VitePress flips the hero to its two-column layout at 960px, but the
   image column is too narrow at that breakpoint for the code cards to
   stay readable. Force the mobile-style stacked layout up to 1200px,
   then enable the two-column layout (and the right-side positioning)
   only above that. */
@media (min-width: 960px) and (max-width: 1199px) {
	/* Stack the hero vertically (cards above title). */
	.VPHome :deep(.VPHero .container) {
		flex-direction: column;
	}
	/* Restore the mobile centered-text alignment that VitePress flips to
	   left at 960px when `.has-image` is set. */
	.VPHome :deep(.VPHero.has-image .container) {
		text-align: center;
	}
	.VPHome :deep(.VPHero.has-image .name),
	.VPHome :deep(.VPHero.has-image .text),
	.VPHome :deep(.VPHero.has-image .tagline) {
		margin: 0 auto;
	}
	.VPHome :deep(.VPHero.has-image .actions) {
		justify-content: center;
	}
	.VPHome :deep(.VPHero .main) {
		order: 2;
		max-width: 592px;
		margin: 0 auto;
	}
	.VPHome :deep(.VPHero .image) {
		order: 1;
		flex-grow: 0;
		width: 100%;
		min-height: 0;
		margin: -108px -24px -48px;
	}
	.VPHome :deep(.image-container) {
		width: 100%;
		max-width: 720px;
		height: auto;
		margin: 0 auto;
		transform: none;
		justify-content: center;
	}
}

/* Below the desktop breakpoint, VitePress sizes `.image-container` to
   a fixed 320/392 px square without flex centering — and the content-
   sized CardStack ends up pinned to the top-left. Make the container
   a centered flex box at all sub-1200 px widths so the stack centers
   regardless of how it grew. */
@media (max-width: 959px) {
	.VPHome :deep(.image-container) {
		width: 100%;
		max-width: 720px;
		height: auto;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
}

/* On mobile, VitePress pulls the image area up with negative top
   margins (-76 / -108 px) so a hero image bleeds against the nav.
   For the card stack that's too tight — drop it down by 32 px so the
   tilted back card has breathing room from the nav bar. */
@media (max-width: 639px) {
	.VPHome :deep(.VPHero .image) {
		margin-top: -20px;
	}
}
@media (min-width: 640px) and (max-width: 1199px) {
	.VPHome :deep(.VPHero .image) {
		margin-top: -52px;
	}
}

@media (min-width: 1200px) {
	.VPHome :deep(.image-container) {
		justify-content: flex-end;
		transform: translate(0, -32px);
	}
	/* Suppress the default circular glow behind the image area — it
	   bleeds through the card edges otherwise. */
	.VPHome :deep(.image-bg) {
		display: none;
	}
}
</style>

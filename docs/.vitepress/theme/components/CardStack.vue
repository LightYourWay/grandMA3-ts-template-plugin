<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
	tsTitle?: string;
	luaTitle?: string;
}>();

// Which card is in front. Persistent — only changes when a card
// (re)receives hover/focus/click. Stays put when the cursor leaves
// the stack entirely.
const front = ref<'ts' | 'lua'>('ts');

const activate = (which: 'ts' | 'lua') => {
	if (front.value === which) return;
	front.value = which;
};
</script>

<template>
	<div class="card-stack" :data-front="front">
		<article
			class="card card-lua"
			tabindex="0"
			@mouseenter="activate('lua')"
			@focusin="activate('lua')"
			@click="activate('lua')"
		>
			<header class="card-header">
				<span class="dot dot-a" />
				<span class="dot dot-b" />
				<span class="dot dot-c" />
				<span class="card-title">{{ luaTitle ?? 'Lua' }}</span>
			</header>
			<div class="card-body">
				<slot name="lua" />
			</div>
		</article>
		<article
			class="card card-ts"
			tabindex="0"
			@mouseenter="activate('ts')"
			@focusin="activate('ts')"
			@click="activate('ts')"
		>
			<header class="card-header">
				<span class="dot dot-a" />
				<span class="dot dot-b" />
				<span class="dot dot-c" />
				<span class="card-title">{{ tsTitle ?? 'TypeScript' }}</span>
			</header>
			<div class="card-body">
				<slot name="ts" />
			</div>
		</article>
	</div>
</template>

<style scoped>
.card-stack {
	position: relative;
	display: grid;
	grid-template-areas: 'card';
	align-items: start; /* each card keeps its own content height */
	justify-items: stretch;
	/* Size the stack to its widest card's intrinsic content — so the
	   code inside never gets clipped — but expand to fill the parent
	   if there's room to spare. */
	width: max-content;
	min-width: 100%;
	margin: 2.5rem auto 4rem;
	perspective: 1600px;
	isolation: isolate;
}

.card {
	grid-area: card;
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	border-radius: 14px;
	background: var(--vp-c-bg);
	border: 1px solid var(--vp-c-divider);
	box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.5);
	overflow: hidden;
	cursor: pointer;
	transform-style: preserve-3d;
	transition:
		transform 0.55s cubic-bezier(0.4, 0.15, 0.2, 1),
		box-shadow 0.4s ease;
	outline: none;
	will-change: transform;
	/* The hero text container is text-align: center on small screens —
	   stop it from cascading into the code blocks inside the cards. */
	text-align: left;
}

/* TS in front — Lua peeks bottom-right. */
.card-stack[data-front='ts'] .card-ts {
	transform: rotate(0deg) translate3d(0, 0, 40px);
	z-index: 2;
}
.card-stack[data-front='ts'] .card-lua {
	transform: rotate(3.5deg) translate3d(40px, 56px, 0);
	z-index: 1;
}

/* Lua in front — TS peeks top-left. */
.card-stack[data-front='lua'] .card-lua {
	transform: rotate(0deg) translate3d(0, 0, 40px);
	z-index: 2;
	box-shadow: 0 24px 60px -18px rgba(0, 0, 0, 0.6);
}
.card-stack[data-front='lua'] .card-ts {
	transform: rotate(-3.5deg) translate3d(-40px, -56px, 0);
	z-index: 1;
}

.card:focus-visible {
	outline: 2px solid var(--vp-c-brand-1);
	outline-offset: 4px;
}

.card-header {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 9px 14px;
	background: var(--vp-c-bg-alt);
	border-bottom: 1px solid var(--vp-c-divider);
	flex-shrink: 0;
}

.dot {
	width: 11px;
	height: 11px;
	border-radius: 50%;
}
.dot-a {
	background: #ff5f57;
}
.dot-b {
	background: #febc2e;
}
.dot-c {
	background: #28c840;
}

.card-title {
	margin-left: 10px;
	font-size: 12px;
	font-weight: 500;
	color: var(--vp-c-text-2);
	font-family: var(--vp-font-family-mono);
	letter-spacing: 0.02em;
}

.card-body {
	padding: 0;
}

/* The code block inside the slot ships with its own VitePress wrapper.
   Strip the redundant chrome so the card frames it cleanly. */
.card-body :deep(div[class*='language-']) {
	margin: 0;
	background: transparent;
	border-radius: 0;
}

.card-body :deep(div[class*='language-'] > pre) {
	background: transparent !important;
	margin: 0;
	padding: 18px 20px;
	font-size: 13px;
}

.card-body :deep(.lang),
.card-body :deep(.copy) {
	display: none;
}

@media (max-width: 720px) {
	.card-stack[data-front='ts'] .card-lua {
		transform: rotate(2.5deg) translate3d(20px, 36px, 0);
	}
	.card-stack[data-front='lua'] .card-ts {
		transform: rotate(-2.5deg) translate3d(-20px, -36px, 0);
	}
}
</style>

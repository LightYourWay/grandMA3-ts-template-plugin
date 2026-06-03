<script setup lang="ts">
defineProps<{
	leftTitle?: string;
	rightTitle?: string;
}>();
</script>

<template>
	<div class="side-by-side">
		<section class="col">
			<header v-if="leftTitle" class="col-header">{{ leftTitle }}</header>
			<div class="col-body">
				<slot name="left" />
			</div>
		</section>
		<section class="col">
			<header v-if="rightTitle" class="col-header">{{ rightTitle }}</header>
			<div class="col-body">
				<slot name="right" />
			</div>
		</section>
	</div>
</template>

<style scoped>
.side-by-side {
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: start; /* size each column to its own content */
	gap: 1.25rem;
	margin: 2rem 0;
}

@media (max-width: 960px) {
	.side-by-side {
		grid-template-columns: 1fr;
	}
}

.col {
	min-width: 0; /* prevent overflow inside grid cells */
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	background: var(--vp-c-bg-soft);
	overflow: hidden;
}

.col-header {
	padding: 0.625rem 1rem;
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: var(--vp-c-text-2);
	background: var(--vp-c-bg-alt);
	border-bottom: 1px solid var(--vp-c-divider);
}

.col-body :deep(div[class*='language-']) {
	margin: 0;
	border-radius: 0;
}
</style>

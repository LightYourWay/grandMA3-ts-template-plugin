/// <reference types="vite/client" />
/// <reference types="node" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
	export default component;
}

declare module '*.css';

// VitePress doesn't publish type definitions for its internal client
// modules — CustomHome.vue imports a few of them. Declare them as
// untyped so the IDE TS plugin stops complaining.
declare module 'vitepress/dist/client/theme-default/composables/layout';
declare module 'vitepress/dist/client/theme-default/components/VPHomeHero.vue';
declare module 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue';
declare module 'vitepress/dist/client/theme-default/components/VPHomeContent.vue';

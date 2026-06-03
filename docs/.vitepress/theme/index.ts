import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import '@shikijs/vitepress-twoslash/style.css';
import DefaultTheme from 'vitepress/theme';
import type { EnhanceAppContext } from 'vitepress';
import CardStack from './components/CardStack.vue';
import CustomHome from './components/CustomHome.vue';
import SideBySide from './components/SideBySide.vue';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }: EnhanceAppContext) {
		app.use(TwoslashFloatingVue);
		// Custom home layout — picked up via `layout: CustomHome` in frontmatter.
		// Renders body markdown between hero and features (vs VitePress's
		// default home layout which renders it after features).
		app.component('CustomHome', CustomHome);
		app.component('CardStack', CardStack);
		app.component('SideBySide', SideBySide);
	},
};

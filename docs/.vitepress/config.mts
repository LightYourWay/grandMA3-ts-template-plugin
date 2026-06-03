import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { defineConfig } from 'vitepress';

// Auto-discover every Markdown file in `docs/<folder>/` (except the
// `index.md` landing) and build a sidebar item list from it. The display
// label is taken from the first `# ` heading; the link slug is the
// filename without `.md`. Sort order respects an optional frontmatter
// `order: N` field; files without it fall back to alphabetical-by-filename
// after the ones that have it. Drop a new file in the folder and it shows
// up automatically — no config edit needed.
function discoverPages(folder: string) {
	const dir = resolve(process.cwd(), 'docs', folder);

	const items = readdirSync(dir)
		.filter((f) => f.endsWith('.md') && f !== 'index.md' && !f.startsWith('.'))
		.map((file) => {
			const content = readFileSync(resolve(dir, file), 'utf-8');
			const fm = content.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
			const order = Number(fm.match(/^order:\s*(\d+)/m)?.[1]) || Number.MAX_SAFE_INTEGER;
			const title = content.match(/^#\s+(.+)$/m)?.[1].trim() ?? file.replace(/\.md$/, '');
			return {
				text: title,
				link: `/${folder}/${file.replace(/\.md$/, '')}`,
				order,
				file,
			};
		})
		.sort((a, b) => a.order - b.order || a.file.localeCompare(b.file));

	return items.map(({ text, link }) => ({ text, link }));
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'grandMA3 Plugin Starter',
	description: 'Documentation for the grandMA3 TypeScript plugin starter.',
	// Custom domain / root deploy — keep `/`. For a default
	// `<user>.github.io/<repo>` Pages URL, set this to `/<repo>/`.
	base: '/',
	cleanUrls: true,
	lastUpdated: true,

	head: [['link', { rel: 'icon', href: '/favicon.svg' }]],

	markdown: {
		// Compile-time IntelliSense for ` ```ts twoslash ` code blocks.
		// Load the same ambient type packages the plugin itself uses so
		// snippets can reference MA3 globals (`GetObject`, `Printf`,
		// `Sequence`, `Cue`, `Recipe`, …) without having to redeclare them.
		codeTransformers: [
			transformerTwoslash({
				twoslashOptions: {
					compilerOptions: {
						// Mirror the plugin's tsconfig so snippets compile against
						// the same MA3 ambients and module semantics the real build
						// uses (commonjs for `export = [...]`, esnext target).
						types: ['@typescript-to-lua/language-extensions', 'lua-types/5.4', 'grandma3-types'],
						target: 99, // ScriptTarget.ESNext
						module: 1, // ModuleKind.CommonJS — needed for `export =`
						strict: true,
					},
				},
			}),
		],
	},

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Guide', link: '/guide/getting-started' },
			{ text: 'Examples', link: '/examples/' },
			{ text: 'Types Reference', link: 'https://grandMA3-types.lukasrunge.de' },
		],

		// Flat sidebar shared across `/guide/*` and `/examples/*` — both
		// categories are listed on every doc page so the reader can jump
		// between Getting Started and Examples from either side. (Doesn't
		// affect the home page; that uses `CustomHome` which has no aside.)
		sidebar: [
			{
				text: 'Guide',
				items: discoverPages('guide'),
			},
			{
				text: 'Examples',
				items: [{ text: 'Overview', link: '/examples/' }, ...discoverPages('examples')],
			},
		],

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/LightYourWay/grandMA3-plugin-starter',
			},
		],

		editLink: {
			pattern: 'https://github.com/LightYourWay/grandMA3-plugin-starter/edit/main/docs/:path',
			text: 'Edit this page on GitHub',
		},

		search: {
			provider: 'local',
		},

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © Lukas Runge Veranstaltungstechnik',
		},
	},
});

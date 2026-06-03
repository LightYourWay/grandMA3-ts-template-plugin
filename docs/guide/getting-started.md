---
order: 1
---

# Getting Started

This starter gives you everything you need to write a grandMA3 plugin in TypeScript and ship it as an importable `.lua` + `.xml` pair.

## Prerequisites

- [Node.js](https://nodejs.org/) LTS
- An IDE (VS Code recommended — the TypeScript language server plugin gives you completions for the MA3 API)

## Clone the starter

For MA3 to discover the plugin during development, clone into MA3's `plugins` folder:

- **Windows:** `C:/ProgramData/MALightingTechnology/gma3_library/datapools/plugins/<your-plugin>`
- **Mac:** `~/MALightingTechnology/gma3_library/datapools/plugins/<your-plugin>`

```bash
git clone https://github.com/LightYourWay/grandMA3-plugin-starter.git <your-plugin>
cd <your-plugin>
npm install
```

## Adapt the metadata

Edit `package.json` to reflect your plugin:

```json
{
	"name": "my-new-plugin",
	"version": "0.0.1",
	"description": "A plugin that will change the lighting industry forever.",
	"author": "Max Mustermann",
	"license": "MIT",
	"gma_version": "2.4.2.2"
}
```

Edit `src/LICENSE` so the chosen license is prepended to your compiled Lua bundle. Keep the `[year]` and `[fullname]` placeholders — they get substituted with the current year and `package.json`'s `author` on every build.

## Write your plugin

The plugin entry point is `src/plugin.ts`. The starter ships with the four standard MA3 entry points wired up:

```ts
function Load() {}
function Main(display_handle: number, argument: any) {}
function Cleanup() {}
function Execute(Type: string, ...args: any[]) {}

export = [Main, Cleanup, Execute];
```

| Hook      | When                                                      |
| --------- | --------------------------------------------------------- |
| `Load`    | When MA3 imports the plugin                               |
| `Main`    | When the plugin is pressed or `Go+` is executed on it     |
| `Cleanup` | On plugin teardown                                        |
| `Execute` | Custom executions (`Plugin <name> Execute <Type> <args>`) |

## Build

For development with watch mode:

```bash
npm run dev
```

For a one-shot production build:

```bash
npm run build
```

Both emit `dist/<your-plugin>.lua` and `dist/<your-plugin>.xml` — the names derive from `package.json`'s `name`, and the XML's `Path` attribute is derived from the bundle's location inside your MA3 plugins directory.

## Import into grandMA3

If you cloned into the MA3 plugins folder, the plugin is discoverable directly from the MA3 import dialog. See the [README](https://github.com/LightYourWay/grandMA3-plugin-starter#readme) for screenshots.

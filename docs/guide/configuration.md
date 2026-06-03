---
order: 2
---

# Configuration

Most of the build pipeline is driven by two files: `tsconfig.json` and `package.json`.

## `tsconfig.json`

The `tstl` section configures TypeScriptToLua and the `grandma3-tstl-plugin` packaging step.

```jsonc
{
	"tstl": {
		"luaTarget": "5.4",
		"noHeader": true,
		"luaBundle": "dist",
		"luaBundleEntry": "src/plugin.ts",
		"noImplicitSelf": true,
		"luaPlugins": [{ "name": "grandma3-tstl-plugin", "license": "src/LICENSE" }],
	},
}
```

| Field | Purpose |
| --- | --- |
| `luaTarget` | MA3 runs Lua 5.4 (as of MA3 2.4). Keep aligned with the host MA3 version. |
| `luaBundle` | A directory. The bundle is written as `<luaBundle>/<package-name>.lua`. |
| `luaBundleEntry` | Entry-point `.ts` file. |
| `luaPlugins[0].license` | Path (relative to the project) to a license file that's prepended to the compiled bundle as Lua comments. Omit to disable the prepend. |

## `package.json` fields the build reads

```json
{
	"name": "my-plugin",
	"version": "0.0.1",
	"author": "Max Mustermann",
	"gma_version": "2.4.2.2"
}
```

| Field | Used for |
| --- | --- |
| `name` | The output filenames (`dist/<name>.lua`, `dist/<name>.xml`) and the `Plugin Name` / `ComponentLua Name` attributes in the XML. |
| `version` | The `Plugin Version` attribute in the XML. |
| `author` | The `Plugin Author` attribute in the XML; also substitutes `[fullname]` in the prepended license. |
| `gma_version` | The XML's `<GMA3 DataVersion="...">` — should match the MA3 version your plugin targets. |

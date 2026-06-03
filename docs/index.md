---
# https://vitepress.dev/reference/default-theme-home-page
# `CustomHome` is registered in .vitepress/theme/index.ts. It mirrors
# the default `home` layout but renders body markdown between the hero
# and the features grid (instead of after the features).
layout: CustomHome
sidebar: false # opt out — the flat sidebar config would otherwise match here too
aside: false # opt out of the right-side outline as well

hero:
  name: 'grandMA3'
  text: 'Plugin Starter'
  tagline: Write grandMA3 plugins in TypeScript — with full IntelliSense, typed MA3 API, and a one-command path from .ts to importable .lua + .xml
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/LightYourWay/grandMA3-plugin-starter

features:
  - title: TypeScript end-to-end
    details: Write plugin logic against typed MA3 API (grandMA3-types), get autocomplete and inline errors in your editor, compile to Lua with TypeScriptToLua.
  - title: One-command builds
    details: '`npm run build` produces a ready-to-import .lua + .xml pair. No glue scripts to maintain.'
  - title: Release pipeline included
    details: Tag a `v*` release and a GitHub Actions workflow ships a draft Release with the packaged zip.
---

<CardStack ts-title="src/plugin.ts" lua-title="dist/plugin.lua">

<template #ts>

```ts twoslash
import { is } from 'grandma3-toolkit';

const sequences = ObjectList('Sequence 1 thru 10');

sequences.forEach((seq) => {
	if (seq && is.Sequence(seq)) {
		Printf(`${seq.name}: ${seq.autoStart}`);
	}
});
```

</template>

<template #lua>

```lua
local sequences = ObjectList("Sequence 1 thru 10")

local i = 0
while i < #sequences do
    local seq = sequences[i + 1]
    if seq:GetClass() == "Sequence" then
        Printf(seq.name .. ": " .. tostring(seq.autoStart))
    end
    i = i + 1
end
```

</template>

</CardStack>

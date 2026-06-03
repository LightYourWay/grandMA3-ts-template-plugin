# Examples

Short, self-contained snippets that show common MA3 plugin patterns. Each one is a complete `Main()` you can paste into `src/plugin.ts` to try out.

- [Rename a Cue from a Preset](./rename-cue-from-preset) — resolve a cue + preset by address, then rename.
- [Delete Empty Recipes from a Sequence](./clean-empty-recipes) — walk a sequence's CueParts and drop recipes with no preset assigned.
- [Read a DMX Value and Log it](./read-dmx-value) — sample a DMX address and print via `Printf()`.

## Conventions used in the examples

- **Type guards from `grandma3-toolkit`** (`is.Sequence`, `is.Cue`, `is.Preset`, …) narrow the `unknown` return type of `GetObject()` to a concrete class so the rest of the function is properly typed.
- **MA3 query syntax** in strings (e.g. `'Sequence "MySeq" Cue 2'`, `'Preset 5.3'`) — the same syntax you'd type at the command line. Quote names with spaces.
- **`Cmd(string)`** for one-off operations that don't have a typed method, falling back to the canonical command line.

Add your own examples by dropping a new Markdown file in `docs/examples/`.

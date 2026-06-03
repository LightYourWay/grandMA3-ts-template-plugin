# Rename Cue from Preset

Resolve a specific cue, look up a preset by its pool address, and rename the cue to match the preset's name.

```ts twoslash
import { is } from 'grandma3-toolkit';

function Main(): void {
	// 1. Resolve the cue using MA3 query syntax. Sequence names with
	//    spaces must be wrapped in double quotes. GetObject returns
	//    `GenericObj | undefined`, so null-check first.
	const cue = GetObject('Sequence "MySeq" Cue 2');
	if (!cue || !is.Cue(cue)) {
		Printf('Sequence "MySeq" Cue 2 not found.');
		return;
	}

	// 2. Resolve the preset by pool address. "Preset 5.3" means
	//    pool index 5, entry 3 within that pool.
	const preset = GetObject('Preset 5.3');
	if (!preset || !is.Preset(preset)) {
		Printf('Preset 5.3 not found.');
		return;
	}

	// 3. Rename the cue to match the preset's name.
	cue.name = preset.name;
	Printf(`Renamed cue to "${preset.name}".`);
}

export = [Main];
```

## Notes

- **`GetObject(query)`** returns the first object matching MA3's query syntax — the same string you'd type at the command line. Returns `undefined` if nothing matches, so always null-check before doing anything else.
- **`is.Cue` / `is.Preset`** come from `grandma3-toolkit` and act as TypeScript type guards. The combined `if (!x || !is.Cue(x))` first narrows `x` to `GenericObj`, then to the specific class — so inside the rest of the function `.name` is properly typed.
- **`Preset 5.3`** uses MA3's `Pool.Item` notation. Adjust the address for your show.
- **Writing `cue.name`** mutates the object directly; MA3's command-line representation updates immediately.

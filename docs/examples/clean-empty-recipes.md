# Delete Empty Recipes

Walk every Recipe under a sequence and delete the ones with no preset assigned — useful for tidying up after a lot of editing.

The MA3 object tree is **Sequence → Cue → Part → Recipe**, and each level _is_ an array of its children (so a `Sequence` is iterable as `Cue[]`, a `Cue` as `Part[]`, a `Part` as `Recipe[]`). The Recipe's preset reference lives in its `values` property.

```ts twoslash
import { is } from 'grandma3-toolkit';

function Main(): void {
	const seq = GetObject('Sequence 1');
	if (!seq || !is.Sequence(seq)) {
		Printf('Sequence 1 not found.');
		return;
	}

	// Collect every empty recipe across the whole tree before deleting —
	// mutating a pool while iterating it can desync the indices.
	const toDelete: Recipe[] = [];
	seq.forEach((cue) => {
		cue?.forEach((part) => {
			part?.forEach((recipe) => {
				if (recipe && !recipe.values) {
					toDelete.push(recipe);
				}
			});
		});
	});

	toDelete.forEach((recipe) => {
		Cmd(`Delete ${recipe.AddrNative()}`);
	});

	Printf(`Deleted ${toDelete.length} empty recipes from "${seq.name}".`);
}

export = [Main];
```

## Notes

- **`recipe.values`** is the Recipe's preset reference. When no preset is assigned the field is `nil` at runtime, so `!recipe.values` is the "empty" check. The Recipe's group reference lives in `recipe.selection` — substitute that condition if you want to delete recipes with no group instead.
- **Why the optional chaining (`cue?.forEach`)** — each level's iteration produces `T | undefined` because MA3 pools are sparse: an empty slot in the array reads as `undefined`. The `recipe && !recipe.values` guard makes the check safe on both fronts.
- **Collect, then delete.** Pool indices can shift when entries are removed; buffer into a plain TS array first, then issue the deletes.
- **`Cmd(string)`** runs an MA3 command-line string. `recipe.AddrNative()` returns the canonical native address (`<Sequence>.<Cue>.<Part>.<Recipe>`) the command operates on — matches what you'd type by hand.

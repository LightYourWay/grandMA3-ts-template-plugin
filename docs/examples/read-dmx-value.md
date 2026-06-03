# Read DMX Value

Sample a single DMX address and print its current value to the System Monitor via `Printf()`.

```ts twoslash
function Main(): void {
	const universe = 1;
	const address = 5;

	// Read the live DMX value (0..255).
	const value = GetDMXValue(universe, address);

	Printf(`DMX ${universe}.${address} = ${value}`);
}

export = [Main];
```

## Notes

- **`GetDMXValue(universe, address)`** returns the current output value (0–255). Returns `0` if the address is unpatched.
- **`Printf()`** writes to the System Monitor (not the command-line history). Open it from the MA3 GUI's _Settings → System Monitor_ — or run the plugin via `Plugin "<name>"` from the command line and the line shows up immediately.
- **Continuous sampling**: a one-shot `Main()` snapshots once. For a live readout, wrap the body in a `while` loop with a `coroutine.yield()` and bind the plugin as a scheduled task, or read from the `Execute()` entry point each tick.
- **Patched fixtures**: this reads the raw DMX output, not the channel's logical value (intensity %, position, etc.). For attribute-level reads, walk `Patch()` and ask the fixture for its current channel state.

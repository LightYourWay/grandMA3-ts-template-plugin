let pluginName = select(1, ...$vararg)[0];
let componentName = select(2, ...$vararg)[0];
let signalTable = select(3, ...$vararg)[0];
let my_handle = select(4, ...$vararg)[0];

// ****************************************************************
// plugin load entry point
// ****************************************************************
function Load() {
	Echo(`${pluginName} has been loaded...`);
}

Load();

// ****************************************************************
// plugin main entry point
// ****************************************************************
function Main(display_handle: number, argument: any) {
	Printf(`${pluginName} has been called...`);
}

// ****************************************************************
// plugin exit cleanup entry point
// ****************************************************************
function Cleanup() {
	Echo(`${pluginName} has been cleaning up...`);
}

// ****************************************************************
// plugin execute entry point
// ****************************************************************
function Execute(Type: string, ...args: any[]) {
	Echo(`${pluginName} has been executed...`);
}

export = [Main, Cleanup, Execute];

const [pluginName, componentName, signalTable, my_handle] = [...$vararg] as EnvArgs;

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

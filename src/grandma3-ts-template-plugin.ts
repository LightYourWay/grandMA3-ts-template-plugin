// ****************************************************************
// plugin load entry point
// ****************************************************************
function Load() {
	Echo(`grandma3-tstl-template-plugin has been loaded...`);
}

Load();

// ****************************************************************
// plugin main entry point
// ****************************************************************
function Main(display_handle: number, argument: any) {
	Printf(`grandma3-tstl-template-plugin has been called...`);
}

// ****************************************************************
// plugin exit cleanup entry point
// ****************************************************************
function Cleanup() {
	Echo(`grandma3-tstl-template-plugin has been cleaning up...`);
}

// ****************************************************************
// plugin execute entry point
// ****************************************************************
function Execute(Type: string, ...args: any[]) {
	Echo(`grandma3-tstl-template-plugin has been executed...`);
}

export = [Main, Cleanup, Execute];
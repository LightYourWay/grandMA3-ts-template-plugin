# grandMA3 TypeScript Template Plugin
A starting point for your grandMA3 plugin project written in TypeScript.

## build on
<div align="center">
		<a style="text-decoration:inherit; color: inherit; cursor: pointer;" href="https://typescripttolua.github.io" target="_blank">
    <img src="https://raw.githubusercontent.com/TypeScriptToLua/TypeScriptToLua/master/logo-hq.png?raw=true" alt="TypeScriptToLua" width="256" />
    <h1 style="text-decoration:inherit; color: inherit; cursor: pointer;" href="https://typescripttolua.github.io" target="_blank">
        <p>TypeScriptToLua</p>
    </h1>
		</a>
</div>

### as well as:

- [**grandMA3-types**](https://github.com/LightYourWay/grandMA3-types) - TypeScript definitions for the grandMA3 Lua API
- [**grandMA3-tstl-plugin**](https://github.com/LightYourWay/grandMA3-tstl-plugin) - a TypeScriptToLua plugin that allows for direct export to grandMA3 compatible Lua files

## prerequisites
- [**Node.js®**](https://nodejs.org/) LTS
- [**Visual Studio Code**](https://code.visualstudio.com/) or any other IDE / Text Editor

## download template
To optimize the development process it's recommended to download the plugin template to following `<path>` for development:
  - **Windows:** `C:/ProgramData/MALightingTechnology/gma3_library/datapools/plugins/my-new-plugin`
  - **Mac:** `HD/users/[username]/MALightingTechnology/gma3_library/datapools/plugins/my-new-plugin`

This can either be done thru downloading the repos as [`*.zip`](https://github.com/LightYourWay/grandMA3-ts-template-plugin/archive/refs/heads/master.zip) and upacking at said path or directly cloing the repository via cmdline.

```bash
git clone https://github.com/LightYourWay/grandMA3-ts-template-plugin.git <path>
```

## install dependencies
Open the `<path>` in your IDE
```bash
code <path>
```
and install all dependencies with `npm` in the terminal:
```bash
npm install
```

## add metadata
Change `package.json` to reflect your project.
```json
"name": "my-new-plugin",
"version": "0.0.1",
"description": "A plugin that will change the lighting industry forever.",
"author": "Max Mustermann",
"license": "MIT",
"gma_version": "1.6.3.7",
```

## choose a license

Change `src/LICENSE` to reflect your desired license as it will be inserted on top of every compiled file to let others know about the conditions which come with using your software. Please use the placeholders `[year]` and `[fullname]` for year of creation and author information inside the license file. If you are not sure which licence suits your project best you can get an overview of existing Open Source Software Licenses at [choosealicense.com](https://choosealicense.com)

## develop features
Add your features to the plugin entrypoint at `plugin.ts`
```ts
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
	Printf(`MY NEW FEATURE!!!`)
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
```

There are **four entrypoints** to hook functions into:
- **Load** is executed when the plugin is imported in the first place
- **Main** is executed when the plugin is pressed or `Go+` is executed on the plugin
- **Cleanup** is currently unknown
- **Execute** is currently unknown

## compile to lua

### development
To build your plugin for development and watch for file changes to automatically recompile run:
```bash
npm run watch 
```
### production
To build your plugin for production run:
```bash
npm run build 
```

## import into grandMA3
As long as the plugin development folder is located in the said `<path>` of grandMA3 the plugin can directly be imported like so: [![How to import the plugin](https://i.imgur.com/1zJvKD5.png)](https://i.imgur.com/1zJvKD5.png)

### :tada: you successfully loaded a plugin written in TypeScript into the grandMA3 :sparkles:
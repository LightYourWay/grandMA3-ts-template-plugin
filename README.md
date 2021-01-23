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

## install
```bash
git clone https://github.com/LightYourWay/grandMA3-ts-template-plugin.git && \
cd grandMA3-ts-template-plugin
```

## build
```bash
npm run build 
```

## import into grandMA3
As long as the plugin development folder is located in the `lib_plugins` folder of grandMA3 the plugin can directly be imported like so: [![How to import the plugin](https://i.imgur.com/1zJvKD5.png)](https://i.imgur.com/1zJvKD5.png)

### :tada: you successfully loaded a plugin written in TypeScript into the grandMA3 :sparkles:
# Nuxt Module

This project is for learning how to create and publish a Nuxt module 
component library which utilizes other modules or packages . For 
this purpose we used `tailwindcss` and `primevue` in our project.

## Creating and Running Project

Nuxt provides a project template for creating modules. In order to generate a 
new module template use the command below;

```bash
npx nuxi init -t module <module-name>
```

To run your module project

```bash
npm install
npm run dev:prepare
npm run dev
```

The template contains `src` folder containing your module, `playground` nuxt 
app and a `test` folder. The `src` folder contains your module components and
a `module.ts` file whic is a `nuxt.config.ts` equivalent where your module 
configuration will be done. 

Use the following [Module Author Guide][] for further details on how to add 
components, composables, plugins, other modules to your module project.

> [!NOTE]
>
> For the context of this project, we currently removed the tests folder and 
> do not run any tests before publishing


## Publishing to `npm`

The `package.json` file included in project contains all the information
when publishing to npm registry. For more details visit [npm][] documentation

### Publishing from cli

In order to publish npm from cli use the following commands;

```bash
// this will direct you to npm for authentication
npm addUser
...
npm publish --access public
```

### Publishing with GitHub actions

To publish your package using GitHub actions, you will need an access token for
your npm account. Create and store your access token in github secrets and
use in your workflow. [npm publish](.github/workflows/npm-publish.yml)

## Notes

### Adding `primevue`

We had issues when when adding `primevue` by installing `@primevue/nuxt-module` 
through our module, the current workaround for us is to add `primevue` directly
to the `_nuxtApp.vueApp` and bundle `primevue` and related dependencies in our 
`package.json`.

Current `addPlugin` helper does not support passing any parameters, so the work
around for setting theme for `primevue` was to expose the config from module to
nuxt configuration, set a public variable in runtime config and use that value 
in a plugin.

```javascript
// nuxt.config.ts
mouseless: {
  theme: Aura,
},

// module.ts
_nuxt.options.runtimeConfig.public.theme = _options.theme

// plugin.ts
const theme = useRuntimeConfig().public.theme;
```

[npm]: https://docs.npmjs.com/
[Module Author Guide]: https://nuxt.com/docs/guide/going-further/modules
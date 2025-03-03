import { defineNuxtModule, addPlugin, createResolver, addComponentsDir, addImportsDir, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  theme: object
}

export default defineNuxtModule({
  meta: {
    name: 'mouseless/learn-javascript',
    configKey: 'mouseless',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _nuxt.options.ssr = false

    _nuxt.options.runtimeConfig.public.theme = _options.theme

    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })

    addImportsDir(resolver.resolve('./runtime/composables'), { prepend: true })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    await installModule('@nuxtjs/tailwindcss', {
      exposeConfig: true,
      cssPath: resolver.resolve('./runtime/assets/tailwind.css'),
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolver.resolve('./runtime/*.{mjs,js,ts}'),
          ],
        },
      },
    })
  },
})

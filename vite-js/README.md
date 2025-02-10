# Vite.js

Vite.js speeds up the development process with its
[Hot Module Replacement][] feature. Because of this
feature, we used to research, we learned, we use it.

## Hot Module Replacement

Hot Module Replacement, as the name suggests, watches the source content during
development and updates the built content in case of a change.This eliminates
the need to stop and restart the project every time a change is required.

## How to Use?

There are many different ways to use it. For example, we use `Nuxt` on websites
where we present our documents. `Nuxt` is already using `Vite.js`. We configure
and use `Vite.js` in `Nuxt` to speed up the development process. Another way we
use it is to add **Hot Module Replacement** support in the projects we exemplify
with simple html pages and add it to the project to facilitate development.

### Adding to project

When adding vite to an existing project, vite and its dependencies must be
installed first in the directory you want.

```bash
npm install -D vite
```

After that, it's just a matter of starting the vite

```bash
npx vite
```

or, if you want to use npm scripts just configure `package.json` like below

```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

In this case the vite will search for the file to serve and serve it when it
finds it. We will continue with a simple `index.html` and its links to style and
script files.

> [!NOTE]
>
> It is important to note that Vite watches files based on the dependencies of
> the files it serves. So it will not track a change in an unrelated file unless
> you tell it to.

### Configuring

It will automatically detect `vite.config.js` that you create in the root
directory to configure Vite. You can also use a different filename. If you
choose a different name, you just need to specify it with `--config` when
running Vite so that it can detect the configuration file.

For the simplest configuration, the following setup is sufficient:

```js
export default {
  // config options
}
```

However, with this approach, it can be difficult to see the available
configuration options. That's why I recommend using the following structure:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

Of course, there are many other ways to configure Vite. To explore them, check
out this [page][configuring-vite].

### Configuring on Other Frameworks

Frameworks like Nuxt have their own Vite configurations, meaning they won't
directly accept the vite.config.js file you provide. Instead, they typically
allow you to configure Vite through their own configuration files, plugins, or
modules. At least, that's how Nuxt handles it.

With Nuxt, you can configure Vite using the `nuxt.config.ts` file, as shown
below. For more details on available configuration options, check out this
[page][vite-configuration-on-nuxt].

```ts
export default defineNuxtConfig({
    ...
    vite: {
        dev: ...,
        envDir: ...,
        ...
    }
})
```

If you plan to configure Vite using a module or plugin, you can check out our
[example](./configure-in-nuxt/.theme/modules/mouselessway.js).

[Hot Module Replacement]: https://vite.dev/guide/features.html#hot-module-replacement
[configuring-vite]: https://vite.dev/config/#configuring-vite
[vite-configuration-on-nuxt]: https://nuxt.com/docs/api/nuxt-config#vite
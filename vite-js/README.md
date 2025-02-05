# Vite.js

Vite.js speeds up the development process with its
[Hot Module Replacement](hot-module-replacement) feature. Because of this
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

After that, it's just a matter of starting the vite.

```bash
npx vite
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

TBD...

hot-module-replacement: https://vite.dev/guide/features.html#hot-module-replacement

import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.hook("vite:extendConfig", (config, { isClient }) => {
      if (isClient) { return; }

      config.plugins?.push({
        name: "content-watch",
        configureServer(server) {
          const demoMdPath = resolve(nuxt.options.rootDir, "../Demo.md");
          server.watcher.add(demoMdPath);
          server.watcher.on("change", (file) => {
            if (file === demoMdPath) {
              console.log("Demo.md changed!");
            }
          });
        },
      });
    });
  },
});

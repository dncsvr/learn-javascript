import { defineNuxtModule } from '@nuxt/kit'
import { copyFile, mkdir } from 'fs/promises'
import { resolve } from 'path'

export default defineNuxtModule({
  meta: {
    name: '@nuxtjs/mouselessway',
    configKey: 'mouselessway'
  },
  setup(_, nuxt) {
    nuxt.hook('build:before', () => {
      initializeContent(nuxt.options.rootDir)
    })

    nuxt.hook('vite:extendConfig', (config, { isServer }) => {
      if (!isServer) {
        watch(config, nuxt.options.rootDir)
      }
    })
  }
})

async function initializeContent(rootDir) {
  try {
    await copyContent(rootDir)
    console.log('Content initialized successfully')
  } catch (error) {
    console.error('Error initializing content:', error)
  }
}

async function copyContent(rootDir) {
  const sourcePath = resolve(rootDir, '../Demo.md')
  const targetDir = resolve(rootDir, './content')
  const targetPath = resolve(targetDir, 'demo.md')

  try {
    await mkdir(targetDir, { recursive: true })

    await copyFile(sourcePath, targetPath)
    console.log('Content copied successfully')
  } catch (error) {
    console.error('Error copying content:', error)
  }
}
function watch(config, rootDir) {
  config.plugins?.push({
    name: 'content-watch',
    configureServer(server) {
      const demoMdPath = resolve(rootDir, '../Demo.md')
      server.watcher.add(demoMdPath)
      server.watcher.on('change', (file) => {
        if (file === demoMdPath) {
          copyContent(rootDir)
        }
      })
    }
  })
  return config
}
<template>
  <div class="h-screen">
    <div class="flex flex-col gap-8 justify-center items-center h-3/4">
      <Panel>
        <template #header>
          <h1 class="w-full text-center text-xl">
            Welcome
          </h1>
        </template>
        <div class="flex flex-col gap-8 justify-center items-center h-3/4">
          <p class="m-0">
            This page is a demo for using components and composables from a nuxt module.
          </p>
          <WithPrimevue v-model="name" />
          <Button
            label="Say Hello"
            @click="sayHello()"
          />
          <WithPrimevueAndTailwind :text="response" />
        </div>
      </Panel>
    </div>
  </div>
</template>

<script setup>
import { Button, Panel } from 'primevue'

const comp = useComposable()
const name = defineModel(String)
const response = ref()

function sayHello() {
  response.value = comp.sayHello(name.value)
}
</script>

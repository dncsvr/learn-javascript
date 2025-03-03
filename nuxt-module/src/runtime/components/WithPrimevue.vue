<template>
  <InputText
    v-model="text"
    v-tooltip="'Enter your username'"
    class=""
    type="text"
    placeholder="username"
  />
</template>

<script setup>
import { InputText } from 'primevue'

const text = defineModel(String)
</script>

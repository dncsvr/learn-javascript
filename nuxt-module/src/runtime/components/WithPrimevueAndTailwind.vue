<template>
  <Message
    v-if="text"
    class="mt-4"
    severity="success"
  >
    {{ text }}
  </Message>
</template>

<script setup>
import { Message } from 'primevue'

defineProps({
  text: String,
})
</script>

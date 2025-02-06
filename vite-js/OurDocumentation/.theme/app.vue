<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').first())
</script>

<template>
  <div>
    <ContentRenderer v-if="home" :value="home" />
  </div>
</template>

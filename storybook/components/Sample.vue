<template>
  <div :class="color">
    My Background Color is {{ color }}
  </div>
</template>
<script setup>
defineProps({
  color: { type: String, required: true }
})
</script>
<style lang="css">
.red { background-color: red; }
.blue { background-color: blue; color: white; }
</style>

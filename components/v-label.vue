<script setup lang="ts">
withDefaults(defineProps<{
  fieldName: string;
  label: string;
  required?: boolean;
}>(), {
  required: false,
});
</script>

<template>
  <label :for="fieldName">
    <span v-if="required" class="text-red-600">*</span>
    {{label}}
  </label>
</template>

<style scoped>

</style>
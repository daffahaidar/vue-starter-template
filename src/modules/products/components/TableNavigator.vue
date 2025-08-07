<script setup lang="ts">
const props = defineProps({
  params: {
    type: Object,
  },
})
</script>

<template>
  <router-link
    :to="`/ag-grid-example/products/${props.params?.data?.product_id}`"
    class="hover:text-primary font-medium hover:underline"
  >
    {{ props.params?.value }}
  </router-link>
</template>

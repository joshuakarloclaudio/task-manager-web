<template>
  <div class="grid grid-cols-5 space-y-4 p-6">
    <div class="col-span-5 flex justify-between items-center">
      <p class="text-lg font-semibold">{{ props.title }}</p>
      <font-awesome-icon
        class="text-[#8b8f9d] cursor-pointer"
        icon="fa-solid fa-pencil"
      />
    </div>
    <template v-for="row in props.data"
      ><div class="col-span-2 text-[#8b8f9d]">{{ row.label }}</div>
      <div :class="['col-span-3', row.color && `text-${row.color}`]">
        {{ row.value }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  data: { label: string; value: string | number }[];
}>();
</script>

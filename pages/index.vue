<template>
  <UContainer class="mt-10">
    <UButton
      icon="i-heroicons-plus"
      label="Create New Task"
      @click="dialogIsOpen = true"
    />
    <TasksTable />
  </UContainer>
  <TasksTaskModal />
  <TasksDeleteModal />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'My Tasks',
});

const store = useTaskStore();
const { dialogIsOpen } = storeToRefs(store);
</script>

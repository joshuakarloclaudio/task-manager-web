<template>
  <div class="relative bg-gray-200 rounded-xl mt-4 overflow-auto">
    <div class="shadow-sm my-8" v-if="tasks.length > 0">
      <table class="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
            ></th>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
            >
              Title
            </th>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
            >
              Description
            </th>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
            >
              Due Date
            </th>

            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800 align-text-top">
          <tr
            :class="
              isOverdue(task.due_date) && !task.completed
                ? 'bg-red-50'
                : task.completed
                ? 'bg-primary-50'
                : ''
            "
            v-for="task in tasks"
          >
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
            >
              <UCheckbox
                @change="handleUpdateStatus(task)"
                v-model="task.completed"
              />
            </td>
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
            >
              {{ task.title }}
            </td>
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 whitespace-pre-wrap max-w-xs"
            >
              {{ task.description }}
            </td>
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 min-w-sm"
            >
              {{ task.due_date ? formatDate(task.due_date) : 'No due date' }}
            </td>
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 max-w-xs"
            >
              <div class="flex gap-x-2">
                <div class="flex grow">
                  <UButton
                    icon="i-heroicons-information-circle"
                    color="blue"
                    label="View"
                    @click="handleView(task.id)"
                    block
                  />
                </div>
                <div class="flex grow">
                  <UButton
                    color="red"
                    icon="i-heroicons-trash"
                    label="Delete"
                    @click="handleDelete(task)"
                    block
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-8 text-gray-500 text-xl p-6" v-else>
      <UIcon class="mr-2" name="i-heroicons-information-circle" />It's quiet in
      here. Use the <UKbd size="md">+ Create New Task</UKbd> button above to
      create your first task.
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Task } from '~/types/task';
import { DateTime } from 'luxon';

const toast = useToast();
const store = useTaskStore();

const formatDate = (date: string) => {
  return DateTime.fromSQL(date).toFormat('LLL d, yyyy');
};

const isOverdue = (date: string) => {
  if (date === '') return false;

  const now = DateTime.now();
  const dueDate = DateTime.fromSQL(date);

  return now.startOf('day') >= dueDate.startOf('day');
};

const {
  tasks,
  selectedTaskId,
  dialogIsOpen,
  deleteDialogIsOpen,
  taskForDeletion,
} = storeToRefs(store);

const handleView = (id: number) => {
  selectedTaskId.value = id;
  dialogIsOpen.value = true;
};

const handleDelete = (task: Task) => {
  deleteDialogIsOpen.value = true;
  taskForDeletion.value = task;
};

const handleUpdateStatus = async (task: Task) => {
  const { error } = await store.updateCompletionStatus(task);

  if (error.value) {
    toast.add({
      color: 'red',
      title: error.value.data?.message ?? 'An unknown error has occured',
    });
  } else {
    toast.add({
      title: `Task successfully marked as ${
        task.completed ? 'complete' : 'incomplete'
      }`,
    });
  }
};

await store.fetchTasks();
</script>

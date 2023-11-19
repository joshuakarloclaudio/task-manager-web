<template>
  <TransitionRoot as="template" :show="deleteDialogIsOpen">
    <Dialog as="div" class="relative z-10" @close="closeDialog">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >Confirm Task Deletion</DialogTitle
                  >
                  <div class="mt-2">
                    <div
                      class="my-10 grid grid-cols-1 gap-x-6 gap-y-4 grid-cols-12"
                    >
                      <div class="col-span-full">
                        Are you sure you want to delete this task entitled
                        <span class="text-primary font-bold">{{
                          taskForDeletion?.title
                        }}</span
                        >? This action is irreversible.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <UButton
                  label="Delete"
                  type="button"
                  color="red"
                  @click="confirmDelete"
                />
                <UButton
                  color="gray"
                  @click="closeDialog"
                  label="Cancel"
                  type="button"
                  class="mr-2"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const toast = useToast();
const store = useTaskStore();
const { deleteDialogIsOpen, taskForDeletion } = storeToRefs(store);

const closeDialog = () => {
  deleteDialogIsOpen.value = false;
};

const confirmDelete = async () => {
  closeDialog();
  const { error } = await store.deleteTask(taskForDeletion.value?.id);

  if (error.value) {
    toast.add({
      color: 'red',
      title: 'Error',
      description: error.value.data?.message ?? 'An unknown error has occurred',
    });
  } else {
    toast.add({
      title: 'Task deleted successfully',
    });
  }
};
</script>

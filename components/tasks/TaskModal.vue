<template>
  <TransitionRoot as="template" :show="dialogIsOpen">
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
              <UForm :state="form" :validate="validate" @submit="handleSave">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >{{
                        selectedTaskId ? 'Update Task' : 'New Task'
                      }}</DialogTitle
                    >
                    <div class="mt-2">
                      <div
                        class="my-10 grid grid-cols-1 gap-x-6 gap-y-4 grid-cols-12"
                      >
                        <div class="col-span-full">
                          <UFormGroup label="Title" name="title">
                            <UInput
                              v-model="form.title"
                              type="title"
                              id="title"
                              placeholder="Title"
                              :disabled="fetchingData"
                            />
                          </UFormGroup>
                        </div>

                        <div class="col-span-full">
                          <UFormGroup label="Description" name="description">
                            <UTextarea
                              v-model="form.description"
                              type="description"
                              id="description"
                              placeholder="Description"
                              :disabled="fetchingData"
                              :rows="8"
                            />
                          </UFormGroup>
                        </div>

                        <div class="col-span-full">
                          <UFormGroup label="Due Date" name="due_date">
                            <UInput
                              v-model="form.due_date"
                              type="date"
                              id="due_date"
                              placeholder="Due Date (Optional)"
                              :disabled="fetchingData"
                            />
                          </UFormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <UButton
                    :label="selectedTaskId ? 'Update' : 'Save'"
                    type="submit"
                    :loading="loading"
                  />
                  <UButton
                    color="gray"
                    @click="closeDialog"
                    label="Cancel"
                    type="button"
                    class="mr-2"
                  />
                </div>
              </UForm>
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

const form = ref({
  title: '',
  description: '',
  due_date: '',
});

const toast = useToast();

const loading = ref(false);
const fetchingData = ref(false);

const store = useTaskStore();
const { dialogIsOpen, selectedTaskId } = storeToRefs(store);

const clearForm = () => {
  form.value = {
    title: '',
    description: '',
    due_date: '',
  };
};
const closeDialog = () => {
  dialogIsOpen.value = false;
  selectedTaskId.value = null;
  clearForm();
};

watch(dialogIsOpen, async () => {
  if (selectedTaskId.value !== null && dialogIsOpen.value) {
    clearForm();
    fetchingData.value = true;
    const { data, error } = await store.fetchTaskData(selectedTaskId.value);

    if (error.value) {
      toast.add({
        color: 'red',
        title: error.value.data?.message ?? 'An unknown error has occured',
      });
    } else {
      form.value = {
        title: data.value?.data.title ?? '',
        description: data.value?.data.description ?? '',
        due_date: data.value?.data.due_date ?? '',
      };
    }
    fetchingData.value = false;
  }
});

const handleSave = async () => {
  loading.value = true;
  const { error } = await store.saveTask(selectedTaskId.value, form.value);

  if (error.value) {
    toast.add({
      color: 'red',
      title: 'Error',
      description: error.value.data?.message ?? 'An unknown error has occurred',
    });
  } else {
    toast.add({
      color: 'green',
      title: selectedTaskId.value
        ? 'Task updated successfully'
        : 'Task created successfully',
    });
    dialogIsOpen.value = false;
    clearForm();
  }

  loading.value = false;
};

const validate = (state: any) => {
  const errors = [];

  if (!state.title) {
    errors.push({
      path: 'title',
      message: 'Title is required',
    });
  }

  if (!state.description) {
    errors.push({ path: 'description', message: 'Description is required' });
  }

  return errors;
};
</script>

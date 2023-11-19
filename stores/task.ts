import { type Task } from '~/types/task';
import { type TaskForm } from '~/types/task-form';

export const useTaskStore = defineStore('task', () => {
  const dialogIsOpen = ref(false);
  const tasks: Ref<Task[]> = ref([]);

  const fetchTasks = async () => {
    const { data } = await useApiFetch<{ data: Task[] }>('/api/tasks');

    if (data.value) {
      tasks.value = data.value.data.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          completed: task.completed,
        };
      });
    }
  };

  const saveTask = async (id: number | null, form: TaskForm) => {
    const uri = id ? `/api/tasks/${id}` : '/api/tasks';

    const task = await useApiFetch(uri, {
      method: id ? 'patch' : 'post',
      body: form,
    });

    if (!task.error.value) {
      fetchTasks();
      dialogIsOpen.value = false;
    }

    return task;
  };

  const selectedTaskId: Ref<number | null> = ref(null);

  const fetchTaskData = async (id: number) => {
    return await useApiFetch<{ data: Task }>(`/api/tasks/${id}`);
  };

  const deleteDialogIsOpen = ref(false);
  const taskForDeletion: Ref<Task | undefined> = ref();

  const deleteTask = async (id: number | undefined) => {
    const response = await useApiFetch(`/api/tasks/${id}`, {
      method: 'delete',
    });

    if (!response.error.value) await fetchTasks();

    return response;
  };

  const updateCompletionStatus = async (task: Task) => {
    const response = await useApiFetch(
      `/api/tasks/${task.id}/completion-status`,
      {
        method: 'patch',
        body: {
          complete: task.completed,
        },
      }
    );

    if (!response.error.value) await fetchTasks();

    return response;
  };

  return {
    tasks,
    fetchTasks,
    dialogIsOpen,
    saveTask,
    selectedTaskId,
    fetchTaskData,
    deleteDialogIsOpen,
    taskForDeletion,
    deleteTask,
    updateCompletionStatus,
  };
});

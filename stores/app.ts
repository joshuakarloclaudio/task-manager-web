export const useAppStore = defineStore('app', () => {
  const getCsrfToken = async () => {
    await useCustomFetch('/sanctum/csrf-cookie');
  };

  return { getCsrfToken };
});

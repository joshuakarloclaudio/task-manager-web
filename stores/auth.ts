type User = {
  id: number;
  name: string;
  email: string;
};

type Credentials = {
  email: string;
  password: string;
};

type RegistrationInfo = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  const fetchCsrfToken = async () => {
    await useApiFetch('/sanctum/csrf-cookie');
  };

  const logout = async () => {
    await useApiFetch('/api/auth/logout', { method: 'POST' });
    user.value = null;
    navigateTo('/auth/login');
    // refresh token after logout
    fetchCsrfToken();
  };

  const fetchUser = async () => {
    const { data } = await useApiFetch('/api/auth/profile');
    user.value = data.value as User;
  };

  const login = async (credentials: Credentials) => {
    const login = await useApiFetch('/api/auth/login', {
      method: 'POST',
      body: credentials,
    });

    if (!login.error.value) await fetchUser();

    return login;
  };

  const register = async (info: RegistrationInfo) => {
    const register = await useApiFetch('/api/auth/register', {
      method: 'POST',
      body: info,
    });

    if (!register.error.value) await fetchUser();

    return register;
  };

  return {
    user,
    login,
    isLoggedIn,
    fetchUser,
    logout,
    register,
    fetchCsrfToken,
  };
});

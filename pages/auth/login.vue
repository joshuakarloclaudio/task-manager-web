<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <UForm
        :validate="validate"
        :state="form"
        class="space-y-4"
        @submit="handleLogin"
        method="post"
      >
        <UFormGroup label="Email Address" name="email">
          <UInput v-model="form.email" placeholder="Email Address" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Password"
          />
        </UFormGroup>

        <UButton
          color="primary"
          type="submit"
          label="Log in"
          :loading="loading"
          block
        />
      </UForm>

      <p class="mt-5 text-center text-sm text-gray-500">
        Not a member?
        <NuxtLink
          to="/auth/register"
          class="font-semibold leading-6 text-primary hover:text-primary-500"
          >Register here for free.</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});

useHead({
  title: 'Sign in to access your tasks',
});

const toast = useToast();

const form = ref({
  email: 'joshuakarloclaudio@gmail.com',
  password: 'Password123',
});
const loading = ref(false);

const store = useAuthStore();

const { user } = storeToRefs(store);

async function handleLogin() {
  loading.value = true;
  const { error, data } = await store.login(form.value);

  if (error.value) {
    toast.add({
      color: 'red',
      title: 'Authentication Error',
      description: error.value?.data?.message ?? 'An unknown error has occured',
    });
  } else {
    navigateTo('/', { replace: true });
    toast.add({
      color: 'green',
      title: `Welcome back, ${user.value?.name}!`,
    });
  }

  loading.value = false;
}

const validate = (state: any) => {
  const errors = [];

  if (!state.email || !isValidEmail(state.email)) {
    errors.push({
      path: 'email',
      message: 'Please enter a valid email address',
    });
  }

  if (!state.password) {
    errors.push({ path: 'password', message: 'Please enter a password' });
  }

  return errors;
};
</script>

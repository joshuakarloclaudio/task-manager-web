<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <UForm
      method="post"
      :validate="validate"
      :state="form"
      class="space-y-4"
      @submit="handleRegister"
    >
      <UFormGroup label="Full Name" name="name">
        <UInput v-model="form.name" placeholder="Full Name" />
      </UFormGroup>

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

      <UFormGroup label="Confirm Password" name="password_confirmation">
        <UInput
          v-model="form.password_confirmation"
          type="password"
          placeholder="Confirm Password"
        />
      </UFormGroup>

      <UButton
        color="primary"
        type="submit"
        label="Create Account"
        :loading="loading"
        block
      />
    </UForm>

    <p class="mt-5 text-center text-sm text-gray-500">
      If you already have an account,
      <NuxtLink
        to="/auth/login"
        class="font-semibold leading-6 text-primary hover:text-primary-500"
        >sign in.</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const loading = ref(false);

const validate = (state: any) => {
  const errors = [];

  if (!state.name) {
    errors.push({
      path: 'name',
      message: 'Please enter your full name',
    });
  }

  if (!state.email || !isValidEmail(state.email)) {
    errors.push({
      path: 'email',
      message: 'Please enter a valid email address',
    });
  }

  if (!state.password) {
    errors.push({ path: 'password', message: 'Please enter a password' });
  }

  if (state.password !== state.password_confirmation) {
    errors.push({
      path: 'password_confirmation',
      message: "Your passwords don't match",
    });
  }

  return errors;
};

const store = useAuthStore();

const { user } = storeToRefs(store);

const handleRegister = async () => {
  loading.value = true;
  const { error } = await store.register(form.value);
  if (error.value) {
    toast.add({
      color: 'red',
      title: 'Registration Error',
      description: error.value?.data?.message ?? 'An unknown error has occured',
    });
  } else {
    navigateTo('/', { replace: true });
    toast.add({
      color: 'green',
      title: `Welcome, ${user.value?.name}!`,
    });
  }
  loading.value = false;
};
</script>

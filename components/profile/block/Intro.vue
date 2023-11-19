<template>
  <div
    v-show="showIntro"
    class="grid grid-cols-1 divide-y bg-white rounded-md shadow-sm space-y-1"
  >
    <div class="p-6 relative">
      <p class="absolute item-center flex top-4 right-4 text-xs text-[#8b8f9d]">
        <label class="flex">
          <input type="checkbox" value="1" class="mr-2" />
          Don't remind me again
        </label>
        <font-awesome-icon
          class="my-auto ml-4 text-[#ff6161] text-base cursor-pointer"
          icon="fa-solid fa-close"
          @click="showIntro = false"
        />
      </p>
      <p class="font-bold text-lg">Welcome, Reyven!</p>
      <p class="text-xs text-[#8b8f9d]">
        <span class="text-[#22c55e]">You are almost done!</span> To further
        strengthen your profile, it is highly recommended for you to complete
        the 4 sections of your application.
      </p>
    </div>
    <div class="text-[#505669]">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <div v-for="widget in widgets" class="p-4">
          <div class="flex items-center w-full">
            <div
              class="bg-[#eff2f7] rounded-full h-6 w-6 flex items-center justify-center p-4 mr-4"
            >
              <font-awesome-icon
                class="text-[#7b8090]"
                :icon="['fa-solid', widget.icon]"
              />
            </div>
            <div class="flex flex-col flex-1">
              <p class="text-sm font-bold">{{ widget.label }}</p>
              <div class="flex flex-row items-center">
                <div class="h-1 w-full rounded-full bg-neutral-200">
                  <div
                    :class="['h-1 rounded-s-full', `bg-${widget.color}`]"
                    :style="`width: ${widget.progress * 100}%`"
                  ></div>
                </div>
                <p :class="['text-xs ml-2', `text-${widget.color}`]">
                  {{ widget.progress * 100 }}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const showIntro = ref(true);

const widgets = [
  {
    label: 'Applicant Profile',
    progress: 0.75,
    icon: 'fa-user',
    color: '[#ffa953]',
  },
  {
    label: 'Resume / CV',
    progress: 0.5,
    icon: 'fa-file-lines',
    color: '[#ff6161]',
  },
  {
    label: 'Assessment Score',
    progress: 0.0,
    icon: 'fa-bar-chart',
    color: '[#ff6161]',
  },
  {
    label: 'Video Introduction',
    progress: 0,
    icon: 'fa-video',
    color: '[#ff6161]',
  },
];
</script>

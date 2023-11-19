import type { badge } from '@nuxt/ui/dist/runtime/ui.config';
<template>
  <nav class="hidden lg:block w-72 flex flex-col items-start py-4 mt-6">
    <ul class="mt-2 space-y-2 text-[#797e8e] w-full">
      <li
        v-for="menuItem in menuItems"
        :class="[
          menuItem.active ? 'text-blue-600 bg-gray-100' : '',
          'p-2.5 rounded-lg flex w-full',
        ]"
      >
        <a href="#" class="flex w-full">
          <div class="flex flex-row items-center">
            <font-awesome-icon :icon="'fa-solid ' + menuItem.icon" />
            <span
              :class="[menuItem.active ? 'font-semibold' : '', 'text-md ml-6']"
              >{{ menuItem.label }}</span
            >
          </div>
          <div
            v-if="menuItem.active"
            class="flex flex-row items-center justify-end w-full"
          >
            <font-awesome-icon icon="fa-solid fa-angle-right" />
          </div>
        </a>
      </li>
      <div class="h-0.5 w-full bg-neutral-200"></div>
      <li
        v-for="menuItem in menuItems2"
        :class="[
          menuItem.active ? 'text-blue-600 bg-gray-100' : '',
          'p-2.5 rounded-lg flex w-full',
        ]"
      >
        <a href="#" class="flex w-full">
          <div class="flex flex-row items-center">
            <font-awesome-icon :icon="'fa-solid ' + menuItem.icon" />
            <span :class="[menuItem.active ? 'font-bold' : '', 'text-md ml-6']"
              >{{ menuItem.label }}
              <span
                v-if="menuItem.badge"
                class="bg-[#ff6161] text-white text-sm px-1 rounded-sm shadow-sm"
                >{{ menuItem.badge }}</span
              ></span
            >
          </div>
          <div
            v-if="menuItem.active"
            class="flex flex-row items-center justify-end w-full"
          >
            <font-awesome-icon icon="fa-solid fa-angle-right" />
          </div>
        </a>
      </li>
    </ul>
    <div class="flex gap-2 flex-col mt-4">
      <p class="text-sm text-[#8b8f9d]">
        Copyright 2018 - 2023. All Rights Reserved.
      </p>
      <p class="text-sm text-[#3656f5] flex items-center gap-2">
        Terms of Use
        <font-awesome-icon icon="fa-solid fa-circle" class="text-[4px]" />
        Privacy Policy
      </p>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuItems = [
  {
    label: 'Profile',
    active: true,
    icon: 'fa-user',
  },
  {
    label: 'Resume / CSV',
    active: false,
    icon: 'fa-file-lines',
  },
  {
    label: 'Assessment',
    active: false,
    icon: 'fa-bar-chart',
  },
  {
    label: 'Video Script',
    active: false,
    icon: 'fa-video',
  },
];

const menuItems2 = [
  {
    label: 'Application Tracking',
    active: false,
    icon: 'fa-briefcase',
  },
  {
    label: 'Bookmarked',
    active: false,
    icon: 'fa-bookmark',
  },
  {
    label: 'Notifications',
    active: false,
    icon: 'fa-bell',
    badge: '2',
  },
  {
    label: 'Activity Logs',
    active: false,
    icon: 'fa-arrow-trend-up',
  },
  {
    label: 'Settings',
    active: false,
    icon: 'fa-cog',
  },
];
</script>

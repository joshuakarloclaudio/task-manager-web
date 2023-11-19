<template>
  <Disclosure
    as="nav"
    class="bg-white shadow-md sticky top-0 z-10"
    v-slot="{ open }"
  >
    <div class="mx-auto px-2 lg:px-6 py-1 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <font-awesome-icon icon="fa-solid fa-bars" v-if="!open" />
            <font-awesome-icon icon="fa-solid fa-close" v-else />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://careers.go.team/img/goteam-logo-dark.svg"
              alt="Go Team"
            />
          </div>
          <div class="hidden lg:ml-12 lg:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'text-gray-400'
                    : 'text-gray-400 hover:text-gray-500',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div class="flex-1 items-center justify-center hidden lg:flex">
          <div class="w-4/5 flex justify-end items-center relative">
            <input
              placeholder="Type for job title or role"
              class="border border-[#d9dce3] text-md rounded-full py-2 px-6 w-full"
            />
            <button
              class="absolute mr-1.5 bg-[#3656f5] text-white text-sm font-light rounded-full px-4 py-1.5 flex items-center"
            >
              <font-awesome-icon
                class="mr-2"
                icon="fa-solid fa-magnifying-glass"
              />

              Search
            </button>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex flex-1 justify-end items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0"
        >
          <!-- <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button> -->
          <div class="text-right hidden md:block">
            <p class="font-semibold text-sm">
              {{ auth.user?.name ?? 'John Doe' }}
            </p>
            <p class="text-[#3656f5] text-xs">
              {{ auth.user?.email ?? 'john.doe@gmail.com' }}
            </p>
          </div>
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <font-awesome-icon class="ml-2" icon="fa-solid fa-angle-down" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >My Tasks</NuxtLink
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel class="lg:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <div class="flex-1 items-center justify-center">
            <div class="w-full flex justify-end items-center relative">
              <input
                placeholder="Type for job title or role"
                class="border border-[#d9dce3] text-md rounded-full py-2 px-6 w-full"
              />
              <button
                class="absolute mr-2 bg-[#3656f5] text-white text-sm rounded-full px-4 py-1 flex items-center"
              >
                <font-awesome-icon
                  class="mr-2"
                  icon="fa-solid fa-magnifying-glass"
                />
                Search
              </button>
            </div>
          </div>
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-[#3656f5] hover:text-white',
              'block rounded-md px-3 py-2 text-base font-semibold',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >

          <hr />

          <DisclosureButton
            v-for="item in sideNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-[#3656f5] hover:text-white',
              'block rounded-md px-3 text py-2 text-base font-semibold',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';

const auth = useAuthStore();

const navigation = [
  { name: 'Careers', href: '#', current: false },
  { name: 'Find your Role', href: '#', current: false },
];

const sideNavigation = [
  {
    name: 'Profile',
    current: false,
    href: '#',
  },
  {
    name: 'Resume / CSV',
    current: false,
    href: '#',
  },
  {
    name: 'Assessment',
    current: false,
    href: '#',
  },
  {
    name: 'Video Script',
    current: false,
    href: '#',
  },
  {
    name: 'Application Tracking',
    current: false,
    href: '#',
  },
  {
    name: 'Bookmarked',
    current: false,
    href: '#',
  },
  {
    name: 'Notifications',
    current: false,
    href: '#',
  },
  {
    name: 'Activity Logs',
    current: false,
    href: '#',
  },
  {
    name: 'Settings',
    current: false,
    href: '#',
  },
];
</script>

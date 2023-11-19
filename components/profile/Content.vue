<template>
  <main
    class="my-1 p-2 space-y-4 flex-1 transition duration-500 ease-in-out overflow-y-auto no-scrollbar"
  >
    <ProfileBlockIntro />

    <div class="grid grid-cols-7 gap-4">
      <div
        class="grid grid-cols-1 col-span-7 md:col-span-5 divide-y bg-white rounded-md shadow-sm"
      >
        <div class="grid grid-cols-9 divide-x space-x-1">
          <div class="m-auto col-span-2">
            <img
              class="h-32 w-32 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="col-span-7 p-6 space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-xl font-bold">Reyven S. Biloy</p>
                <p class="text-[#505669] font-semibold">UI/UX Designer</p>
              </div>
              <font-awesome-icon
                class="text-[#8b8f9d]"
                icon="fa-solid fa-pencil"
              />
            </div>
            <div class="text-[#505669] flex item-center space-x-2">
              <font-awesome-icon icon="fa-solid fa-graduation-cap" />
              <p class="text-sm">Bachelor of Science in Computer Science</p>
            </div>
            <div class="text-[#505669] flex justify-between">
              <div class="w-full">
                <div class="flex item-center space-x-2">
                  <font-awesome-icon icon="fa-solid fa-briefcase" />
                  <p class="text-sm">12 years</p>
                </div>
              </div>
              <div class="w-full">
                <div class="flex item-center space-x-2">
                  <font-awesome-icon icon="fa-solid fa-calendar-check" />
                  <p class="text-sm">Immediately</p>
                </div>
              </div>
              <div class="w-full">
                <div class="flex item-center space-x-2">
                  <font-awesome-icon icon="fa-solid fa-sack-dollar" />
                  <p class="text-sm text-primary">Php 35,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileBlockProfileDetails
          title="General Details"
          :data="generalDetails"
        />
        <ProfileBlockProfileDetails
          title="Professional Status"
          :data="professionalStatus"
        />
        <ProfileBlockProfileDetails title="Preferences" :data="preferences" />
      </div>
      <div class="col-span-7 md:col-span-2 space-y-4">
        <div class="bg-white rounded-md shadow-sm">
          <p class="p-4 font-semibold text-sm">Video Introduction</p>
          <video
            src="~/assets/videos/pixel-8-pro-teaser.mp4"
            controls
            autoplay
            muted
            loop
            class="rounded-b-sm"
          />
        </div>
        <div class="p-4 bg-white rounded-md shadow-sm">
          <p class="font-semibold text-sm">Profile Completion</p>
          <div class="-mt-4 flex flex-col items-end">
            <p class="text-sm font-semibold ml-2 text-primary text-right">
              100%
            </p>
            <div class="h-2.5 w-full rounded-full bg-primary"></div>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <p class="mt-4 text-primary font-semibold text-sm">
              Well done, Reyven!
            </p>
            <img src="~/assets/images/medal.png" class="h-16" />
          </div>
          <p class="text-sm mt-4 text-[#505669]">
            You have one of the strongest professional profile in our talent
            pool. Expect progress on your application any time soon.
          </p>
        </div>
        <div class="p-4 bg-white rounded-md shadow-sm">
          <p class="font-semibold text-sm">Profile Completion</p>
          <div class="-mt-4 flex flex-col items-end">
            <p class="text-sm font-semibold ml-2 text-[#ffa953] text-right">
              50%
            </p>
            <div class="h-2.5 w-full rounded-full bg-neutral-200">
              <div class="h-2.5 w-1/2 rounded-s-full bg-[#ffa953]"></div>
            </div>
          </div>
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="mt-4 text-sm text-[#505669]">
              <font-awesome-icon
                icon="fa-solid fa-angle-down"
                :class="['mr-2', open && 'rotate-180 transform']"
              />
              {{ open ? 'Hide' : 'Show' }} Recommendations
            </DisclosureButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <DisclosurePanel
                class="text-[#505669] text-sm ml-6 mt-2 space-y-4"
              >
                <p>
                  Fill-up the following items to strengthen your profile. This
                  can help us in matching your profile and increase your chances
                  of landing into your desired role.
                </p>
                <div class="space-y-2">
                  <p>
                    <font-awesome-icon
                      class="mr-2"
                      icon="fa-regular fa-circle"
                    />Share <span class="text-[#3656f5]">Date of Birth</span>
                  </p>
                  <p>
                    <font-awesome-icon
                      class="mr-2"
                      icon="fa-regular fa-circle"
                    />Specify
                    <span class="text-[#3656f5]">Current Monthly Salary</span>
                  </p>
                  <p>
                    <font-awesome-icon
                      class="mr-2"
                      icon="fa-regular fa-circle"
                    />Add one (1)
                    <span class="text-[#3656f5]">Character Reference</span>
                  </p>
                  <p>
                    <font-awesome-icon
                      class="mr-2"
                      icon="fa-regular fa-circle"
                    />Add <span class="text-[#3656f5]">Current Address</span>
                  </p>
                  <p>
                    <font-awesome-icon
                      class="mr-2"
                      icon="fa-regular fa-circle"
                    />Add at least five (5) items in
                    <span class="text-[#3656f5]">Other Skills</span>
                  </p>
                </div>
              </DisclosurePanel>
            </transition>
          </Disclosure>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

const generalDetails = [
  {
    label: 'Date of Birth',
    value: '07 July 1986',
  },
  {
    label: 'Gender',
    value: 'Male',
  },
  {
    label: 'Civil Status',
    value: 'Married',
  },
  {
    label: 'Nationality',
    value: 'Filipino',
  },
];

const professionalStatus = [
  {
    label: 'Recent Job Title',
    value: 'Web Designer and Developer',
  },
  {
    label: 'Interview Availability',
    value: '-',
  },
  {
    label: 'Current Monthly Salary',
    value: 'Php 30,000',
    color: 'primary',
  },
  {
    label: 'Allowance (Non-Taxable)',
    value: '-',
  },
  {
    label: 'Pre-employment Leaves',
    value: '07 July - Birthday',
  },
  {
    label: 'Where can you work?',
    value: 'Office and Home',
  },
  {
    label: 'Estimate Travel Time to Office',
    value: '15 minutes',
  },
  {
    label: 'Connection Type',
    value: 'Globe Broadband',
  },
  {
    label: 'Website / Portfolio',
    value: '-',
  },
];

const preferences = [
  {
    label: 'Day Shift',
    value: '-',
  },
  {
    label: 'Mid Shift',
    value: '-',
  },
  {
    label: 'Night Shift',
    value: '-',
  },
  {
    label: 'English Only Policy (EOP)',
    value: '-',
  },
  {
    label: 'Where did you hear us?',
    value: '-',
  },
  {
    label: 'Marketing Permission',
    value: '-',
  },
  {
    label: 'Referral',
    value: '-',
  },
];
</script>

<template>
  <div class="bg-[#f6f9fd]">
    <ProfileHeader />
    <div class="h-[calc(100vh-72px)] flex container mx-auto overflow-hidden">
      <ProfileSidebar />
      <ProfileContent />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'My Profile',
});
</script>

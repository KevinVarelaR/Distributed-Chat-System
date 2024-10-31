<template>
  <div class="h-full bg-gray-800 text-white p-4">
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">Twixt</h1>
      <UButton flat size="lg" to="/ProfileMenu" class="w-full text-left" color ="cyan"">
        <UIcon name="i-el-user" /> Profile
      </UButton>
      <UButton flat size="lg" to="/MessagesMenu" class="w-full text-left" color="green">
        <UIcon name="i-el-envelope" /> Messages
      </UButton>
      <UButton flat size="lg" to="/ContactsMenu" class="w-full text-left" color="blue">
        <UIcon name="i-el-address-book" /> Contacts
      </UButton>
      <UButton flat size="lg" to="/SettingsMenu" class="w-full text-left" color="purple">
        <UIcon name="i-heroicons-wrench-screwdriver-20-solid" /> Settings
      </UButton>
      <UButton flat size="lg" class="w-full text-left" color="red">
        <UIcon name="i-heroicons-arrow-right-start-on-rectangle-solid" size="23"/>
        Logout
      </UButton>
      <UButton flat size="lg" to="/HelpMenu" class="w-full text-left" color="white">
        <UIcon name="i-el-question-sign" /> Help
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>


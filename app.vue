<template>
  <div :style="styles.container">

    <NuxtPage />
    <UNotifications />
    <div :style="styles.sidebarMainMenu">
      <h1 class="menu-title">Twixt</h1>
      <UButton flat size="lg"
        to="/ProfileMenu">
        <UIcon name="i-el-user" /> Profile
      </UButton>

      <UButton flat size="lg"
         to="/MessagesMenu">
        <UIcon name="i-el-envelope" /> Messages
      </UButton>

      <UButton flat size="lg" class="custom-button-main-menu" :full-width="true"
        :class="{ activeMainMenuOption: mainMenuSelected === 'Contacts' }" to="/ContactsMenu">
        <UIcon name="i-el-address-book" /> Contacts
      </UButton>

      <UButton flat size="lg"
        to="/SettingsMenu" >
        <UIcon name="i-heroicons-wrench-screwdriver-20-solid" /> Settings
      </UButton>

      <UButton flat size="lg" class="custom-button-main-menu spaced-button" :full-width="true"
        @click="showLogoutConfirm = true">
        <UIcon name="i-heroicons-arrow-right-start-on-rectangle-solid" size="23" />
        Logout
      </UButton>

      <UButton flat size="lg" class="custom-button-main-menu" :full-width="true"
        :class="{ activeMainMenuOption: mainMenuSelected === 'Help' }" @click="selectMainOption('Help')">
        <UIcon name="i-el-question-sign" /> Help
      </UButton>
    </div>

    <div :style="
        mainMenuSelected === 'Help'
          ? styles.sidebarExpandedSecondaryMenu
          : styles.sidebarSecondayMenu
      " v-if="mainMenuSelected && mainMenuSelected !== 'Logout'">
      <h1 class="menu-title">{{ mainMenuSelected }}</h1>

      
    </div>
    
  </div>
</template>

<script setup>



<style>

</style>

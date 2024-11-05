<template>
  <div :style="styles.container">
    <div :style="styles.sidebarMainMenu">
      <h1 class="menu-title">Twixt</h1>
      <UButton
        flat
        size="lg"
        class="custom-button-main-menu"
        :full-width="true"
        :class="{ activeMainMenuOption: mainMenuSelected === 'Profile' }"
        @click="selectMainOption('Profile')"
      >
        <UIcon name="i-el-user" /> Profile
      </UButton>

      <UButton
        flat
        size="lg"
        class="custom-button-main-menu"
        :full-width="true"
        :class="{ activeMainMenuOption: mainMenuSelected === 'Messages' }"
        @click="selectMainOption('Messages')"
      >
        <UIcon name="i-el-envelope" /> Messages
      </UButton>

      <UButton
        flat
        size="lg"
        class="custom-button-main-menu"
        :full-width="true"
        :class="{ activeMainMenuOption: mainMenuSelected === 'Contacts' }"
        @click="selectMainOption('Contacts')"
      >
        <UIcon name="i-el-address-book" /> Contacts
      </UButton>

      <UButton
        flat
        size="lg"
        class="custom-button-main-menu"
        :full-width="true"
        :class="{ activeMainMenuOption: mainMenuSelected === 'Settings' }"
        @click="selectMainOption('Settings')"
      >
        <UIcon name="i-heroicons-wrench-screwdriver-20-solid" /> Settings
      </UButton>

      <UButton
        flat
        size="lg"
        class="custom-button-main-menu spaced-button"
        :full-width="true"
        @click="showLogoutConfirm = true"
      >
        <UIcon
          name="i-heroicons-arrow-right-start-on-rectangle-solid"
          size="23"
        />
        Logout
      </UButton>

      <UButton
        flat
        size="lg"
        class="custom-button-main-menu"
        :full-width="true"
        :class="{ activeMainMenuOption: mainMenuSelected === 'Help' }"
        @click="selectMainOption('Help')"
      >
        <UIcon name="i-el-question-sign" /> Help
      </UButton>
    </div>

    <div
      :style="
        mainMenuSelected === 'Help'
          ? styles.sidebarExpandedSecondaryMenu
          : styles.sidebarSecondayMenu
      "
      v-if="mainMenuSelected && mainMenuSelected !== 'Logout'"
    >
      <h1 class="menu-title">{{ mainMenuSelected }}</h1>

      <div v-if="mainMenuSelected === 'Profile'" :styles="styles.dynamicMenu">
        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption: secondaryMenuSelected === 'Edit profile',
          }"
          @click="selectSecondaryOption('Edit profile')"
        >
          <UIcon name="i-heroicons-pencil-solid" /> Edit profile
        </UButton>
      </div>

      <div v-if="mainMenuSelected === 'Contacts'" :style="styles.dynamicMenu">
        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption: secondaryMenuSelected === 'All contacts',
          }"
          @click="selectSecondaryOption('All contacts')"
        >
          <UIcon name="i-heroicons-users-solid" /> All contacts
        </UButton>

        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption: secondaryMenuSelected === 'Add contact',
          }"
          @click="selectSecondaryOption('Add contact')"
        >
          <UIcon name="i-heroicons-user-plus-solid" /> Add contact
        </UButton>

        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption:
              secondaryMenuSelected === 'Delete contact',
          }"
          @click="selectSecondaryOption('Delete contact')"
        >
          <UIcon name="i-heroicons-user-minus-solid" /> Delete contact
        </UButton>
      </div>

      <div v-if="mainMenuSelected === 'Settings'" :style="styles.dynamicMenu">
        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption: secondaryMenuSelected === 'General',
          }"
          @click="selectSecondaryOption('General')"
        >
          <UIcon name="i-heroicons-computer-desktop-20-solid" /> General
        </UButton>

        <!---
        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption: secondaryMenuSelected === 'Account',
          }"
          @click="selectSecondaryOption('Account')"
        >
          <UIcon name="i-heroicons-key-20-solid" /> Account
        </UButton>
--->
        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption: secondaryMenuSelected === 'Chats',
          }"
          @click="selectSecondaryOption('Chats')"
        >
          <UIcon name="i-heroicons-chat-bubble-left-right-20-solid" /> Chats
        </UButton>
        <!--

        <UButton
          flat
          size="lg"
          class="custom-button-secondary-menu"
          :full-width="true"
          :class="{
            activeSecondaryMenuOption:
              secondaryMenuSelected === 'Personalization',
          }"
          @click="selectSecondaryOption('Personalization')"
        >
          <UIcon name="i-heroicons-paint-brush-solid" /> Personalization
        </UButton>        -->
      </div>

      <div v-if="mainMenuSelected === 'Help'" :style="styles.dynamicMenu">
        <h1 class="help-menu-title">Twixt for browser</h1>
        <p class="help-menu-description">Version 0.1</p>
        <hr class="divider-line" />
        <h1 class="help-menu-title">About Twixt</h1>
        <p class="help-menu-description">
          Twixt is a free messaging app that allows you to chat with your
          friends and family. You can send messages, photos, videos, and more.
        </p>
        <hr class="divider-line" />

        <h1 class="help-menu-title">Credits</h1>

        <p class="help-menu-description">
          Twixt was created by Kevin Varela, Anthony Jiménez and Fabián Rojas.
        </p>
        <hr class="divider-line" />

        <h1 class="help-menu-title">Contact us</h1>
        <p class="help-menu-description">
          We'd like to know your thoughts about this app.
        </p>
        <p>
          <a href="mailto:@gmail.com" class="contact-link">
            Contact Fabián Rojas</a
          >
        </p>
        <p>
          <a href="mailto:kevin03varela@gmail.com" class="contact-link">
            Contact Kevin Varela</a
          >
        </p>
        <p>
          <a href="mailto:noni45100@hotmail.com" class="contact-link">
            Contact Anthony Jiménez</a
          >
        </p>
      </div>
    </div>
    <div
      :style="styles.sidebarTertiaryMenu"
      v-if="mainMenuSelected != 'Help' && secondaryMenuSelected"
    >
      <h1 class="menu-title">{{ secondaryMenuSelected }}</h1>

      <div
        v-if="secondaryMenuSelected === 'Edit profile'"
        :style="styles.editProfile"
      >
        <div :style="styles.profileImageContainer">
          <img
            :src="profileImage"
            :alt="username"
            :style="styles.profileImage"
          />
          <UButton
            flat
            size="sm"
            class="custom-button-change-image"
            @click="triggerFileInput"
          >
            Change image
          </UButton>
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="onFileChange"
            style="display: none"
          />
        </div>

        <div :style="styles.inputContainer">
          <h1 class="sub-menu-title-">Name</h1>
          <div style="position: relative; width: fit-content">
            <UInput
              id="username"
              v-model="username"
              placeholder="Enter your name"
              class="custom-input-width"
              size="md"
              style="padding-right: 35px"
            />
            <UIcon name="i-heroicons-pencil-solid" class="input-icon" />
          </div>
        </div>

        <div>
          <h1 class="sub-menu-title">User ID</h1>
          <UInput
            disabled
            v-model="userId"
            size="md"
            class="custom-input-width"
            style="padding-right: 35px"
          />
        </div>
      </div>

      <div
        v-if="secondaryMenuSelected === 'All contacts'"
        :style="contactsGrid"
      >
        <div
          v-for="contact in contacts"
          :key="contact.id"
          :style="styles.contactsCard"
        >
        <label :style="styles.contactInfo">
            <img
              :src="contact.avatar"
              :alt="contact.name"
              :style="styles.contactAvatar"
            />
            <p>{{ contact.name }}</p>
          </label>
          <input
            type="checkbox"
            :value="contact.id"
            :v-model="selectedContacts"
            :id="'contact-' + contact.id"
            :style="styles.checkbox"
          />
        </div>
      </div>

      <div v-if="secondaryMenuSelected === 'Chats'" :style="styles.dynamicMenu">
        <UButton
          flat
          size="lg"
          class="custom-button-tertiary-menu"
          :full-width="true"
          :class="{
            activeTertiaryMenuOption:
              tertiaryMenuSelected === 'Clear all messages',
          }"
          @click="selectTertiaryOption('Clear all messages')"
        >
          Clear all messages
        </UButton>

        <p class="menu-description">Delete all messages from chats</p>

        <UButton
          flat
          size="lg"
          class="custom-button-tertiary-menu"
          :full-width="true"
          :class="{
            activeTertiaryMenuOption:
              tertiaryMenuSelected === 'Delete all messages',
          }"
          @click="selectTertiaryOption('Delete all messages')"
        >
          Delete all messages
        </UButton>

        <p class="menu-description">
          Delete all messages and clear the chast from your history
        </p>
      </div>

      <div
        v-if="secondaryMenuSelected === 'General'"
        :style="styles.dynamicMenu"
      >
        <h1 class="sub-menu-title">Language</h1>

        <USelect
          v-model="languageSelected"
          :options="languageOptions"
          label="Language"
          class="custom-select-width"
          size="md"
        />

        <h1 class="sub-menu-title">Notifications</h1>

        <UToggle
          v-model="notificationSelected"
          size="md"
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const languageOptions = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
];

const username = ref("");
const userId = ref("");
const profileImage = ref("https://via.placeholder.com/150");

function triggerFileInput() {
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();
}

function onFileChange(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      profileImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function generateRandomId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

onMounted(() => {
  userId.value = "#" + generateRandomId();
});

const contacts = [
  { id: 1, name: "Alice", avatar: "https://via.placeholder.com/50" },
  { id: 2, name: "Bob", avatar: "https://via.placeholder.com/50" },
  { id: 3, name: "Charlie", avatar: "https://via.placeholder.com/50" },
  { id: 4, name: "Diana", avatar: "https://via.placeholder.com/50" },
  { id: 5, name: "Edward", avatar: "https://via.placeholder.com/50" },
];

const selectedContacts = ref([]);

const languageSelected = ref("en");

const notificationSelected = ref(true);

const mainMenuSelected = ref("");
function selectMainOption(option) {
  mainMenuSelected.value = option;
  secondaryMenuSelected.value = "";
  tertiaryMenuSelected.value = "";

  if (option === "Help") {
    tertiaryMenuSelected.value = "Help";
  }
}

const secondaryMenuSelected = ref("");
function selectSecondaryOption(option) {
  secondaryMenuSelected.value = option;
  tertiaryMenuSelected.value = "";
}

const tertiaryMenuSelected = ref("");
function selectTertiaryOption(option) {
  tertiaryMenuSelected.value = option;
}

const styles = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#1B263B ",
    padding: "10px",
    gap: "15px",
  },

  sidebarMainMenu: {
    width: "250px",
    backgroundColor: "#2C3E50",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRadius: "8px",
    border: "2px solid #1F77B4",
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.15)",
  },

  sidebarSecondayMenu: {
    width: "300px",
    backgroundColor: "#2C3E50",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRadius: "8px",
    border: "2px solid #1F77B4",
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.15)",
  },

  sidebarExpandedSecondaryMenu: {
    width: "1250px",
    backgroundColor: "#2C3E50",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRadius: "8px",
    border: "2px solid #1F77B4",
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.15)",
  },

  sidebarTertiaryMenu: {
    width: "950px",
    backgroundColor: "#2C3E50",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRadius: "8px",
    border: "2px solid #1F77B4",
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.15)",
  },

  dynamicMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  editProfile: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  profileImageContainer: {
    display: "flex",
    flexDirection: "center",
    gap: "10px",
  },

  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #1F77B4",
  },
  inputContainer: {
    display: "relative",
    flexDirection: "flex",
    allingItems: "center",
  },

  contactsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },

  contactsCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#34495E",
    padding: "10px",
    borderRadius: "8px",
    width: "180px",
    color: "#ffffff",
    boxSizing: "border-box",
  },

  contactInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },

  contactAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  
  checkbox: {
    marginLeft: "10px",
  },


};
</script>

<style scoped>
.menu-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 15px;
}

.sub-menu-title {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
}

.custom-button-main-menu,
.custom-button-secondary-menu {
  background-color: #1f77b4;
  color: #ffffff;
  padding: 15px 10px;
  font-size: 18px;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 5px;
}

.custom-button-tertiary-menu {
  background-color: #1f77b4;
  color: #ffffff;
  width: 20%;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: 400;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 5px;
}

.custom-button-main-menu:hover,
.custom-button-secondary-menu:hover,
.custom-button-tertiary-menu:hover,
.custom-button-change-image:hover {
  background-color: #145a86;
}

.custom-button-change-image {
  background-color: #1f77b4;
  color: #ffffff;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: 400;
  padding: 8px 10px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  align-self: center;
}

.activeMainMenuOption,
.activeSecondaryMenuOption,
.activeTertiaryMenuOption {
  background-color: #145a86;
}

.spaced-button {
  margin-top: 100px;
}

.spaced-p {
  margin-top: 100px;
}

.menu-description {
  font-size: 14px;
  color: #ffffff;
  margin: -5px 0 15px 0;
  line-height: 1.4;
}

.help-menu-description {
  font-size: 14px;
  color: #ffffff;
  margin-top: 0px;
  margin-bottom: 0px;
  line-height: 1.4;
}

.custom-select-width {
  width: 200px;
  display: inline-block;
}

.user-id-custom {
  font-size: 16px;
  color: #948f8f;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffffff;
  font-size: 18px;
  pointer-events: none;
}

.custom-input-width {
  width: 200px;
  margin-top: 5px;
  margin-right: 35px;
}

.help-menu-title {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.contact-link {
  color: #1f77b4;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

.divider-line {
  border: none;
  border-top: 1px solid #555555;
  margin-top: 10px 0;
}
</style>

<template>
  <div class="w-full h-screen flex items-center justify-center" v-if="!isAuthenticated">
    <UCard
      style="background-color: #1f2836; color: white"
      :ui="{ body: { base: 'flex flex-col items-center' } }"
      class="w-full max-w-md p-10"
    >
      <template #header>
        <Placeholder class="h-8" />
        <h1 class="text-2xl font-bold">Login</h1>
      </template>

      <div class="space-y-4 w-full">
        <UFormGroup name="username" class="w-full">
          <template #label>
            <span style="color: white" class="mb-2 block">Name</span>
          </template>
          <UInput v-model="form.username" class="w-full" />
        </UFormGroup>

        <UFormGroup name="userID" class="w-full">
          <template #label>
            <span style="color: white" class="mb-2 block">User ID</span>
          </template>
          <UInput v-model="form.userID" class="w-full" />
        </UFormGroup>

        <UButton
          label="Login"
          color="blue"
          class="w-full flex items-center justify-center"
          @click="login"
        />
        <p
          v-if="errorMessage"
          class="text-center text-red-500"
        >
          {{ errorMessage }}
        </p>
        <p class="flex items-center justify-center">
          <a href="#" class="hover:underline"> Forgot password? </a>
        </p>
      </div>

      <template #footer>
        <Placeholder class="h-8" />
        <p style="color: gray" class="flex itmes-center justify-center">
          Don't have an account?
          <RouterLink
            style="color: white; display: inline-block; margin-left: 5px"
            to="/SignUpMenu"
            class="flex items-center justify-center hover:underline"
          >
            Sign up
          </RouterLink>
        </p>
      </template>
    </UCard>
  </div>
  <div v-else class="flex h-screen">
    <SideBar class="w-1/5" @logout="handleLogout"/>
    <div class="flex-1">
      <NuxtPage />
      <UNotifications />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SideBar from "./pages/SideBar.vue";

const form = reactive({ username: "", userID: "" });
const errorMessage = ref("");
const router = useRouter();
const isAuthenticated = ref(false);

async function login() {
  errorMessage.value = "";
  try {
    const response = await fetch("/api/logUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        userID: form.userID,
      }),
    });

    const result = await response.json();
    localStorage.setItem("username", form.username);
    localStorage.setItem("userID", form.userID);

    if (result.length !== 0) {
      isAuthenticated.value = true;
    } else {
      errorMessage.value = "Invalid username or user ID";
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value = "Network error during login";
  }
}

function handleLogout() {
  isAuthenticated.value = false;
  clearForm();
  router.push("/");
}

function handleLogin() {
  isAuthenticated.value = true;
}

function clearForm() {
  form.username = "";
  form.userID = "";
}
</script>
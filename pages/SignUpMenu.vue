<template>
  <div class="w-full h-screen flex items-center justify-center">
    <UCard
      style="background-color: #1f2836; color: white"
      :ui="{ body: { base: 'flex flex-col items-center' } }"
      class="w-full max-w-md p-10"
    >
      <template #header>
        <Placeholder class="h-8" />
        <h1 class="text-2xl font-bold" style="display: inline-block; margin-right: 181px ">Sign Up</h1>
        <UButton color="gray">
          <RouterLink to="/" class="text-black">Back</RouterLink>
        </UButton>
      </template>

      <div class="space-y-4 w-full">
        <UFormGroup name="name" class="w-full">
          <template #label>
            <span style="color: white" class="mb-2 block">Name</span>
          </template>
          <UInput v-model="form.username" class="w-full" />
        </UFormGroup>

        <UButton
          label="Sign up"
          color="blue"
          class="w-full flex items-center justify-center"
          @click="signUp"
        />
        <p v-if="message" class="text-center" :class="{ 'text-green-500': success, 'text-red-500': !success }">
          {{ message }}
        </p>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const form = reactive({ username: "" });
const message = ref("");
const success = ref(false);

async function signUp() {
  try {
    const response = await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      message.value = "User registered successfully!";
      success.value = true;
    } else {
      const errorData = await response.json();
      message.value = errorData.error || "Error creating user.";
      success.value = false;
    }
  } catch (error) {
    message.value = "An error occurred while registering.";
    success.value = false;
    console.error("Error:", error);
  }
}

</script>

<style></style>

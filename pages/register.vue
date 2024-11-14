<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';




const router = useRouter();
const user = ref("");

const error = ref(false);

const errorType = ref("");



async function register() {

  try {

    if (user.value.length < 1) {
      error.value = true;
      errorType.value = "El nombre no puede estar vacío";
      console.log("El nombre no puede estar vacío");
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user.value,
      
      })
    });

    const data = await response.json();
    if (data.statusCode === 200) {
      console.log("registro exitoso");
      router.push('/login');
    } else {
      console.log("Error al registrarse");
      error.value = true;
      errorType.value = "Error al registrarse";
    }
  }
  catch (error) {
    console.log("Error al registrarse");
  }
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <UInput
        v-model="user"
        color="blue"
        placeholder="Nombre"
        class="mb-4 w-full p-2"
      />
      <div v-if="error" class="mb-8 font-semibold">
        <p class="text-red-500">{{errorType}}</p>
      </div>
      <UButton @click="register" block color="blue" class="w-full"
        >Registrarse</UButton
      >
      <div class="text-center mt-4">
        <ULink to="/login" class="text-blue-500"
          >¿Ya tienes una cuenta? Inicia Sesión</ULink
        >
      </div>
    </div>
  </div>
</template>

<style></style>
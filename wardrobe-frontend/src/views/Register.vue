<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");

const register = async () => {
  await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  });
};
</script>

<template>
  <div>
    <h2>Register</h2>
    <input v-model="name" placeholder="Name" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="password_confirmation" type="password" placeholder="Confirm Password" />
    <button @click="register">Register</button>
  </div>
</template>
 

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Wardrobe Manager</h1>
    <AddClothing />
    <ClothingList />
  </div>
</template>

<script setup>
import AddClothing from "./components/AddClothing.vue";
import ClothingList from "./components/ClothingList.vue";
</script>

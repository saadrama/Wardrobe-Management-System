<script setup>
import { ref } from "vue";
import { useClothingStore } from "../stores/clothingStore";

const clothingStore = useClothingStore();
const name = ref("");
const category = ref("");
const image = ref(null);

const handleFileChange = (event) => {
    image.value = event.target.files[0];
};

const addItem = async () => {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("category", category.value);
    if (image.value) {
        formData.append("image", image.value);
    }

    await clothingStore.addItem(formData);
    name.value = "";
    category.value = "";
    image.value = null;
};
</script>

<template>
    <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Add Clothing Item</h2>
        <input v-model="name" placeholder="Name" class="w-full p-2 border border-gray-300 rounded mb-2" />
        <input v-model="category" placeholder="Category" class="w-full p-2 border border-gray-300 rounded mb-4" />
        <input type="file" @change="handleFileChange" class="w-full p-2 border border-gray-300 rounded mb-4" />
        <button @click="addItem" class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add
        </button>
    </div>
</template>

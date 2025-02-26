<script setup>
import { onMounted } from "vue";
import { useClothingStore } from "../stores/clothingStore";

const clothingStore = useClothingStore();
const categories = ["All", "Tops", "Bottoms", "Shoes"];

onMounted(() => {
    clothingStore.fetchItems();
});
</script>

<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Clothing Items</h2>

        <!-- Search Input -->
        <input v-model="clothingStore.searchQuery" placeholder="Search..."
            class="w-full p-2 border border-gray-300 rounded mb-4" />

        <!-- Category Filter -->
        <select v-model="clothingStore.selectedCategory" class="w-full p-2 border border-gray-300 rounded mb-4">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
            </option>
        </select>

        <!-- Filtered Clothing List -->
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li v-for="item in clothingStore.filteredItems" :key="item.id" class="bg-gray-100 p-4 rounded-lg shadow-md">
                <p class="text-lg font-semibold">{{ item.name }}</p>
                <p class="text-sm text-gray-600">{{ item.category }}</p>
                <button @click="clothingStore.deleteItem(item.id)"
                    class="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useClothingStore } from "../stores/clothingStore";

const clothingStore = useClothingStore();
const categories = ["All", "Tops", "Bottoms", "Shoes"];

const editingItem = ref(null); // Stores the item being edited
const editForm = ref({ name: "", category: "", image: null }); // Stores the edited item

onMounted(() => {
    clothingStore.fetchItems();
});

// Open edit form for selected item
const startEdit = (item) => {
    editingItem.value = item;
    editForm.value = { name: item.name, category: item.category, image: null };
};

// Handle file selection
const handleFileUpload = (event) => {
    editForm.value.image = event.target.files[0];
};

// Submit edited item
const submitEdit = async () => {
    if (editingItem.value) {
        const formData = new FormData();
        formData.append("name", editForm.value.name);
        formData.append("category", editForm.value.category);
        if (editForm.value.image) {
            formData.append("image", editForm.value.image);
        }

        await clothingStore.updateItem(editingItem.value.id, formData);
        editingItem.value = null; // Reset edit state
    }
};
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
                <!-- Display Image if Available -->
                <img v-if="item.image" :src="`http://127.0.0.1:8000/storage/${item.image}`"
                    class="w-full h-32 object-cover rounded" />

                <p class="text-lg font-semibold mt-2">{{ item.name }}</p>
                <p class="text-sm text-gray-600">{{ item.category }}</p>

                <!-- Edit Button -->
                <button @click="startEdit(item)" class="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                </button>

                <!-- Delete Button -->
                <button @click="clothingStore.deleteItem(item.id)"
                    class="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                </button>
            </li>
        </ul>

        <!-- Edit Form -->
        <div v-if="editingItem" class="mt-6 p-4 bg-gray-200 rounded">
            <h3 class="text-xl font-semibold mb-2">Edit Clothing Item</h3>

            <label class="block mb-2">Name:</label>
            <input v-model="editForm.name" class="w-full p-2 border border-gray-300 rounded mb-2" />

            <label class="block mb-2">Category:</label>
            <select v-model="editForm.category" class="w-full p-2 border border-gray-300 rounded mb-2">
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>

            <label class="block mb-2">Image (optional):</label>
            <input type="file" @change="handleFileUpload" class="w-full p-2 border border-gray-300 rounded mb-2" />

            <button @click="submitEdit" class="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Save Changes
            </button>

            <button @click="editingItem = null"
                class="mt-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2">
                Cancel
            </button>
        </div>
    </div>
</template>

import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";

export const useClothingStore = defineStore("clothing", () => {
  const items = ref([]);
  const searchQuery = ref("");
  const selectedCategory = ref("");

  // Fetch items from API
  async function fetchItems() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/clothing");
      items.value = response.data;
    } catch (error) {
      console.error("Error fetching clothing items:", error);
    }
  }

  // Add new item
  async function addItem(formData) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/clothing", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      items.value.push(response.data);
    } catch (error) {
      console.error("Error adding clothing item:", error);
    }
  }

  // Edit existing item
  async function updateItem(id, formData) {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/clothing/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
    } catch (error) {
      console.error("Error updating clothing item:", error);
    }
  }

  // Delete an item
  async function deleteItem(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/clothing/${id}`);
      items.value = items.value.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Error deleting clothing item:", error);
    }
  }

  // Filtered items based on search and category
  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      return (
        (selectedCategory.value === "" || item.category === selectedCategory.value) &&
        (searchQuery.value === "" || item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
    });
  });

  return {
    items,
    searchQuery,
    selectedCategory,
    filteredItems,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  };
});

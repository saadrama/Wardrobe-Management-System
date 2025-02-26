import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useClothingStore = defineStore("clothing", () => {
  const items = ref([
    { id: 1, name: "T-shirt", category: "Tops" },
    { id: 2, name: "Jeans", category: "Bottoms" },
    { id: 3, name: "Sneakers", category: "Shoes" },
  ]);

  const searchQuery = ref("");
  const selectedCategory = ref("");

  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      return (
        (selectedCategory.value === "" || item.category === selectedCategory.value) &&
        (searchQuery.value === "" || item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
    });
  });

  function addItem(item) {
    items.value.push({ id: Date.now(), ...item });
  }

  function deleteItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  return {
    items,
    searchQuery,
    selectedCategory,
    filteredItems,
    addItem,
    deleteItem,
  };
});

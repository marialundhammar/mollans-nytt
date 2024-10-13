<template>
  <div class="z-0 flex flex-col items-center w-full p-6">
    <div class="w-full max-w-lg mb-4">
      <label for="name" class="block mb-2 font-semibold text-black text-start">Namn</label>
      <input
        id="name"
        v-model="name"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ämne"
      />
    </div>

    <button
      @click="savePost"
      class="px-6 py-3 text-white bg-black rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Skicka
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions

export default {
  name: "NewPost",
  setup() {
    const db = getFirestore();
    const name = ref("");

    const savePost = async () => {
      if (name.value) {
        try {
          await addDoc(collection(db, "subscribe"), {
            name: name.value,
            createdAt: new Date(),
          });
          alert("Post saved successfully!");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        alert("Please fill in all fields before saving.");
      }
    };

    return {
      name,
      savePost,
    };
  },
};
</script>

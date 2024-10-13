<template>
  <div class="flex flex-col items-center w-full p-6 bg-red-600">
    <h2 class="text-xl text-black text-start">TIPSA OSS!!</h2>
    <div class="w-full max-w-lg mb-4">
      <label for="title" class="block mb-2 font-semibold text-black text-start">Ämne</label>
      <input
        id="title"
        v-model="title"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ämne"
      />
    </div>

    <!-- Textarea Section -->
    <div class="w-full max-w-lg mb-4">
      <label for="longText" class="block mb-2 font-semibold text-black text-start">Text:</label>
      <textarea
        id="longText"
        v-model="longText"
        class="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Skriv ditt tips"
      ></textarea>
    </div>

    <!-- Submit Button -->
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
    const title = ref("");
    const longText = ref("");

    const savePost = async () => {
      if (title.value && longText.value) {
        try {
          await addDoc(collection(db, "suggestions"), {
            title: title.value,
            text: longText.value,
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
      title,
      longText,
      savePost,
    };
  },
};
</script>

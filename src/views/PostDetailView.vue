<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold" v-if="post">{{ post.title }}</h1>
    <p class="mt-2" v-if="post">{{ post.text }}</p>
    <router-link to="/posts" class="text-blue-500 hover:underline">Back to Posts</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // Import useRoute
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebaseConfig"; // Adjust the import based on your project structure

export default defineComponent({
  name: "PostDetailView",
  setup() {
    const route = useRoute(); // Get the current route
    const postId = route.params.id; // Access the post ID from route params

    // Define a reactive variable to hold the post data
    const post = ref<{ id: string; title: string; text: string } | null>(null);

    // Function to fetch the post data
    const fetchPost = async (id: string) => {
      try {
        const postRef = doc(db, "posts", id); // Create a reference to the post
        const postSnapshot = await getDoc(postRef); // Get the post document

        if (postSnapshot.exists()) {
          // If the document exists, update the post variable
          post.value = {
            id: postSnapshot.id,
            ...postSnapshot.data(), // Spread the post data
          } as { id: string; title: string; text: string }; // Type assertion
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      }
    };

    // Fetch the post data when the component is mounted
    onMounted(() => {
      if (postId) {
        fetchPost(postId as string); // Ensure postId is a string
      }
    });

    return {
      post,
    };
  },
});
</script>

<style scoped>
/* Add any specific styles for PostDetailView here */
</style>

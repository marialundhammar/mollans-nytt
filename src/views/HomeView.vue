<template>
  <div class="bg-gray-800">
    <nav class="fixed top-0 left-0 z-50 w-full p-4">
      <div class="container flex items-center justify-between mx-auto">
        <!-- Logo or brand name -->
        <div class="text-4xl font-bold text-white">🪱</div>

        <!-- Navigation links -->
        <ul class="flex space-x-4 text-xl text-red-600">
          <li>
            <router-link class="font-semibold hover:underline hover:cursor-pointer" to="/posts"
              >Artiklar</router-link
            >
          </li>
          <li>
            <a
              @click.prevent="scrollTo(adviceSection)"
              class="font-semibold hover:cursor-pointer hover:underline"
              >Tipsa oss!?</a
            >
          </li>
          <li>
            <a
              @click.prevent="scrollTo(subscribeSection)"
              class="font-semibold hover:cursor-pointer hover:underline"
              >Prenumerera</a
            >
          </li>
        </ul>
      </div>
    </nav>

    <div class="h-screen">
      <div
        ref="postsSection"
        class="flex flex-col items-center w-full bg-center bg-cover h-2/3 background"
        id="posts"
      >
        <div class="mt-[30vh] text-red-600 uppercase text-start">
          <h1 class="font-bold text-8xl">Möllans Nytt</h1>
          <h2 class="text-xl">Din lokala skvallerpress</h2>
        </div>

        <div class="flex justify-center w-full mt-[10vh]">
          <ul
            v-if="posts && posts.length > 0"
            class="grid w-full max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <li
              v-for="post in latestPosts"
              :key="post.id"
              class="p-4 bg-[#A4867D] text-black rounded-lg shadow-lg"
            >
              <PostItem :post="post" />
            </li>
          </ul>
          <p v-else class="text-center">No posts available.</p>
        </div>
      </div>
    </div>

    <div ref="adviceSection" class="h-screen">
      <h2 class="text-3xl text-center">Tipsa oss!?</h2>
    </div>

    <div ref="subscribeSection" class="h-screen bg-gray-300">
      <h2 class="text-3xl text-center">Prenumerera</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostItem from "@/components/PostItem.vue"; // Import PostItem component

// Define refs for sections
const postsSection = ref<HTMLElement | null>(null);
const adviceSection = ref<HTMLElement | null>(null);
const subscribeSection = ref<HTMLElement | null>(null);

// Function to scroll to a specific section
function scrollTo(section: HTMLElement | null) {
  section?.scrollIntoView({ behavior: "smooth" });
}

const posts = ref<null | { id: string; title: any; text: any }[]>(null);
const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    posts.value = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "Untitled",
        text: data.text || "No content available",
      };
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
};

const latestPosts = computed(() => {
  if (posts.value) {
    return posts.value.slice(-3).reverse();
  }
  return [];
});

onMounted(() => {
  fetchPosts();
});
</script>

<style>
.background {
  background-image: url("../assets/malmo.png");
  background-size: cover;
  background-position: start;
  background-repeat: no-repeat;
}
</style>

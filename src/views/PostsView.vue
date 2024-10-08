<template>
  <div>
    <div class="flex justify-center w-full mt-[10vh]">
      <ul
        v-if="posts.length > 0"
        class="grid w-full max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <li
          v-for="post in posts"
          :key="post.id"
          class="p-4 bg-[#A4867D] text-black rounded-lg shadow-lg"
        >
          <PostItem :post="post" />
        </li>
      </ul>
      <p v-else class="text-center">No posts available.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostItem from "@/components/PostItem.vue"; // Import PostItem component

export default defineComponent({
  name: "PostsView",
  components: {
    PostItem,
  },
  setup() {
    interface Post {
      id: string;
      title: string;
      text: string;
    }

    const posts = ref<Post[]>([]);

    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        posts.value = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Post;
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

    onMounted(() => {
      fetchPosts();
    });

    return {
      posts,
    };
  },
});
</script>

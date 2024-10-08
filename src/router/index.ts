import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostsView from "../views/PostsView.vue";
import PostDetailView from "../views/PostDetailView.vue"; // Import the PostDetailView component

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/posts",
    name: "posts",
    component: PostsView,
  },
  {
    path: "/posts/:id", // Dynamic route for individual posts
    name: "post-detail",
    component: PostDetailView, // Component to display post details
    props: true, // Pass route params as props to the component
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

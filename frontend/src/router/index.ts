import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddBookView from "../views/AddBookView.vue";
import DetailBookView from "../views/DetailBookView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add",
      name: "add-book",
      component: AddBookView,
    },
    {
      path: "/book/:id",
      name: "book-detail",
      component: DetailBookView,
      props: true, // tambahkan ini agar id bisa diakses sebagai prop
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      redirect(_) {
        return { path: "/" };
      },
    },
  ],
});

export default router;
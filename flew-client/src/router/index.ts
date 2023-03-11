import { createRouter, createWebHistory } from "vue-router";

// Main
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";
import MainPanel from "../views/MainPanel.vue";

// Flew
import Flew from "../views/Flew.vue";
import MessagePanel from "../views/MessagePanel.vue";
import CreateFlew from "../views/CreateFlew.vue";
import FlewInvite from "../views/FlewInvite.vue";

const routes = [
  {
    // Login
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    // Sign Up
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    // Flew Invite Link
    path: "/invite",
    name: "Invite",
    component: FlewInvite,
  },
  {
    // App core
    path: "/",
    name: "App",
    component: MainPanel,
    children: [
      {
        // Home
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        // Flew Core (include RoomPanel)
        path: "/flew/:flewId",
        name: "Flew",
        component: Flew,
        children: [
          {
            // Message Panel
            path: "/flew/:flewId/:roomId",
            name: "MessagePanel",
            component: MessagePanel,
          },
        ],
      },
      {
        // Create Flew
        path: "/create-flew",
        name: "CreateFlew",
        component: CreateFlew,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

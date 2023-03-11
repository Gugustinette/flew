/**
 * Flew Main module
 */

/**
 * Import modules
 */
import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { createPinia } from "pinia";

// Store
import { useUser } from "./store/modules/user/User";

// Provide typings for this.$attributes in the app
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: typeof axios;
  }
}

/**
 * Vue initialization
 */
const app = createApp({
  render: () => h(App),
});

/**
 * Create Pinia instance
 */
app.use(createPinia());

/**
 * Axios configuration
 */
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_API; // Rest API base URL
axios.interceptors.response.use(undefined, function (err) {
  // Intercept all errors
  return new Promise(function (resolve, reject) {
    if (err.response.status === 419) {
      // Authentication expired -> redirect to login (expired token)
      const userStore = useUser();
      userStore.logout();
      router.push("/login");
    } else {
      // Other error -> reject
      reject(err);
    }
  });
});

// Attach router to the app
app.use(router);

// Provide axios globally
app.config.globalProperties.$http = axios;

app.mount("#app");

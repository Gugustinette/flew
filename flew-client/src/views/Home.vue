<template>
  <a @click="logout">Disconnect</a>
</template>

<script lang="ts">
import { IFlew } from "@/store/interfaces/Flew";
import { defineComponent } from "vue";

// Store
import { useFlew } from "../store/modules/flew/Flew";
import { useUser } from "../store/modules/user/User";

export default defineComponent({
  setup() {
    const flewStore = useFlew();
    const userStore = useUser();

    return {
      flewStore,
      userStore,
    };
  },
  name: "view-home",
  methods: {
    logout() {
      this.userStore.logout();
      // Redirect to login
      this.$router.push("/login");
    },
  },
  mounted() {
    // Set current flew to undefined
    this.flewStore.currentFlew = {} as IFlew;
  },
});
</script>

<style scoped>
a {
  color: var(--primary);
  cursor: pointer;
  height: min-content;
  width: min-content;
}
</style>

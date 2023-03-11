<template>
  <h1>Flew invite</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFlew } from "../store/modules/flew/Flew";

export default defineComponent({
  setup() {
    const flewStore = useFlew();

    return {
      flewStore,
    };
  },
  name: "FlewInvite",
  mounted() {
    // Get the token from URL
    const token = this.$route.query.token as string;
    // Call action to join flew
    this.flewStore
      .joinFlew({
        token: token,
      })
      .then(() => {
        // Redirect to home
        this.$router.push("/");
      })
      .catch(() => {
        // Redirect to home
        this.$router.push("/");
      });
  },
});
</script>

<template>
  <router-link to="/">
    <div class="profile">
      <img
        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        alt="Profile Picture"
      />
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "flew-profile",
  props: {
    imageSource: String,
  },
});
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 10%;
  }
}
</style>

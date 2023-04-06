<template>
  <nav>
    <div class="nav-content">
      <Profile />
      <Flews />
      <AddFlewButton />
    </div>
    <div class="nav-settings">
      <Settings />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Profile from "@/components/navbar/Profile.vue";
import Flews from "@/components/navbar/Flews.vue";
import AddFlewButton from "@/components/navbar/AddFlewButton.vue";
import Settings from "@/components/navbar/Settings.vue";

export default defineComponent({
  name: "flew-navbar",
  components: {
    Profile,
    Flews,
    AddFlewButton,
    Settings,
  },
});
</script>

<style scoped lang="scss">
nav {
  height: 100%;
  width: 55px;
  min-width: 55px;
  background: var(--primary);
  display: flex;
  flex-direction: column;
  z-index: 1;
  padding-left: 2px;
  padding-right: 2px;

  .nav-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav-settings {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100px;
    padding-top: 10px;
  }
}
</style>

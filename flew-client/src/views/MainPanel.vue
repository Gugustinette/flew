<template>
  <div class="main-panel">
    <Navbar />
    <router-view />
  </div>
  <Settings v-if="globalStore.showSettings" />
  <CreateRoom />
  <CreateCategory />
  <Dialog
    v-if="globalStore.dialog.show"
    :title="globalStore.dialog.title"
    :content="globalStore.dialog.content"
    :confirmText="globalStore.dialog.confirmText"
    :cancelText="globalStore.dialog.cancelText"
    @close="globalStore.dialog.show = false"
    @confirm="globalStore.dialog.show = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "../store/modules/global/Global";
import { useUser } from "../store/modules/user/User";

// Components
import Navbar from "@/components/navbar/Navbar.vue";
import Settings from "@/views/Settings.vue";
import CreateRoom from "@/views/CreateRoom.vue";
import CreateCategory from "@/views/CreateCategory.vue";
import Dialog from "@/components/dialog/Dialog.vue";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();
    const userStore = useUser();

    return {
      globalStore,
      userStore,
    };
  },
  name: "view-main-panel",
  components: {
    Navbar,
    Settings,
    CreateRoom,
    CreateCategory,
    Dialog,
  },
});
</script>

<style lang="scss">
.main-panel {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
}
</style>

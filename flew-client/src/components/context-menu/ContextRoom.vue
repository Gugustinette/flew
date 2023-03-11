<template>
  <div class="context-menu">
    <div class="action">Action 1</div>
    <div class="separator"></div>
    <div class="action red" @click="deleteRoom">Delete</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useUser } from "../../store/modules/user/User";
import { useFlew } from "../../store/modules/flew/Flew";

// Components
import ContextMenu from "@/components/context-menu/ContextMenu.vue";

// Interfaces
import { IRoom } from "@/store/interfaces/Room";

export default defineComponent({
  setup() {
    const userStore = useUser();
    const flewStore = useFlew();

    return {
      userStore,
      flewStore,
    };
  },
  name: "ContextRoom",
  extends: ContextMenu,
  props: {
    room: {
      type: Object as () => IRoom,
      required: true,
    },
  },
  methods: {
    deleteRoom() {
      // Launch Delete Room Action
      this.flewStore.deleteRoom({
        userId: this.userStore.user.userId,
        flewId: this.flewStore.currentFlew._id,
        roomId: this.room._id,
      });
    },
  },
});
</script>

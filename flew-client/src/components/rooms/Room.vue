<template>
  <router-link
    :to="'/flew/' + $route.params.flewId + '/' + room?._id"
    class="room-button"
    v-on:click="handleClick"
    v-on:contextmenu="handleContextMenu"
  >
    <div class="room">#{{ room?.name }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useFlew } from "../../store/modules/flew/Flew";

// Interfaces
import { IRoom } from "@/store/interfaces/Room";
import { ICategory } from "@/store/interfaces/Category";

export default defineComponent({
  setup() {
    const flewStore = useFlew();

    return {
      flewStore,
    };
  },
  name: "flew-room",
  props: {
    category: Object as () => ICategory,
    room: Object as () => IRoom,
  },
  methods: {
    handleClick() {
      this.flewStore.currentRoom = this.room as IRoom;
    },
    handleContextMenu(event: MouseEvent) {
      event.preventDefault();
      // Emit Contextmenu event
      this.$emit("showContextRoom", {
        event: event,
        room: this.room,
      });
    },
  },
});
</script>

<style scoped lang="scss">
.room-button {
  width: 100%;
  height: 40px;
  display: grid;
  place-items: center;
  transition: all 0.3s ease;

  &.router-link-active div {
    background: var(--surface);
  }
}

.room {
  width: 80%;
  height: 100%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 1rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: var(--secondary);
    transition: all 0.3s ease;
  }
}
</style>

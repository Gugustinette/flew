<template>
  <div class="category">
    <div class="category-header" @contextmenu.prevent="handleContextCategory">
      <h1>{{ category?.name }}</h1>
      <div class="add-room" v-on:click="addRoomInCategory()">+</div>
    </div>
    <Room
      v-for="room in category?.rooms"
      :key="room._id"
      v-bind:category="category"
      v-bind:room="room"
      v-bind:currentRoomId="currentRoomId"
      @showContextRoom="handleContextRoom"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";
import { useFlew } from "../../store/modules/flew/Flew";

// Interfaces
import { IRoom } from "@/store/interfaces/Room";
import { ICategory } from "@/store/interfaces/Category";

// Components
import Room from "@/components/rooms/Room.vue";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();
    const flewStore = useFlew();

    return {
      globalStore,
      flewStore,
    };
  },
  name: "flew-category",
  props: {
    category: Object as () => ICategory,
    rooms: Array as () => IRoom[],
    currentRoomId: String,
  },
  methods: {
    addRoomInCategory() {
      this.flewStore.categoryToCreateRoom = this.category as ICategory;
      this.globalStore.toggleCreateRoomVisibility();
    },
    handleContextRoom(event: any) {
      // Emit Contextmenu event
      this.$emit("showContextRoom", {
        event: event.event,
        room: event.room,
      });
    },
    handleContextCategory(event: any) {
      // Emit Contextmenu event
      this.$emit("showContextCategory", {
        event: event,
        category: this.category,
      });
    },
  },
  components: {
    Room,
  },
});
</script>

<style scoped lang="scss">
.category {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-start;
  font-size: 0.9rem;

  .category-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    h1 {
      font-weight: var(--font-weight-bold);
      margin: 0;
      padding-left: 0.5rem;
    }

    .add-room {
      height: 20px;
      width: 20px;
      display: grid;
      place-content: center;
      margin-right: 8px;
      font-size: 1.3rem;
      cursor: pointer;
    }
  }
}
</style>

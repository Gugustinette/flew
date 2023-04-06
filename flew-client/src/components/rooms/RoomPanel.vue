<template>
  <nav v-bind:class="{ hidden: globalStore.showRooms }">
    <PanelTop :flew="flew" />
    <div class="categories no-scrollbar">
      <Category
        v-for="category in categories"
        :key="category._id"
        v-bind:category="category"
        v-bind:currentRoomId="currentRoom._id"
        @showContextRoom="handleContextRoom"
        @showContextCategory="handleContextCategory"
      />
    </div>
  </nav>
  <ContextRoom
    :room="contextRoom"
    :mousePos="contextRoomMousePos"
    v-if="showContextRoom"
    @close="closeContextRoom"
  />
  <ContextCategory
    :category="contextCategory"
    :mousePos="contextCategoryMousePos"
    v-if="showContextCategory"
    @close="closeContextCategory"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";

// Components
import Category from "@/components/rooms/Category.vue";
import PanelTop from "@/components/rooms/PanelTop.vue";
import ContextRoom from "@/components/context-menu/ContextRoom.vue";
import ContextCategory from "@/components/context-menu/ContextCategory.vue";

// Interfaces
import { IFlew } from "@/store/interfaces/Flew";
import { ICategory } from "@/store/interfaces/Category";
import { IRoom } from "@/store/interfaces/Room";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();

    return {
      globalStore,
    };
  },
  name: "flew-room-panel",
  props: {
    flew: {
      type: Object as () => IFlew,
      required: true,
    },
    categories: {
      type: Array as () => ICategory[],
      required: true,
    },
    currentRoom: {
      type: Object as () => IRoom,
      required: true,
    },
  },
  components: {
    Category,
    PanelTop,
    ContextRoom,
    ContextCategory,
  },
  methods: {
    handleContextRoom(event: any) {
      this.contextRoom = event.room;
      this.contextRoomMousePos = {
        x: event.event.clientX,
        y: event.event.clientY,
      };
      this.showContextRoom = true;
    },
    closeContextRoom() {
      this.showContextRoom = false;
    },
    handleContextCategory(event: any) {
      this.contextCategory = event.category;
      this.contextCategoryMousePos = {
        x: event.event.clientX,
        y: event.event.clientY,
      };
      this.showContextCategory = true;
    },
    closeContextCategory() {
      this.showContextCategory = false;
    },
  },
  data() {
    return {
      contextRoom: {} as IRoom,
      contextRoomMousePos: {
        x: 0,
        y: 0,
      },
      showContextRoom: false,
      contextCategory: {} as ICategory,
      contextCategoryMousePos: {
        x: 0,
        y: 0,
      },
      showContextCategory: false,
    };
  },
});
</script>

<style scoped lang="scss">
nav {
  min-width: 230px;
  height: 100%;
  background: var(--surface-secondary);
  display: flex;
  flex-direction: column;
  position: relative;

  .categories {
    padding-top: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    overflow: auto;
  }

  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.hidden {
  width: 0;
  min-width: 0;
  overflow: hidden;
}
</style>

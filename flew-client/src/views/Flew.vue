<template>
  <div class="flew-panel">
    <RoomPanel
      :flew="flewStore.currentFlew"
      :categories="flewStore.currentCategories"
      :currentRoom="flewStore.currentRoom"
    />
    <p class="text-can-be-selected" v-if="displayMainPage">
      {{ flewStore.currentFlew.description }}
    </p>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

// Store
import { useFlew } from "../store/modules/flew/Flew";
import { useGlobal } from "../store/modules/global/Global";

// Components
import RoomPanel from "@/components/rooms/RoomPanel.vue";

// Interfaces
import { IFlew } from "@/store/interfaces/Flew";
import { ICategory } from "@/store/interfaces/Category";
import { IRoom } from "@/store/interfaces/Room";

export default defineComponent({
  setup() {
    const flewStore = useFlew();
    const globalStore = useGlobal();

    const socket = globalStore.socket;

    return {
      flewStore,
      globalStore,
      socket,
    };
  },
  name: "FlewView",
  components: {
    RoomPanel,
  },
  methods: {
    setupSubscribe() {
      // Subscribe to store
      // Flews
      watch(
        () => this.flewStore.flews,
        (newFlews: IFlew[]) => {
          if (newFlews.length > 0) {
            // Set flew from url
            this.setFlewFromUrl(this.flewStore.flews);
          }
        },
        { immediate: true }
      );
      // Current Flew
      watch(
        () => this.flewStore.currentFlew,
        (newFlew: IFlew) => {
          if (newFlew && newFlew._id) {
            // Fetch categories
            this.flewStore.getCategories(newFlew);
            // Leave previous flew
            this.socket.emit("leave-flew", {
              flew: newFlew._id,
            });
            // Join the flew
            this.socket.emit("join-flew", {
              flew: newFlew._id,
            });
            this.verifyRoomIsSet();
          }
        },
        { immediate: true }
      );
      // Current Room
      watch(
        () => this.flewStore.currentRoom,
        (newRoom: IRoom) => {
          if (newRoom && newRoom.category) {
            let category = this.flewStore.currentCategories.find(
              (categoryTest: ICategory) => categoryTest._id === newRoom.category
            );
            this.flewStore.currentCategory = category as ICategory;
            this.displayMainPage = false;
          }
        },
        { immediate: true }
      );
    },
    setupSocket() {
      // When a room is created
      this.socket.on("room/create", (room: IRoom) => {
        let categories = this.flewStore.currentCategories;
        // Find the index of the category
        const categoryIndex = categories.findIndex(
          (category) => category._id === room.category
        );
        // If the category exists
        if (categoryIndex !== -1) {
          // Add the room to the category
          categories[categoryIndex].rooms.push(room);
          // Update store
          this.flewStore.currentCategories = categories;
        }
      });

      // When a room is deleted
      this.socket.on("room/delete", (room: IRoom) => {
        let categories = this.flewStore.currentCategories;
        // Find the index of the category
        const categoryIndex = categories.findIndex(
          (category) => category._id === room.category
        );
        // If the category exists
        if (categoryIndex !== -1) {
          // Find the index of the room
          const roomIndex = categories[categoryIndex].rooms.findIndex(
            (roomCat) => roomCat._id === room._id
          );
          // If the room exists
          if (roomIndex !== -1) {
            // Remove the room from the category
            let deletedRoom = categories[categoryIndex].rooms.splice(
              roomIndex,
              1
            )[0] as IRoom;
            // If deleted room is the current room
            if (this.flewStore.currentRoom._id == deletedRoom._id) {
              // Redirect to flew home page
              this.flewStore.currentRoom = categories[0].rooms[0];
            }
            // Update store
            this.flewStore.currentCategories = categories;
          }
        }
      });

      // When a category is created
      this.socket.on("category/create", (category: ICategory) => {
        let categories = this.flewStore.currentCategories;
        // Add the category to the flew
        categories.push(category);
        // Update store
        this.flewStore.currentCategories = categories;
      });

      // When a category is deleted
      this.socket.on("category/delete", (category: ICategory) => {
        let categories = this.flewStore.currentCategories;
        // Find the index of the category
        const categoryIndex = categories.findIndex(
          (categoryCat) => categoryCat._id === category._id
        );
        // If the category exists
        if (categoryIndex !== -1) {
          // Remove the category from the categories
          categories.splice(categoryIndex, 1)[0] as ICategory;
          // Update store
          this.flewStore.currentCategories = categories;
        }
      });
    },
    setFlewFromUrl(flews: IFlew[]) {
      // Get flew corresponding to the current url
      let currentFlew = flews.find(
        (flew: IFlew) => flew._id === this.$route.params.flewId
      ) as IFlew;
      // Set current flew
      this.flewStore.currentFlew = currentFlew;
    },
    verifyRoomIsSet() {
      // If roomId is not set in the url
      if (this.$route.params.roomId === undefined) {
        this.displayMainPage = true;
      } else {
        this.displayMainPage = false;
      }
    },
  },
  beforeMount() {
    // Subscribe to store changes
    this.setupSubscribe();
  },
  mounted() {
    // Setup web socket connection
    this.setupSocket();
  },
  data() {
    return {
      displayMainPage: false,
    };
  },
});
</script>

<style lang="scss">
.flew-panel {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>

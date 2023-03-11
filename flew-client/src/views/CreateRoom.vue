<template>
  <ModalPanel
    v-if="globalStore.showCreateRoom"
    v-on:close="globalStore.toggleCreateRoomVisibility"
    v-on:confirm="createRoom"
    title="Create Room"
    :fields="['Name']"
    confirmText="Create"
    cancelText="Cancel"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "../store/modules/global/Global";
import { useUser } from "../store/modules/user/User";
import { useFlew } from "../store/modules/flew/Flew";

// Components
import ModalPanel from "@/components/modal/Modal.vue";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();
    const userStore = useUser();
    const flewStore = useFlew();

    return {
      globalStore,
      userStore,
      flewStore,
    };
  },
  name: "CreateRoomView",
  components: {
    ModalPanel,
  },
  methods: {
    createRoom(fieldValues: any) {
      this.flewStore
        .createRoom({
          userId: this.userStore.user.userId,
          flewId: this.flewStore.currentFlew._id,
          name: fieldValues.Name,
          categoryId: this.flewStore.categoryToCreateRoom._id,
        })
        .then(() => {
          console.log("Room created");
        });
    },
  },
  beforeMount() {
    this.socket = this.globalStore.socket;
  },
  data() {
    return {
      socket: {} as any,
    };
  },
});
</script>

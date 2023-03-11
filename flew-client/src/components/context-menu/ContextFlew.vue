<template>
  <div class="context-menu">
    <div class="action" @click="createInviteLink">Invite friends</div>
    <div class="separator"></div>
    <div class="action red" @click="deleteCategory">Delete</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useUser } from "../../store/modules/user/User";
import { useFlew } from "../../store/modules/flew/Flew";
import { useGlobal } from "../../store/modules/global/Global";

// Components
import ContextMenu from "@/components/context-menu/ContextMenu.vue";

// Interfaces
import { IFlew } from "@/store/interfaces/Flew";

export default defineComponent({
  setup() {
    const userStore = useUser();
    const flewStore = useFlew();
    const globalStore = useGlobal();

    return {
      userStore,
      flewStore,
      globalStore,
    };
  },
  name: "ContextFlew",
  extends: ContextMenu,
  props: {
    flew: {
      type: Object as () => IFlew,
      required: true,
    },
  },
  methods: {
    createInviteLink() {
      this.flewStore.createInviteLink(this.flew).then((res: any) => {
        this.globalStore.dialog = {
          show: true,
          title: "Invitation Link",
          content: `Your invitation link is : ${res.data.link}`,
          confirmText: "Close",
          cancelText: "",
        };
      });
    },
    deleteCategory() {
      // Launch Delete Room Action
      this.flewStore.deleteFlew({
        userId: this.userStore.user.userId,
        flewId: this.flew._id,
      });
      // Navigate to '/'
      this.$router.push("/");
    },
  },
});
</script>

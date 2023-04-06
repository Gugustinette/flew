<template>
  <div class="context-menu">
    <div class="action">Action 1</div>
    <div class="separator"></div>
    <div class="action red" @click="deleteCategory">Delete</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useFlew } from "../../store/modules/flew/Flew";
import { useUser } from "../../store/modules/user/User";

// Components
import ContextMenu from "@/components/context-menu/ContextMenu.vue";

// Interfaces
import { ICategory } from "@/store/interfaces/Category";

export default defineComponent({
  setup() {
    const flewStore = useFlew();
    const userStore = useUser();

    return {
      flewStore,
      userStore,
    };
  },
  name: "flew-context-category",
  extends: ContextMenu,
  props: {
    category: {
      type: Object as () => ICategory,
      required: true,
    },
  },
  methods: {
    deleteCategory() {
      // Launch Delete Room Action
      this.flewStore.deleteCategory({
        userId: this.userStore.user.userId,
        flewId: this.flewStore.currentFlew._id,
        categoryId: this.category._id,
      });
    },
  },
});
</script>

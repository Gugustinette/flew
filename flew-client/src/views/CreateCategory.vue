<template>
  <ModalPanel
    v-if="globalStore.showCreateCategory"
    v-on:close="globalStore.toggleCreateCategoryVisibility"
    v-on:confirm="createCategory"
    title="Create Category"
    :fields="['Name']"
    confirmText="Create"
    cancelText="Cancel"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";
import { useFlew } from "@/store/modules/flew/Flew";
import { useUser } from "@/store/modules/user/User";

// Components
import ModalPanel from "@/components/modal/Modal.vue";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();
    const flewStore = useFlew();
    const userStore = useUser();

    return {
      globalStore,
      flewStore,
      userStore,
    };
  },
  name: "view-create-category",
  components: {
    ModalPanel,
  },
  methods: {
    createCategory(fieldValues: any) {
      this.flewStore
        .createCategory({
          userId: this.userStore.user.userId,
          flewId: this.flewStore.currentFlew._id,
          name: fieldValues.Name,
        })
        .then(() => {
          console.log("Category created");
        });
    },
  },
  data() {
    return {
      showCreateCategory: false as boolean,
    };
  },
});
</script>

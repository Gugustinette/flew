<template>
  <ul>
    <div class="setting" v-on:click="handleClick"></div>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();

    return {
      globalStore,
    };
  },
  name: "flew-settings",
  methods: {
    handleClick() {
      this.globalStore.toggleSettingsVisibility();
    },
  },
});
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  list-style-type: none;
  align-items: center;
  row-gap: 10px;

  .setting {
    width: 40px;
    height: 40px;
    background: rgb(85, 85, 85);
    border-radius: 100%;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="settings-option-panel">
    <h1>Settings Panel</h1>
    <h2>{{ actualSettingPage }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsPanel",
  props: {
    actualSettingPage: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss">
.settings-option-panel {
  height: 100%;
  width: 100%;
  min-width: 500px;
  max-width: 800px;
}
</style>

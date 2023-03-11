<template>
  <div class="setting-button" v-bind:class="{ active: isActive }">
    {{ content }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsNavbarButton",
  props: {
    content: {
      type: String,
      default: "",
    },
    page: {
      type: String,
      default: "",
    },
    actualSettingPage: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick(page: string) {
      this.$emit("changeSettingPage", page);
    },
  },
  mounted() {
    this.isActive = this.actualSettingPage === this.page;
  },
  updated() {
    this.isActive = this.actualSettingPage === this.page;
  },
  data() {
    return {
      isActive: false,
    };
  },
});
</script>

<style scoped lang="scss">
.setting-button {
  width: 90%;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 15px;
  background: var(--glassmorphism-surface);
  border-radius: var(--border-radius);
  display: grid;
  justify-items: start;
  align-items: center;
  font-size: var(--font-size-button);
  font-weight: 500;
  color: var(--font-off);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: inherit;
    background: var(--glassmorphism-surface-hover);
    transition: all 0.2s ease-in-out;
  }
}

.active {
  color: var(--font-on);
  background: var(--glassmorphism-surface-hover);
}
</style>

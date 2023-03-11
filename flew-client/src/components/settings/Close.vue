<template>
  <div class="settings-close">
    <div class="button" v-on:click="handleClick">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsClose",
  emits: ["close"],
  methods: {
    handleClick() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped lang="scss">
.settings-close {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  width: 60px;
  height: 50px;
  fill: var(--font-discrete);
  cursor: pointer;
  transition: fill 200ms ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover {
    fill: var(--font-on-surface);
    transition: fill 200ms ease-in;
  }
}
</style>

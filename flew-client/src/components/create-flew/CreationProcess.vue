<template>
  <div class="container">
    <div class="option" @click="QuickCreation">
      <h1>Quick</h1>
    </div>
    <div class="option" @click="AdvancedCreation">
      <h1>Advanced</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "flew-creation-process",
  methods: {
    QuickCreation() {
      // Emit event to go to next step
      this.$emit("quick-creation");
    },
    AdvancedCreation() {
      // Emit event to go to next step
      this.$emit("advanced-creation");
    },
  },
});
</script>

<style lang="scss" scoped="true">
.container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 1rem;
  width: 80%;

  .option {
    display: grid;
    place-items: center;
    height: 200px;
    background: var(--surface-secondary);
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease-in;

    &:hover {
      border: 1px solid var(--primary);
    }
  }
}
</style>

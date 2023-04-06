<template>
  <form @submit.prevent="nextStep" class="container">
    <h2>Are you sure you want to create your flew ?</h2>
    <div class="bottom-navigation">
      <Button content="Create" type="submit" />
      <Button content="Cancel" @click="cancelStep" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Button from "@/components/form/Button.vue";

export default defineComponent({
  name: "flew-creation-confirm",
  components: {
    Button,
  },
  methods: {
    nextStep() {
      // Emit event to go to next step
      this.$emit("next-step");
    },
    cancelStep() {
      // Emit event to go to previous step
      this.$emit("cancel-step");
    },
  },
  data() {
    return {
      flewName: "" as string,
      flewDescription: "" as string,
    };
  },
});
</script>

<style lang="scss" scoped="true">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  width: 80%;
  background: var(--surface-secondary);
  border-radius: var(--border-radius);
  padding: 20px;

  .bottom-navigation {
    display: flex;
    flex-direction: row-reverse;
    column-gap: 20px;
    width: 100%;
  }
}
</style>

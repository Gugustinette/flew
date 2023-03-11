<template>
  <form @submit.prevent="nextStep" class="container">
    <h2>Name your flew</h2>
    <TextField name="flew-name" v-model="flewName" v-bind:value="flewName" />
    <h2>Make a brief description of it</h2>
    <TextField
      name="flew-description"
      v-model="flewDescription"
      v-bind:value="flewDescription"
    />
    <div class="bottom-navigation">
      <Button content="Next" type="submit" />
      <Button content="Cancel" @click="cancelStep" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import TextField from "@/components/form/TextField.vue";
import Button from "@/components/form/Button.vue";

export default defineComponent({
  name: "CreationFlewName",
  components: {
    TextField,
    Button,
  },
  methods: {
    nextStep() {
      // Emit event to go to next step
      this.$emit("next-step", {
        flewName: this.flewName,
        flewDescription: this.flewDescription,
      });
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

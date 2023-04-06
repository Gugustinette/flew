<template>
  <ul>
    <Flew
      v-for="flew in flewStore.flews"
      :key="flew"
      v-bind:flew="flew"
      v-bind:currentFlew="flewStore.currentFlew"
      @showContextFlew="handleContextFlew"
    />
  </ul>
  <ContextFlew
    :flew="contextFlew"
    :mousePos="contextFlewMousePos"
    v-if="showContextFlew"
    @close="closeContextFlew"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useFlew } from "@/store/modules/flew/Flew";

// Components
import Flew from "@/components/navbar/Flew.vue";
import ContextFlew from "@/components/context-menu/ContextFlew.vue";

// Interfaces
import { IFlew } from "@/store/interfaces/Flew";

export default defineComponent({
  setup() {
    const flewStore = useFlew();

    return {
      flewStore,
    };
  },
  name: "flew-flews",
  components: {
    Flew,
    ContextFlew,
  },
  methods: {
    handleContextFlew(event: any) {
      this.contextFlew = event.flew;
      this.contextFlewMousePos = {
        x: event.event.clientX,
        y: event.event.clientY,
      };
      this.showContextFlew = true;
    },
    closeContextFlew() {
      this.showContextFlew = false;
    },
  },
  mounted() {
    // Get flews from the server
    this.flewStore.getFlews();
  },
  data() {
    return {
      contextFlew: {} as IFlew,
      contextFlewMousePos: {
        x: 0,
        y: 0,
      },
      showContextFlew: false,
    };
  },
});
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  align-items: center;
  row-gap: 10px;
}
</style>

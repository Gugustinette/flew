<template>
  <div class="message-panel-top">
    <h1>#{{ room?.name }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Interfaces
import { IRoom } from "@/store/interfaces/Room";

export default defineComponent({
  name: "MessagePanel",
  props: {
    room: Object as () => IRoom,
  },
});
</script>

<style scoped lang="scss">
.message-panel-top {
  min-height: 50px;
  height: 50px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--surface);
  }

  h1 {
    font-size: var(--font-size-subtitle);
    font-weight: var(--font-weight-bold);
    margin-left: 1rem;
  }
}
</style>

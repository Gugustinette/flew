<template>
  <div class="context-menu"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContextMenu",
  props: {
    mousePos: {
      type: Object as () => { x: number; y: number },
      required: true,
    },
  },
  methods: {
    close() {
      // Emit Close Event
      this.$emit("close");
      // Remove Listeners
      document.removeEventListener("mousemove", this.onMouseMoveListener);
      document.removeEventListener("click", this.onClickListener);
    },
  },
  mounted() {
    // Move context menu to mouse pos
    let contextMenu = document.querySelector(".context-menu") as HTMLElement;
    contextMenu.style.top = this.mousePos.y + "px";
    contextMenu.style.left = this.mousePos.x + "px";
    // Track mouse pos
    document.addEventListener("mousemove", this.onMouseMoveListener);
    // On click outside the context menu
    document.addEventListener("click", this.onClickListener);
  },
  updated() {
    // Move context menu to mouse pos
    let contextMenu = document.querySelector(".context-menu") as HTMLElement;
    contextMenu.style.top = this.mousePos.y + "px";
    contextMenu.style.left = this.mousePos.x + "px";
  },
  data() {
    return {
      // Listeners
      onMouseMoveListener: (e: MouseEvent) => {
        // If mouse is at the right of the context menu
        if (e.clientX > this.mousePos.x + 250) {
          // Delete the component
          this.close();
        }
      },
      onClickListener: () => {
        // Delete the component
        this.close();
      },
    };
  },
});
</script>

<style lang="scss">
.context-menu {
  position: absolute;
  padding: 4px 0;
  border-radius: var(--border-radius-discrete);
  width: 200px;
  background: var(--surface);
  color: var(--font-on-surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  pointer-events: all;

  .action {
    width: 90%;
    display: grid;
    align-content: center;
    padding: 10px 5px;
    cursor: pointer;
    border-radius: var(--border-radius-discrete);

    &:hover {
      color: var(--font-on-primary);
      background: var(--primary);
    }
  }

  .red {
    &:hover {
      background: var(--red);
    }
  }

  .separator {
    border-top: 1px solid var(--surface-secondary);
    width: 90%;
    margin: 4px 0;
  }
}
</style>

<template>
  <div class="dialog-panel" @click.self="closeDialogPanel('close')">
    <div class="dialog">
      <div class="close" @click="closeDialogPanel('close')">x</div>
      <h1>{{ title }}</h1>
      <div class="fields">
        <div class="field text-can-be-selected">
          {{ content }}
        </div>
      </div>
      <div class="dialog-footer">
        <Button
          v-if="confirmText !== ''"
          v-bind:content="confirmText"
          :colorOnHover="true"
          @click="handleConfirm"
        />
        <Button
          v-if="cancelText !== ''"
          v-bind:content="cancelText"
          :noBackground="true"
          @click="closeDialogPanel('close')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Button from "@/components/form/Button.vue";

export default defineComponent({
  name: "flew-dialog",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    content: {
      type: String,
      default: "Modal Content",
    },
    confirmText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
  },
  components: {
    Button,
  },
  methods: {
    closeDialogPanel(tag: string) {
      // Select .dialog-panel element
      const dialogPanel = document.querySelector(".dialog-panel");
      if (dialogPanel) {
        // Launch fadeInUp animation on it
        dialogPanel.classList.add("out");
        // Remove the animation class after the animation is finished
        setTimeout(() => {
          this.$emit(tag);
        }, 250);
      }
    },
    handleConfirm() {
      this.closeDialogPanel("confirm");
    },
  },
});
</script>

<style scoped lang="scss">
.dialog-panel {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  display: grid;
  place-items: center;
  z-index: 10;
  background: var(--modal-background);
  backdrop-filter: var(--modal-backdrop-filter);
  -webkit-backdrop-filter: var(--modal-backdrop-filter);
  transition: all 0.25s ease-in-out;

  .dialog {
    position: relative;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    min-width: 350px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--surface);

    opacity: 1 !important;
    -webkit-transform: scale(1) translateZ(0px) !important;
    transform: scale(1) translateZ(0px) !important;
    -webkit-animation: dialoganim 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    animation: dialoganim 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    -webkit-transition: all 100ms;
    transition: all 100ms;
    -webkit-transition-delay: 5s;
    transition-delay: 5s;

    .fields {
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      width: 100%;
      row-gap: 20px;

      .field {
        display: flex;
        flex-direction: column;
        width: 100%;
        // Wrap text when it's too long
        word-wrap: break-word;

        label {
          align-self: flex-start;
          margin-bottom: 5px;
        }
      }
    }

    .close {
      position: absolute;
      height: 20px;
      width: 20px;
      top: 0;
      right: 0;
      margin-right: 6px;
      margin-top: 6px;
      display: grid;
      place-content: center;
      font-size: 1.2rem;
      cursor: pointer;
    }

    h1 {
      font-size: var(--font-size-title);
      margin-bottom: 20px;
    }

    .dialog-footer {
      margin-top: 20px;
      padding: 20px;
      display: flex;
      flex-direction: row-reverse;
      column-gap: 10px;
      width: 100%;
      background: var(--surface-secondary);
    }
  }
}

.out {
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);

  .dialog {
    -webkit-animation: dialoganimout 300 cubic-bezier(0.3, 0.3, 0.18, 1.88);
    animation: dialoganimout 300ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
  }
}

@-webkit-keyframes dialoganim {
  from {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dialoganim {
  from {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes dialoganimout {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  to {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }
}

@keyframes dialoganimout {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  to {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>

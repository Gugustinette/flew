<template>
  <div class="message">
    <img
      class="message-user-image"
      v-bind:src="message?.user.avatar"
      v-if="!sameUser"
      alt=""
    />
    <div v-else></div>
    <div class="message-text">
      <div
        class="message-user-name text-can-be-selected"
        v-if="!sameUser"
        :style="{ color: color }"
      >
        {{ message?.user.username }}
      </div>
      <p
        class="message-content text-can-be-selected"
        v-bind:class="{
          'message-content-only': sameUser,
          'message-content-room-invisible': !globalStore.showRooms,
        }"
      >
        {{ message?.content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";

// Interfaces
import { IMessage } from "@/store/interfaces/Message";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();

    return {
      globalStore,
    };
  },
  name: "flew-message",
  props: {
    message: Object as () => IMessage,
    sameUser: Boolean,
  },
  mounted() {
    // Generate a random color using user username
    this.color = this.generateColor(this.message?.user.username || "");
  },
  methods: {
    generateColor(username: string) {
      // Generate a random color using user username
      const hash = username
        .split("")
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
      return `hsl(${hash % 360}, 100%, 50%)`;
    },
  },
  data() {
    return {
      color: "",
    };
  },
});
</script>

<style scoped lang="scss">
.message {
  display: flex;
  flex-direction: row;
  padding-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface);
    transition: all 0.2s ease;
  }

  .message-user-image {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  .message-text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    row-gap: 2px;

    .message-user-name {
      height: 20px;
      margin-top: 5px;
      font-family: var(--font-family-bold);
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-bold);
      width: min-content;
    }

    .message-content {
      text-align: start;
      overflow-wrap: break-word;
      width: calc(100vw - 55px - 230px - 2.2rem - 30px);
    }
  }

  .message-content-only {
    padding-top: 0;
    padding-left: 3.2rem;
    padding-bottom: 0;
  }

  .message-content-room-invisible {
    width: calc(100vw - 55px - 2.2rem - 30px);
  }
}
</style>

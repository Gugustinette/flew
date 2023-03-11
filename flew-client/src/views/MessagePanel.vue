<template>
  <div class="message-panel">
    <div class="message-container">
      <MessagePanelTop :room="room" />
      <div class="messages" v-if="messages.length > 0">
        <Message
          v-for="message in messages"
          :key="message._id"
          v-bind:message="message"
          v-bind:sameUser="message.sameUser"
        />
      </div>
    </div>
    <div class="message-writer">
      <form @submit.prevent="sendMessage">
        <TextField
          name="message"
          v-model="message"
          v-bind:value="message"
          v-bind:placeholder="'Envoyez un message dans #' + room.name"
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

// Store
import { useUser } from "../store/modules/user/User";
import { useFlew } from "../store/modules/flew/Flew";
import { useMessage } from "@/store/modules/message/Message";
import { useGlobal } from "@/store/modules/global/Global";

// Components
import MessagePanelTop from "@/components/messages/MessagePanelTop.vue";
import Message from "@/components/messages/Message.vue";
import TextField from "@/components/form/TextField.vue";

// Interfaces
import { IMessage } from "@/store/interfaces/Message";
import { IRoom } from "@/store/interfaces/Room";
import { ICategory } from "@/store/interfaces/Category";
import { IUser } from "@/store/interfaces/User";

export default defineComponent({
  setup() {
    const userStore = useUser();
    const flewStore = useFlew();
    const messageStore = useMessage();
    const globalStore = useGlobal();

    const socket = globalStore.socket;

    return {
      userStore,
      flewStore,
      messageStore,
      globalStore,
      socket,
    };
  },
  name: "MessagePanel",
  components: {
    MessagePanelTop,
    Message,
    TextField,
  },
  methods: {
    setupSubscribe() {
      // Subscribe to store
      // Current Categories
      watch(
        () => this.flewStore.currentCategories,
        (newCategories: ICategory[]) => {
          if (newCategories.length > 0) {
            // Set room from url
            this.setRoomFromUrl(this.flewStore.currentCategories);
          }
        },
        { immediate: true }
      );
      // Current Room
      watch(
        () => this.flewStore.currentRoom,
        (newRoom: IRoom) => {
          if (newRoom && newRoom._id) {
            // Leave previous room
            this.socket.emit("leave-room", {
              room: this.room._id,
            });
            this.room = newRoom;
            this.updateMessages();
            // Join the room
            this.socket.emit("join-room", {
              room: this.room._id,
            });
          }
        },
        { immediate: true }
      );
    },
    setupSocket() {
      // Web socket connection
      this.socket.on("message/send", (message: IMessage) => {
        // Check if message is from the same user as previous one
        if (this.messages.length > 0) {
          message.sameUser =
            message.user.userId ===
            this.messages[this.messages.length - 1].user.userId;
        } else {
          message.sameUser = false;
        }
        this.messages.push(message);
      });
    },
    sendMessage() {
      // Send message to server
      this.messageStore.sendMessage({
        content: this.message,
        roomId: this.room._id,
        categoryId: this.room.category,
      });
      this.message = "";
    },
    updateMessages() {
      this.messages = [];
      if (this.room) {
        // Get messages from the server
        this.messageStore
          .getMessages({
            roomId: this.room._id,
          })
          .then((res) => {
            this.messages = res as IMessage[];
            // Iterate through messages and set the sameUser property
            // If the user is the same as the last user and it's not the first message, set sameUser to true
            // Else, set sameUser to false
            var lastUser = {} as IUser;
            this.messages.forEach((message: IMessage) => {
              if (lastUser) {
                if (lastUser.userId === message.user.userId) {
                  message.sameUser = true;
                } else {
                  message.sameUser = false;
                }
              } else {
                message.sameUser = false;
              }
              lastUser = message.user;
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    setRoomFromUrl(categories: ICategory[]) {
      if (categories && categories.length > 0) {
        // Get room inside categories corresponding to the current url
        let currentRoom = undefined;
        categories.forEach((category: ICategory) => {
          category.rooms.forEach((room: IRoom) => {
            if (room._id === this.$route.params.roomId) {
              currentRoom = room;
            }
          });
        });
        // Set current room
        this.flewStore.currentRoom = currentRoom || ({} as IRoom);
      }
    },
  },
  beforeMount() {
    // Subscribe to store changes
    this.setupSubscribe();
  },
  mounted() {
    // Setup web socket connection
    this.setupSocket();
  },
  updated() {
    // Scroll to the end of the div
    var element = document.querySelector(".messages") as HTMLElement;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  },
  data() {
    return {
      room: {} as IRoom,
      messages: [] as IMessage[],
      message: "" as string,
    };
  },
});
</script>

<style scoped lang="scss">
.message-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .message-container {
    height: 100%;
    max-height: calc(100vh - 60px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .message-panel-top {
      height: 46.5px;
      width: 100%;
      position: relative;
      display: grid;
      place-items: center;

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
        font-weight: bold;
      }
    }

    .messages {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
    }
  }

  .message-writer {
    height: 60px;
    width: auto;

    input {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}
</style>

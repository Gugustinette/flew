/**
 * Message module
 * @module store/modules/message/Message
 */
import { defineStore } from "pinia";
import axios from "axios";

// Import stores
import { useUser } from "@/store/modules/user/User";
import { useFlew } from "@/store/modules/flew/Flew";

// Interfaces
import {
  IMessage,
  IGetMessages,
  ISendMessage,
} from "@/store/interfaces/Message";

// Export store
export const useMessage = defineStore("message", {
  actions: {
    getMessages(payload: IGetMessages) {
      const userStore = useUser();
      return new Promise((resolve, reject) => {
        axios
          .get(
            "/api/message/get" +
              "?userId=" +
              encodeURIComponent(userStore.user.userId) +
              "&roomId=" +
              encodeURIComponent(payload.roomId)
          )
          .then(
            (res) => {
              resolve(res.data);
            },
            (err) => {
              reject(err);
            }
          );
      });
    },
    sendMessage(payload: ISendMessage) {
      const userStore = useUser();
      const flewStore = useFlew();
      return new Promise((resolve, reject) => {
        axios
          .put(
            "/api/message/send",
            {
              userId: userStore.user.userId,
              flewId: flewStore.currentFlew._id,
              roomId: payload.roomId,
              content: payload.content,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(
            (res) => {
              resolve(res.data);
            },
            (err) => {
              reject(err);
            }
          );
      });
    },
  },
});

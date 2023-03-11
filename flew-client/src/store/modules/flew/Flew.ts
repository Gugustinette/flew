/**
 * Flew module
 * @module store/modules/flew/Flew
 */
import { defineStore } from "pinia";
import axios from "axios";

// Import stores
import { useUser } from "@/store/modules/user/User";

// Interfaces
import {
  IFlew,
  IGetFlews,
  ICreateFlew,
  IDeleteFlew,
  IJoinFlew,
} from "@/store/interfaces/Flew";
import {
  ICategory,
  ICreateCategory,
  IDeleteCategory,
} from "@/store/interfaces/Category";
import { IRoom, ICreateRoom, IDeleteRoom } from "@/store/interfaces/Room";

// Export store
export const useFlew = defineStore("flew", {
  state: () => {
    return {
      flews: [],
      currentFlew: {} as IFlew,
      currentCategories: [] as ICategory[],
      currentCategory: {} as ICategory,
      currentRoom: {} as IRoom,
      categoryToCreateRoom: {} as ICategory,
    };
  },
  actions: {
    getFlews() {
      const userStore = useUser();
      axios
        .get(
          "/api/flew/get" +
            "?userId=" +
            encodeURIComponent(userStore.user.userId)
        )
        .then(
          (res) => {
            this.flews = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    getCategories(payload: IFlew) {
      const userStore = useUser();
      axios
        .get(
          "/api/category/get" +
            "?userId=" +
            encodeURIComponent(userStore.user.userId) +
            "&flewId=" +
            encodeURIComponent(payload._id)
        )
        .then(
          (res) => {
            this.currentCategories = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    createFlew(payload: ICreateFlew) {
      axios.put("/api/flew/create", payload).then(
        (res) => {
          this.getFlews();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteFlew(payload: IDeleteFlew) {
      axios.delete("/api/flew/delete", { data: payload }).then(
        (res) => {
          this.getFlews();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    createCategory(payload: ICreateCategory) {
      return new Promise((resolve, reject) => {
        axios.put("/api/category/create", payload).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    },
    deleteCategory(payload: IDeleteCategory) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/category/delete", {
            data: payload,
          })
          .then(
            (res) => {
              resolve(res);
            },
            (err) => {
              console.log(err);
            }
          );
      });
    },
    createRoom(payload: ICreateRoom) {
      return new Promise((resolve, reject) => {
        axios.put("/api/room/create", payload).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    },
    deleteRoom(payload: IDeleteRoom) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/room/delete", {
            data: payload,
          })
          .then(
            (res) => {
              resolve(res);
            },
            (err) => {
              console.log(err);
            }
          );
      });
    },
    joinFlew(payload: IJoinFlew) {
      const userStore = useUser();
      return new Promise((resolve, reject) => {
        axios
          .post("/api/flew/invite", {
            userId: userStore.user.userId,
            token: payload.token,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createInviteLink(payload: IFlew) {
      const userStore = useUser();
      return new Promise((resolve, reject) => {
        axios
          .put("/api/flew/createInviteLink", {
            userId: userStore.user.userId,
            flewId: payload._id,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

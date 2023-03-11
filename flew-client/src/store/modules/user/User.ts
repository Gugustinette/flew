/**
 * User module
 * @module store/modules/user/User
 */
import { defineStore } from "pinia";
import axios from "axios";

// Interfaces
import { ICurrentUser } from "@/store/interfaces/CurrentUser";
import { IUserLogin, IUserSignup } from "@/store/interfaces/UserLogin";

// Export store
export const useUser = defineStore("user", {
  state: () => {
    return {
      user: {
        userId: localStorage.getItem("userId") || "",
      } as ICurrentUser,
      token: localStorage.getItem("token") || "",
    };
  },
  actions: {
    login(user: IUserLogin) {
      return new Promise((resolve, reject) => {
        axios.post("/api/user/login", user).then(
          (res) => {
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("token", res.data.token);
            this.user = {
              userId: res.data.userId,
              username: res.data.userId.split("#")[0],
              avatar: "",
              token: res.data.token,
            };
            this.token = res.data.token;
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    signup(user: IUserSignup) {
      return new Promise((resolve, reject) => {
        axios.post("/api/user/signup", user).then(
          (res) => {
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("token", res.data.token);
            this.user = {
              userId: res.data.userId,
              username: res.data.userId.split("#")[0],
              avatar: "",
              token: res.data.token,
            };
            this.token = res.data.token;
            resolve(res);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
      });
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.user = undefined as any;
      this.token = undefined as any;
    },
    getActualUser() {
      axios
        .get(
          "/api/user/getUser" +
            "?userId=" +
            encodeURIComponent(this.user.userId) +
            "&userIdQuery=" +
            encodeURIComponent(this.user.userId)
        )
        .then(
          (res) => {
            this.user = {
              userId: res.data.userId,
              username: res.data.userId.split("#")[0],
              avatar: "",
              token: this.token,
            };
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
});

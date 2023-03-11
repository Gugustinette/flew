/**
 * Global module
 * @module store/modules/flew/Flew
 */
import { defineStore } from "pinia";

import io from "socket.io-client";
const protocol = process.env.VUE_APP_PROTOCOL;
const protocolWs = process.env.VUE_APP_PROTOCOL_WS;
const domain = process.env.VUE_APP_DOMAIN;
const domainApi = process.env.VUE_APP_DOMAIN_API;
const domainWs = process.env.VUE_APP_DOMAIN_GATEWAY;

// Export store
export const useGlobal = defineStore("global", {
  state: () => {
    return {
      baseUrl: protocol + "://" + domain,
      baseUrlAPI: protocol + "://" + domainApi + "/api",
      baseUrlWS: protocolWs + "://" + domainWs,
      socket: io(protocolWs + "://" + domainWs),
      showRooms: false,
      showSettings: false,
      showCreateRoom: false,
      showCreateCategory: false,
      dialog: {
        show: false,
        title: "",
        content: "",
        confirmText: "",
        cancelText: "",
      },
    };
  },
  actions: {
    toggleRoomVisibility() {
      this.showRooms = !this.showRooms;
    },
    toggleSettingsVisibility() {
      this.showSettings = !this.showSettings;
    },
    toggleCreateRoomVisibility() {
      this.showCreateRoom = !this.showCreateRoom;
    },
    toggleCreateCategoryVisibility() {
      this.showCreateCategory = !this.showCreateCategory;
    },
  },
});

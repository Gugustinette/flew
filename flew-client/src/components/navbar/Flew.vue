<template>
  <router-link
    :to="'/flew/' + flew?._id"
    @click="handleClick"
    @contextmenu="handleContextMenu"
    style="text-decoration: none; color: inherit"
  >
    <div class="nav-button">
      <div class="flew" v-bind:class="{ 'flew-actual': isActualFlew }">
        {{ firstLetterOfName }}
      </div>
      <span
        v-if="isActualFlew"
        class="flew-rooms-button"
        v-on:click.prevent="toggleRoomVisibility"
        v-bind:class="{
          'flew-rooms-button-hide': globalStore.showRooms,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
        </svg>
      </span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";
import { useFlew } from "@/store/modules/flew/Flew";

// Interfaces
import { IFlew } from "@/store/interfaces/Flew";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();
    const flewStore = useFlew();

    return {
      globalStore,
      flewStore,
    };
  },
  name: "flew-flew",
  props: {
    flew: Object as () => IFlew,
    currentFlew: Object as () => IFlew,
  },
  methods: {
    handleClick() {
      this.flewStore.currentFlew = this.flew as IFlew;
    },
    handleContextMenu(event: MouseEvent) {
      event.preventDefault();
      // Emit Contextmenu event
      this.$emit("showContextFlew", {
        event: event,
        flew: this.flew,
      });
    },
    toggleRoomVisibility() {
      this.globalStore.toggleRoomVisibility();
    },
  },
  mounted() {
    if (this.flew) {
      this.firstLetterOfName = this.flew?.name.charAt(0);
      this.isActualFlew = this.flew?._id === this.currentFlew?._id;
    }
  },
  updated() {
    if (this.flew) {
      this.isActualFlew = this.flew?._id === this.currentFlew?._id;
    }
  },
  data() {
    return {
      firstLetterOfName: "",
      isActualFlew: false,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-button {
  position: relative;
}

.flew {
  width: 40px;
  height: 40px;
  background: rgb(85, 85, 85);
  border-radius: 50%;
  transition: all 0.3s ease;
  display: grid;
  place-items: center;

  &:hover {
    border-radius: 30%;
    transition: all 0.3s ease;
  }
}

.flew-actual {
  border-radius: 30%;
}

.flew-rooms-button {
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  transition: all 0.3s ease;
  display: grid;
  place-items: center;
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(-5px);

  svg {
    width: 12px;
    height: 12px;
    fill: var(--font-on-primary);
    transform: translateX(1px) rotate(180deg);
    transition: all 0.3s ease;
  }
}

.flew-rooms-button-hide svg {
  transform: rotate(360deg);
}
</style>

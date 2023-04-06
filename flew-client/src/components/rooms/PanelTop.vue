<template>
  <div class="panel-top" v-on:click="showDropDown">
    <div class="panel-wrapper">
      <h1>{{ flew?.name }}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        class="arrow"
      >
        <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
      </svg>
    </div>
    <div
      class="drop-down"
      v-bind:class="{ 'drop-down-not-visible': !isDropDownVisible }"
    >
      <div class="drop-down-item" v-on:click="showCreateCategory">
        Create Category
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";

// Interfaces
import { IFlew } from "@/store/interfaces/Flew";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();

    return {
      globalStore,
    };
  },
  name: "flew-panel-top",
  props: {
    flew: Object as () => IFlew,
  },
  methods: {
    showDropDown() {
      this.isDropDownVisible = !this.isDropDownVisible;
    },
    showCreateCategory() {
      this.globalStore.toggleCreateCategoryVisibility();
    },
  },
  data() {
    return {
      isDropDownVisible: false,
    };
  },
});
</script>

<style scoped lang="scss">
.panel-top {
  position: relative;
  height: 50px;
  min-height: 50px;
  background: inherit;
  cursor: pointer;
  transition: all 0.1s;

  .panel-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 100%;
    transition: all 0.1s;

    &:hover {
      background: var(--surface);
    }

    h1 {
      font-weight: var(--font-weight-bold);
    }
  }

  h1 {
    margin-left: 1rem;
  }

  .arrow {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    transition: all 0.1s;
    fill: var(--font-on-surface);
    height: 20px;
  }

  .drop-down {
    position: absolute;
    right: 5px;
    left: 5px;
    top: 55px;
    padding: 0.5rem;
    background: var(--surface);
    display: flex;
    flex-direction: column;
    z-index: 10;
    border-radius: var(--border-radius-discrete);
    transform: scale(1);
    // transition on transform only
    transition: transform 0.2s ease-in-out;

    .drop-down-item {
      height: 35px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 5px;

      &:hover {
        background: var(--primary);
        border-radius: inherit;
      }
    }
  }

  .drop-down-not-visible {
    padding: 0;
    height: 0px;
    transform: scale(0.7);

    & > * {
      display: none !important;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--surface);
  }
}
</style>

<template>
  <router-view />
  <div id="absolute"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useUser } from "./store/modules/user/User";

export default defineComponent({
  setup() {
    const userStore = useUser();

    return {
      userStore,
    };
  },
  name: "App",
  mounted() {
    // Display login form if not logged in
    if (!this.userStore.isLoggedIn) {
      this.$router.push("/login");
    }
  },
});
</script>

<style lang="scss">
// Import font
@font-face {
  font-family: "Red Hat Display";
  font-style: normal;
  src: url("./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Regular.ttf")
    format("truetype");
}
@font-face {
  font-family: "Red Hat Display Bold";
  font-style: normal;
  src: url("./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Bold.ttf")
    format("truetype");
}

:root {
  --primary: #67b5ed;
  --primary-hover: #5da2d4;
  --secondary: #5498c9;

  --red: #cc4a47;

  // Avenir font
  --font-family: "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-family-bold: "Avenir Next", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  --font-weight: 400;
  --font-weight-bold: 700;

  --font-on-primary: #000000;
  --font-on-primary-hover: #000000;
  --font-on-surface: #f5f5f5;
  --font-off: #d3d3d3;
  --font-discrete: #bbbbbba2;

  --background: #1d3444;
  --background-darker: #0f1f28;
  --surface: #14232e;
  --surface-secondary: #274357;

  --glassmorphism-background: rgba(56, 111, 150, 0.712);
  --glassmorphism-backdrop-filter: blur(10px);
  --glassmorphism-surface: rgba(21, 55, 65, 0.397);
  --glassmorphism-surface-hover: #3a799f;

  --modal-background: rgba(0, 0, 0, 0.7);
  --modal-backdrop-filter: blur(2px);

  --box-shadow-discrete: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);

  --font-size-title: 2rem;
  --font-size-subtitle: 1.1rem;
  --font-size-button: 1rem;
  --font-size-caption: 0.8rem;
  --font-size-default: 1rem;

  --border-radius: 10px;
  --border-radius-discrete: 4px;
}

* {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  font-size: var(--font-size-default);
  font-weight: var(--font-weight);

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

body {
  background: var(--background);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-on-surface);

  display: flex;
  flex-direction: row;

  height: 100%;
  width: 100%;
}

#absolute {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  z-index: 1000;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Text can be selected */
.text-can-be-selected {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

a {
  text-decoration: none;
  color: unset;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: var(--font-on-surface);

    &.router-link-exact-active {
      color: var(--primary);
    }
  }
}
</style>

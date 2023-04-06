<template>
  <div class="settings-panel">
    <div class="settings">
      <div class="panel-leftside"></div>
      <SettingsNavbar
        v-bind:actualSettingPage="actualSettingPage"
        @changeSettingPage="changeSettingPage"
      />
      <SettingsPanel v-bind:actualSettingPage="actualSettingPage" />
      <SettingsClose @close="closeSettingPanel" />
      <div class="panel-rightside"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useGlobal } from "@/store/modules/global/Global";

// Components
import SettingsNavbar from "@/components/settings/Navbar.vue";
import SettingsPanel from "@/components/settings/Panel.vue";
import SettingsClose from "@/components/settings/Close.vue";

export default defineComponent({
  setup() {
    const globalStore = useGlobal();

    return {
      globalStore,
    };
  },
  name: "view-settings",
  components: {
    SettingsNavbar,
    SettingsPanel,
    SettingsClose,
  },
  methods: {
    closeSettingPanel() {
      // Select .settings-panel element
      const settingsPanel = document.querySelector(".settings-panel");
      if (settingsPanel) {
        // Launch out animation on it
        settingsPanel.classList.add("out");
        // Remove the animation class after the animation is finished
        setTimeout(() => {
          this.globalStore.toggleSettingsVisibility();
        }, 245);
      }
    },
    changeSettingPage(page: any) {
      this.actualSettingPage = page;
    },
  },
  data() {
    return {
      actualSettingPage: "Account",
    };
  },
});
</script>

<style scoped lang="scss">
.settings-panel {
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

  .settings {
    height: 100%;
    width: 100%;
    opacity: 1;
    background: var(--background);
    animation: fadeInDown 100ms ease-in-out;
    display: flex;
    flex-direction: row;

    opacity: 1 !important;
    -webkit-transform: scale(1) translateZ(0px) !important;
    transform: scale(1) translateZ(0px) !important;
    -webkit-animation: modalanim 200ms cubic-bezier(0, 0, 0, 1);
    animation: modalanim 200ms cubic-bezier(0, 0, 0, 1);
    -webkit-transition: all 100ms;
    transition: all 100ms;
    -webkit-transition-delay: 5s;
    transition-delay: 5s;
  }

  .panel-leftside {
    width: 50%;
    height: 100%;
    background: var(--background-darker);
  }

  .panel-rightside {
    width: 50%;
    height: 100%;
    background: var(--background);
  }
}

.out {
  .settings {
    -webkit-animation: modalanimout 250ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
    animation: modalanimout 250ms cubic-bezier(0.3, 0.3, 0.18, 1.88);
  }
}

@-webkit-keyframes modalanim {
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

@keyframes modalanim {
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

@-webkit-keyframes modalanimout {
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

@keyframes modalanimout {
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

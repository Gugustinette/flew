<template>
  <div class="settings-navbar">
    <div class="settings-background">
      <div class="settings">
        <h1>Paramètres utilisateurs</h1>
        <NavbarButton
          content="Mon compte"
          v-on:click="handleClick('Account')"
          page="Account"
          v-bind:actualSettingPage="actualSettingPage"
        />
        <NavbarButton
          content="Profil utilisateur"
          v-on:click="handleClick('Profile')"
          page="Profile"
          v-bind:actualSettingPage="actualSettingPage"
        />
        <NavbarButton
          content="Confidentialité"
          v-on:click="handleClick('Confidentialité')"
          page="Confidentialité"
          v-bind:actualSettingPage="actualSettingPage"
        />
        <NavbarButton
          content="Connexions"
          v-on:click="handleClick('Connexions')"
          page="Connexions"
          v-bind:actualSettingPage="actualSettingPage"
        />

        <hr class="setting-line" />

        <h1>Paramètres de l'appli</h1>
        <NavbarButton
          content="Thème"
          v-on:click="handleClick('Theme')"
          page="Theme"
          v-bind:actualSettingPage="actualSettingPage"
        />
        <NavbarButton
          content="Audio / Vidéo"
          v-on:click="handleClick('Audio/Video')"
          page="Audio/Video"
          v-bind:actualSettingPage="actualSettingPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import NavbarButton from "@/components/settings/NavbarButton.vue";

export default defineComponent({
  name: "SettingsNavbar",
  components: {
    NavbarButton,
  },
  props: {
    actualSettingPage: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick(page: string) {
      this.$emit("changeSettingPage", page);
    },
  },
});
</script>

<style scoped lang="scss">
h1 {
  font-size: var(--font-size-body);
  font-weight: bold;
  width: 90%;
  text-align: start;
  margin: 0;
  padding: 0;

  &:first-child {
    margin-top: 20px;
  }
}

.settings-navbar {
  height: 100%;
  min-width: 300px;
  width: 300px;
  display: grid;
  place-items: center;
  background: var(--background-darker);
}

.settings-background {
  height: calc(100% - 50px);
  width: calc(100% - 50px);
  border-radius: var(--border-radius);
  /* Background Image */
  background: url("https://picsum.photos/id/237/200/300?blur=2&hmac=0zJLs1ar00sBbW5Ahd_4zA6pgZqCVavwuHToO6VtcYY");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.settings {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Glassmorphism */
  background: var(--glassmorphism-background);
  backdrop-filter: var(--glassmorphism-backdrop-filter);
  -webkit-backdrop-filter: var(--glassmorphism-backdrop-filter);
  border-radius: var(--border-radius);

  .setting-line {
    width: 50%;
    height: 1px;
    background: var(--secondary);
    border: none;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>

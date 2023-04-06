<template>
  <router-link to="/create-flew" style="text-decoration: none; color: inherit">
    <div class="add-flew-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
      </svg>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "flew-add-flew-button",
});
</script>

<style scoped lang="scss">
.add-flew-button {
  margin-top: 9px;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  display: grid;
  place-items: center;
  cursor: pointer;

  svg {
    fill: var(--secondary);
    transition: all 0.1s ease;
  }

  &:hover {
    svg {
      fill: var(--surface-secondary);
      transition: all 0.1s ease;
    }
  }
}

.flew-actual {
  border-radius: 30%;
}
</style>

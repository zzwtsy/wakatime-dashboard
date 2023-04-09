<template>
  <div class="change-theme">
    <button @click="toggleDark()">
      <div v-if="isDark">
        <VPIconMoon
          class="h-8 fill-[--dark-icon-bg-color] hover:fill-[--dark-hover-icon-bg-color]"
        />
      </div>
      <div v-else>
        <VPIconSun
          class="h-8 fill-[--icon-bg-color] hover:fill-[--hover-icon-bg-color]"
        />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import VPIconMoon from "./icons/VPIconMoon.vue";
import VPIconSun from "./icons/VPIconSun.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

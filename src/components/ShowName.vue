<template>
  <div
    class="container mx-auto flex justify-center items-center text-[--text-color] dark:text-[--dark-text-color]"
  >
    <span>{{ store.userName }}</span>
  </div>
</template>

<script setup lang="ts">
import { store } from "../store/Store";
</script>

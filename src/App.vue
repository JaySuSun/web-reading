<script setup lang="ts">
import HeaderBar from "@/components/header-bar.vue";</script>
import { RouterView } from 'vue-router'
<template>
   <div class="header-bar">
    <HeaderBar />
  </div>
  <RouterView />
</template>

<style scoped></style>

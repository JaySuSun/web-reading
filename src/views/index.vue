<template>
  <div class="content">
    <!-- 组件动态切换 -->
    <SearchBar />
  </div>
</template>

<script setup>
import SearchBar from "../components/searchBar.vue";

import { onMounted, reactive, ref } from "vue";

onMounted(() => {});
</script>

<style lang="scss" scoped></style>

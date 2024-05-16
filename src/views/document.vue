<template>
  <div class="content">
    <div class="back" @click="back()">
      <el-icon style="color: gray"><ArrowLeft /></el-icon>
      <div class="text">back</div>
    </div>
    <div class="pdf-iframe">
      <iframe :src="fileLink" class="pdf"></iframe>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
const fileLink = ref("");
const closePriew = () => {
  fileShow.value = false;
};
onMounted(() => {
  fileLink.value = localStorage.getItem("DOCUMENT_URL");
});
const back = () => {
  history.go(-1);
};
</script>
<style lang="less" scoped>
.content{
    padding: 20px ;
}
.pdf-iframe {
}
.pdf {
  width: 100%;
  height: calc(100vh - 60px);
}
.back {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  .text {
    color: gray;
  }
}
</style>

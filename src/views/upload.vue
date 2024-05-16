<template>
  <div class="content">
    <div class="title">
      <h2>Publish to the world</h2>
      <div>Presentations, research papers, legal documents, and more</div>
    </div>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      accept=".jpg,.png,.pdf,.docx,.doc,.xls,.xlsx"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
             files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
</script>
<style lang="less" scoped>
.content {
    margin: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.upload-demo {
  margin: 20px;
  width: 40%;
}
.title {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>

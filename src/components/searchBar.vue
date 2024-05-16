<template>
  <div class="search_content">
    <div class="animate__animated animate__lightSpeedInRight">
      <span class="welcome">Welcome to penguin</span>
    </div>
    <div class="dec">share information, and find inspiration</div>
    <el-input
      v-model="input2"
      style="width: 55%"
      size="large"
      placeholder="Search for document"
      :suffix-icon="Search"
      @change="search()"
    />
    <div>or</div>
    <div>Browse popular categories</div>
    <div class="banner_content">
      <div class="banner" v-for="item in data.types" :key="item.code" @click="goDetail(item.code)">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { Search } from "@element-plus/icons-vue";
import { reactive,ref } from "vue";
import { ElNotification } from 'element-plus'
const input2 = ref()
const data = reactive({
  types: [
    { code: 0, name: "Science & Mathematics" },
    { code: 1, name: "Technology & Engineering" },
    { code: 2, name: "Teaching Methods & Materials" },
    { code: 3, name: "Social Science" },
  ],
});
const goDetail=(id)=>{
  router.push(`/detail/${id}`);
}
const search=()=>{
  ElNotification({
    title: 'Success',
    message: 'The search content is'+input2.value,
    type: 'success',
  })
}
</script>

<style lang="scss" scoped>
.search_content {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.25rem;
  color: #000000;
  font-weight: 500;
  .welcome {
    font-family: "almm-fonts";
    font-size: 3rem;
    font-weight: 600;
    color: #ff7e00;
  }
  .dec {
    font-family: "almm-fonts";
    font-weight: 200;
    margin-bottom: 2rem;
  }
  .banner_content {
    margin-top: 30px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-content: flex-start;
    max-width: 55%;
    font-family: "almm-fonts";
    font-size: 0.8rem;
    font-weight: 300;
    .banner {
      padding: 10px;
      height: 80px;
      width: 250px;
      border: 1px solid #cfd3dc;
      border-radius: 8px;
    }
    .banner:hover{
        border: 2px solid #409eff;
    }
  }
}
</style>

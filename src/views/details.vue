<template>
  <div class="details">
    <div class="back" @click="back()">
      <el-icon style="color: gray"><ArrowLeft /></el-icon>
      <div class="text">back</div>
    </div>
    <div class="infoName">{{ baseInfo.name }}</div>
    <div class="dec">{{ baseInfo.dec }}</div>
    <div class="cards">
      <el-card style="width: 220px" shadow="hover">
        <div class="pdf-container" @click.stop="showPdf(pdfurl)">
          <iframe :src="pdfurl" scrolling="no" frameBorder="0"></iframe>
        </div>
        <div>
          <div class="type">document</div>
          <div class="d_name">document name</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter ,useRoute} from "vue-router";
import { onMounted, ref } from "vue";
import PDFView from "../components/pdfPreview.vue";
import jsPdf from "../assets/file/777.pdf";
const route = useRoute();
const router = useRouter();
const types = ref([
  {
    code: 1,
    name: "Science & Mathematics",
    dec: "Exploring the workings of the world",
  },
  {
    code: 2,
    name: "Technology & Engineering",
    dec: "Exploring the workings of the world",
  },
  {
    code: 3,
    name: "Teaching Methods & Materials",
    dec: "Exploring the workings of the world",
  },
  {
    code: 4,
    name: "Social Science",
    dec: "Exploring the workings of the world",
  },
]);
const baseInfo = ref({});
const pdfurl = ref(
  "http://zdcloud-usercenter-1305627395.cos.ap-nanjing.myqcloud.com/aa.pdf"
);

onMounted(() => {
  baseInfo.value = types.value[route.params.id];
  console.log(baseInfo.value.name);
});
const showPdf = (url) => {
  console.log(222)
  localStorage.setItem('DOCUMENT_URL',url)
  router.push('/document')
};
const back = () => {
  router.push('/home')
};
</script>

<style lang="less" scoped>
.details {
  margin: 20px 40px;
  height: 300px;
  color: #000;
  .back {
    display: flex;
    align-items: center;
    .text {
      color: gray;
    }
  }
  .infoName {
    font-size: 32px;
    font-weight: 500;
  }
  .dec {
    margin-left: 5px;
  }
  .pdf-container {
    
    width: 180px;
    height: 200px;
  }
  .pdf-container iframe {
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
}
.type {
  margin-top: 5px;
  color: gray;
}
.d_name {
  font-size: 20px;
}
.cards {
  margin-top: 40px;
}
</style>

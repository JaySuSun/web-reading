<template>
  <div class="header_bar">
    <div class="left">
      <img src="../assets/qie.png"  @click="home()"/>
      <div class="text">{{ iconName }}</div>
      <el-input
        v-model="searchValue"
        style="width: 340px; margin-left: 10px"
        :suffix-icon="Search"
        placeholder="Search for documents"
        @change="search()"
      />
    </div>
    <div class="right">
      <span class="upload" @click="uploadFn()">
        <el-icon style="margin-top: 0.2rem" :size="20" ><Upload /></el-icon
        >Upload</span
      >
      <el-button type="primary">Read free for 30days</el-button>
      <el-button type="primary" @click="login" plain>Sign in</el-button>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="Welcome back" width="400">
    <div class="model" @click="loginOtherChange('Google')">
      <div class="loginb">
        <img style="width: 20px; height: 20px" src="../assets/google.svg" />
        <div>Login using Google</div>
      </div>
    </div>
    <el-divider>
      <el-icon>OR</el-icon>
    </el-divider>
    <el-form
      :model="ruleForm"
      label-width="auto"
      ref="ruleFormRef"
      style="max-width: 600px"
    >
      <el-form-item label="Email address">
        <el-input
          v-model="ruleForm.userName"
          style="width: 300px"
          placeholder="Please input Email"
          clearable
        />
      </el-form-item>
      <el-form-item label="password">
        <el-input
          v-model="ruleForm.password"
          style="width: 300px"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Continue</el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ElNotification } from 'element-plus'
import { useRouter} from "vue-router";
import { jwtDecode } from "jwt-decode";
import { loginWithSocialMedia, LoginType } from "../utils/third-party-login"

const router = useRouter();

const ruleForm = reactive({
  userName: "",
  password: "",
});

const iconName = ref("penguin");
const searchValue = ref();
const dialogVisible = ref(false);
const login = () => {
  dialogVisible.value = true;
};
//googleLogin
// 第三方登录点击事件方法
const loginOtherChange = async (type: LoginType) => {
  try {
    const data = await loginWithSocialMedia(type);
    // 处理不同回调函数
    if (type === LoginType.Apple) {
      const resData= jwtDecode(data.authorization.id_token);
      // 写你自己登录后的代码
    } else if (type === LoginType.Google) {
      const resData = jwtDecode(data.credential);
      // 写你自己登录后的代码
    } else if (type === LoginType.Facebook) {
      (window as any).FB.api("/me?fields=email,name", (response: any) => {
        // 写你自己登录后的代码
        console.log(JSON.stringify(response));
      });
    }
  } catch (error) {
    console.error(`Login error with ${type}:`, error);
  }
};


const onSubmit = () => {
  if (ruleForm.userName == "" || ruleForm.password == "") {
    ElMessage({
      message: "Please input Email and password",
      type: "warning",
    });
  } else {
    dialogVisible.value = false;
    ElMessage({
      message: "Login succeeded",
      type: "success",
    });
  }
};
const search=()=>{
  ElNotification({
    title: 'Success',
    message: 'The search content is'+searchValue.value,
    type: 'success',
  })
}
//uploadFn
const uploadFn = ()=>{
  router.push('/upload')
}
const home = ()=>{
  router.push('/home')
}
</script>

<style lang="less" scoped>
.header_bar {
  height: 60px;
  width: 100%;
  background: #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  .left {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: #303133;
    > img {
      margin-right: 0.4rem;
      width: 36pxrem;
      height: 36pxrem;
    }
    .text {
      height: 27px;
      line-height: 27px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .upload {
      display: flex;
      margin-right: 1rem;
      cursor: pointer;
    }
  }
}
.model {
  display: felx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  :hover {
    background: #a0cfff;
  }
  .loginb {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
    border: 1px solid #4e7cfe;
    border-radius: 10px;
  }
}
.diver {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
}
::v-deep .el-form-item__content {
  align-items: center;
  justify-content: center !important;
}
</style>

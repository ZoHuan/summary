<template>
  <el-row :gutter="16" justify="center">
    <el-col :md="24" :lg="16" :style="{ order: isMobile() ? 2 : 1 }">
      <el-form label-position="top">
        <el-form-item label="昵称">
          <el-input placeholder="请输入您的昵称!" />
        </el-form-item>
        <el-form-item label="座右铭">
          <el-input placeholder="请输入您的座右铭!" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" :rows="4" placeholder="请输入个人简介!" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input placeholder="请输入您的地址!" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">更新基本信息</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :md="24" :lg="8" :style="{ order: '1' }">
      <div class="avatar-preview" @click="uploadAvatar">
        <el-icon class="upload"><UploadFilled /></el-icon>
        <div class="mask">
          <el-icon><Plus /></el-icon>
        </div>
        <img :src="avatar" />
      </div>

      <input
        type="file"
        name="image"
        accept="image/*"
        ref="uploadFile"
        @change="changeFile"
        v-show="false"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useTheme from "@/hooks/web/useTheme";

const { isMobile } = useTheme();

const avatar = ref(require("@/assets/avatar.png"));
const uploadFile = ref();

const uploadAvatar = () => {
  uploadFile.value.click();
};

const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const changeFile = () => {
  let file = uploadFile.value.files[0];
  getBase64(file, (imageUrl) => {
    avatar.value = imageUrl;
  });
};
</script>

<style lang="less" scoped>
.avatar-preview {
  position: relative;
  width: 100%;
  height: 180px;
  max-width: 180px;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    background: rgba(222, 221, 221, 0.7);
    font-size: 40px;
  }
  .mask {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.4s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      font-size: 2rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    height: 100%;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>

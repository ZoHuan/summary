<template>
  <div class="account-center-main">
    <el-row :gutter="24">
      <el-col :md="24" :lg="7">
        <el-card class="account-center-left">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatar" />
            </div>
            <div class="username">{{ user.name }}</div>
            <div class="motto">生如逆旅，一苇以航</div>
          </div>
          <div class="account-center-detail">
            <p><i class="iconfont icon-position"></i>开发工程师</p>
            <p>
              <i class="iconfont icon-group"></i
              >某某某事业群－某某平台部－某某技术部－WEB
            </p>
            <p>
              <i class="iconfont icon-address"></i>
              <span>福建省</span>
              <span>福州市</span>
            </p>
          </div>

          <el-divider />

          <div class="account-center-module">
            <div class="title">标签</div>
            <div>
              <el-tag
                v-for="(item, index) in tags"
                :key="index"
                :type="item.type"
                class="tags-item"
              >
                {{ item.label }}
              </el-tag>
            </div>
          </div>

          <el-divider border-style="dashed" />

          <div class="account-center-module">
            <div class="title">团队</div>
            <div class="members">
              <el-row>
                <el-col
                  :md="24"
                  :lg="12"
                  v-for="(item, index) in teams"
                  :key="index"
                >
                  <div class="member-list">
                    <el-avatar size="small" :src="item.avatar" />
                    <span class="member-name">{{ item.name }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :md="24" :lg="17">
        <el-card class="account-center-right" :body-style="{ padding: '0' }">
          <el-tabs>
            <el-tab-pane>
              <template #label>
                <div class="tabs-label">技术</div>
              </template>
              <technology-page />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { userStore } from "@/store/modules/user";
import TechnologyPage from "./page/technology.vue";

defineComponent({ name: "AccountCenter" });

const user = userStore();
const avatar = ref(require("@/assets/avatar.png"));
const tags = [
  { type: "", label: "技术控" },
  { type: "success", label: "文艺青年" },
  { type: "info", label: "发烧友" },
  { type: "danger", label: "咖啡续命" },
  { type: "warning", label: "漫迷" },
  { type: "danger", label: "拼装达人" },
  { type: "", label: "诗和远方" },
];
const teams = [
  {
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    name: "科学搬砖组",
  },
  {
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
    name: "程序员日常",
  },
  {
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
    name: "设计天团",
  },
  {
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
    name: "中二少年团",
  },
  {
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
    name: "骗你学计算机",
  },
];
</script>

<style lang="less" scoped>
.account-center-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-left {
    line-height: 1.5;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    .account-center-avatarHolder {
      margin-bottom: 24px;
      text-align: center;

      .avatar {
        width: 104px;
        height: 104px;
        margin: 0 auto;
        margin-bottom: 20px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }

      .username {
        margin-bottom: 4px;
        line-height: 28px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .account-center-detail {
      p {
        position: relative;
        margin-bottom: 8px;
        padding-left: 26px;
      }

      i {
        position: absolute;
        top: 1px;
        left: 2px;
        font-size: 14px;
      }
    }

    .account-center-module {
      .title {
        margin-bottom: 12px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .tags-item {
        margin: 0 8px 8px 0;
      }

      .member-list {
        display: flex;
        align-items: center;
        margin: 10px 0;

        .member-name {
          max-width: 100px;
          margin-left: 12px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          cursor: pointer;
          transition: all 0.3s;
        }

        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .account-center-right {
    .tabs-label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 12px 16px;
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>

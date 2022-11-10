<template>
  <div class="page-header-index-wide">
    <el-card :body-style="{ padding: '16px 0' }">
      <div :class="['account-settings-main', isMobile() && 'mobile']">
        <div class="account-settings-left">
          <el-menu
            :mode="isMobile() ? 'horizontal' : 'vertical'"
            :style="{ border: '0', width: isMobile() ? '560px' : 'auto' }"
            :default-active="activeMenu"
          >
            <el-menu-item
              v-for="item in menuList"
              :key="item.key"
              :index="item.key"
            >
              <router-link
                :to="{ name: item.key }"
                class="account-settings-link"
              >
                {{ item.title }}
              </router-link>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="account-settings-right">
          <div class="account-settings-title">
            <span>{{ route.meta.title }}</span>
          </div>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import useTheme from "@/hooks/web/useTheme";

defineComponent({ name: "AccountSettings" });

const route = useRoute();
const { isMobile } = useTheme();
const menuList = [
  {
    key: "BasicSettings",
    title: "基本设置",
  },
  {
    key: "SecuritySettings",
    title: "安全设置",
  },
];

const activeMenu = computed(() => {
  return route.name;
});
</script>

<style lang="less" scoped>
.account-settings-main {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-left {
      width: 100%;
      height: 50px;
      overflow-y: scroll;

      .el-menu {
        height: 50px;

        .el-menu-item {
          height: 40px;
          margin: 4px 0 8px;
          line-height: 40px;

          &.is-active {
            background: transparent;
            a {
              color: var(--el-color-primary);
            }

            &:after {
              opacity: 0;
            }
          }
        }
      }
    }
    .account-settings-right {
      padding: 20px 40px;
    }
  }

  .account-settings-left {
    width: 224px;
    border-right: 1px solid #e8e8e8;

    .el-menu-item {
      position: relative;
      height: 40px;
      margin: 4px 0 8px;
      padding: 0;
      font-size: 14px;
      line-height: 40px;
      overflow: hidden;

      a {
        display: flex;
        width: 100%;
        padding: 0 16px 0 24px;
      }

      &:hover {
        background: transparent;
        a {
          color: var(--el-color-primary);
        }
      }
      &.is-active {
        background: var(--el-color-primary-light-9);
        a {
          color: var(--el-color-primary);
        }

        &:after {
          transform: scaleY(1);
          opacity: 1;
          transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
            opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
            -webkit-transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }

      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border-right: 3px solid #1890ff;
        transform: scaleY(0.0001);
        opacity: 0;
        transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
          opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
          -webkit-transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }

  .account-settings-right {
    flex: 1 1;
    padding: 8px 40px;

    .account-settings-title {
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 28px;
    }
    .account-settings-view {
      padding-top: 12px;
    }
  }
}
</style>

<template>
  <div class="setting-drawer">
    <div
      :class="['setting-drawer-handle', visible && 'drawer-opened']"
      @click="toggle"
    >
      <el-icon>
        <Setting v-if="!visible" />
        <Close v-else />
      </el-icon>
    </div>

    <el-drawer
      v-model="visible"
      size="300px"
      direction="rtl"
      :z-index="99"
      :with-header="false"
      :before-close="toggle"
    >
      <div class="setting-drawer-content">
        <div class="setting-drawer-item">
          <h3>整体风格设置</h3>

          <div class="setting-drawer-blockChecbox">
            <el-tooltip placement="top" content="暗色菜单风格">
              <div
                class="setting-drawer-blockChecbox-item"
                @click="handleTheme('dark')"
              >
                <img src="@/assets/img/layout/dark.svg" alt="dark" />
                <div class="setting-drawer-select" v-if="theme === 'dark'">
                  <el-icon><Check /></el-icon>
                </div>
              </div>
            </el-tooltip>

            <el-tooltip placement="top" content="亮色菜单风格">
              <div
                class="setting-drawer-blockChecbox-item"
                @click="handleTheme('light')"
              >
                <img src="@/assets/img/layout/light.svg" alt="light" />
                <div class="setting-drawer-select" v-if="theme === 'light'">
                  <el-icon><Check /></el-icon>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>

        <div class="setting-drawer-item">
          <h3>主题色</h3>

          <div class="setting-drawer-colorBlock">
            <el-tooltip
              placement="top"
              v-for="(item, index) in colorList"
              :key="index"
              :content="item.key"
            >
              <el-tag :color="item.color" @click="changeColor(item.color)">
                <el-icon v-if="item.color === color"><Check /></el-icon>
              </el-tag>
            </el-tooltip>
          </div>
        </div>

        <el-divider />

        <div class="setting-drawer-item">
          <h3>导航模式</h3>

          <div class="setting-drawer-blockChecbox">
            <el-tooltip placement="top" content="侧边栏导航">
              <div
                class="setting-drawer-blockChecbox-item"
                @click="handleLayout('sidemenu')"
              >
                <img src="@/assets/img/layout/side.svg" alt="sidemenu" />
                <div class="setting-drawer-select" v-if="layout === 'sidemenu'">
                  <el-icon><Check /></el-icon>
                </div>
              </div>
            </el-tooltip>

            <el-tooltip placement="top" content="顶部栏导航">
              <div
                class="setting-drawer-blockChecbox-item"
                @click="handleLayout('topmenu')"
              >
                <img src="@/assets/img/layout/top.svg" alt="topmenu" />
                <div class="setting-drawer-select" v-if="layout === 'topmenu'">
                  <el-icon><Check /></el-icon>
                </div>
              </div>
            </el-tooltip>

            <el-tooltip placement="top" content="两侧栏导航">
              <div
                class="setting-drawer-blockChecbox-item"
                @click="handleLayout('bothmenu')"
              >
                <img src="@/assets/img/layout/both.svg" alt="bothmenu" />
                <div class="setting-drawer-select" v-if="layout === 'bothmenu'">
                  <el-icon><Check /></el-icon>
                </div>
              </div>
            </el-tooltip>
          </div>

          <div class="setting-drawer-list">
            <div class="setting-drawer-list-item">
              <span>内容区域宽度</span>
              <el-tooltip
                placement="top"
                content="该设定仅 [顶部栏导航] 时有效"
              >
                <el-select
                  size="small"
                  v-model="contentWidth"
                  @change="changeContentWidth"
                >
                  <el-option
                    v-for="item in contentWidthOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-show="item.show"
                  />
                </el-select>
              </el-tooltip>
            </div>

            <div class="setting-drawer-list-item">
              <span>固定 Header</span>
              <el-switch
                size="small"
                v-model="fixedHeader"
                @change="handleFixedHeader"
              />
            </div>

            <div class="setting-drawer-list-item">
              <span :class="{ opacity: !fixedHeader }">
                下滑时隐藏 Header
              </span>
              <el-tooltip placement="top" content="固定 Header 时可配置">
                <el-switch
                  size="small"
                  :disabled="!fixedHeader"
                  v-model="fixedHeaderHidden"
                  @change="handleFixedHeaderHidden"
                />
              </el-tooltip>
            </div>

            <div class="setting-drawer-list-item">
              <span :class="{ opacity: layout === 'topmenu' }">
                固定侧边菜单
              </span>
              <el-tooltip
                placement="top"
                content="该设定 [侧边栏导航][两侧栏导航] 时有效"
              >
                <el-switch
                  size="small"
                  :disabled="layout === 'topmenu'"
                  v-model="fixSiderbar"
                  @change="handleFixSiderbar"
                />
              </el-tooltip>
            </div>
          </div>
        </div>

        <el-divider />

        <div class="setting-drawer-item">
          <h3>其他设置</h3>

          <div class="setting-drawer-list">
            <div class="setting-drawer-list-item">
              <span>色弱模式</span>
              <el-switch size="small" v-model="weak" @change="onWeak" />
            </div>
            <div class="setting-drawer-list-item">
              <span>多页签模式</span>
              <el-switch size="small" v-model="multiTab" @change="onMultiTab" />
            </div>
          </div>
        </div>

        <el-divider />

        <div class="setting-drawer-item">
          <el-alert type="warning" :closable="false">
            <template #default>
              <div class="setting-drawer-item-alert">
                配置栏只在开发环境用于预览，生产环境不会展现，请手动修改配置文件。修改配置文件后，需要清空本地缓存和LocalStorage
              </div>
            </template>
          </el-alert>
          <el-button @click="doCopy" :icon="DocumentCopy">拷贝设置</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useClipboard } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { appStore } from "@/store/modules/app";
import useTheme from "@/hooks/web/useTheme";
import {
  colorList,
  updateTheme,
  updateColorWeak,
} from "@/config/setting.config";
import { DocumentCopy } from "@element-plus/icons-vue";

const app = appStore();
const {
  theme,
  layout,
  multiTab,
  contentWidth,
  fixedHeader,
  fixSiderbar,
  fixedHeaderHidden,
  color,
  weak,
} = useTheme();

const isShow = computed(() => {
  return layout.value === "topmenu";
});

const visible = ref(false);
const contentWidthOptions = reactive([
  {
    value: "Fixed",
    label: "固定",
    show: isShow,
  },
  {
    value: "Fluid",
    label: "流式",
    show: true,
  },
]);

const toggle = () => {
  visible.value = !visible.value;
};

const handleTheme = (theme: string) => {
  app.toggleTheme(theme);
};

const changeColor = (primaryColor: string) => {
  if (color.value !== primaryColor) {
    app.toggleColor(primaryColor);
    ElMessage.success("正在切换主题！");
    updateTheme(primaryColor);
  }
};
const handleLayout = (mode: string) => {
  app.toggleLayout(mode);

  // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
  if (layout.value === "topmenu") {
    app.toggleFixedSiderbar(false);
  } else {
    app.toggleContentWidth("Fluid");
  }
};

const changeContentWidth = (type: string) => {
  if (layout.value !== "topmenu") {
    app.toggleContentWidth("Fluid");
    return;
  }
  app.toggleContentWidth(type);
};

const handleFixedHeader = (fixed: boolean) => {
  app.toggleFixedHeader(fixed);
};
const handleFixedHeaderHidden = (hidden: boolean) => {
  app.toggleFixedHeaderHidden(hidden);
};
const handleFixSiderbar = (fixed: boolean) => {
  if (layout.value === "topmenu") {
    app.toggleFixedSiderbar(false);
    return;
  }
  app.toggleFixedSiderbar(fixed);
};
const onWeak = (checked: boolean) => {
  app.toggleWeak(checked);
  updateColorWeak(checked);
};
const onMultiTab = (checked: boolean) => {
  app.toggleMultiTab(checked);
};

const doCopy = () => {
  const source = `export default {
    theme: '${theme.value}', 
    layout: '${layout.value}',
    multiTab: '${multiTab.value}', 
    contentWidth: '${contentWidth.value}', 
    fixedHeader: ${fixedHeader.value}, 
    fixSiderbar: ${fixSiderbar.value}, 
    fixedHeaderHidden: ${fixedHeaderHidden.value}, 
    color: '${color.value}',
    weak: ${weak.value},
    production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
  }`;

  const { copy, copied } = useClipboard({ source });

  copy().then(() => {
    if (copied.value) {
      ElMessage.success("复制完毕");
    } else {
      ElMessage.error("复制失败");
    }
  });
};
</script>

<style lang="less" scoped>
.setting-drawer-handle {
  position: fixed;
  top: 240px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 4px 0 0 4px;
  background: var(--el-color-primary);
  font-size: 16px;
  z-index: 100;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s;

  &.drawer-opened {
    right: 300px;
  }
  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
.setting-drawer-content {
  .setting-drawer-item {
    margin-bottom: 24px;

    h3 {
      margin: 0 0 12px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 500;
      color: #000000d9;
    }

    .setting-drawer-blockChecbox {
      display: flex;

      .setting-drawer-blockChecbox-item {
        position: relative;
        margin-right: 16px;
        // border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-select {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          padding-top: 14px;
          padding-left: 22px;
          color: #1890ff;
          font-size: 20px;
          font-weight: 700;
        }
      }
    }

    .setting-drawer-colorBlock {
      display: flex;

      .el-tag {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        border-radius: 2px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        i {
          font-size: 14px;
        }
      }
    }

    .setting-drawer-list {
      font-size: 14px;
      color: #000000a6;

      .setting-drawer-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 0;

        .el-select {
          width: 80px;
        }

        .opacity {
          opacity: 0.5;
        }
      }
    }

    .el-alert {
      margin-bottom: 16px;
      .setting-drawer-item-alert {
        line-height: 1.5;
        font-size: 14px;
        color: #000000bd;
      }
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="map">
    <div id="container"></div>

    <div class="action-bar">
      <div class="action-list" v-show="actionBarState">
        <div class="action-module">
          <h3>功能</h3>
          <div class="action-content">
            <el-tooltip
              :content="item.title"
              placement="top"
              v-for="(item, index) in actionList"
              :key="index"
            >
              <div class="action-item" @click="item.function(item)">
                <i :class="['iconfont', item.icon]"></i>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div
        :class="['arrow', actionBarState ? '' : 'arrow-retraction']"
        @click="toggleActionBar"
      ></div>
    </div>

    <div class="tool-card" v-show="toolCardState">
      <el-radio-group v-model="currentTool" @change="toolDraw(currentTool)">
        <el-radio label="marker" size="small">画点</el-radio>
        <el-radio label="polyline" size="small">画折线</el-radio>
        <el-radio label="polygon" size="small">画多边形</el-radio>
        <el-radio label="rectangle" size="small">画矩形</el-radio>
        <el-radio label="circle" size="small">画圆</el-radio>
      </el-radio-group>

      <div class="tool-operation">
        <el-button @click="clearDraw" type="primary" size="small" plain round>
          清除
        </el-button>
        <el-button @click="closeDraw" type="primary" size="small" plain round>
          关闭绘图
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { shallowRef } from "@vue/reactivity";
import AMapLoader from "@amap/amap-jsapi-loader";
import type { actionType } from "@/types/map";

const map = shallowRef();
const mouseTool = ref();

const actionBarState = ref(true);
const toolCardState = ref(false);
const currentTool = ref("marker");

const actionList: Array<actionType> = reactive([
  {
    title: "切换主题",
    icon: "icon-theme",
    state: false,
    function: (item: actionType) => {
      toggleTopic(item);
    },
  },
  {
    title: "工具类",
    icon: "icon-tool",
    state: false,
    function: (item: actionType) => {
      toggleTool(item);
    },
  },
]);

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  map.value.destroy();
});

const initMap = () => {
  AMapLoader.load({
    key: "f00d2fe724170e22a9fa50d89871d901",
    version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.MouseTool", "AMap.HeatMap"],
    Loca: {
      version: "1.4.15", // Loca 版本，缺省 1.3.2
    },
  }).then((AMap) => {
    map.value = new AMap.Map("container", {
      viewMode: "3D",
      zoom: 11,
      center: [116.405285, 39.904989],
      mapStyle: "amap://styles/blue",
    });

    mouseTool.value = new AMap.MouseTool(map.value);
  });
};

const toggleActionBar = () => {
  actionBarState.value = !actionBarState.value;
};

const toggleTopic = (item: actionType) => {
  item.state = !item.state;
  let styleName = "amap://styles/" + (item.state ? "normal" : "blue");
  map.value.setMapStyle(styleName);
};

const toggleTool = (item: actionType) => {
  item.state = !item.state;
  toolCardState.value = item.state;
  if (!item.state) {
    closeDraw();
    return;
  }
  currentTool.value = "marker";
  toolDraw(currentTool.value);
};

const toolDraw = (type: string) => {
  switch (type) {
    case "marker": {
      mouseTool.value.marker({});
      break;
    }
    case "polyline": {
      mouseTool.value.polyline({ strokeColor: "#80d8ff" });
      break;
    }
    case "polygon": {
      mouseTool.value.polygon({ fillColor: "#00b0ff", strokeColor: "#80d8ff" });
      break;
    }
    case "rectangle": {
      mouseTool.value.rectangle({
        fillColor: "#00b0ff",
        strokeColor: "#80d8ff",
      });
      break;
    }
    case "circle": {
      mouseTool.value.circle({ fillColor: "#00b0ff", strokeColor: "#80d8ff" });
      break;
    }
  }
};

const clearDraw = () => {
  map.value.clearMap();
};
const closeDraw = () => {
  mouseTool.value.close(true);
  currentTool.value = "";
};
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 50vw;
}
.map {
  position: relative;

  .action-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 10;

    .action-list {
      width: 16rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: rgba(16, 75, 90, 0.5);

      .action-module {
        h3 {
          height: 2.6rem;
          width: 100%;
          margin: 0;
          padding: 0;
          background: url(~@/assets/img/amap/title.webp) no-repeat;
          background-size: 100% 100%;
          line-height: 2.6rem;
          text-indent: 2.3rem;
          color: #fff;
        }

        .action-content {
          height: calc(100% - 2.6rem);
          display: flex;
          flex-wrap: wrap;

          .action-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 5.3rem;
            height: 4.4rem;
            color: #fff;

            i {
              font-size: 1.5rem;
            }
          }
        }
      }
    }

    .arrow {
      position: absolute;
      top: 50%;
      left: 16rem;
      width: 3rem;
      height: 3rem;
      background: url(~@/assets/img/amap/arrow.png) 100%/100% no-repeat;
      transform: translate(-50%, -50%) rotateY(180deg);
      cursor: pointer;
    }
    .arrow-retraction {
      left: 0;
      transform: translate(0, -50%);
    }
  }

  .tool-card {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 22rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.4rem;
    box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
    background-color: #fff;

    .el-radio {
      margin-right: 22px;
    }

    .tool-operation {
      display: flex;
      justify-content: center;
      margin-top: 8px;
    }
  }
}
</style>

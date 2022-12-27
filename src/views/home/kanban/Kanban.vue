<template>
  <div class="container">
    <div class="head">全国旅游大数据分析</div>
    <div class="content">
      <div class="content-left">
        <div class="panel">
          <div class="panel-title">客流量</div>
          <div class="panel-content">
            <traffic-chart />
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">出行方式</div>
          <div class="panel-content">
            <travel-pie-chart />
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">经典徒步路线</div>
          <div class="panel-content">
            <hiking-list />
          </div>
        </div>
      </div>
      <div class="content-center">
        <div class="panel-quota-list">
          <div class="panel-quota-item">
            <h3>当日客流量</h3>
            <span>76124</span>
          </div>
          <div class="panel-quota-item">
            <h3>昨日客流量</h3>
            <span>76815</span>
          </div>
          <div class="panel-quota-item panel-quota-large">
            <h3>本月客流量</h3>
            <span>1298374</span>
          </div>
          <div class="panel-quota-item panel-quota-large">
            <h3>上月客流量</h3>
            <span>7863972</span>
          </div>
        </div>
        <div class="panel-map">
          <div class="map-title">全国旅行大数据</div>
          <mobility-map />
        </div>
      </div>
      <div class="content-right">
        <div class="panel">
          <div class="panel-title">年龄分布</div>
          <div class="panel-content">
            <age-pie-chart />
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">游客消费</div>
          <div class="panel-content">
            <consume-chart />
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">热门自驾路线</div>
          <div class="panel-content">
            <driving-list />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import AgePieChart from "./components/AgePieChart.vue";
import TravelPieChart from "./components/TravelPieChart.vue";
import TrafficChart from "./components/TrafficChart.vue";
import ConsumeChart from "./components/ConsumeChart.vue";
import DrivingList from "./components/DrivingList.vue";
import HikingList from "./components/HikingList.vue";
import MobilityMap from "./components/MobilityMap.vue";

defineComponent({ name: "KanbanView" });
</script>

<style lang="less" scoped>
.container {
  height: 56.4vw;
  padding: 0.75rem;
  background-color: #061436;
  color: #fff;

  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 1.2rem;
    margin: 0 auto;
    background: url(~@/assets/img/kanban/head.gif) 100%/100% no-repeat;
    font-size: 1.2rem;
    color: #fff;
  }
  .content {
    display: flex;
    height: calc(100% - 1.2rem);
    padding-top: 0.5rem;

    .content-left,
    .content-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .content-center {
      position: relative;
      width: 50%;
      padding: 1.25rem 1rem 0;

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 1rem;
        height: 1.25rem;
        width: 1.25rem;
        border: solid #00d8ff;
        border-width: 0 0 2px 2px;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 1rem;
        height: 1.25rem;
        width: 1.25rem;
        border: solid #00d8ff;
        border-width: 0 2px 2px 0;
      }
    }

    .panel {
      flex: 1;
      overflow: hidden;
      .panel-title {
        height: 1.75rem;
        margin: 0.25rem 0;
        background: url(~@/assets/img/kanban/title.png) 100%/100% no-repeat;
        background-position: bottom;
        color: #fff;
        font-size: 0.9rem;
        line-height: 1.7;
      }

      .panel-content {
        height: calc(100% - 1.75rem - 0.5rem);
      }
    }

    .panel-quota-list {
      display: flex;
      justify-content: space-evenly;
      height: 6.5rem;
      margin-bottom: 0.5rem;

      .panel-quota-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 22%;
        margin: 0 0.15rem;
        background: url(~@/assets/img/kanban/index-small.png) no-repeat;
        background-size: 100% 100%;

        h3 {
          color: #fff;
          font-size: 0.8rem;
          margin: 0;
          padding: 1rem 1rem 0.8rem;
        }

        span {
          font-size: 2.3rem;
          font-family: "electron";
          color: #20dbfd;
          text-shadow: 0 0 1.25rem #00d8ff;
        }
      }
      .panel-quota-large {
        width: 28%;
        background-image: url(~@/assets/img/kanban/index-large.png);
      }
    }

    .panel-map {
      position: relative;
      height: calc(100% - 6.5rem - 0.5rem);
      background: url(~@/assets/img/kanban/map.png) no-repeat;
      background-size: 110% 100%;
      background-position: center;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 1.25rem;
        width: 1.25rem;
        border: solid #00d8ff;
        border-width: 2px 0 0 2px;
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 1.25rem;
        width: 1.25rem;
        border: solid #00d8ff;
        border-width: 2px 2px 0 0;
      }

      .map-title {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        font-size: 1.5rem;
        color: #fff;
        z-index: 10;
      }
    }
  }
}
</style>

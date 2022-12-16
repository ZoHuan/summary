<template>
  <el-row>
    <el-col :md="24" :lg="12" v-for="(item, index) in teams" :key="index">
      <div class="team-list">
        <el-avatar size="small" :src="item.avatar" />
        <span class="team-name">{{ item.name }}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
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
.team-list {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .team-name {
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
</style>

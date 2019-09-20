<template>
<el-container>

  <el-aside  style="width:200px">
     <layout-aside></layout-aside>
  </el-aside>
<!-- 右侧大容器 -->
  <el-container>
    <el-header>
      <layout-header></layout-header>
      </el-header>
  </el-container>
   <!-- 中部区域 -->
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style scoped >

.el-aside {
  overflow: hidden;
}
</style>

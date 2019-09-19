<template>
<!-- <el-container>

  <el-aside>左侧内容</el-aside>
右侧大容器 -->
  <!-- <el-container>
    <el-header>头部</el-header>
  </el-container>
   中部区域 -->
  <!-- <el-main>
    <router-view></router-view>
  </el-main>
</el-container> -->
 <layout-aside></layout-aside>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>

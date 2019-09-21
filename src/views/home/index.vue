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
    <el-main style="padding:0">
    <router-view></router-view>
  </el-main>
  </el-container>
   <!-- 中部区域 -->

</el-container>

</template>

<script>

export default {

}
</script>

<style scoped >

.el-aside {
  overflow: hidden;
  background-color:  #353b4e;
}
</style>

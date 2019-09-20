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

export default {

}
</script>

<style scoped >

.el-aside {
  overflow: hidden;
}
</style>

<template>
<div class="layout-aside">
  <div class="title">
    <img src="../../assets/img/logo_admin.png" alt="">
  </div>
  <el-menu
  router
  style="width:200px"
  background-color="#353b4e"
  text-color="#adafb5"
  active-text-color="#ffd04b">
    <!-- 首页 -->
    <el-menu-item index='/home'>
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <!-- 内容管理 二级菜单 -->
    <el-submenu index=1>
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>内容管理</span>
      </template>
      <!-- 二级内容 -->
      <el-menu-item index="/home/publish">发布文章</el-menu-item>
      <el-menu-item index="/home/articles">内容列表</el-menu-item>
      <el-menu-item index="/home/comment">评论列表</el-menu-item>
      <el-menu-item index="/home/material">素材管理</el-menu-item>
    </el-submenu>
    <!-- 粉丝管理 -->
     <el-submenu index='2'>
      <template slot='title'>
        <i class="el-icon-user-solid"></i>
        <span>粉丝管理</span>
      </template>
      <!-- 二级内容 -->
      <el-menu-item index="/home/gradata">图文数据</el-menu-item>
      <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
      <el-menu-item index="/home/fanpic">粉丝画像</el-menu-item>
      <el-menu-item index='/home/fanlist'>粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index='/home/account'>
      <i class="el-icon-document"></i>
      <span>账户信息</span>
    </el-menu-item>
    <el-menu-item index='/home/async'>
      <i class="el-icon-document"></i>
      <span>异步应用</span>
    </el-menu-item>
  </el-menu>
</div>

</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
.layout-aside{
  height: 100vh;
  background-color:  #353b4e;
  .title{
  background-color: #353b4e;
  width: 200px;

}
}

</style>

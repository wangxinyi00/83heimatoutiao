<template>
  <el-row type="flex" justify="space-between" class="layout-header" align='middle'>
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="tittle">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img  class='head-img' src="../../assets/img/avatar.jpg" alt />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          女神
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.layout-header{
    width: 1500px;
    height: 55px;
    .el-icon-s-unfold{
      font-size: 22px
    }
    .tittle{
      vertical-align: top
    }
    .head-img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 4px;
    }
}
</style>

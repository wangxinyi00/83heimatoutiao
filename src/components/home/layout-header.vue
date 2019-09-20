<template>
  <el-row type="flex" justify="space-between" class="layout-header" align='middle'>
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="tittle">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img  class='head-img' :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{userInfo.name}}
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
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        this.userInfo = result.data.data
      }).catch()
    }
  },
  created () {
    this.getUserInfo()
  }
}
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

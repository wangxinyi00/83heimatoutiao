<template>
  <el-card v-loading='loading'>
      <bread-crumb slot="header">
        <template slot="title"> 账户信息</template>
      </bread-crumb>
    <!-- 表单 -->
  <el-form ref='account' :rules="accountRules" :model="formData" style="margin-left:60px" label-width="100px">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="formData.name" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="formData.intro" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <!-- 手机号不写 -->
      <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click=" saveUser">保存信息</el-button>
    </el-form-item>
  </el-form>
  <el-upload :http-request="uploadImg" action="" :show-file-list="false">
      <img class="head-img" :src="formData.photo ? formData.photo : defaultImg" alt="">
  </el-upload>
  </el-card>

</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      formData: {

      },
      defaultImg: require('../../assets/img/999.jpeg'),
      accountRules: {
        name: [
          { min: 1, max: 7, message: '用户名应该控制在1-7个字符之间' },
          { required: true, message: '用户名不能为空' }
        ],
        email: [
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' },
          { required: true, message: '邮箱不能为空' }
        ]

      }
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
        this.loading = false
        eventBus.$emit('updateUserInfo')
      })
    },
    // 保存用户个人信息
    saveUser () {
      this.$refs.account.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
            // 提示别的组件 要更新数据
            eventBus.$emit('updateUserInfo')
          })
        }
      })
    },
    getUserInfo () {
      this.loading = true
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.head-img{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position:absolute;
  top: 160px;
  left: 800px;

}
</style>

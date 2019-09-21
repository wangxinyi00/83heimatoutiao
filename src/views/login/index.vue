<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input  v-model="loginForm.code" placeholder="请输入验证码" style="width:65%"></el-input>
        <!-- 发送验证码 -->
           <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <!-- 同意选项 -->
        <el-form-item prop="aggre">
          <el-checkbox  v-model="loginForm.aggre">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack()
      } else {
        callBack(new Error('您需要同意协议'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        aggre: false
      },
      loginRules: {
        mobile: [{
          required: true, message: '请输入您的手机号'
        },
        {
          pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号'
        }],
        code: [{
          required: true, message: '请输入您的验证码'
        },
        {
          pattern: /^\d{6}$/, message: '验证码为6位数字'
        }],
        aggre: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 330px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>

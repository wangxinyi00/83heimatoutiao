<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 菜单 -->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:100px"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width:800px"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <quill-editor v-model="formData.content" type="textarea" :rows="2" placeholder="请输入内容"  style="height:300px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:120px">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 封面组件 -->
      <cover-image @selectImg='changeImg' :images='formData.cover.images'></cover-image>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publish(false)" type="primary">发布文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      publishRules: {
        title: [{ required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题长度要控制在5-30个字符之间' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]

      }
    }
  },
  methods: {
    // 接受子组件传过来的值更改images的值
    changeImg (url, index) {
      // console.log(9)
      // this.formData.cover.images[index] = url  错误方法
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     // 说明找到要修改的值
      //     return url
      //   }
      //   return item
      // })
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 类型改变事件
    changeType () {
      // 根据type判断images的长度
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params

          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            // 发布成功到到内容列表
            this.$router.push('/home/articles')
          })
          // 原始代码
          // if (articleId) {
          //   // 修改
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     method: 'put',
          //     params: { draft },
          //     data: this.formData
          //   }).then(result => {
          //     // 发布成功到到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //     // 发布成功到到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    }
  },

  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId) // 如果articleId存在才执行后面的逻辑
  }

}
</script>

<style>
</style>

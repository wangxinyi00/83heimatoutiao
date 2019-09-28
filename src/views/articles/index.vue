<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态：">
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <div class="block">
          <el-date-picker
            @change="changeCondition"
            v-model="formData.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <div class="article-item" v-for="(item,index) in list" :key="index">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0]:defaultImg " alt />
        <div class="info">
          <span style="font-size:14px">{{item.title}}</span>
          <el-tag :type="item.status |statusType" class="status">{{item.status |statusText}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
      <span @click="goEdit(item.id)">
          <i class="el-icon-edit"></i> 修改
        </span>
        <span @click="delArticles(item.id)">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <!-- f分页 -->
    <el-row type='flex' justify="center" style="margin:10px 0" >
      <el-pagination
      @current-change='changePage'
      background
      layout="prev, pager, next"
      :page-size='page.pageSize'
      :total="page.total"
      :current-page="page.currentPage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      formData: {
        status: 5,
        channel_id: null,
        date: []
      },
      defaultImg: require('../../assets/img/404.png'),
      list: [],
      channels: []
    }
  },
  methods: {
    goEdit (id) {
      // 动态路由穿参
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除文章
    async  delArticles (id) {
      await this.$confirm('您确定要删除此文章吗？')

      await this.$axios({
        url: `/articles/${id.toString()}`,
        method: 'delete'
      })
      this.queryArticles()
    },
    // 状态变化事件
    changeCondition () {
      this.page.currentPage = 1
      this.queryArticles()
    },
    // 待条件的查询
    queryArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate:
          this.formData.date.length > 0 ? this.formData.date[0] : null,
        end_pubdate:
          this.formData.date.length > 1 ? this.formData.date[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },

    // 获取频道列表
    async  getChannels () {
      let result = await this.$axios({
        url: '/channels'
      })
      this.channels = result.data.channels
    },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.queryArticles()
    },
    async  getArticles (params) {
      let result = await this.$axios({
        url: '/articles',
        params
      })
      this.list = result.data.results
      this.page.total = result.data.total_count
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.total {
  border-bottom: 1px dashed #ccc;
  height: 50px;
  line-height: 50px;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px dashed #ccc;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 10px;
      .date {
        color: #999;
        font-size: "12px";
      }
      .status {
        width: 60px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 12px;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>

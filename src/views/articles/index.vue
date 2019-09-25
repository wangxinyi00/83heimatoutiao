<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态：">
        <el-radio-group v-model="radio">
          <el-radio >全部</el-radio>
          <el-radio>草稿</el-radio>
          <el-radio >待审核</el-radio>
          <el-radio >审核通过</el-radio>
          <el-radio >审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select v-model="value" placeholder="请选择">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <div class="total">共找到55091条符合条件的内容</div>
    <div class="article-item" v-for="(item,index) in list" :key='index'>
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
        <span><i class="el-icon-edit"></i> 修改</span>
        <span><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/404.png'),
      list: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
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
          return 'idanger'
        case 4:
          return 'danger'
      }
    }
  }

}
</script>

<style lang='less' scoped>
.total{
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
      border-radius:4px;
    }
    .info{
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        .date{
          color: #999;
          font-size:'12px'
        }
        .status{
          width: 60px;
          text-align: center;
        }
      }
  }
  .right{
    font-size: 12px;
    span{
      margin-right: 10px
    }

  }
}
</style>

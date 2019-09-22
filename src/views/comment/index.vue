<template>
    <el-card>
        <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">
                评论列表
            </template>
        </bread-crumb>
        <el-table :data='list'>
            <el-table-column width="600px"  label='标题' prop='title'></el-table-column>
            <el-table-column :formatter='formatter'  align="center" label='评论状态' prop='comment_status'></el-table-column>
            <el-table-column align="center" label='总评论数' prop='total_comment_count'></el-table-column>
            <el-table-column align="center" label='粉丝评论数' prop='fans_comment_count'></el-table-column>
            <el-table-column align="center" label='操作'>
                <template slot-scope="obj">
                <el-button size='small' type="text">修改</el-button>
                <el-button size='small' type="text">{{
                    obj.row.comment_status ? '关闭评论' : '打开评论'
                    }}</el-button>
            </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        method: '',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }

  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>

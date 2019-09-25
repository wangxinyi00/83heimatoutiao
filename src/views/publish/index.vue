<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 菜单 -->
    <el-form style="margin-left:100px" label-width="100px">
      <el-form-item label="标题">
        <el-input style="width:800px"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group >
          <el-radio>单选</el-radio>
          <el-radio >三图</el-radio>
          <el-radio>无图</el-radio>
          <el-radio >自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道"></el-form-item>
      <el-form-item>
        <el-button type="primary">发布文章</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {}
</script>

<style>
</style>

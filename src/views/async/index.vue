<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">异步应用</template>
      </bread-crumb>
      <p>{{count}}</p>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  methods: {

  }
}
</script>

<style>

</style>

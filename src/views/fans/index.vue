<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">图文数据</template>
    </bread-crumb>
    <el-row type="flex" justify="space-between">
      <!-- 工作图表 -->
      <div ref="workChart" class="echarts"></div>
      <!-- 生活图表 -->
      <div ref="lifeChart" class="echarts"></div>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      workData: [820, 932, 901, 934, 1290, 1330, 1320],
      lifeData: [10, 52, 200, 334, 390, 330, 220]
    }
  },
  created () {
    setInterval(() => {
      this.updateData() // 一秒钟调用一次
    }, 1000)
  },
  methods: {
    updateData () {
      this.workData = this.workData.map(item => {
        return item * (Math.random() + 0.7)
      })
      this.lifeData = this.lifeData.map(item => {
        return item * (Math.random() + 0.7)
      })
    },
    setWorkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.workData,
            type: 'line'
          }
        ]
      })
    },
    setLifeOption () {
      this.lifeChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.lifeData
          }
        ]
      })
    }
  },
  watch: {
    lifeData (newValue) {
      this.setLifeOption()
    },
    workData (newValue) {
      this.setWorkOption()
    }
  },
  mounted () {
    // 图标的初始化
    this.workChart = echarts.init(this.$refs.workChart)
    this.lifeChart = echarts.init(this.$refs.lifeChart)
    this.setWorkOption()
    this.setLifeOption()
    // 生活图表
  }
}
</script>

<style scoped>
.echarts {
  width: 600px;
  height: 400px;
}
</style>

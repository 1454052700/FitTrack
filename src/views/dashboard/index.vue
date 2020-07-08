<template>
  <div class="dashboard-wrap">
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="box1 widget-card">
          <div class="leftPart">
            <icon class="icon" name="user" :scale="5"></icon>
          </div>
          <div class="rightPart">
            <div class="number">{{tweenedNewUsers}}</div>
            <div class="font-center">Overall users</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:100px">
      <ve-line :data="chartData" :settings="chartSettings">
        <div v-if="chartData.rows.length==0" class="data-empty">没有数据😂</div>
      </ve-line>
    </el-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import TWEEN from '@tweenjs/tween.js'
import lineChart from '@/components/linechart'
import pieChart from '@/components/piechart'
import { randomIntegerInRange } from '@/utils/tools'
import { allUserCount, userStatistics } from '@/api/dashboard.js'

export default {
  name: 'dashboard',
  components: {
    lineChart,
    pieChart
  },
  data() {
    return {
      chartSettings: {
        stack: { 用户: ['访问用户'] },
        area: true,
        itemStyle: {
          //面积图颜色设置
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(1,210,152,1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(1,210,152,0.3)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      },
      chartData: {
        columns: ['title', 'number'],
        rows: []
      },
      tweenedNewUsers: ''
    }
  },
  mounted() {
    this.allUserCount()
    this.userStatistics()
  },
  beforeDestroy() {
    clearInterval(this.randomfn)
  },
  methods: {
    // 获取用户总数
    async allUserCount() {
      let response = await allUserCount()
      if (response.code == 200) {
        this.tweenedNewUsers = response.data
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 10000,
          showClose: true
        })
      }
    },
    // 用户统计
    async userStatistics() {
      let response = await userStatistics({
        type: 1, //1为增长  2为活跃
        timeType: 1 //1为天统计  2为月统计
      })
      if (response.code == 200) {
        this.chartData.rows = response.data;
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 10000,
          showClose: true
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

box-style(bg) {
  width: 100%;
  height: 130px;
  background: white;
  display: flex;
  margin-top: 15px;

  .leftPart {
    background: bg;
    width: 130px;
    @extend .flex-center;
  }

  .rightPart {
    flex: 1;
    color: #99a9c0;
    @extend .flex-center;
    flex-direction: column;

    .number {
      font-size: 30px;
      padding-bottom: 6px;
    }

    .font-center {
      text-align: center;
    }
  }
}

.dashboard-row {
  width: 100%;
  height: 400px;
  margin-top: 15px;
  background: white;
}

.dashboard-wrap {
  margin-top: -15px;

  .box1 {
    box-style(#41b883);
  }

  .box2 {
    box-style(#9ab7e0);
  }

  .box3 {
    box-style(#f7c94d);
  }

  .box4 {
    box-style(#e45f5f);
  }

  .line-chart {
    @extend .dashboard-row;
    padding: 15px;
    box-sizing: border-box;
  }

  .todo-wrap {
    @extend .dashboard-row;

    .todo-header {
      span {
        font-weight: bold;
        color: #6fb998;
      }

      .enterTodo {
        float: right;
        width: 140px;
        position: relative;
        top: -8px;
        right: -11px;
      }
    }

    .todo-list {
      div:not(:first-child) {
        margin-top: 15px;
      }
    }
  }

  .system-report {
    @extend .dashboard-row;
    height: 520px;

    .report-header {
      span {
        font-weight: bold;
        color: #6fb998;
      }
    }

    .report-content {
      .el-alert:not(:first-child) {
        margin-top: 15px;
      }

      .progress-wrap {
        margin-top: 20px;
        text-align: center;
        padding: 20px;

        .el-progress:not(:first-child) {
          margin-left: 20px;
        }
      }
    }
  }

  .pie-wrap {
    @extend .dashboard-row;
    height: 520px;

    .pie-header {
      span {
        font-weight: bold;
        color: #6fb998;
      }
    }
  }
}
</style>

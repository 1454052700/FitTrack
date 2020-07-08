<template>
  <div class="profile-container">
    <el-row class="header">
      <el-form ref="form" :model="form" label-width="250px">
        <el-form-item label="Old Password">
          <el-input placeholder="Old Password" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="New Password">
          <el-input placeholder="New Password" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Confirm New Password">
          <el-input placeholder="Confirm New Password" v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button style="width:30%;background:#41B883;color:#fff;margin-top:40vh">SAVE</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'profile',
  data() {
    return {
      search: '',
      form: {
        name: ''
      },
      avatarUrl: this.$store.state.user.avatar,
      username: this.$store.state.user.name,
      about: this.$store.state.user.introduction,
      lastLoginDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/variables.styl';
.el-input{
  width 70%;
}
title-color = #464646;
title-sub = #8c8c8c;
.btn{
  width 100%;
  text-align center;
}
.profile-container {
  .el-card {
    font-size: 14px;
  }

  @extend .edenfont-content;
  width: 100%;
  height 100%;
  background #fff;
  border-radius 5px;
  .header {
    padding:30px 15px;
    box-sizing: unset;
    &-left {
      height: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
    }

    &-avatar {
      margin-left: 20px;
      display: inline-block;
      vertical-align: middle;
      width: 100px;

      img {
        border-radius: 50%;
        width: 100%;
      }
    }

    &-content {
      flex: 1;
      margin-left: 20px;
      height: 85px;
      display: inline-block;
      vertical-align: middle;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: title-color;

        span {
          cursor: pointer;
          color: main-color;

          &:hover {
            text-decoration-line: underline;
          }
        }
      }

      .sub {
        margin-top: 10px;
        color: title-sub;
        font-size: 14px;
      }

      .sub:last-child {
        margin-top: 10px;
      }

      .route {
        margin-top: 10px;
        color: title-sub;
        font-size: 14px;
      }
    }
  }

  .profile-content {
    margin-top: 30px;

    &__left {
      margin-bottom: 20px;

      .el-alert {
        margin-bottom: 20px;
      }

      .feed {
        height: 63px;
        border-bottom: 1px solid #e0e0e0;

        .line {
          position: relative;
        }

        .time {
          color: #a7a7a7;
          font-size: 14px;
          margin-top: 10px;
        }

        .details {
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .feed:not(:first-child) {
        margin-top: 25px;
      }

      .feed:last-child {
        border-bottom: 0px;
      }
    }

    &__right {
      .el-card:not(:first-child) {
        margin-top: 20px;
      }
    }

    .card-title {
      color: #585858;
    }
  }
}
</style>

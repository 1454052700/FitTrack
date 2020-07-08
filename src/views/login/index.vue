<template>
  <div class="login-page">
    <img class="hbimg" src="../../assets/login/hb.png" />
    <langselect class="lang" />
    <div class="login-wrap">
      <el-col :class="translateLeft" :span="24">
        <!--登录头部-->
        <div v-show="notforget">
          <div class="logo">
            <icon name="tree" :scale="8"></icon>
            <div class="title">
              <a>
                <!-- <span>{{ $t('login.edenPart1') }}</span>
                <span class="subtitle">{{ $t('login.edenPart2') }}</span>-->
                FitTrack Management System
              </a>
            </div>
          </div>
          <!--登录表单-->
          <div class="login-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="userName">
                <el-input
                  :placeholder="$t('login.userplaceholder')"
                  v-model="ruleForm.userName"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input
                  :placeholder="$t('login.pwdplaceholder')"
                  type="passWord"
                  v-model="ruleForm.passWord"
                  show-password
                  clearable
                  v-on:keyup.13.native="handleLogin('ruleForm')"
                />
              </el-form-item>
              <el-form-item prop="code">
                <div
                  style="display: flex;align-items: center;justify-content: space-between;display:flex;width:100%"
                >
                  <el-input
                    v-model="ruleForm.code"
                    placeholder="验证码"
                    type="text"
                    style="width: 75%"
                  />
                  <img :src="codeImg" @click="getCode" />
                </div>
              </el-form-item>
              <el-form-item class="btn">
                <el-button
                  :loading="loading"
                  type="primary"
                  @click="handleLogin('ruleForm')"
                >{{ $t('login.btn') }}</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--登录尾部-->
          <div class="login-footer">
            <el-col :span="12">
              <el-checkbox v-model="remember" name="type">
                {{
                $t('login.remember')
                }}
              </el-checkbox>
            </el-col>
            <!-- <el-col class="forgetpwd" :span="12">
              <span @click="wrapSwitch(false)">
                {{
                $t('login.forgetpwd')
                }}
              </span>
            </el-col>-->
          </div>
        </div>

        <!--忘记密码-->
        <div v-show="!notforget">
          <div class="title forgetwrap-title">
            <a>
              <span>Vue-admin-</span>
              <span class="subtitle">System</span>
            </a>
          </div>
          <div class="forget-form">
            <el-form :model="forgetForm" ref="forgetRuleForm">
              <el-form-item>
                <el-input :placeholder="$t('login.forget_email')" v-model="forgetForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input :placeholder="$t('login.forget_code')" v-model="forgetForm.code"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  :placeholder="$t('login.forget_passwrd')"
                  type="password"
                  v-model="forgetForm.newPassword"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  :placeholder="$t('login.confirm_passwrd')"
                  type="password"
                  v-model="forgetForm.confirmPassword"
                ></el-input>
              </el-form-item>
              <el-form-item class="btn">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-button @click="wrapSwitch(true)" type="primary">
                      {{
                      $t('login.forget_back')
                      }}
                    </el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button @click="forgetHandle" type="primary">
                      {{
                      $t('login.forget_btn')
                      }}
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import langselect from '@/components/langselect'
import storage from '@/utils/storage'
import { getCode, login } from '@/api/login.js'
export default {
  name: 'login',
  components: {
    langselect
  },
  data() {
    return {
      lang: this.$store.state.app.language,
      codeImg: '',
      ruleForm: {
        userName: '',
        passWord: '',
        code: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: this.$t('请输入用户名！'),
            trigger: 'change'
          }
        ],
        passWord: [
          {
            required: true,
            message: this.$t('请输入密码!'),
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: this.$t('请输入验证码!'),
            trigger: 'change'
          }
        ]
      },
      remember: true,
      loading: false,
      switchLeft: false,
      switchRight: false,
      notforget: true,
      forgetForm: {
        email: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  mounted() {
    this.getCode()
  },
  computed: {
    translateLeft() {
      return {
        'translate-left': true,
        'login-col': true,
        'switch-left': this.switchLeft
      }
    },
    translateRight() {
      return {
        'translate-right': true,
        'login-col': true,
        'switch-right': this.switchLeft
      }
    }
  },
  methods: {
    // 获取
    getCode() {
      console.log(process.env.VUE_APP_BASE_URL,"909090")
      var num = Math.ceil(Math.random() * 10)
      this.codeImg = process.env.VUE_APP_BASE_URL+'login/getCode?' + num
    },
    wrapSwitch(state) {
      this.switchLeft = !this.switchLeft
      this.switchRight = !this.switchRight
      setTimeout(() => {
        this.notforget = state
        this.$refs['ruleForm'].resetFields()
        // this.$refs['forgetRuleForm'].resetFields()
      }, 300)
    },
    handleLogin(formName) {
      this.loading = true
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let { userName, passWord, code } = this.ruleForm
            this.remember
              ? //获取当前登录的用户名
                storage.set('loginUser', userName)
              : //移除用户名
                storage.remove('loginUser', userName)
            const response = await this.$store.dispatch('loginbyUser', {
              //  用户名去空格
              userName: userName.trim(),
              passWord: passWord,
              code:code
            })
            this.loading = false
            if (response.data) {
              this.$notify.closeAll() 
              this.$router.push({ path: '/' })
              this.$message({
                message: response.msg,
                type: 'success',
                duration: 10000,
                showClose: true
              })
            } else {
              this.$message({
                message: response.msg,
                type: 'error',
                duration: 10000,
                showClose: true
              })
            }
          } catch (error) {
            throw new Error(error)
          }
        } else {
          this.loading = false
          this.$message.error(this.$t('login.validfaild'))
        }
      })
    },
    forgetHandle() {
      this.$message.success(this.$t('login.pwdChanged'))
      this.wrapSwitch(true)
    }
  }
}
</script>

<style lang="stylus">
.hbimg {
  width: 100%;
  height: auto;
}

.forget-form, .login-form {
  .el-form-item__content {
    line-height: 40px;
  }

  .el-input__inner {
    padding-top: 2px;
    height: 40px;
    line-height: 40px;
  }
}

.btn button {
  width: 100%;
  padding: 12px 20px;
}
</style>

<style lang="stylus" scoped>
@import '../../assets/styl/variables.styl';

.login-col {
  height: 100%;
}

.login-page {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;

  .lang {
    position: absolute;
    right: 59px;
    top: 24px;
  }

  .svg-github {
    position: absolute;
    right: 29px;
    top: 25px;
  }

  .translate-left, .translate-right {
    will-change: auto;
    transform: translateX(0px);
    transition: transform 0.6s ease-in-out;
  }

  .switch-left {
    transform: translateX(525px);
  }

  .switch-right {
    transform: translateX(-375px);
  }
}

.login-wrap {
  overflow: hidden;
  width: 400px;
  height: 500px;
  border-radius: 4px;
  transform: translateY(-10px);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 0 3px 0 rgba(0, 0, 0, 0.15);
  position: absolute;
  right: 15%;
  background: #fff;

  .logo {
    padding-top: 26px;
    text-align: center;
  }

  .title {
    font-weight: bold;
    color: main-color;
    padding-top: 8px;
    font-size: 22px;

    a {
      cursor: cell;
    }

    a:before {
      content: '[';
      opacity: 0;
      margin-right: 10px;
      transform: translateX(-10px);
      transition: transform 0.2s, opacity 0.2s;
    }

    a:after {
      content: ']';
      opacity: 0;
      margin-left: 10px;
      transform: translateX(10px);
      transition: transform 0.2s, opacity 0.2s;
    }

    a:hover:before, a:hover:after {
      opacity: 1;
      transform: translateX(0);
    }

    .subtitle {
      color: sub-color;
    }
  }

  .forgetwrap-title {
    padding-top: 30px;
    padding-left: 15px;
  }

  .forget-form {
    padding: 20px 30px 30px;
    padding-bottom: 0;
  }

  .login-form {
    padding: 30px;
    padding-bottom: 0;
  }

  .login-footer {
    padding: 0 30px;

    .forgetpwd {
      text-align: right;

      span {
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #606266;
      }
    }
  }
}
</style>

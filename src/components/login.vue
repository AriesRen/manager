<template>
  <div class="login-container">
    <a-card class="login-card" bordered hoverable>
      <a-divider class="login-title">京淘后台管理</a-divider>
      <a-card-meta>
        <template slot="description">
          <div class="login-form">
            <a-form :form="form" @submit="handleSubmit" :layout="formLayout">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-input placeholder="username" v-decorator="['username']">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-input placeholder="Password" v-decorator="['password']" :type="pwdType">
                  <a-icon slot="prefix" type="lock" />
                  <a-icon slot="suffix" :type="pwdType === 'password'? 'eye' : 'eye-invisible'" @click="showPwd" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button :loading="loading" type="primary" html-type="submit" class="login-form-button">
                  登 录
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePass }]
      // },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('Login', values).then((res) => {
            if (res.code === 200) {
              this.$router.push({ path: this.redirect || '/' })
            } else {
              this.$message.error(res.msg)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
        this.loading = false
      })
      // this.$store.dispatch('Login', this.loginForm).then((data) => {
      //   this.loading = false
      //   this.$router.push({ path: this.redirect || '/' })
      // }).catch(() => {
      //   this.loading = false
      // })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #F5F7F9;
}

.login-card {
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 0;
  right: 0;
  width: 400px;
  max-width: 100%;
  margin: 120px auto;
}

.login-title {
  font-size: 1.5em;
  line-height: 30px;
  font-weight: bold;
}

.login-form {
  padding: 20px;
  margin: 0px auto;
}

.login-form-button {
  width: 100%;
  font-size: 1.0em;
}

</style>

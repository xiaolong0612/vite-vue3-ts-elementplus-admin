<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
          tabindex="1" autocomplete="on">
          <template #prefix>
            <el-button :icon="User" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" placeholder="Password" name="password"
          :type="passwordType" tabindex="1" autocomplete="on" @keyup="checkCapslock" @blur="capsTooltip = false"
          @keyup.enter="handleLogin">
          <template #prefix>
            <el-button :icon="Lock" />
          </template>
          <template #append>
            <el-icon @click="showPwd" v-if="!passwordType" color="#889aa4" size="16">
              <View />
            </el-icon>
            <el-icon @click="showPwd" v-else color="#889aa4" size="16">
              <Hide />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click.prevent="handleLogin">Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : 123456</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : 123123</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { validUsername } from '@/utils/validate'
import { useAdminStore } from '@/stores/admin'
import { useRouter } from "vue-router"

const admin = useAdminStore()
const router = useRouter()

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!validUsername(value)) {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}
const loginRules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

let passwordType = ref('password')
let capsTooltip = ref(false)
let loading = ref(false)

const loginFormRef = ref<FormInstance>()
const handleLogin = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      admin.login(loginForm).then(rs => {
        loading.value = false
        ElMessage.success(rs.message)
        router.push('/')
      }).catch(() => {
        loading.value = false
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
}
const checkCapslock = (e: any) => {
  const { key } = e
  capsTooltip.value = key && key.length === 1 && (key >= 'A' && key <= 'Z')
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    height: 47px;

    .el-input__wrapper {
      background: transparent;
      border: 0px;
      box-shadow: none;
    }

    input {
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }

    .el-input-group__append {
      background-color: transparent;
      box-shadow: none;
      cursor: pointer;
      user-select: none;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>

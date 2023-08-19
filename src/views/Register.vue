<template>
  <div class="register-form">
    <h2>注册新用户</h2>
    
    <form @submit.prevent="submitForm">
      

      <div class="form-group">
        <label for="name">用户名</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      
      <div class="form-group">
        <button type="button"  :disabled="isDisabled" @click="startCountdown">{{ buttonText }}</button>
        <p v-if="countdown > 0">倒计时: {{ countdown }} 秒</p>
        请输入验证码：<input type="security" id="security" v-model="formData.security" required>
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="formData.password" required>
      </div>
      
      <div class="form-group">
        <label for="number">手机号</label>
        <input type="text" id="number" v-model="formData.number" required>
      </div>

      <div class="form-group">
        <label for="birthday">生日</label>
        <input type="date" id="birthday" v-model="formData.birthday" required>
      </div>
      
      <div class="form-group">
        <label for="gender">性别</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </div>
      
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import {
 postregister,postemail
} from "@/request/api/home.js"
export default {
  data() {
    return {
      formData: {
        
        name: '',
        email: '',
        number:'',
        password: '',
        security:'',
        birthday: '',
        gender: '',
        
      },
      isDisabled: false,
         countdown: 0
    };
  },
  computed: {
    buttonText() {
      return this.isDisabled ? '请等待' : '发送验证码';
    }
  },
  methods: {
    submitForm() {
      // 在这里发送注册请求，将formData发送到服务器进行处理
      console.log(this.formData);
      let res223=postregister(this.formData)
      console.log("*---*--*-*-*",res223)
      res223.then(response => {
        const message = response.data.message;
        let result1=response.data.message
        console.log(message,response.data.message)
        alert(result1)
        }).catch(error => {
        console.log(error);
        });
      
    },
    startCountdown() {
      console.log(this.formData.email)
      if(this.formData.email==''){
        alert("请先填写正确的邮箱") 
        return 0
      }
      if (!this.isDisabled) {
        this.isDisabled = true;
        this.countdown = 60;
        this.countdownTimer();
      }
      let res333=postemail(this.formData.email)
      console.log(res333)
    },
    countdownTimer() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown--;
          this.countdownTimer();
        }, 1000);
      } else {
        this.isDisabled = false;
      }
    }
  }
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
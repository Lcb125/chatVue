<template>
  <div id="login">

  <el-container>

      <el-header class="header">
          <div class="title">
          登录界面
          </div>

      </el-header>
      <el-main class="main">

          <div class="card">
      <el-card class="box-card">
          <el-form :model="userForm" status-icon >
              <el-form-item label="用户名" prop="name">
                  <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm()">提交</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      </div>

      </el-main>
          <el-footer class="footer">

          <div style="width: 100%; height: 100%;">
          
          </div>

      </el-footer>

  </el-container>
      
  </div>  
     
  
</template>

<script>
import {login} from '../../../api/userInfo'
import { Message } from 'element-ui';

export default {
  data: () =>({
      userForm: {
          name: "",
          pass: ""
      }
    
  }),

  created: function () {
      
    },
  methods: {
      submitForm() {
          console.log('userFrom===='+this.userForm)
          login(this.userForm.name,this.userForm.pass).then(async (response) => {
              if(response.data.code === 200){
                  this.$router.push({path: '/chat'});
              }else{
                  Message.error('用户名或密码错误');
              }
              
          })
      }
  }
};
</script>

<style>

* {
    margin: 0;
    padding: 0;
  }


  .el-header {
      background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0px 0px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-footer {
    /* padding: 0px 0px; */
    background-color: #E9EEF3;
  }

  .el-main {
    padding: 0px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100vh - 120px);

    display: flex;
    align-items: center;
    justify-content: center;
  }


  .login {
      background-color: beige;
      width: 100%;
      height: 100%;
  
  
  
  /* text-align: -webkit-center */
  
  }

  .header {
      width: 100%;
      height: 60px;
  }
  .footer {
      width: 100%;
      height: 30%;
  }

  .box-card {
      background-color: rgb(140, 255, 0);
      width: 100%;
      height: 45%;
  }


</style>
<template>
    <div id="login" >

        <el-container>
    
            <el-header class="header">
                <div class="title">
                <p>欢迎登录</p>
                    
                </div>

            </el-header>
            <el-main class="main">

                <div class="card">
            <el-card class="box-card">
                <el-form :model="userForm" status-icon >
                    <el-form-item  label="用户名" prop="name">
                        <el-input prefix-icon="el-icon-user" v-model="userForm.name"></el-input>
                    </el-form-item>
                    
                    <el-form-item  label="密码" prop="pass">
                        <el-input prefix-icon="el-icon-lock"  type="password" v-model="userForm.pass" show-password autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">登录</el-button>
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
import {login} from '../../api/userInfo'
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
            if (this.userForm.name === '' || this.userForm.pass === ''){
                Message.warning('请填写完整信息');
                return null;
            }
            login(this.userForm.name,this.userForm.pass).then(async (response) => {
                if(response.data.code === 200){
                    window.localStorage.setItem('authToken',response.data.data)
                    this.$router.push({path: '/home'});
                }else{
                    Message.error('用户名或密码错误');
                }
                
            }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
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
      text-align: center;
      padding: 0px 0px;
  
      display: flex;
      align-items: center;
      justify-content: center;
    }

  
    .el-main {
      padding: 0px;
      text-align: center;
      height: calc(100vh - 120px);
  
      display: flex;
      align-items: center;
      justify-content: center;
    }


    #login {
        width: 100%;
        height: 100vh;
        background: url('../../assets/R-C.jpg') center center no-repeat;
        /* background-repeat: no-repeat; */
        background-size: 100% 100%;
        position: fixed;
    
    }

    .bg-img {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
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
        background-color: rgb(242, 164, 54);
        width: 100%;
        height: 45%;

        display: flex;
        align-items: center;
        justify-content: center;
    }


</style>
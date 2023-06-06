<template>
    <div id="chat"  class="all">
      <el-container>
  
      <el-header class="header">
        <div class="title">
          {{ demoTitle }}
          <!-- <span v-show="language=='en'">ChatGPT Stream</span>
          <span v-show="language=='cn'">智能聊天</span> -->
        </div>
  
      </el-header>
      <el-main class="main">
  
        <div style="overflow-y: auto" class="bigBox">
  
          <div>
            <el-dialog
                    :title='six'
                    :visible.sync="dialogVisible"
                    width="50%"
                    :showClose="false"
                    :before-close="beforeClose">
              <span>
                <el-input
                        type="text"
                        v-model.number="userNo"
                        maxlength="4"
                        show-word-limit
                        oninput="value=value.replace(/[^0-9.]/g,'')" />
              </span>
              <span slot="footer" class="dialog-footer">
                <el-button :loading="checkLoading" type="primary" @click="handleClose">
                  {{ check }}
                  <!-- <span v-show="language=='en'">check</span>
                  <span v-show="language=='cn'">验证</span> -->
                </el-button>
              </span>
            </el-dialog>
          </div>

          <div>
            <el-dialog
                    title="您好，首次进入系统，请选择使用语言。"
                    :visible.sync="selectDialogVisible"
                    width="60%"
                    :showClose="false"
                    :before-close="selectBeforeClose">

                    <el-form :model="selectForm" status-icon >
                      <el-form-item >
                        <el-radio-group v-model="selectForm.language">
                          <el-radio label="简体中文"></el-radio>
                          <el-radio label="English"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-form>
                    
              <span slot="footer" class="dialog-footer">
                <el-button :loading="selectLoading" type="primary" @click="selectLanguage(selectForm)">
                  确定
                </el-button>
              </span>
            </el-dialog>
          </div>
  
          <div
                  v-for="(item, index) in list" :key="index"
                  class="msgCss"
                  :style="{textAlign: item.align}"
          >
            <div class="left" v-if="item && item.align == 'left'">
              <img
  
                      style="
                  width: 44px;
                  height: 44px;
                  vertical-align: middle;
                  border-radius: 50%;
                  padding-right: 10px;
                "
                      src="../../assets/support.jpg"
                      alt=""
              />
              <div class="dianxiaoer"  v-if="item && item.link == ''">
                <span class="chatInfo"  style="background-color: #b8e46f;">
                    {{item.text}}
                </span>
                
              </div>
  
  
            </div>
  
            <div class="right" v-if="item && item.align == 'right'">
              <img
                      style="
                  width: 44px;
                  height: 44px;
                  vertical-align: middle;
                  border-radius: 50%;
                  padding-left: 10px;
                "
                      src="../../assets/user.jpg"
                      alt=""
              />
              <div  class="user" >
                <span class="chatInfo"  style="background-color: rgb(136, 205, 234);">
                    {{item.text}}
                </span>
                
                
              </div>
            </div>
  
          </div>
        </div>
  
      </el-main>
      <el-footer class="footer">
  
        <div style="width: 100%; height: 100%;">
          <div class="input">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 5}"
                    class="input-with-select"
                    v-model="input3"
                    ref="serachBox">
            </el-input>
          </div>
          <div class="button">
            <el-button
                    :loading="buttonLoading"
                    @keydown.enter.native="handleMsg"
                    type="success"
                    size="small"
                    @click="handleMsg">
                    {{ sendButton }}
                    <!-- <span v-show="language=='en'">Send</span>
                    <span v-show="language=='cn'">发送</span> -->
              </el-button>
          </div>
        </div>
  
      </el-footer>
  
    </el-container>
    </div>
  </template>
  <script>
  import {requestAccess,testChat,updateAccess} from "@/api/accessInfo";
  import {querySwitch} from '@/api/configInfo.js'
  import {queryMsg} from '@/api/msgInfo'
  import { Message } from 'element-ui';
  
  export default {
    // name: 'Chat',
    components: {
      // HelloWorld
    },
    data: () =>({
      input3: "",
      list: [],
      buttonLoading: false,
      answerLoading: false,
      dialogVisible: false,
      checkLoading: false,
      userNo: '',
      one: '获取响应失败',
      two: '请填入四位数访问码',
      three: '验证通过',
      four: '验证失败',
      five: '当前编号设备已满或次数用尽',
      six: '请填入你的访问码',
      seven: '请填写你的问题',
      language: 'cn',
      selectForm: {},
      demoTitle: 'GPT问答',
      sendButton: '发送',
      check: '验证',
      selectLoading: false,
      selectDialogVisible: false,
      updateAccessInfo: {},
    }),
    created: function () {
        // document.addEventListener("keydown", (e) => {
        //   let key = window.event.keyCode;
        //   if (!this.loading) {
        //     // 13是enter键的键盘码 如果等于13 就调用click的登录方法
        //     // key == 13 &&
        //     this.handleMsg();
        //   }
        // });
        this.queryConfig();
      },
    methods: {
      async handleMsg() {
          // console.log(this.input3, "发送信息");
          if (this.input3 !== "") {
            this.buttonLoading = true;
            await this.list.push({ align: "right", text: this.input3 });
            this.scrollTop11();
            this.getMsg();
            this.input3 = "";
          }else{
            Message.warning(this.seven);
          }
        },
        getMsg() {
          let self = this;
          var visitId = self.getMark();
          // 处理接口请求 返回需要的数据
          testChat(self.input3,self.userNo, visitId)
                  .then(async (response) => {
                    // console.log(response);
                    if (response.data.code === 200) {
  
                      // 自行处理需要的数据
                      if (response.data.data == '设备已满'){
                        self.buttonLoading = false;
                        Message.warning(this.five);
                      }else{
                        // 自行处理需要的数据
                        const msg = response.data.data;
                        let listMsg = {
                          align: "left",
                          text: msg,
                          link: "",
                        };
                        self.buttonLoading = false;
                        await this.list.push(listMsg);
                        this.scrollTop11();
                      }
  
                    }else{
                      self.buttonLoading = false;
                      Message.error(this.one);
                    }
                    // this.buttonLoading = false;
                  }).catch(function (error) {
                      console.log(error);
                      
                      Message.error('服务器异常，请稍后重试');
                  });
                  self.buttonLoading = false;
        },
        // 处理滚动条一直保持最下方
        scrollTop11() {
          setTimeout(()=>{
            console.log(`已把滚动条保持最下方`)
            const infoBox = document.getElementsByClassName("main");
            infoBox[0].scrollTop = infoBox[0].scrollHeight;
          },0)
        },
  
        handleClose() {
          let self = this;
          self.getMark();
          self.checkLoading = true;
          if(self.userNo<1000){
            Message.warning(this.two);
            self.checkLoading = false;
          }else{
            // var identification = navigator.userAgent;
            // console.log('mark:'+mark)
            var visitId = self.getMark();
            requestAccess (self.userNo,visitId )
            .then(async (response) => {
                if (response.data.code == 200) {
                  Message.success(self.three);
                  self.dialogVisible = false;
                  // 校验通过把accessCode存到本地
                  sessionStorage.setItem("userNo",self.userNo);
                  let lan = response.data.data.language;
                  console.log('lan================'+lan)
                  if(lan != null && typeof lan != 'undefined'){
                    queryMsg(lan).then(async (response) => {
                        if (response.data.code === 200) {
                          self.one = response.data.data.one;
                          self.two = response.data.data.two;
                          self.three = response.data.data.three;
                          self.four = response.data.data.four;
                          self.five = response.data.data.five;
                          self.six = response.data.data.six;
                          if('EN' === lan){
                            // self.language = 'en'
                            this.demoTitle = 'ChatGPT Stream'
                            this.sendButton = 'Send'
                            this.check = 'check'
                          }
                          // else{
                          //   self.language = 'cn'
                          // }
                          this.methodThatForcesUpdate();
                        }else{
                          Message.error('获取提示语失败');
                        }
                      }).catch(function (error) {
                          console.log(error);
                          Message.error('服务器异常，请稍后重试');
                      });;
                  }
                }else if (response.data.code == 300) {
                  self.dialogVisible = false;
                  self.selectDialogVisible = true;
                }else{
                  if(response.data.data === '记录已满且唯一标识不匹配或被禁用，当前设备不可用'){
                    Message.warning(this.five);
                  }
                  // else if (response.data.data === '已有记录，但被禁用'){
                  //   Message.warning(this.five);
                  // }
                  else{
                    Message.warning(this.four);
                  }
                  
                }
                self.checkLoading = false;
              }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
          }
  
        },
        beforeClose() {
          Message.warning(this.two);
        },
        selectBeforeClose() {
          Message.warning("请选择使用语言，谢谢");
        },
        getMark(){
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const txt = 'http://www.koal.com/';
          ctx.textBaseline = "top";
          ctx.font = "14px 'Arial'";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#f60";
          ctx.fillRect(125, 1, 62, 20);
          ctx.fillStyle = "#069";
          ctx.fillText(txt, 2, 15);
          ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
          ctx.fillText(txt, 4, 17);
  
          const b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
          const bin = atob(b64);
          const visitId = this.bin2hex(bin.slice(-16, -12));
          console.log('visitId======'+visitId)
          return visitId;
        },
        bin2hex(str) {
          var result = "";
          for (let i = 0; i < str.length; i++) {
            result += this.int16ToHex(str.charCodeAt(i));
          }
          return result;
        },
        int16ToHex(i) {
          var result = i.toString(16);
          var j = 0;
          while (j + result.length < 4) {
            result = "0" + result;
            j++;
          }
          return result;
        },
        queryConfig(){
          // 获取是否开启校验
          querySwitch().then(async (response) => {
              if (response.data.code === 200) {
                this.dialogVisible = true;
              }else if(response.data.code === 500) {
                this.dialogVisible = false;
              }
            }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
            
        },
        selectLanguage(selectForm){
          console.log(selectForm);
          this.selectDialogVisible = false;
          this.selectLoading = true;

          let lan = 'CN';
          if('English' === selectForm.language){
            lan = 'EN';
          }
          let accessCode = sessionStorage.getItem("userNo");
          this.updateAccessInfo.accessCode = accessCode;
          this.updateAccessInfo.language = lan;
          updateAccess(this.updateAccessInfo).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                  this.selectDialogVisible = false;
                  Message.success('选择成功');

                  console.log('lan-=========='+lan)
                  queryMsg(lan).then(async (response) => {
                        if (response.data.code === 200) {
                          this.one = response.data.data.one;
                          this.two = response.data.data.two;
                          this.three = response.data.data.three;
                          this.four = response.data.data.four;
                          this.five = response.data.data.five;
                          this.six = response.data.data.six;
                          this.seven = response.data.data.seven;
                          if('EN' === lan){
                            // this.language = 'en'
                            this.demoTitle = 'ChatGPT Stream'
                            this.sendButton = 'Send'
                            this.check = 'check'
                          }
                          // else{
                          //   this.language = 'cn'
                          // }
                          this.methodThatForcesUpdate();
                        }else{
                          Message.error('获取提示语失败');
                        }
                      }).catch(function (error) {
                          console.log(error);
                          Message.error('服务器异常，请稍后重试');
                      });;
                  
              }else{
                  Message.error('选择失败');
              }
            
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
            this.selectLoading = false;
        },
        methodThatForcesUpdate() {
          this.$forceUpdate();
        },
    }
  }
  </script>
  
  <style>
  /* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */
  * {
      margin: 0;
      padding: 0;
    }
  
    html,body {
      width: 100%;
      height: 100%;
      /* margin-bottom: 10%; */
    }
  
    .all {
      width: 100%;
      height: 100%;
    }
  
    .el-header {
      background-color: #4a85d3;
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
      font-size: 14px;
    }
  
  
    .dianxiaoer {
      padding: 10px;
      /* border-radius: 10px; */
      margin: 0px 70px 0px 50px;
    }
  
    .user {
      text-align: right;
      padding: 10px;
      /* border-radius: 10px; */
      margin: 0px 50px 0px 70px;
    }
    .input{
      width: 80%;
      height: 100%;
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .button{
      width: 20%;
      height: 100%;
      float: right;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chatInfo {
      padding: 4px;
      border-radius: 8px;
      display: inline-block;
    }
  
    .el-dialog__headerbtn {
      display: none;
    }

    .el-dialog__footer {
        padding: 10px 20px 20px;
        text-align: center;
        box-sizing: border-box;
}
  </style>
  
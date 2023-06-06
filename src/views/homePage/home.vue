<template>
  <div id="login">

  <el-container>

      <el-header class="header">
          <div class="title">

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="user" >用户管理</el-menu-item>
                <el-menu-item index="access" >编号管理</el-menu-item>
                <el-menu-item index="config" >配置管理</el-menu-item>
            </el-menu>

          </div>

      </el-header>
      <el-main class="main">

        <div class="card">

            <div class="tab_con" v-show="currentTab==''">
                欢迎来到控制中心
            </div>
            <div class="tab_con" v-show="currentTab=='user'">

                <div v-show="userType == 'admin'">
                    <el-form :model="queryConfigInfo" status-icon>

                        <el-row>
                            <!-- <el-col :span="16">
                                <el-form-item  prop="code">
                                    <el-input   v-model="queryConfigInfo.key" 
                                                placeholder="请输入控制属性" />
                                </el-form-item>
                            </el-col> -->
                            <el-col :span="24">
                                <el-form-item>
                                    <el-button type="primary" @click="insertUser()" size="small" round>新增</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                    </el-form>
                </div>
                <template>
                    <el-table
                        :data="userTableData"
                        stripe
                        :header-cell-style="{ textAlign: 'center' }"
                        :cell-style="{ textAlign: 'center' }"
                        style="width: 100%">
                        <el-table-column
                        prop="userName"
                        label="名称">
                        </el-table-column>
                        <el-table-column
                        prop="password"
                        label="密码"
                        type="password"
                        show-password>
                        </el-table-column>
                        <el-table-column
                        prop="userType"
                        label="用户类型">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="创建时间" 
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="160">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="90"
                        v-show="userType == 'admin'">
                        <template slot-scope="scope">
                            <el-button @click="handleClickOnUser(scope.row)" type="text" size="small" v-show="userType == 'admin'">修改</el-button>
                            <el-button @click="handleClickOnUserDelete(scope.row)" type="text" size="small" v-show="scope.row.userType != 'admin' && userType == 'admin'">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-pagination  @current-change="handleCurrentChange" 
                        :current-page="queryInfo.pagenum"
                        :page-size="queryInfo.pagesize" :total="total" 
                        layout="total, prev, pager, next">
                    </el-pagination> -->
                </template>
            </div>
            <div class="tab_con" v-show="currentTab=='access'">
                <div>
                    <el-form :model="queryCode" status-icon>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item  prop="code">
                                    <el-input   v-model="queryCode.code" 
                                                placeholder="请输入访问码"
                                                maxlength="4"
                                                show-word-limit
                                                oninput="value=value.replace(/[^0-9.]/g,'')" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item>
                                    <el-button type="primary" @click="queryAccessByCode(queryCode)" size="small" round>查询</el-button>
                                    <el-button type="primary" @click="insertAccesses()" size="small" v-show="userType == 'admin'" round>新增</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                    </el-form>
                </div>
                <template>
                    <el-table
                        :data="accessTableData"
                        stripe
                        :header-cell-style="{ textAlign: 'center' }"
                        :cell-style="{ textAlign: 'center' }"
                        style="width: 100%">
                        <el-table-column
                        prop="accessCode"
                        label="访问码">
                        </el-table-column>
                        <el-table-column
                        prop="deviceId"
                        label="设备id">
                        </el-table-column>
                        <el-table-column
                        prop="accessLevel"
                        label="访问级别">
                        </el-table-column>
                        <el-table-column
                        prop="accessType"
                        label="类型">
                        </el-table-column>
                        <el-table-column
                        prop="availableNum"
                        label="可用次数">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="160">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="90"
                        v-show="userType == 'admin'">
                        <template slot-scope="scope">
                            <el-button @click="handleClickOnAccess(scope.row)" type="text" size="small" v-show="userType == 'admin'">修改</el-button>
                            <el-button  @click="handleClickOnAccessDelete(scope.row)"
                                        type="text" 
                                        size="small" 
                                        v-show="userType == 'admin'">
                                        <span v-show="scope.row.status=='A'" >禁用</span>
                                        <span v-show="scope.row.status=='D'" >启用</span>
                            </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-pagination  @current-change="handleCurrentChange" 
                        :current-page="queryInfo.pagenum"
                        :page-size="queryInfo.pagesize" :total="total" 
                        layout="total, prev, pager, next">
                    </el-pagination> -->
                </template>
            </div>
            <div class="tab_con" v-show="currentTab=='config'">

                <div>
                    <el-form :model="queryConfigInfo" status-icon>

                        <el-row>
                            <el-col :span="16">
                                <el-form-item  prop="code">
                                    <el-input   v-model="queryConfigInfo.key" 
                                                placeholder="请输入控制属性" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" @click="queryConfigByKey(queryConfigInfo)" size="small" round>查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                    </el-form>
                </div>
                <template>
                    <el-table
                        :data="configTableData"
                        stripe
                        :header-cell-style="{ textAlign: 'center' }"
                        :cell-style="{ textAlign: 'center' }"
                        style="width: 100%"
                        :row-style="{height: '0'}">
                        <el-table-column
                        prop="codeType"
                        label="类型">
                        </el-table-column>
                        <el-table-column
                        prop="codeKey"
                        label="控制属性"
                        width="85">
                        </el-table-column>
                        <el-table-column
                        prop="codeValue"
                        label="值"
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="codeDesc"
                        label="描述"
                        width="170">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="createBy"
                        label="创建人">
                        </el-table-column>
                        <el-table-column
                        prop="updateBy"
                        label="更新人">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="90"
                        v-show="userType == 'admin'">
                        <template slot-scope="scope">
                            <el-button @click="handleClickOnConfig(scope.row)" type="text" size="small" v-show="userType == 'admin'">修改</el-button>
                            <el-button @click="handleClickOnConfigDelete(scope.row)" type="text" size="small" v-show="userType == 'admin'">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- @size-change="handleSizeChange"  监听size变化 -->
                    <!-- <el-pagination  @current-change="handleCurrentChange" 
                        :current-page="queryInfo.pagenum"
                        :page-size="queryInfo.pagesize" :total="total" 
                        layout="total, prev, pager, next">
                    </el-pagination> -->
                </template>
            </div>
        </div>


        <el-dialog
        title="修改"
        :visible.sync="userDialogVisible"
        width="60%"
        :before-close="userHandleClose">
        <el-form :model="updateUserInfo" status-icon >
                <el-form-item label="名称" prop="userName">
                    <el-input v-model="updateUserInfo.userName"  maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="updateUserInfo.password" show-password maxlength="40" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="updateUserInfo.userType" placeholder="类型">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="普通用户" value="user"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="userDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateUserSubmit(updateUserInfo)">确 定</el-button>
                </el-form-item>
        </el-form>
        </el-dialog>

        <el-dialog
        title="修改"
        :visible.sync="accessDialogVisible"
        width="60%"
        :before-close="accessHandleClose">
        <el-form :model="updateAccessInfo" status-icon >
                <el-form-item label="访问码" prop="accessCode">
                    <el-input v-model="updateAccessInfo.accessCode" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备id" prop="deviceId">
                    <el-input v-model="updateAccessInfo.deviceId" disabled></el-input>
                </el-form-item>
                <el-form-item label="访问级别">
                    <el-select v-model="updateAccessInfo.accessLevel" placeholder="等级">
                    <el-option label="高等" value="H"></el-option>
                    <el-option label="中等" value="M"></el-option>
                    <el-option label="低等" value="L"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="updateAccessInfo.accessType" placeholder="类型">
                    <el-option label="主账号" value="P"></el-option>
                    <el-option label="子账号" value="S"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="可用次数" prop="accessCode">
                    <el-input v-model="updateAccessInfo.availableNum" 
                                maxlength="3"
                                show-word-limit 
                                oninput="value=value.replace(/[^0-9.]/g,'')" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="accessDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateAccessSubmit(updateAccessInfo)">确 定</el-button>
                </el-form-item>
        </el-form>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="configDialogVisible"
        width="60%"
        :before-close="configHandleClose">
        <el-form :model="updateConfigInfo" status-icon >
                <el-form-item label="类型" prop="codeType">
                    <el-input v-model="updateConfigInfo.codeType" disabled></el-input>
                </el-form-item>
                <el-form-item label="控制属性" prop="codeKey">
                    <el-input v-model="updateConfigInfo.codeKey" maxlength="10" placeholder="Key"></el-input>
                </el-form-item>
                <el-form-item label="值">
                    <el-input v-model="updateConfigInfo.codeValue" placeholder="Value" v-show="updateConfigInfo.codeKey != 'ifCheck' && updateConfigInfo.codeKey != 'language'"></el-input>

                    <el-select v-model="updateConfigInfo.codeValue" v-show="updateConfigInfo.codeKey == 'ifCheck'">
                        <el-option label="开启" value="true"></el-option>
                        <el-option label="关闭" value="false"></el-option>
                    </el-select>

                    <el-select v-model="updateConfigInfo.codeValue" v-show="updateConfigInfo.codeKey == 'language'">
                        <el-option label="中文" value="CN"></el-option>
                        <el-option label="英文" value="EN"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="updateConfigInfo.codeDesc" placeholder="描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="configDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateConfigSubmit(updateConfigInfo)">确 定</el-button>
                </el-form-item>
        </el-form>
        </el-dialog>

        <el-dialog
        title="新增用户"
        :visible.sync="insertUserDialogVisible"
        width="60%"
        :before-close="insertUserClose">
        <el-form :model="insertUserInfo" status-icon >
                <el-form-item label="名称" prop="userName">
                    <el-input v-model="insertUserInfo.userName"  maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="insertUserInfo.password" show-password maxlength="40" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="insertUserInfo.userType" placeholder="类型">
                    <el-option label="管理员" value="admin"></el-option>
                    <el-option label="普通用户" value="user"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="insertUserDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insertUserSubmit(insertUserInfo)">确 定</el-button>
                </el-form-item>
        </el-form>
        </el-dialog>

      </el-main>

      <el-footer class="footer">
  
            <div style="width: 100%; height: 100%; overflow: hidden;" v-show="currentTab!=''">
                <el-pagination style="width: 100%;"  @current-change="handleCurrentChange" 
                        :current-page="queryInfo.pagenum"
                        :pager-count="5"
                        :page-size="queryInfo.pagesize" :total="total" 
                        layout="total, prev, pager, next">
                </el-pagination>
            </div>

        </el-footer>

  </el-container>
      
  </div>  
     
  
</template>

<script>
import { Message } from 'element-ui';
import {queryAccess,deleteAccess,updateAccess,queryAccessByCode,insertAccess} from '../../api/accessInfo'
import {queryUsers,deleteUser,updateUser,insertUser} from '../../api/userInfo'
import {queryConfig,deleteConfig,updateConfig} from '../../api/configInfo'

export default {
  data: () =>({
    activeIndex: '1',
    currentTab: '',
    queryInfo: {
		   query: '',
		   // 当前的页数
		   pagenum: 1,
		   // 当前每页显示多少条数据
		   pagesize: 6,
		 },
	total: 0,
    userTableData: [],
    accessTableData: [],
    configTableData: [],
    userDialogVisible: false,
    accessDialogVisible: false,
    configDialogVisible: false,
    updateUserInfo: {},
    updateAccessInfo: {},
    updateConfigInfo: {},
    queryCode: {},
    queryConfigInfo: {},
    insertUserInfo: {
        userName: '',
        password: '',
        userType: ''
    },
    insertUserDialogVisible: false,
    userType: 'user',


  }),

    created: function () {
    //   this.getAccess();
    if (window.location.href.indexOf("#reloaded") == -1) {
        window.location.href = window.location.href + "#reloaded";
        window.location.reload();
    }
    this.getUsers();
    
    },
    methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.currentTab = key;
        // 每次替换页面需要给分页数据重置
        this.queryInfo.pagenum = 1;
        if (key === 'user'){
            this.getUsers();
        }else if (key === 'access'){
            this.getAccess();
        }else if(key === 'config'){
            this.getConfig();
        }
      },
    handleClickOnUser(row) {
        this.userDialogVisible = true;
        this.updateUserInfo = JSON.parse(JSON.stringify(row));
    },
    handleClickOnUserDelete(row){
        console.log(row);
        // this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
        deleteUser(row.id).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('删除成功');
                this.getUsers();
              }else if (response.data.code === 400){
                Message.warning('抱歉，您没有管理员权限，无法删除');
              }else{
                Message.error('删除失败');
              }
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        // });
    },
    handleClickOnAccess(row) {
        this.accessDialogVisible = true;
        this.updateAccessInfo = JSON.parse(JSON.stringify(row));
    },
    handleClickOnAccessDelete(row){
        console.log(row);
        deleteAccess(row).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('变更成功');
                this.getAccess();
              }else if (response.data.code === 400){
                Message.warning('抱歉，您没有管理员权限，无法变更');
              }else{
                Message.error('变更失败');
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
    },
    handleClickOnConfig(row) {
        this.configDialogVisible = true
        this.updateConfigInfo = JSON.parse(JSON.stringify(row));

    },
    handleClickOnConfigDelete(row){
        console.log(row);
        // this.$confirm('此操作将永久删除此配置, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        deleteConfig(row.id).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('删除成功');
                this.getConfig();
              }else if (response.data.code === 400){
                Message.warning('抱歉，您没有管理员权限，无法删除');
              }else{
                Message.error('删除失败');
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        // });
    },
    handleCurrentChange (newPage) {
        this.queryInfo.pagenum = newPage;
        console.log(this.queryInfo.pagenum)

        var key = this.currentTab;
        if (key === 'user'){
            this.getUsers();
        }else if (key === 'access'){
            this.getAccess();
        }else if(key === 'config'){
            this.getConfig();
        }
	},
    getAccess(){
        queryAccess (this.queryInfo.pagenum,this.queryInfo.pagesize).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                this.accessTableData = response.data.data.listInfo;
                this.total = response.data.data.totalSize;
              }else{
                  Message.error('未查询到数据');
                  this.total = 0;
                  this.queryInfo.pagenum = 1 ;
                  this.accessTableData = null
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
    },
    getUsers(){
        queryUsers (this.queryInfo.pagenum,this.queryInfo.pagesize).then((response) => {
            console.log('resp====='+response.data.data)
              if(response.data.code === 200){
                this.userTableData = response.data.data.listInfo;
                this.total = response.data.data.totalSize;
                this.userType = response.data.data.userType;
              }else if (typeof response.data.data === 'undefined'){
                  Message.error('您当前未登录');
                  this.$router.push({path: '/login'});
              }else {
                  Message.error('未查询到数据');
                  this.total = 0;
                  this.queryInfo.pagenum = 1 ;
                  this.userTableData = null
              }
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
    },
    getConfig(){
        queryConfig (this.queryInfo.pagenum,this.queryInfo.pagesize,this.queryConfigInfo).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                this.configTableData = response.data.data.listInfo;
                this.total = response.data.data.totalSize;
              }else{
                  Message.error('未查询到数据');
                  this.total = 0;
                  this.queryInfo.pagenum = 1 ;
                  this.configTableData = null;
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
    },
    updateUserSubmit(updateUserInfo){
        console.log('updateUserInfo='+updateUserInfo.userName)
        updateUser(updateUserInfo).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('更新成功');
                this.getUsers();
              }else{
                Message.error('更新失败');
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });

        this.userDialogVisible = false;

    },
    updateAccessSubmit(updateAccessInfo){
        console.log('updateUserInfo='+updateAccessInfo.accessCode)
        updateAccess(updateAccessInfo).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('更新成功');
                this.getAccess();
              }else{
                Message.error('更新失败');
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
        this.accessDialogVisible = false
    },
    updateConfigSubmit(updateConfigInfo){
        console.log('updateUserInfo='+updateConfigInfo.configType)
        updateConfig(updateConfigInfo).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('更新成功');
                this.getConfig();
              }else{
                Message.error('更新失败');
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });

        this.configDialogVisible = false;

    },
    userHandleClose(done) {
        // this.getUsers();
        done();
    },
    accessHandleClose(done) {
        // this.getAccess();
        done();
    },
    configHandleClose(done) {
        // this.getConfig();
        done();
    },
    insertUserClose(done) {
        done();
    },
    queryAccessByCode(queryCode){
        queryAccessByCode(1,this.queryInfo.pagesize,queryCode.code).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('查询成功');
                this.accessTableData = response.data.data.listInfo;
                this.total = response.data.data.totalSize;
              }else{
                  Message.error('未查询到相关信息');
              }
              this.queryCode.code = null;
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
    },
    queryConfigByKey(queryConfigInfo){
        queryConfig(1,this.queryInfo.pagesize,queryConfigInfo).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('查询成功');
                this.configTableData = response.data.data.listInfo;
                this.total = response.data.data.totalSize;
              }else{
                  Message.error('未查询到相关信息');
              }
              this.queryConfigInfo.key = null;
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
    },
    insertAccesses(){
        insertAccess().then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('新增成功');
                this.getAccess();
              }else{
                Message.error('新增失败');
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
    },
    insertUser() {
        this.insertUserDialogVisible = true;
    },
    insertUserSubmit(insertUserInfo){
        console.log('userinfo'+insertUserInfo.password)
        if(typeof this.insertUserInfo.userName === 'undefined' || this.insertUserInfo.userName === ''){
            Message.warning('请填写用户名称');
            return;
        }
        if(typeof this.insertUserInfo.password === 'undefined' || this.insertUserInfo.password === ''){
            Message.warning('请填写密码');
            return;
        }
        if(typeof this.insertUserInfo.userType === 'undefined' || this.insertUserInfo.userType === ''){
            Message.warning('请选择用户类型');
            return;
        }
        insertUser(insertUserInfo).then((response) => {
            console.log('resp====='+response)
              if(response.data.code === 200){
                Message.success('新增成功');
                this.getUsers();
              }else if(response.data.code === 400){
                Message.warning('当前用户已存在');
                return;
              }else{
                Message.error('新增失败');
              }
              
          }).catch(function (error) {
                console.log(error);
                Message.error('服务器异常，请稍后重试');
            });
            this.insertUserDialogVisible = false;
            this.insertUserInfo.userName = '';
            this.insertUserInfo.password = '';
            this.insertUserInfo.userType = '';
    },

  }
};
</script>

<style>

* {
    margin: 0;
    padding: 0;
  }


  .el-header, .el-footer {
    color: #333;
    text-align: center;
    padding: 0px 0px;

    display: flex;
    align-items: center;
    justify-content: center;
  }


  .el-main {
    padding: 0px;
    color: #333;
    text-align: center;
    height: calc(100vh - 120px);

    /* display: flex;
    align-items: center; */
    /* justify-content: center; */
  }


  .login {
      background-color: beige;
      width: 100%;
      height: 100%;
  
  }

  .header {
      width: 100%;
      height: 60px;
  }

  .tab_con {
    text-align: center;
    font-size: smaller;
  }




</style>
webpackJsonp([0],{307:function(e,t,n){(function(e,t,o,r){var s=n(7),i=n(37),a=n(38),p=n(39),d=n(82),u=n(6);e.get("teamId")||(location.href="../project/project.html"),e.remove("projectId"),e.remove("projectName"),e.remove("versionId"),e.remove("versionName"),e.remove("versionDis");new t({el:"#app",data:{type:1,showAdd:!1,addPending:!1,newType:0,name:"",dis:"",id:"",arrApply:[],showApply:!1,applyPending:!1,showUserApply:!1,newUserGroup:"",newUserRole:1,selUserApplyObj:{}},mixins:[u],store:d,components:{mainnav:s,teaminfo:i,teamprojectlist:a,teamuser:p},computed:{user:function(){return d.state.user},ownRole:function(){return d.getters.ownRole},manageRole:function(){return d.getters.manageRole}},methods:{addProject:function(){var t=this;if(0==this.newType){if(!this.name)return void this.$message.error("请输入名称");this.addPending=!0,o.post("/project/create",{name:t.name,dis:t.dis,team:e.get("teamId")}).then(function(e){t.addPending=!1,t.name="",t.dis="",200==e.code?(d.state.project.unshift(e.data),r.notify("创建成功",1),t.showAdd=!1):r.notify(e.msg,0)})}else{if(!this.id)return void this.$message.error("请输入项目ID");this.addPending=!0,o.put("/team/pullproject",{id:e.get("teamId"),project:this.id}).then(function(e){t.addPending=!1,t.name="",t.dis="",t.id="",200==e.code?(r.notify("请求已发出，等待项目管理员响应",1),t.showAdd=!1):r.notify(e.msg,0)})}},importProject:function(){r.showBox(this,"importProject")},addGroup:function(){r.input("请输入部门名称",function(t){if(!t.value)return void r.tip("请输入部门名称",0);r.startHud(),o.post("/team/group",{id:e.get("teamId"),name:t.value}).then(function(e){r.stopHud(),200==e.code?(r.notify("新建成功",1),d.state.user.push(e.data)):r.notify(e.msg,0)})})},handleApply:function(t,n){2==t.type?(this.newUserGroup=d.state.user[0]._id,this.newUserRole=1,this.selUserApplyObj={item:t,state:n},1==n?this.showUserApply=!0:this.handleUserApply()):3==t.type&&(r.startHud(),o.put("/team/apply",{id:e.get("teamId"),apply:t._id,state:n}).then(function(e){r.stopHud(),200==e.code?"object"==typeof e.data?(t.handle=1,d.state.project.unshift(e.data)):t.handle=2:(t.handle=3,r.notify(e.msg,0))}))},handleUserApply:function(){var t=this;this.applyPending=!0,o.put("/team/apply",{id:e.get("teamId"),apply:this.selUserApplyObj.item._id,group:this.newUserGroup,role:this.newUserRole,state:this.selUserApplyObj.state}).then(function(e){t.applyPending=!1,200==e.code?"object"==typeof e.data?(t.selUserApplyObj.item.handle=1,d.state.user.forEach(function(n){n._id==t.newUserGroup&&(n.users.push(e.data),n.users.sort(function(e,t){return e.user.name>t.user.name}))})):t.selUserApplyObj.item.handle=2:(t.selUserApplyObj.item.handle=3,r.notify(e.msg,0)),t.showUserApply=!1})}},created:function(){var e=this;Promise.all([o.get("/team/info",{id:e.session.teamId}),o.get("/team/apply",{id:e.session.teamId})]).then(function(t){r.stopLoading();var n=t[0],o=t[1];if(200!=n.code)throw n.msg;if(d.commit("setTeam",n.data),e.newUserGroup=n.data.user[0]._id,200!=o.code)throw o.msg;o.data.forEach(function(e){e.handle=0}),e.arrApply=o.data,e.arrApply.length>0&&(e.showApply=!0)}).catch(function(e){r.notify(e,0)})}});r.ready(function(){r.startLoading()})}).call(t,n(3),n(2),n(4),n(0))},82:function(e,t,n){(function(t){e.exports=new t.Store({state:{team:{},notice:[],project:[],user:[],role:0},getters:{userCount:function(e,t){return e.user.length},interfaceCount:function(e,t){var n=0;return e.project.forEach(function(e){n+=e.interfaceCount}),n},projectCount:function(e,t){return e.project.length},ownRole:function(e){return 2==e.role},manageRole:function(e){return 2==e.role||0==e.role}},mutations:{setTeam:function(e,t){e.team=t,e.notice=t.notice,e.project=t.project,e.user=t.user,e.role=t.role}}})}).call(t,n(18))}},[307]);
"use strict";(self["webpackChunksummary"]=self["webpackChunksummary"]||[]).push([[958],{7094:function(e,l,a){a.d(l,{Z:function(){return r}});var t=a(4870),d=a(6900);function r(){const e={children:"children",label:"name",value:"id"},l={children:"children",label:e=>e.meta.title,value:"id"},a=(0,t.iH)(),r=(0,t.iH)(),u=(0,t.iH)(),o=()=>{(0,d.E$)().then((e=>{a.value=e.data.result}))},s=()=>{(0,d.JV)().then((e=>{r.value=e.data.result}))},m=()=>{(0,d.Af)().then((e=>{u.value=e.data.result}))};return{departmentProps:e,menuProps:l,departmentList:a,roleList:r,menuList:u,getDepartmentData:o,getRoleData:s,getMenuData:m}}},4958:function(e,l,a){a.r(l),a.d(l,{default:function(){return h}});var t=a(3396),d=a(4870),r=a(7178),u=a(7094);const o={class:"custom-dialog-body scroll-bar-hidden"},s=(0,t.Uk)(" 基本信息 "),m=(0,t.Uk)("男"),n=(0,t.Uk)("女"),i=(0,t.Uk)(" 权限设置 "),p=(0,t.Uk)(" 其它信息 "),c=(0,t.Uk)("启用"),f=(0,t.Uk)("禁用"),g=(0,t.Uk)("取消"),b=(0,t.Uk)("确定");var w=(0,t.aZ)({__name:"UserModal",props:{modalVisible:{type:Boolean},modalTitle:null,modalData:null},emits:["toggleVisible","refresh"],setup(e,{emit:l}){const a=e,{departmentProps:w,departmentList:V,roleList:h,getDepartmentData:W,getRoleData:_}=(0,u.Z)(),U=(0,d.iH)(),v=(0,d.qj)({username:"",phone:"",email:"",gender:1,departmentId:"",roleId:"",password:"",status:1}),k=(0,d.qj)({username:[{required:!0,message:"请输入用户名称！",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码！",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址！",trigger:"blur"}],departmentId:[{required:!0,message:"请选择所属部门！",trigger:"blur"}],roleId:[{required:!0,message:"请选择所属角色！",trigger:"blur"}]}),y=(0,d.iH)(1),D=(0,t.Fl)({get(){return a.modalVisible},set(){I()}});(0,t.YP)((()=>a.modalData),(e=>{(0,t.Y3)((()=>{y.value=2,Object.assign(v,e)}))})),(0,t.bv)((()=>{W(),_()}));const I=()=>{U.value?.resetFields(),y.value=1,l("toggleVisible",!1)},q=e=>{e?.validate((a=>{a&&(1===y.value?(r.z8.success("添加用户成功！"),e.resetFields(),l("toggleVisible",!1),l("refresh")):(r.z8.success("编辑用户成功！"),e.resetFields(),l("toggleVisible",!1),l("refresh")))}))};return(l,a)=>{const r=(0,t.up)("el-divider"),u=(0,t.up)("el-input"),W=(0,t.up)("el-form-item"),_=(0,t.up)("el-radio"),y=(0,t.up)("el-radio-group"),H=(0,t.up)("el-tree-select"),j=(0,t.up)("el-option"),L=(0,t.up)("el-select"),C=(0,t.up)("el-form"),F=(0,t.up)("el-button"),P=(0,t.up)("el-dialog");return(0,t.wg)(),(0,t.j4)(P,{modelValue:(0,d.SU)(D),"onUpdate:modelValue":a[10]||(a[10]=e=>(0,d.dq)(D)?D.value=e:null),title:e.modalTitle,width:"38%",draggable:"","close-on-click-modal":!1,"close-on-press-escape":!1,class:"custom-dialog"},{footer:(0,t.w5)((()=>[(0,t.Wm)(F,{onClick:a[8]||(a[8]=e=>I())},{default:(0,t.w5)((()=>[g])),_:1}),(0,t.Wm)(F,{onClick:a[9]||(a[9]=e=>q(U.value)),type:"primary"},{default:(0,t.w5)((()=>[b])),_:1})])),default:(0,t.w5)((()=>[(0,t._)("div",o,[(0,t.Wm)(C,{ref_key:"formRef",ref:U,model:v,rules:k,"label-width":"90px"},{default:(0,t.w5)((()=>[(0,t.Wm)(r,{"content-position":"left","border-style":"dashed"},{default:(0,t.w5)((()=>[s])),_:1}),(0,t.Wm)(W,{label:"用户名称",prop:"username"},{default:(0,t.w5)((()=>[(0,t.Wm)(u,{modelValue:v.username,"onUpdate:modelValue":a[0]||(a[0]=e=>v.username=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(W,{label:"手机号码",prop:"phone"},{default:(0,t.w5)((()=>[(0,t.Wm)(u,{modelValue:v.phone,"onUpdate:modelValue":a[1]||(a[1]=e=>v.phone=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(W,{label:"邮箱地址",prop:"email"},{default:(0,t.w5)((()=>[(0,t.Wm)(u,{modelValue:v.email,"onUpdate:modelValue":a[2]||(a[2]=e=>v.email=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(W,{label:"性别",prop:"gender"},{default:(0,t.w5)((()=>[(0,t.Wm)(y,{modelValue:v.gender,"onUpdate:modelValue":a[3]||(a[3]=e=>v.gender=e)},{default:(0,t.w5)((()=>[(0,t.Wm)(_,{label:1},{default:(0,t.w5)((()=>[m])),_:1}),(0,t.Wm)(_,{label:0},{default:(0,t.w5)((()=>[n])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(r,{"content-position":"left","border-style":"dashed"},{default:(0,t.w5)((()=>[i])),_:1}),(0,t.Wm)(W,{label:"所属部门",prop:"departmentId"},{default:(0,t.w5)((()=>[(0,t.Wm)(H,{modelValue:v.departmentId,"onUpdate:modelValue":a[4]||(a[4]=e=>v.departmentId=e),data:(0,d.SU)(V),props:(0,d.SU)(w),"render-after-expand":!1,clearable:"","check-strictly":"",placeholder:"请选择部门"},null,8,["modelValue","data","props"])])),_:1}),(0,t.Wm)(W,{label:"所属角色",prop:"roleId"},{default:(0,t.w5)((()=>[(0,t.Wm)(L,{modelValue:v.roleId,"onUpdate:modelValue":a[5]||(a[5]=e=>v.roleId=e),clearable:"",placeholder:"请选择角色"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,d.SU)(h),(e=>((0,t.wg)(),(0,t.j4)(j,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(r,{"content-position":"left","border-style":"dashed"},{default:(0,t.w5)((()=>[p])),_:1}),(0,t.Wm)(W,{label:"登录密码",prop:"password"},{default:(0,t.w5)((()=>[(0,t.Wm)(u,{modelValue:v.password,"onUpdate:modelValue":a[6]||(a[6]=e=>v.password=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(W,{label:"用户状态",prop:"status"},{default:(0,t.w5)((()=>[(0,t.Wm)(y,{modelValue:v.status,"onUpdate:modelValue":a[7]||(a[7]=e=>v.status=e)},{default:(0,t.w5)((()=>[(0,t.Wm)(_,{label:1},{default:(0,t.w5)((()=>[c])),_:1}),(0,t.Wm)(_,{label:0},{default:(0,t.w5)((()=>[f])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules"])])])),_:1},8,["modelValue","title"])}}});const V=w;var h=V}}]);
//# sourceMappingURL=958.5fb176e7.js.map
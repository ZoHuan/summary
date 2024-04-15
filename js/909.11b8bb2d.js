"use strict";(self["webpackChunksummary"]=self["webpackChunksummary"]||[]).push([[909,958],{7094:function(e,l,a){a.d(l,{Z:function(){return u}});var t=a(4870),d=a(6900);function u(){const e={children:"children",label:"name",value:"id"},l={children:"children",label:e=>e.meta.title,value:"id"},a=(0,t.iH)(),u=(0,t.iH)(),o=(0,t.iH)(),r=()=>{(0,d.E$)().then((e=>{a.value=e.data.result}))},n=()=>{(0,d.JV)().then((e=>{u.value=e.data.result}))},m=()=>{(0,d.Af)().then((e=>{o.value=e.data.result}))};return{departmentProps:e,menuProps:l,departmentList:a,roleList:u,menuList:o,getDepartmentData:r,getRoleData:n,getMenuData:m}}},5909:function(e,l,a){a.r(l),a.d(l,{default:function(){return v}});var t=a(3396),d=a(4870),u=a(7139),o=a(2655),r=a(7178),n=a(6900),m=a(7094),s=a(4958);const p=(0,t.Uk)("查询"),i=(0,t.Uk)("重置"),c={class:"table-operator"},w=(0,t.Uk)(" 新建 "),f={class:"table-pagination"};var b=(0,t.aZ)({__name:"User",setup(e){(0,t.aZ)({name:"RoleView"});const{departmentProps:l,departmentList:a,roleList:b,getDepartmentData:g,getRoleData:v}=(0,m.Z)(),_=[{value:"1",label:"启用"},{value:"0",label:"禁用"}],h=(0,d.iH)(),W=(0,d.iH)(!1),V=(0,d.qj)({username:"",phone:"",departmentId:0,roleId:0,status:"",currentPage:1,pageSize:10}),k=(0,d.qj)([{label:"用户名",prop:"username",width:"180"},{label:"手机号",prop:"phone",width:"140"},{label:"邮箱",prop:"email",width:"240"},{label:"性别",prop:"gender",width:"90"},{label:"所属部门",prop:"departmentName",width:"120"},{label:"所属角色",prop:"roleName",width:"120"},{label:"状态",prop:"status",width:"90"},{label:"操作",prop:"actions",width:"140",fixed:"right"}]),U=(0,d.iH)({userList:[],total:0}),y=(0,d.iH)(!1),D=(0,d.iH)(""),C=(0,d.iH)();(0,t.bv)((()=>{g(),v(),H()}));const H=()=>{(0,n.lE)(V).then((e=>{U.value=e.data.result}))},I=()=>{H()},j=()=>{h.value&&h.value.resetFields()},x=()=>{W.value=!W.value},z=e=>{V.pageSize=e},S=e=>{V.currentPage=e},q=()=>{y.value=!0,D.value="添加用户"},L=e=>{y.value=e},P=e=>{y.value=!0,D.value="编辑用户",C.value=JSON.parse(JSON.stringify(e))},T=()=>{o.T.confirm("确定要删除此信息，删除后不可恢复？","提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then((()=>{r.z8.success("删除用户成功！")}))};return(e,o)=>{const r=(0,t.up)("el-input"),n=(0,t.up)("el-form-item"),m=(0,t.up)("el-col"),g=(0,t.up)("el-tree-select"),v=(0,t.up)("el-option"),X=(0,t.up)("el-select"),Y=(0,t.up)("el-button"),F=(0,t.up)("ArrowUp"),R=(0,t.up)("ArrowDown"),Z=(0,t.up)("el-icon"),N=(0,t.up)("el-row"),K=(0,t.up)("el-form"),A=(0,t.up)("Plus"),B=(0,t.up)("el-table-column"),J=(0,t.up)("el-tag"),O=(0,t.up)("el-table"),E=(0,t.up)("el-pagination"),M=(0,t.up)("el-card");return(0,t.wg)(),(0,t.j4)(M,null,{default:(0,t.w5)((()=>[(0,t.Wm)(K,{model:V,inline:!0,"label-width":"90px",ref_key:"queryForm",ref:h},{default:(0,t.w5)((()=>[(0,t.Wm)(N,{gutter:48},{default:(0,t.w5)((()=>[(0,t.Wm)(m,{md:8,sm:24},{default:(0,t.w5)((()=>[(0,t.Wm)(n,{label:"用户名称：",prop:"username"},{default:(0,t.w5)((()=>[(0,t.Wm)(r,{modelValue:V.username,"onUpdate:modelValue":o[0]||(o[0]=e=>V.username=e),"suffix-icon":"XXXX"},null,8,["modelValue"])])),_:1})])),_:1}),(0,t.Wm)(m,{md:8,sm:24},{default:(0,t.w5)((()=>[(0,t.Wm)(n,{label:"手机号：",prop:"phone"},{default:(0,t.w5)((()=>[(0,t.Wm)(r,{modelValue:V.phone,"onUpdate:modelValue":o[1]||(o[1]=e=>V.phone=e),"suffix-icon":"XXXX"},null,8,["modelValue"])])),_:1})])),_:1}),W.value?((0,t.wg)(),(0,t.iD)(t.HY,{key:0},[(0,t.Wm)(m,{md:8,sm:24},{default:(0,t.w5)((()=>[(0,t.Wm)(n,{label:"所属部门：",prop:"department"},{default:(0,t.w5)((()=>[(0,t.Wm)(g,{modelValue:V.departmentId,"onUpdate:modelValue":o[2]||(o[2]=e=>V.departmentId=e),data:(0,d.SU)(a),props:(0,d.SU)(l),"render-after-expand":!1,"check-strictly":"",placeholder:"请选择部门"},null,8,["modelValue","data","props"])])),_:1})])),_:1}),(0,t.Wm)(m,{md:8,sm:24},{default:(0,t.w5)((()=>[(0,t.Wm)(n,{label:"所属角色：",prop:"role"},{default:(0,t.w5)((()=>[(0,t.Wm)(X,{modelValue:V.roleId,"onUpdate:modelValue":o[3]||(o[3]=e=>V.roleId=e),placeholder:"请选择角色"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,d.SU)(b),(e=>((0,t.wg)(),(0,t.j4)(v,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),(0,t.Wm)(m,{md:8,sm:24},{default:(0,t.w5)((()=>[(0,t.Wm)(n,{label:"状态：",prop:"status"},{default:(0,t.w5)((()=>[(0,t.Wm)(X,{modelValue:V.status,"onUpdate:modelValue":o[4]||(o[4]=e=>V.status=e),placeholder:"请选择状态"},{default:(0,t.w5)((()=>[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(_,(e=>(0,t.Wm)(v,{key:e.value,label:e.label,value:e.value},null,8,["label","value"]))),64))])),_:1},8,["modelValue"])])),_:1})])),_:1})],64)):(0,t.kq)("",!0),(0,t.Wm)(m,{md:W.value?24:8,sm:24,class:(0,u.C_)(W.value&&"search-advanced")},{default:(0,t.w5)((()=>[(0,t._)("span",null,[(0,t.Wm)(Y,{type:"primary",onClick:I},{default:(0,t.w5)((()=>[p])),_:1}),(0,t.Wm)(Y,{onClick:j},{default:(0,t.w5)((()=>[i])),_:1}),(0,t._)("a",{onClick:x,class:"search-advanced-button"},[(0,t.Uk)((0,u.zw)(W.value?"收起":"展开")+" ",1),(0,t.Wm)(Z,null,{default:(0,t.w5)((()=>[W.value?((0,t.wg)(),(0,t.j4)(F,{key:0})):((0,t.wg)(),(0,t.j4)(R,{key:1}))])),_:1})])])])),_:1},8,["md","class"])])),_:1})])),_:1},8,["model"]),(0,t._)("div",c,[(0,t.Wm)(Y,{type:"primary",class:"operator-button",onClick:o[5]||(o[5]=e=>q())},{default:(0,t.w5)((()=>[(0,t.Wm)(Z,null,{default:(0,t.w5)((()=>[(0,t.Wm)(A)])),_:1}),w])),_:1})]),(0,t.Wm)(O,{data:U.value.userList,"row-key":"id",stripe:""},{default:(0,t.w5)((()=>[(0,t.Wm)(B,{label:"序号",type:"index",width:"100",align:"center"}),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(k,(e=>((0,t.wg)(),(0,t.j4)(B,{key:e.prop,label:e.label,prop:e.prop,fixed:e.fixed,width:e.width,align:"center"},(0,t.Nv)({_:2},["gender"===e.prop?{name:"default",fn:(0,t.w5)((e=>[(0,t.Uk)((0,u.zw)(e.row.gender?"男":"女"),1)]))}:"status"===e.prop?{name:"default",fn:(0,t.w5)((e=>[e.row.status?((0,t.wg)(),(0,t.j4)(J,{key:0,type:"success"},{default:(0,t.w5)((()=>[(0,t.Uk)("启用")])),_:1})):((0,t.wg)(),(0,t.j4)(J,{key:1,type:"danger"},{default:(0,t.w5)((()=>[(0,t.Uk)("禁用")])),_:1}))]))}:"actions"===e.prop?{name:"default",fn:(0,t.w5)((e=>[(0,t.Wm)(Y,{type:"primary",plain:"",size:"small",disabled:e.row.disabled,onClick:l=>e.row.disabled||P(e.row)},{default:(0,t.w5)((()=>[(0,t.Uk)("编辑")])),_:2},1032,["disabled","onClick"]),(0,t.Wm)(Y,{type:"danger",plain:"",size:"small",disabled:e.row.disabled,onClick:l=>e.row.disabled||T()},{default:(0,t.w5)((()=>[(0,t.Uk)("删除")])),_:2},1032,["disabled","onClick"])]))}:void 0]),1032,["label","prop","fixed","width"])))),128))])),_:1},8,["data"]),(0,t._)("div",f,[(0,t.Wm)(E,{"current-page":V.currentPage,"page-size":V.pageSize,total:U.value.total,layout:"total, sizes, prev, pager, next, jumper",onSizeChange:z,onCurrentChange:S},null,8,["current-page","page-size","total"])]),(0,t.Wm)(s["default"],{modalVisible:y.value,modalTitle:D.value,modalData:C.value,onToggleVisible:L,onRefresh:H},null,8,["modalVisible","modalTitle","modalData"])])),_:1})}}});const g=b;var v=g},4958:function(e,l,a){a.r(l),a.d(l,{default:function(){return _}});var t=a(3396),d=a(4870),u=a(7178),o=a(7094);const r={class:"custom-dialog-body scroll-bar-hidden"},n=(0,t.Uk)(" 基本信息 "),m=(0,t.Uk)("男"),s=(0,t.Uk)("女"),p=(0,t.Uk)(" 权限设置 "),i=(0,t.Uk)(" 其它信息 "),c=(0,t.Uk)("启用"),w=(0,t.Uk)("禁用"),f=(0,t.Uk)("取消"),b=(0,t.Uk)("确定");var g=(0,t.aZ)({__name:"UserModal",props:{modalVisible:{type:Boolean},modalTitle:null,modalData:null},emits:["toggleVisible","refresh"],setup(e,{emit:l}){const a=e,{departmentProps:g,departmentList:v,roleList:_,getDepartmentData:h,getRoleData:W}=(0,o.Z)(),V=(0,d.iH)(),k=(0,d.qj)({username:"",phone:"",email:"",gender:1,departmentId:"",roleId:"",password:"",status:1}),U=(0,d.qj)({username:[{required:!0,message:"请输入用户名称！",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码！",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址！",trigger:"blur"}],departmentId:[{required:!0,message:"请选择所属部门！",trigger:"blur"}],roleId:[{required:!0,message:"请选择所属角色！",trigger:"blur"}]}),y=(0,d.iH)(1),D=(0,t.Fl)({get(){return a.modalVisible},set(){C()}});(0,t.YP)((()=>a.modalData),(e=>{(0,t.Y3)((()=>{y.value=2,Object.assign(k,e)}))})),(0,t.bv)((()=>{h(),W()}));const C=()=>{V.value?.resetFields(),y.value=1,l("toggleVisible",!1)},H=e=>{e?.validate((a=>{a&&(1===y.value?(u.z8.success("添加用户成功！"),e.resetFields(),l("toggleVisible",!1),l("refresh")):(u.z8.success("编辑用户成功！"),e.resetFields(),l("toggleVisible",!1),l("refresh")))}))};return(l,a)=>{const u=(0,t.up)("el-divider"),o=(0,t.up)("el-input"),h=(0,t.up)("el-form-item"),W=(0,t.up)("el-radio"),y=(0,t.up)("el-radio-group"),I=(0,t.up)("el-tree-select"),j=(0,t.up)("el-option"),x=(0,t.up)("el-select"),z=(0,t.up)("el-form"),S=(0,t.up)("el-button"),q=(0,t.up)("el-dialog");return(0,t.wg)(),(0,t.j4)(q,{modelValue:(0,d.SU)(D),"onUpdate:modelValue":a[10]||(a[10]=e=>(0,d.dq)(D)?D.value=e:null),title:e.modalTitle,width:"38%",draggable:"","close-on-click-modal":!1,"close-on-press-escape":!1,class:"custom-dialog"},{footer:(0,t.w5)((()=>[(0,t.Wm)(S,{onClick:a[8]||(a[8]=e=>C())},{default:(0,t.w5)((()=>[f])),_:1}),(0,t.Wm)(S,{onClick:a[9]||(a[9]=e=>H(V.value)),type:"primary"},{default:(0,t.w5)((()=>[b])),_:1})])),default:(0,t.w5)((()=>[(0,t._)("div",r,[(0,t.Wm)(z,{ref_key:"formRef",ref:V,model:k,rules:U,"label-width":"90px"},{default:(0,t.w5)((()=>[(0,t.Wm)(u,{"content-position":"left","border-style":"dashed"},{default:(0,t.w5)((()=>[n])),_:1}),(0,t.Wm)(h,{label:"用户名称",prop:"username"},{default:(0,t.w5)((()=>[(0,t.Wm)(o,{modelValue:k.username,"onUpdate:modelValue":a[0]||(a[0]=e=>k.username=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(h,{label:"手机号码",prop:"phone"},{default:(0,t.w5)((()=>[(0,t.Wm)(o,{modelValue:k.phone,"onUpdate:modelValue":a[1]||(a[1]=e=>k.phone=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(h,{label:"邮箱地址",prop:"email"},{default:(0,t.w5)((()=>[(0,t.Wm)(o,{modelValue:k.email,"onUpdate:modelValue":a[2]||(a[2]=e=>k.email=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(h,{label:"性别",prop:"gender"},{default:(0,t.w5)((()=>[(0,t.Wm)(y,{modelValue:k.gender,"onUpdate:modelValue":a[3]||(a[3]=e=>k.gender=e)},{default:(0,t.w5)((()=>[(0,t.Wm)(W,{label:1},{default:(0,t.w5)((()=>[m])),_:1}),(0,t.Wm)(W,{label:0},{default:(0,t.w5)((()=>[s])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(u,{"content-position":"left","border-style":"dashed"},{default:(0,t.w5)((()=>[p])),_:1}),(0,t.Wm)(h,{label:"所属部门",prop:"departmentId"},{default:(0,t.w5)((()=>[(0,t.Wm)(I,{modelValue:k.departmentId,"onUpdate:modelValue":a[4]||(a[4]=e=>k.departmentId=e),data:(0,d.SU)(v),props:(0,d.SU)(g),"render-after-expand":!1,clearable:"","check-strictly":"",placeholder:"请选择部门"},null,8,["modelValue","data","props"])])),_:1}),(0,t.Wm)(h,{label:"所属角色",prop:"roleId"},{default:(0,t.w5)((()=>[(0,t.Wm)(x,{modelValue:k.roleId,"onUpdate:modelValue":a[5]||(a[5]=e=>k.roleId=e),clearable:"",placeholder:"请选择角色"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,d.SU)(_),(e=>((0,t.wg)(),(0,t.j4)(j,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(u,{"content-position":"left","border-style":"dashed"},{default:(0,t.w5)((()=>[i])),_:1}),(0,t.Wm)(h,{label:"登录密码",prop:"password"},{default:(0,t.w5)((()=>[(0,t.Wm)(o,{modelValue:k.password,"onUpdate:modelValue":a[6]||(a[6]=e=>k.password=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(h,{label:"用户状态",prop:"status"},{default:(0,t.w5)((()=>[(0,t.Wm)(y,{modelValue:k.status,"onUpdate:modelValue":a[7]||(a[7]=e=>k.status=e)},{default:(0,t.w5)((()=>[(0,t.Wm)(W,{label:1},{default:(0,t.w5)((()=>[c])),_:1}),(0,t.Wm)(W,{label:0},{default:(0,t.w5)((()=>[w])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules"])])])),_:1},8,["modelValue","title"])}}});const v=g;var _=v}}]);
//# sourceMappingURL=909.11b8bb2d.js.map
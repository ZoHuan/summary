"use strict";(self["webpackChunksummary"]=self["webpackChunksummary"]||[]).push([[83],{8083:function(e,r,a){a.r(r),a.d(r,{default:function(){return k}});a(1703);var l=a(3396),s=a(7139),t=a(4870),o=a(9242),n=a(678),d=a(7178),p=a(6666),u=a(2498);function m(e){let r=0;if(!e)return r;const a={};for(let t=0;t<e.length;t++)a[e[t]]=(a[e[t]]||0)+1,r+=5/a[e[t]];const l={digits:/\d/.test(e),lower:/[a-z]/.test(e),upper:/[A-Z]/.test(e),nonWords:/\W/.test(e)};let s=0;for(const t in l)s+=!0===l[t]?1:0;return r+=10*(s-1),r}const i=e=>((0,l.dD)("data-v-8c8e1dec"),e=e(),(0,l.Cn)(),e),c={class:"container"},g={class:"login-form"},w=i((()=>(0,l._)("h1",null,"用户注册",-1))),f=(0,l.Uk)(" 强度："),v=i((()=>(0,l._)("div",{style:{"margin-top":"10px"}},[(0,l._)("span",null,"请至少输入 8 个字符。请不要使用容易被猜到的密码。")],-1))),h=(0,l.Uk)("注册"),_={class:"register"},W=(0,l.Uk)("使用已有账户登录");var b=(0,l.aZ)({__name:"Register",setup(e){(0,l.aZ)({name:"RegisterView"});const r=(0,n.tv)(),a=(0,t.iH)(),i=["最低","低","中","强"],b=["error","error","warning","success"],y=["#ff0000","#ff0000","#ff7e05","#52c41a"],V=(0,t.qj)({username:"",password:"",password2:"",phone:"",captcha:""}),k=(0,t.qj)({passwordLevelChecked:!1,passwordLevel:0,percent:10,time:60,smsSendBtn:!1}),L=(0,t.iH)(!1),U=(0,l.Fl)((()=>b[k.passwordLevel])),x=(0,l.Fl)((()=>i[k.passwordLevel])),C=(0,l.Fl)((()=>y[k.passwordLevel])),S=(e,r,a)=>{if(""===r)return a();r.length>=6?(m(r)>=30&&(k.passwordLevel=1),m(r)>=60&&(k.passwordLevel=2),m(r)>=80&&(k.passwordLevel=3)):(k.passwordLevel=0,a(new Error("密码强度不够"))),k.percent=33*k.passwordLevel,a()},q=(e,r,a)=>{""===r?a(new Error("请确认登录密码")):r!==V.password?a(new Error("两次输入的密码不一致")):a()},B=(e,r,a)=>{a()},R=e=>{e&&e.validate((e=>{e&&(L.value=!0,r.push({name:"RegisterResult",params:{...V}}))}))},z=(0,t.qj)({username:[{required:!0,message:"用户名不能为空",trigger:"blur"},{min:3,max:16,message:"长度在 3 到 16 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入登录密码",trigger:"blur"},{min:6,max:16,message:"密码长度限制在6到16个字符",trigger:"blur"},{validator:S,trigger:"change"}],password2:[{required:!0,message:"请输入登录密码",trigger:"blur"},{min:6,max:16,message:"密码长度限制在6到16个字符",trigger:"blur"},{validator:q,trigger:"blur"}],phone:[{required:!0,pattern:/^1[3456789]\d{9}$/,message:"请输入正确的手机号",trigger:"blur"},{validator:B,trigger:"blur"}],captcha:[{required:!0,message:"请输入验证码",trigger:"blur"}]}),E=async(e,r)=>{e.preventDefault(),r&&r.validateField("phone",(e=>{if(e){k.smsSendBtn=!0;const e=window.setInterval((()=>{k.time--<=0&&(k.time=60,k.smsSendBtn=!1,window.clearInterval(e))}),1e3);(0,u.EK)({phone:V.phone}).then((e=>{(0,d.z8)({message:"验证码发送中..",type:"success"}),(0,p.bM)({title:"成功",message:"验证码获取成功，您的验证码为："+e.data.result.captcha,type:"success"})})).catch((r=>{clearInterval(e),k.time=60,k.smsSendBtn=!1,F(r)}))}}))},F=e=>{(0,p.bM)({title:"错误",message:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",type:"error"}),L.value=!1},I=()=>{r.push({name:"Login"})};return(e,r)=>{const n=(0,l.up)("el-input"),d=(0,l.up)("el-form-item"),p=(0,l.up)("el-progress"),u=(0,l.up)("el-popover"),m=(0,l.up)("el-col"),i=(0,l.up)("el-button"),b=(0,l.up)("el-row"),y=(0,l.up)("el-form"),S=(0,l.up)("el-link");return(0,l.wg)(),(0,l.iD)("div",c,[(0,l.Wm)(b,{class:"login"},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{xs:24,sm:10,md:10,lg:10,xl:10,class:"login-left"},{default:(0,l.w5)((()=>[(0,l._)("div",g,[w,(0,l.Wm)(y,{ref_key:"registerRef",ref:a,model:V,rules:z},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{prop:"username"},{default:(0,l.w5)((()=>[(0,l.Wm)(n,{modelValue:V.username,"onUpdate:modelValue":r[0]||(r[0]=e=>V.username=e),placeholder:"请输入用户名",autocomplete:"false"},null,8,["modelValue"])])),_:1}),(0,l.Wm)(u,{placement:"right-start",trigger:"click",width:240},{reference:(0,l.w5)((()=>[(0,l.Wm)(d,{prop:"password"},{default:(0,l.w5)((()=>[(0,l.Wm)(n,{modelValue:V.password,"onUpdate:modelValue":r[1]||(r[1]=e=>V.password=e),placeholder:"请输入密码",type:"password",autocomplete:"off","show-password":""},null,8,["modelValue"])])),_:1})])),default:(0,l.w5)((()=>[(0,l._)("div",null,[(0,l._)("div",{class:(0,s.C_)(["user-register",(0,t.SU)(U)])},[f,(0,l._)("span",null,(0,s.zw)((0,t.SU)(x)),1)],2),(0,l.Wm)(p,{percentage:k.percent,color:(0,t.SU)(C),"show-text":!1,"stroke-width":8},null,8,["percentage","color"]),v])])),_:1}),(0,l.Wm)(d,{prop:"password2"},{default:(0,l.w5)((()=>[(0,l.Wm)(n,{modelValue:V.password2,"onUpdate:modelValue":r[2]||(r[2]=e=>V.password2=e),placeholder:"请确认密码",type:"password",autocomplete:"off","show-password":""},null,8,["modelValue"])])),_:1}),(0,l.Wm)(d,{prop:"phone"},{default:(0,l.w5)((()=>[(0,l.Wm)(n,{modelValue:V.phone,"onUpdate:modelValue":r[3]||(r[3]=e=>V.phone=e),placeholder:"请输入手机号",autocomplete:"false"},null,8,["modelValue"])])),_:1}),(0,l.Wm)(b,{gutter:16},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{span:16},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{prop:"captcha"},{default:(0,l.w5)((()=>[(0,l.Wm)(n,{modelValue:V.captcha,"onUpdate:modelValue":r[4]||(r[4]=e=>V.captcha=e),placeholder:"请输入验证码",autocomplete:"false"},null,8,["modelValue"])])),_:1})])),_:1}),(0,l.Wm)(m,{span:8},{default:(0,l.w5)((()=>[(0,l.Wm)(i,{type:"primary",disabled:k.smsSendBtn,onClick:r[5]||(r[5]=(0,o.iM)((e=>E(e,a.value)),["stop","prevent"])),textContent:(0,s.zw)(k.smsSendBtn?k.time+" s":"获取验证码")},null,8,["disabled","textContent"])])),_:1})])),_:1}),(0,l.Wm)(i,{type:"primary",class:"register-button",loading:L.value,disabled:L.value,onClick:r[6]||(r[6]=(0,o.iM)((e=>R(a.value)),["stop","prevent"]))},{default:(0,l.w5)((()=>[h])),_:1},8,["loading","disabled"])])),_:1},8,["model","rules"]),(0,l._)("div",_,[(0,l.Wm)(S,{type:"primary",underline:!1,onClick:I},{default:(0,l.w5)((()=>[W])),_:1})])])])),_:1}),(0,l.Wm)(m,{span:14,class:"login-right hidden-xs-only"})])),_:1})])}}}),y=a(89);const V=(0,y.Z)(b,[["__scopeId","data-v-8c8e1dec"]]);var k=V}}]);
//# sourceMappingURL=83.8cb55f1f.js.map
"use strict";(self["webpackChunksummary"]=self["webpackChunksummary"]||[]).push([[759],{8759:function(e,a,r){r.r(a),r.d(a,{default:function(){return n}});var t=r(3396),l=r(3022),i=(0,t.aZ)({__name:"AgePieChart",setup(e){let a=[{name:"18岁以下",value:"19"},{name:"18岁~25岁",value:"67"},{name:"25岁~35岁",value:"100"},{name:"35岁~45岁",value:"73"},{name:"45岁~55岁",value:"43"},{name:"55岁以上",value:"21"}];const r=["#00ffff","#00cfff","#006ced","#ffe000","#ffa800","#ff5b00"],i=["rgba(0, 255, 255, 0.05)","rgba(0, 207, 255, 0.05)","rgba(0, 108, 237, 0.05)","rgba(255, 224, 0, 0.05)","rgba(255, 168, 0, 0.05)","rgba(255, 91, 0, 0.05)"];let o=[];a.forEach(((e,a)=>{o.push({name:e.name,value:e.value,itemStyle:{color:i[a],borderColor:r[a],borderWidth:2,shadowBlur:20,shadowColor:r[a]}})}));const n={tooltip:{trigger:"item",formatter:"{b} : {d}%"},polar:{},angleAxis:{type:"category",interval:1,z:10,axisLine:{show:!1}},radiusAxis:{min:0,max:100,interval:20,axisLine:{show:!1},axisLabel:{show:!1},splitLine:{lineStyle:{color:"#07385e",width:2,type:"dashed"}}},series:[{type:"pie",radius:"80%",roseType:"radius",startAngle:90,label:{formatter:["{b|{b}}","{d|{d}%}"].join("\n"),rich:{b:{color:"#3bd2fe",fontSize:"0.7rem",lineHeight:20},d:{color:"#d0fffc",fontSize:"0.7rem",height:20}}},labelLine:{show:!0,length2:10,lineStyle:{color:"#0096b1"}},data:o}]};return(e,a)=>((0,t.wg)(),(0,t.j4)(l["default"],{width:"100%",height:"100%",option:n}))}});const o=i;var n=o}}]);
//# sourceMappingURL=759.b2fdf1b8.js.map
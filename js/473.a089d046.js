"use strict";(self["webpackChunkproject_macaron"]=self["webpackChunkproject_macaron"]||[]).push([[473],{6687:function(e,t,s){s.d(t,{Z:function(){return x}});var l=s(3396),a=s(7139),i=s(9242);const r={class:"py-1 border-top mb-0"},o={class:"d-flex justify-content-between"},n=(0,l._)("p",{class:"mb-1"},"小計",-1),c={class:"mb-1"},d=(0,l._)("div",{class:"d-flex justify-content-between"},[(0,l._)("p",{class:"mb-1"},"運費"),(0,l._)("p",{class:"mb-1"},"活動免運")],-1),u={key:0,class:"input-group mb-2 pt-1"},m={key:1,class:"d-flex justify-content-between flex-wrap"},p={class:"w-100 mb-1"},b={class:"mb-1"},f={class:"mb-1 flex-fill text-end"},y={class:"d-flex justify-content-between border-top pt-1"},g=(0,l._)("p",{class:"mb-1"},"總金額",-1),h={class:"mb-1 fw-bolder"};function _(e,t,s,_,v,w){const k=(0,l.up)("WebLoading");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(k,{"is-loading":v.isLoading},null,8,["is-loading"]),(0,l._)("div",{class:(0,a.C_)(["card mb-5 border-secondary",{"border-0":!s.isEdit}])},[(0,l._)("div",{class:(0,a.C_)(["card-body",{"p-0":!s.isEdit}])},[(0,l._)("h5",{class:(0,a.C_)(["fw-normal",{"fw-bolder ms-2":s.isEdit}])},[(0,l.WI)(e.$slots,"title",{},(()=>[(0,l.Uk)("訂單確認")]))],2),(0,l._)("div",{class:(0,a.C_)(s.isEdit?"px-2":"text-gray")},[(0,l._)("p",r,(0,a.zw)(`商品共 ${s.cartInfo.carts.reduce(((e,t)=>e+t.qty),0)} 件`),1),(0,l._)("div",o,[n,(0,l._)("p",c,(0,a.zw)(e.$filters.currency(s.cartInfo.total)),1)]),d,s.isEdit?((0,l.wg)(),(0,l.iD)("div",u,[(0,l.wy)((0,l._)("input",{type:"text",class:"form-control border-gray border-end-0",placeholder:"輸入優惠碼","onUpdate:modelValue":t[0]||(t[0]=e=>v.couponCode=e)},null,512),[[i.nr,v.couponCode]]),(0,l._)("button",{type:"button",class:"btn btn-outline-gray",onClick:t[1]||(t[1]=(...e)=>w.useCoupon&&w.useCoupon(...e))}," 套用 ")])):(0,l.kq)("",!0),s.cartInfo.carts[0].coupon?((0,l.wg)(),(0,l.iD)("div",m,[(0,l._)("p",p,[(0,l.WI)(e.$slots,"coupon",{},(()=>[(0,l.Uk)("已套用的優惠券：")]))]),(0,l._)("p",b,(0,a.zw)(`${s.cartInfo.carts[0].coupon.code} ${s.cartInfo.carts[0].coupon.title}`),1),(0,l._)("p",f,(0,a.zw)(`-${e.$filters.currency(s.cartInfo.total-s.cartInfo.final_total)}`),1)])):(0,l.kq)("",!0),(0,l._)("div",y,[g,(0,l._)("p",h,(0,a.zw)(`NT$ ${e.$filters.currency(s.cartInfo.final_total)}`),1)])],2),(0,l.WI)(e.$slots,"button")],2)],2)],64)}var v={data(){return{couponCode:"",isLoading:!1}},props:["cartInfo","isEdit"],inject:["emitter"],methods:{useCoupon(){const e="https://vue3-course-api.hexschool.io/api/nn_macaron/coupon";this.isLoading=!0,this.axios.post(e,{data:{code:this.couponCode}}).then((e=>{e.data.success?(this.emitter.emit("sendMsg",{message:"已套用優惠",status:"success"}),this.emitter.emit("updateCart")):this.couponError(e.data.message),this.isLoading=!1})).catch((e=>{this.isLoading=!1,this.couponError(e)}))},couponError(e){this.emitter.emit("sendMsg",{message:e,status:"error"})}}},w=s(89);const k=(0,w.Z)(v,[["render",_]]);var x=k},7061:function(e,t,s){s.d(t,{Z:function(){return A}});var l=s(3396),a=s(7139),i=s(9242);const r={class:"py-2 d-flex align-items-baseline justify-content-between"},o={class:"mb-0 fw-normal"},n={class:"ms-1"},c={class:"list-group rounded-0"},d={class:"d-flex flex-column flex-sm-row"},u={style:{"max-width":"100px"},class:"d-flex align-items-center mb-2 mb-sm-0 me-sm-4"},m=["src","alt"],p={class:"px-0 px-sm-3 w-auto align-self-sm-center"},b={key:0,class:"mt-2 mb-0"},f={key:1,class:"mt-2 mb-0"},y={class:"text-danger"},g={class:"badge rounded-pill bg-graySlight text-dark ms-2",style:{"vertical-align":"baseline"}},h={class:"my-2"},_={key:2,class:"input-group input-group-sm w-auto mb-2"},v=["onClick"],w=(0,l._)("i",{class:"bi bi-dash-lg"},null,-1),k=[w],x={class:"input-group-text bg-white border-start-0 border-end-0 border-gray text-center d-inline-block",style:{"min-width":"50px"}},C=["onClick"],$=(0,l._)("i",{class:"bi bi-plus-lg"},null,-1),I=[$],D={key:3,class:"mb-2"},W={class:"mb-0"},V=["onClick"],E={key:0,class:"position-fixed",style:{"z-index":"1058","backdrop-filter":"blur(5px)",top:"-100vh",height:"300vh",left:"-100vw",width:"300vw"}},q={class:"d-flex flex-column justify-content-center align-items-center h-100"},z={class:"card border px-3 py-1 bg-light shadow-lg",style:{"max-width":"90vw"}},j={class:"card-body text-center p-4"},U=(0,l._)("i",{class:"bi bi-exclamation-triangle-fill opacity-50",style:{"font-size":"4rem",color:"var(--bs-warning)"}},null,-1),L={class:"text-center"};function M(e,t,s,w,$,M){const N=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",r,[(0,l._)("h5",o,[(0,l.WI)(e.$slots,"title",{},(()=>[(0,l.Uk)("購物清單")])),(0,l._)("span",n,(0,a.zw)(`(${s.cartInfo.carts.reduce(((e,t)=>e+t.qty),0)})`),1)]),s.isEdit?((0,l.wg)(),(0,l.iD)("a",{key:0,href:"#",class:"link-gray link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",onClick:t[0]||(t[0]=(0,i.iM)(((...e)=>M.checkDeleteItem&&M.checkDeleteItem(...e)),["prevent"]))},"清空購物車")):(0,l.kq)("",!0)]),(0,l._)("ul",c,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(s.cartInfo.carts,(t=>((0,l.wg)(),(0,l.iD)("li",{class:(0,a.C_)(["list-group-item d-flex flex-column-reverse flex-sm-row border-gray-subtle border-start-0 border-end-0 px-0",{"text-gray":!s.isEdit}]),key:t.id},[(0,l._)("div",d,[(0,l._)("div",u,[(0,l._)("img",{src:t.product.imageUrl,alt:t.product.title,class:"img-fluid"},null,8,m)]),(0,l._)("div",p,[(0,l.Wm)(N,{to:`/product/${t.product.id}`,class:(0,a.C_)(["link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",{"fw-bolder":s.isEdit}]),target:"_blank"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(t.product.title),1)])),_:2},1032,["to","class"]),t.product.origin_price===t.product.price?((0,l.wg)(),(0,l.iD)("p",b,(0,a.zw)(`單價 NT$ ${e.$filters.currency(t.product.origin_price)}`),1)):((0,l.wg)(),(0,l.iD)("p",f,[(0,l.Uk)(" 單件優惠價 "),(0,l._)("span",y,(0,a.zw)(`NT$ ${e.$filters.currency(t.product.price)}`),1),(0,l._)("span",g,(0,a.zw)(`${Math.floor(t.product.price/t.product.origin_price*10)}折`),1)])),(0,l._)("p",h,(0,a.zw)(`規格：${t.product.unit}`),1),s.isEdit?((0,l.wg)(),(0,l.iD)("div",_,[(0,l._)("button",{type:"button",class:(0,a.C_)(["btn btn-outline-gray",{disabled:1===t.qty}]),onClick:e=>M.cartAdjustNum({product_id:t.product.id,qty:t.qty-1},t.id)},k,10,v),(0,l._)("span",x,(0,a.zw)(t.qty),1),(0,l._)("button",{type:"button",class:(0,a.C_)(["btn btn-outline-gray",{disabled:10===t.qty}]),onClick:e=>M.cartAdjustNum({product_id:t.product.id,qty:t.qty+1},t.id)},I,10,C)])):((0,l.wg)(),(0,l.iD)("p",D,(0,a.zw)(`數量：${t.qty}`),1)),(0,l._)("p",W,(0,a.zw)(`小計：${t.total} 元`),1)])]),s.isEdit?((0,l.wg)(),(0,l.iD)("button",{key:0,type:"button",class:"btn-close ms-auto",onClick:e=>M.checkDeleteItem(t),title:"移除品項"},null,8,V)):(0,l.kq)("",!0)],2)))),128))]),$.showDeleteConfirm?((0,l.wg)(),(0,l.iD)("div",E,[(0,l._)("div",q,[(0,l._)("div",z,[(0,l._)("div",j,[U,(0,l._)("p",null,(0,a.zw)(`確定要${""===$.deleteMsg?"清空購物車":`將"${$.deleteMsg}"從購物車移除`}嗎？`),1),(0,l._)("div",L,[(0,l._)("button",{type:"button",class:"btn btn-outline-danger me-2",onClick:t[1]||(t[1]=(...e)=>M.deleteItem&&M.deleteItem(...e))},(0,a.zw)(""===$.deleteMsg?"清空":"移除"),1),(0,l._)("button",{type:"button",class:"btn btn-gray ms-2",onClick:t[2]||(t[2]=e=>$.showDeleteConfirm=!1)}," 取消 ")])])])])])):(0,l.kq)("",!0)],64)}var N={data(){return{showDeleteConfirm:!1,deleteMsg:"",temp:{}}},props:["cartInfo","isEdit"],inject:["emitter"],methods:{cartAdjustNum(e,t){this.emitter.emit("cartAdjustNum",{data:e,cartId:t})},checkDeleteItem(e={}){this.temp=e,e.product?this.deleteMsg=this.temp.product.title:this.deleteMsg="",this.showDeleteConfirm=!0},deleteItem(){this.temp.id?this.emitter.emit("cartDeleteItem",this.temp.id):this.emitter.emit("cartReset"),this.showDeleteConfirm=!1}}},Z=s(89);const S=(0,Z.Z)(N,[["render",M]]);var A=S},4473:function(e,t,s){s.r(t),s.d(t,{default:function(){return N}});var l=s(3396),a=s(7139);const i={class:"container py-5"},r={key:0,class:"row flex-column-reverse flex-lg-row justify-content-lg-between"},o={class:"col-lg-4"},n={class:"col-lg-6"},c={class:"card border-secondary mb-5"},d={class:"card-body p-3 rounded"},u=(0,l._)("h5",{class:"fw-bolder mb-3"},"填寫訂購人資料",-1),m={class:"mb-3"},p=(0,l._)("label",{for:"purchaser",class:"form-label"},"訂購人姓名*",-1),b={class:"mb-3"},f=(0,l._)("label",{for:"email",class:"form-label"},"Email*",-1),y={class:"mb-3"},g=(0,l._)("label",{for:"tel",class:"form-label"},"手機*",-1),h={class:"mb-3"},_=(0,l._)("label",{for:"delivery",class:"form-label"},"運送方式*",-1),v=(0,l._)("option",{value:"",disabled:""},"請選擇運送方式",-1),w=(0,l._)("option",{value:"門市取貨"},"門市取貨",-1),k=(0,l._)("option",{value:"貨運低溫宅配"},"貨運低溫宅配",-1),x=(0,l._)("option",{value:"超商冷藏運送"},"超商冷藏運送",-1),C={key:0,class:"mb-3"},$=(0,l._)("label",{for:"contact",class:"form-label"},"配送門市*",-1),I={key:1,class:"mb-3"},D=(0,l._)("label",{for:"contact",class:"form-label"},"地址*",-1),W={class:"mb-3"},V=(0,l._)("label",{for:"message",class:"form-label"},"備註 (字數限制100字)",-1),E=(0,l._)("button",{type:"submit",class:"btn btn-secondary w-100"}," 下一步 ",-1);function q(e,t,s,q,z,j){const U=(0,l.up)("WebLoading"),L=(0,l.up)("OrderCard"),M=(0,l.up)("Orderlist"),N=(0,l.up)("VField"),Z=(0,l.up)("ErrorMessage"),S=(0,l.up)("VForm");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(U,{"is-loading":z.isLoading},null,8,["is-loading"]),(0,l._)("div",i,[s.cartInfo.carts[0]?.product?((0,l.wg)(),(0,l.iD)("div",r,[(0,l._)("div",o,[(0,l.Wm)(L,{"cart-info":s.cartInfo,isEdit:!1},{title:(0,l.w5)((()=>[(0,l.Uk)("訂單資料")])),coupon:(0,l.w5)((()=>[(0,l.Uk)("優惠券折扣：")])),_:1},8,["cart-info"]),(0,l.Wm)(M,{"cart-info":s.cartInfo,isEdit:!1},null,8,["cart-info"])]),(0,l._)("div",n,[(0,l._)("div",c,[(0,l._)("div",d,[u,(0,l.Wm)(S,{onSubmit:j.onSubmit},{default:(0,l.w5)((({errors:e})=>[(0,l._)("div",m,[p,(0,l.Wm)(N,{id:"purchaser",name:"訂購人姓名",type:"text",class:(0,a.C_)(["form-control",{"is-invalid":e["訂購人姓名"]}]),placeholder:"請輸入訂購人姓名",rules:"required",modelValue:z.purchaser.name,"onUpdate:modelValue":t[0]||(t[0]=e=>z.purchaser.name=e)},null,8,["class","modelValue"]),(0,l.Wm)(Z,{name:"訂購人姓名",class:"invalid-feedback"})]),(0,l._)("div",b,[f,(0,l.Wm)(N,{id:"email",name:"email",type:"email",class:(0,a.C_)(["form-control",{"is-invalid":e["email"]}]),placeholder:"請輸入 E-mail",rules:"email|required",modelValue:z.purchaser.email,"onUpdate:modelValue":t[1]||(t[1]=e=>z.purchaser.email=e)},null,8,["class","modelValue"]),(0,l.Wm)(Z,{name:"email",class:"invalid-feedback"})]),(0,l._)("div",y,[g,(0,l.Wm)(N,{id:"tel",name:"手機",type:"text",class:(0,a.C_)(["form-control",{"is-invalid":e["手機"]}]),placeholder:"請輸入手機號碼",rules:j.isPhone,modelValue:z.purchaser.tel,"onUpdate:modelValue":t[2]||(t[2]=e=>z.purchaser.tel=e)},null,8,["class","rules","modelValue"]),(0,l.Wm)(Z,{name:"手機",class:"invalid-feedback"})]),(0,l._)("div",h,[_,(0,l.Wm)(N,{id:"delivery",name:"運送方式",class:(0,a.C_)(["form-select",{"is-invalid":e["運送方式"]}]),rules:"required",modelValue:z.delivery.way,"onUpdate:modelValue":t[3]||(t[3]=e=>z.delivery.way=e),as:"select"},{default:(0,l.w5)((()=>[v,w,k,x])),_:2},1032,["class","modelValue"]),(0,l.Wm)(Z,{name:"運送方式",class:"invalid-feedback"})]),"超商冷藏運送"===z.delivery.way?((0,l.wg)(),(0,l.iD)("div",C,[$,(0,l.Wm)(N,{id:"contact",name:"地址",type:"text",class:(0,a.C_)(["form-control",{"is-invalid":e["地址"]}]),placeholder:"請填寫配送超商門市",rules:"required",modelValue:z.delivery.address,"onUpdate:modelValue":t[4]||(t[4]=e=>z.delivery.address=e)},null,8,["class","modelValue"]),(0,l.Wm)(Z,{name:"地址",class:"invalid-feedback"})])):"貨運低溫宅配"===z.delivery.way?((0,l.wg)(),(0,l.iD)("div",I,[D,(0,l.Wm)(N,{id:"contact",name:"地址",type:"text",class:(0,a.C_)(["form-control",{"is-invalid":e["地址"]}]),placeholder:"請輸入收貨地址",rules:"required",modelValue:z.delivery.address,"onUpdate:modelValue":t[5]||(t[5]=e=>z.delivery.address=e)},null,8,["class","modelValue"]),(0,l.Wm)(Z,{name:"地址",class:"invalid-feedback"})])):(0,l.kq)("",!0),(0,l._)("div",W,[V,(0,l.Wm)(N,{id:"message",name:"備註",type:"text",class:(0,a.C_)(["form-control",{"is-invalid":e["備註"]}]),placeholder:"如欲指定禮盒包裝、緞帶顏色等特殊需求，請留言給我們，會有專人與您電話聯繫！",rules:"max:100",modelValue:z.message,"onUpdate:modelValue":t[6]||(t[6]=e=>z.message=e),rows:"3",as:"textarea"},null,8,["class","modelValue"]),(0,l.Wm)(Z,{name:"備註",class:"invalid-feedback"})]),E])),_:1},8,["onSubmit"])])])])])):(0,l.kq)("",!0)])],64)}s(560);var z=s(7061),j=s(6687),U={data(){return{purchaser:{email:"",name:"",tel:"",address:""},message:"",delivery:{way:"",address:""},isLoading:!1}},inject:["emitter"],props:["cartInfo"],components:{Orderlist:z.Z,OrderCard:j.Z},methods:{isPhone(e){const t=/^(09)[0-9]{8}$/;return!!t.test(e)||"請填寫正確的電話號碼"},onSubmit(){this.purchaser.address=`${this.delivery.way}：${this.delivery.address||"到店"}`;const e="https://vue3-course-api.hexschool.io/api/nn_macaron/order";this.isLoading=!0,this.axios.post(e,{data:{user:this.purchaser,message:this.message}}).then((e=>{e.data.success?this.$router.push(`/order/payment/${e.data.orderId}`):(this.isLoading=!1,this.submitError(e.data.message))})).catch((e=>{this.isLoading=!1,this.submitError(e)}))},submitError(e){this.emitter.emit("sendMsg",{message:e,status:"error"})}}},L=s(89);const M=(0,L.Z)(U,[["render",q]]);var N=M}}]);
//# sourceMappingURL=473.a089d046.js.map
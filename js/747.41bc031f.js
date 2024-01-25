"use strict";(self["webpackChunkproject_macaron"]=self["webpackChunkproject_macaron"]||[]).push([[747],{6687:function(t,e,s){s.d(e,{Z:function(){return x}});var r=s(3396),i=s(7139),o=s(9242);const a={class:"py-1 border-top mb-0"},c={class:"d-flex justify-content-between"},l=(0,r._)("p",{class:"mb-1"},"小計",-1),n={class:"mb-1"},d=(0,r._)("div",{class:"d-flex justify-content-between"},[(0,r._)("p",{class:"mb-1"},"運費"),(0,r._)("p",{class:"mb-1"},"活動免運")],-1),u={key:0,class:"input-group mb-2 pt-1"},p={key:1,class:"d-flex justify-content-between flex-wrap"},m={class:"w-100 mb-1"},g={class:"mb-1"},h={class:"mb-1 flex-fill text-end"},b={class:"d-flex justify-content-between border-top pt-1"},w=(0,r._)("p",{class:"mb-1"},"總金額",-1),f={class:"mb-1 fw-bolder"};function _(t,e,s,_,y,k){const v=(0,r.up)("WebLoading");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(v,{"is-loading":y.isLoading},null,8,["is-loading"]),(0,r._)("div",{class:(0,i.C_)(["card mb-5 border-secondary",{"border-0":!s.isEdit}])},[(0,r._)("div",{class:(0,i.C_)(["card-body",{"p-0":!s.isEdit}])},[(0,r._)("h5",{class:(0,i.C_)(["fw-normal",{"fw-bolder ms-2":s.isEdit}])},[(0,r.WI)(t.$slots,"title",{},(()=>[(0,r.Uk)("訂單確認")]))],2),(0,r._)("div",{class:(0,i.C_)(s.isEdit?"px-2":"text-gray")},[(0,r._)("p",a,(0,i.zw)(`商品共 ${s.cartInfo.carts.reduce(((t,e)=>t+e.qty),0)} 件`),1),(0,r._)("div",c,[l,(0,r._)("p",n,(0,i.zw)(t.$filters.currency(s.cartInfo.total)),1)]),d,s.isEdit?((0,r.wg)(),(0,r.iD)("div",u,[(0,r.wy)((0,r._)("input",{type:"text",class:"form-control border-gray border-end-0",placeholder:"輸入優惠碼","onUpdate:modelValue":e[0]||(e[0]=t=>y.couponCode=t)},null,512),[[o.nr,y.couponCode]]),(0,r._)("button",{type:"button",class:"btn btn-outline-gray",onClick:e[1]||(e[1]=(...t)=>k.useCoupon&&k.useCoupon(...t))}," 套用 ")])):(0,r.kq)("",!0),s.cartInfo.carts[0].coupon?((0,r.wg)(),(0,r.iD)("div",p,[(0,r._)("p",m,[(0,r.WI)(t.$slots,"coupon",{},(()=>[(0,r.Uk)("已套用的優惠券：")]))]),(0,r._)("p",g,(0,i.zw)(`${s.cartInfo.carts[0].coupon.code} ${s.cartInfo.carts[0].coupon.title}`),1),(0,r._)("p",h,(0,i.zw)(`-${t.$filters.currency(s.cartInfo.total-s.cartInfo.final_total)}`),1)])):(0,r.kq)("",!0),(0,r._)("div",b,[w,(0,r._)("p",f,(0,i.zw)(`NT$ ${t.$filters.currency(s.cartInfo.final_total)}`),1)])],2),(0,r.WI)(t.$slots,"button")],2)],2)],64)}var y={data(){return{couponCode:"",isLoading:!1}},props:["cartInfo","isEdit"],inject:["emitter"],methods:{useCoupon(){const t="https://vue3-course-api.hexschool.io/api/nn_macaron/coupon";this.isLoading=!0,this.axios.post(t,{data:{code:this.couponCode}}).then((t=>{t.data.success?(this.emitter.emit("sendMsg",{message:"已套用優惠",status:"success"}),this.emitter.emit("updateCart")):this.couponError(t.data.message),this.isLoading=!1})).catch((t=>{this.isLoading=!1,this.couponError(t)}))},couponError(t){this.emitter.emit("sendMsg",{message:t,status:"error"})}}},k=s(89);const v=(0,k.Z)(y,[["render",_]]);var x=v},5486:function(t,e,s){s.d(e,{Z:function(){return M}});var r=s(3396),i=s(7139);const o={class:"row g-2 g-sm-3"},a={key:0,class:"col-12 border-bottom pb-3"},c=(0,r._)("h5",{class:"fw-bolder mb-3"},"選擇付款方式",-1),l={key:0,class:"d-flex mb-3 text-warning-emphasis"},n=(0,r._)("i",{class:"bi bi-exclamation-triangle-fill me-2"},null,-1),d=(0,r._)("p",{class:"mb-0",style:{"background-image":"linear-gradient(\r\n                  transparent 60%,\r\n                  var(--bs-warning-bg-subtle) 40%\r\n                )"}}," 訂單尚未完成，請完成付款手續 ",-1),u=[n,d],p={class:"input-group"},m={class:"form-select"},g=(0,r._)("option",{value:"線上刷卡"},"線上刷卡",-1),h=(0,r._)("option",{value:"ATM轉帳"},"ATM轉帳",-1),b={value:"門市付款"},w={key:1,class:"col-12"},f={class:"mb-0 d-none d-sm-inline-block",style:{"background-image":"linear-gradient(\r\n                transparent 60%,\r\n                var(--bs-success-bg-subtle) 40%\r\n              )"}},_={class:"mb-2 d-sm-none bg-success-subtle p-3 rounded lh-lg"},y=(0,r._)("div",{class:"col-sm-4"},[(0,r._)("h5",{class:"fs-6 mb-0 mt-2 mt-sm-0 fw-semibold"},"訂單狀態")],-1),k={class:"col-sm-8 text-gray"},v={class:"mb-0"},x=(0,r._)("div",{class:"col-sm-4"},[(0,r._)("h5",{class:"fs-6 mt-2 mt-sm-0 mb-0 fw-semibold"},"訂購人資料")],-1),C={class:"col-sm-8 text-gray"},D={class:"mb-1"},$={class:"mb-1"},z={class:"mb-1"},I={key:0,class:"mb-0",style:{"text-align":"justify"}};function j(t,e,s,n,d,j){const q=(0,r.up)("WebLoading");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(q,{"is-loading":d.isLoading},null,8,["is-loading"]),d.order.user?((0,r.wg)(),(0,r.iD)("div",{key:0,class:(0,i.C_)(d.order.is_paid?"mb-3":"mb-5")},[(0,r._)("div",{class:(0,i.C_)(["container p-0",{"mb-3 border-secondary p-4 border rounded":!d.order.is_paid}])},[(0,r._)("div",o,[d.order.is_paid?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",a,[c,d.order.is_paid?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",l,u)),(0,r._)("div",p,[(0,r._)("select",m,[g,h,(0,r._)("option",b,(0,i.zw)(d.order.user.address.indexOf("門市取貨")>-1?"門市取貨付款":"門市付款"),1)]),(0,r._)("button",{type:"button",class:"btn btn-secondary",onClick:e[0]||(e[0]=(...t)=>j.payment&&j.payment(...t))}," 付款 ")])])),d.order.is_paid?((0,r.wg)(),(0,r.iD)("div",w,[(0,r._)("p",f,(0,i.zw)(""+(d.order.user.address.indexOf("門市取貨")>-1?"商品將於七個工作天內完成，我們將與您聯繫確認取貨日期。":"商品將於七個工作天內送達。")),1),(0,r._)("p",_,(0,i.zw)(""+(d.order.user.address.indexOf("門市取貨")>-1?"商品將於七個工作天內完成，我們將與您聯繫確認取貨日期。":"商品將於七個工作天內送達。")),1)])):(0,r.kq)("",!0),y,(0,r._)("div",k,[(0,r._)("p",v,(0,i.zw)(d.order.is_paid?"訂單已成立":"尚未付款"),1)]),x,(0,r._)("div",C,[(0,r._)("p",D,(0,i.zw)(d.order.user.name),1),(0,r._)("p",$,(0,i.zw)(d.order.user.tel),1),(0,r._)("p",z,(0,i.zw)(d.order.user.email),1),(0,r._)("p",{class:(0,i.C_)(["mb-0",{"mb-1":d.order.message}])},(0,i.zw)(d.order.user.address),3),d.order.message?((0,r.wg)(),(0,r.iD)("p",I,(0,i.zw)(`訂單備註："${d.order.message}"`),1)):(0,r.kq)("",!0)])])],2)],2)):(0,r.kq)("",!0)],64)}s(560);var q={data(){return{order:{},orderProducts:{},orderId:"",isLoading:!1}},inject:["emitter"],emits:["orderData","getError"],props:["isSearch"],methods:{getOrder(t){const e=`https://vue3-course-api.hexschool.io/api/nn_macaron/order/${t}`;this.isLoading=!0,this.axios.get(e).then((e=>{e.data.success?(e.data.order.is_paid&&"complete"!==this.$route.name?this.$router.push(`/order/complete/${t}`):e.data.order.is_paid||"payment"===this.$route.name||this.$router.push(`/order/payment/${t}`),this.order=e.data.order,this.orderProducts.carts=Object.values(e.data.order.products),this.orderProducts.final_total=e.data.order.total,this.orderProducts.total=this.orderProducts.carts.reduce(((t,e)=>(t+=e.total,t)),0),this.$emit("orderData",this.orderProducts)):this.getOrderFail(),this.isLoading=!1})).catch((()=>{this.isLoading=!1,this.getOrderFail()}))},getOrderFail(){this.isSearch?this.$emit("getError"):(this.emitter.emit("sendMsg",{message:"無此訂單",status:"error"}),this.$router.replace("/cart"))},payment(){const t=`https://vue3-course-api.hexschool.io/api/nn_macaron/pay/${this.$route.params.id}`;this.isLoading=!0,this.axios.post(t).then((t=>{t.data.success?this.$router.push(`/order/complete/${this.$route.params.id}`):this.emitter.emit("sendMsg",{message:"付款失敗，請聯繫店家",status:"error"}),this.isLoading=!1})).catch((t=>{this.isLoading=!1,alert(t)}))}},created(){this.isSearch||this.getOrder(this.$route.params.id)}},O=s(89);const E=(0,O.Z)(q,[["render",j]]);var M=E},7061:function(t,e,s){s.d(e,{Z:function(){return N}});var r=s(3396),i=s(7139),o=s(9242);const a={class:"py-2 d-flex align-items-baseline justify-content-between"},c={class:"mb-0 fw-normal"},l={class:"ms-1"},n={class:"list-group rounded-0"},d={class:"d-flex flex-column flex-sm-row"},u={style:{"max-width":"100px"},class:"d-flex align-items-center mb-2 mb-sm-0 me-sm-4"},p=["src","alt"],m={class:"px-0 px-sm-3 w-auto align-self-sm-center"},g={key:0,class:"mt-2 mb-0"},h={key:1,class:"mt-2 mb-0"},b={class:"text-danger"},w={class:"badge rounded-pill bg-graySlight text-dark ms-2",style:{"vertical-align":"baseline"}},f={class:"my-2"},_={key:2,class:"input-group input-group-sm w-auto mb-2"},y=["onClick"],k=(0,r._)("i",{class:"bi bi-dash-lg"},null,-1),v=[k],x={class:"input-group-text bg-white border-start-0 border-end-0 border-gray text-center d-inline-block",style:{"min-width":"50px"}},C=["onClick"],D=(0,r._)("i",{class:"bi bi-plus-lg"},null,-1),$=[D],z={key:3,class:"mb-2"},I={class:"mb-0"},j=["onClick"],q={key:0,class:"position-fixed",style:{"z-index":"1058","backdrop-filter":"blur(5px)",top:"-100vh",height:"300vh",left:"-100vw",width:"300vw"}},O={class:"d-flex flex-column justify-content-center align-items-center h-100"},E={class:"card border px-3 py-1 bg-light shadow-lg",style:{"max-width":"90vw"}},M={class:"card-body text-center p-4"},L=(0,r._)("i",{class:"bi bi-exclamation-triangle-fill opacity-50",style:{"font-size":"4rem",color:"var(--bs-warning)"}},null,-1),T={class:"text-center"};function W(t,e,s,k,D,W){const Z=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",a,[(0,r._)("h5",c,[(0,r.WI)(t.$slots,"title",{},(()=>[(0,r.Uk)("購物清單")])),(0,r._)("span",l,(0,i.zw)(`(${s.cartInfo.carts.reduce(((t,e)=>t+e.qty),0)})`),1)]),s.isEdit?((0,r.wg)(),(0,r.iD)("a",{key:0,href:"#",class:"link-gray link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",onClick:e[0]||(e[0]=(0,o.iM)(((...t)=>W.checkDeleteItem&&W.checkDeleteItem(...t)),["prevent"]))},"清空購物車")):(0,r.kq)("",!0)]),(0,r._)("ul",n,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(s.cartInfo.carts,(e=>((0,r.wg)(),(0,r.iD)("li",{class:(0,i.C_)(["list-group-item d-flex flex-column-reverse flex-sm-row border-gray-subtle border-start-0 border-end-0 px-0",{"text-gray":!s.isEdit}]),key:e.id},[(0,r._)("div",d,[(0,r._)("div",u,[(0,r._)("img",{src:e.product.imageUrl,alt:e.product.title,class:"img-fluid"},null,8,p)]),(0,r._)("div",m,[(0,r.Wm)(Z,{to:`/product/${e.product.id}`,class:(0,i.C_)(["link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",{"fw-bolder":s.isEdit}]),target:"_blank"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,i.zw)(e.product.title),1)])),_:2},1032,["to","class"]),e.product.origin_price===e.product.price?((0,r.wg)(),(0,r.iD)("p",g,(0,i.zw)(`單價 NT$ ${t.$filters.currency(e.product.origin_price)}`),1)):((0,r.wg)(),(0,r.iD)("p",h,[(0,r.Uk)(" 單件優惠價 "),(0,r._)("span",b,(0,i.zw)(`NT$ ${t.$filters.currency(e.product.price)}`),1),(0,r._)("span",w,(0,i.zw)(`${Math.floor(e.product.price/e.product.origin_price*10)}折`),1)])),(0,r._)("p",f,(0,i.zw)(`規格：${e.product.unit}`),1),s.isEdit?((0,r.wg)(),(0,r.iD)("div",_,[(0,r._)("button",{type:"button",class:(0,i.C_)(["btn btn-outline-gray",{disabled:1===e.qty}]),onClick:t=>W.cartAdjustNum({product_id:e.product.id,qty:e.qty-1},e.id)},v,10,y),(0,r._)("span",x,(0,i.zw)(e.qty),1),(0,r._)("button",{type:"button",class:(0,i.C_)(["btn btn-outline-gray",{disabled:10===e.qty}]),onClick:t=>W.cartAdjustNum({product_id:e.product.id,qty:e.qty+1},e.id)},$,10,C)])):((0,r.wg)(),(0,r.iD)("p",z,(0,i.zw)(`數量：${e.qty}`),1)),(0,r._)("p",I,(0,i.zw)(`小計：${e.total} 元`),1)])]),s.isEdit?((0,r.wg)(),(0,r.iD)("button",{key:0,type:"button",class:"btn-close ms-auto",onClick:t=>W.checkDeleteItem(e),title:"移除品項"},null,8,j)):(0,r.kq)("",!0)],2)))),128))]),D.showDeleteConfirm?((0,r.wg)(),(0,r.iD)("div",q,[(0,r._)("div",O,[(0,r._)("div",E,[(0,r._)("div",M,[L,(0,r._)("p",null,(0,i.zw)(`確定要${""===D.deleteMsg?"清空購物車":`將"${D.deleteMsg}"從購物車移除`}嗎？`),1),(0,r._)("div",T,[(0,r._)("button",{type:"button",class:"btn btn-outline-danger me-2",onClick:e[1]||(e[1]=(...t)=>W.deleteItem&&W.deleteItem(...t))},(0,i.zw)(""===D.deleteMsg?"清空":"移除"),1),(0,r._)("button",{type:"button",class:"btn btn-gray ms-2",onClick:e[2]||(e[2]=t=>D.showDeleteConfirm=!1)}," 取消 ")])])])])])):(0,r.kq)("",!0)],64)}var Z={data(){return{showDeleteConfirm:!1,deleteMsg:"",temp:{}}},props:["cartInfo","isEdit"],inject:["emitter"],methods:{cartAdjustNum(t,e){this.emitter.emit("cartAdjustNum",{data:t,cartId:e})},checkDeleteItem(t={}){this.temp=t,t.product?this.deleteMsg=this.temp.product.title:this.deleteMsg="",this.showDeleteConfirm=!0},deleteItem(){this.temp.id?this.emitter.emit("cartDeleteItem",this.temp.id):this.emitter.emit("cartReset"),this.showDeleteConfirm=!1}}},U=s(89);const P=(0,U.Z)(Z,[["render",W]]);var N=P},1170:function(t,e,s){s.d(e,{Z:function(){return y}});var r=s(3396),i=s(7139);const o={class:"card border-0"},a=["src","alt"],c={key:0,class:"position-absolute bottom-0"},l={key:0,class:"fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"},n={key:1,class:"fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"},d={class:"card-img-overlay p-0"},u={class:"d-flex justify-content-center align-items-center rounded py-3 d-lg-none",style:{background:"linear-gradient(\r\n              rgba(41, 41, 43, 0.5) 20%,\r\n              transparent\r\n            )"}},p={class:"fw-bolder text-white px-2 fs-5 text-center"},m={class:"h-100 d-none d-lg-flex flex-column justify-content-center align-items-center rounded productTitle",style:{"background-color":"rgba(41, 41, 43, 0.5)"}},g={class:"fw-bolder text-white px-3 fs-5 text-center mb-5"},h=(0,r._)("p",{class:"fw-bolder text-white fs-5 linkIcon"},[(0,r._)("i",{class:"bi bi-search"})],-1);function b(t,e,s,b,w,f){const _=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",o,[(0,r._)("img",{src:s.product.imageUrl,class:"card-img productImg",alt:s.product.title,style:(0,i.j5)([{"object-fit":"cover"},{height:s.height}])},null,12,a),s.showBadge?((0,r.wg)(),(0,r.iD)("div",c,["期間限定"===s.product.category?((0,r.wg)(),(0,r.iD)("p",l," 期間限定 ")):s.product.origin_price!==s.product.price?((0,r.wg)(),(0,r.iD)("p",n,(0,i.zw)(`特價 ${Math.floor(s.product.price/s.product.origin_price*10)} 折`),1)):(0,r.kq)("",!0)])):(0,r.kq)("",!0),(0,r._)("div",d,[(0,r._)("div",u,[(0,r._)("p",p,(0,i.zw)(s.product.title),1)]),(0,r.Wm)(_,{to:`/product/${s.product.id}`,class:"stretched-link productLink"},null,8,["to"]),(0,r._)("div",m,[(0,r._)("p",g,(0,i.zw)(s.product.title),1),h])])])}var w={props:["product","height","showBadge"]},f=s(89);const _=(0,f.Z)(w,[["render",b]]);var y=_},2698:function(t,e,s){s.d(e,{Z:function(){return $}});var r=s(3396),i=s(7139),o=s(9242);const a={class:"card h-100"},c={class:"zIndex position-absolute end-0 text-end p-2 icon-bg",style:{height:"5rem",width:"5rem"}},l=(0,r._)("i",{class:"bi bi-suit-heart"},null,-1),n=[l],d={key:0,class:"zIndex position-absolute mt-3 p-2 text-white bg-gray bg-opacity-75 rounded-end"},u={key:1,class:"zIndex position-absolute mt-3 p-2 text-white bg-gray bg-opacity-75 rounded-end"},p=["src","alt"],m={class:"card-body position-relative"},g={class:"d-flex flex-column justify-content-between h-100"},h={class:"card-title fw-bolder"},b={class:"mb-2"},w={key:0,class:"mb-2"},f={key:1,class:"mb-2"},_={class:"text-danger me-2"},y={class:"text-gray"},k=(0,r._)("i",{class:"bi bi-cart-plus me-2"},null,-1);function v(t,e,s,l,v,x){const C=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",a,[(0,r._)("div",c,[(0,r._)("a",{href:"#",class:(0,i.C_)(["link-primary fs-4",{collected:x.isCollected}]),onClick:e[0]||(e[0]=(0,o.iM)((t=>x.setCollect(s.product.id)),["prevent"]))},n,2)]),"期間限定"===s.product.category?((0,r.wg)(),(0,r.iD)("p",d," 期間限定 ")):s.product.origin_price!==s.product.price?((0,r.wg)(),(0,r.iD)("p",u,(0,i.zw)(`特價 ${Math.floor(s.product.price/s.product.origin_price*10)} 折`),1)):(0,r.kq)("",!0),(0,r.Wm)(C,{to:`/product/${s.product.id}`,class:"overflow-hidden rounded-top border-dark",onClick:x.scrollTop},{default:(0,r.w5)((()=>[(0,r._)("img",{src:s.product.imageUrl,class:"card-img-top productImg",alt:s.product.title,style:{height:"300px","object-fit":"cover"}},null,8,p)])),_:1},8,["to","onClick"]),(0,r._)("div",m,[(0,r.Wm)(C,{to:`/product/${s.product.id}`,class:"stretched-link",onClick:x.scrollTop},null,8,["to","onClick"]),(0,r._)("div",g,[(0,r._)("h5",h,(0,i.zw)(s.product.title),1),(0,r._)("div",null,[(0,r._)("p",b,(0,i.zw)(s.product.unit),1),s.product.origin_price===s.product.price?((0,r.wg)(),(0,r.iD)("p",w,(0,i.zw)(`NT$ ${t.$filters.currency(s.product.origin_price)}`),1)):((0,r.wg)(),(0,r.iD)("p",f,[(0,r._)("span",_,(0,i.zw)(`NT$ ${t.$filters.currency(s.product.price)}`),1),(0,r._)("del",y,(0,i.zw)(`NT$ ${t.$filters.currency(s.product.origin_price)}`),1)])),(0,r._)("a",{href:"#",class:"zIndex position-relative btn btn-outline-secondary w-100",onClick:e[1]||(e[1]=(0,o.iM)((t=>x.emitter.emit("addCart",{product_id:s.product.id,qty:1})),["prevent"]))},[k,(0,r.Uk)("加到購物車")])])])])])}var x={data(){return{collect:""}},computed:{isCollected(){return this.collect.findIndex((t=>t===this.product.id))>-1}},props:["product"],inject:["emitter"],methods:{setCollect(t){this.emitter.emit("setCollect",t)},scrollTop(){window.scrollTo({top:0,behavior:"smooth"})}},created(){this.emitter.on("collectInfo",(t=>{this.collect=t})),this.emitter.emit("getCollectInfo")}},C=s(89);const D=(0,C.Z)(x,[["render",v]]);var $=D},5485:function(t,e,s){s.d(e,{Z:function(){return b}});var r=s(3396),i=s(7139);const o={key:0,class:"bg-white"},a={key:0,class:"d-flex flex-wrap justify-content-between align-items-center mb-3"},c={class:"mb-0"},l=(0,r._)("i",{class:"bi bi-caret-right-fill"},null,-1),n={class:"row row-cols-md-3 row-cols-lg-5 g-4"};function d(t,e,s,d,u,p){const m=(0,r.up)("router-link"),g=(0,r.up)("ProductCardClassic"),h=(0,r.up)("ProductCard");return u.showData.length>0?((0,r.wg)(),(0,r.iD)("div",o,[(0,r._)("div",{class:(0,i.C_)(["container py-5",{"pt-3":!s.showTitle}])},[s.showTitle?((0,r.wg)(),(0,r.iD)("div",a,[(0,r._)("h5",c,[(0,r.WI)(t.$slots,"title",{},(()=>[(0,r.Uk)("推薦給您")]))]),(0,r.Wm)(m,{to:"/products",class:"link-secondary text-decoration-none",onClick:e[0]||(e[0]=t=>p.emitter.emit("setFilterStore",""))},{default:(0,r.w5)((()=>[(0,r.Uk)("看更多產品"),l])),_:1})])):(0,r.kq)("",!0),(0,r._)("div",n,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(u.showData,(t=>((0,r.wg)(),(0,r.iD)("div",{class:"col-12 flex-fill",key:t.id},[s.classicType?((0,r.wg)(),(0,r.j4)(g,{key:0,product:t,height:"300px",showBadge:!0},null,8,["product"])):((0,r.wg)(),(0,r.j4)(h,{key:1,product:t,onAddCart:p.addCart},null,8,["product","onAddCart"]))])))),128))])],2)])):(0,r.kq)("",!0)}s(560);var u=s(2698),p=s(1170),m={data(){return{allData:[],showData:[],index:0,isLoading:!1}},inject:["emitter"],props:["num","isRandom","classicType","showTitle"],emits:["addCart"],components:{ProductCard:u.Z,ProductCardClassic:p.Z},methods:{getData(){const t="https://vue3-course-api.hexschool.io/api/nn_macaron/products/all";this.isLoading=!0,this.axios.get(t).then((t=>{t.data.success?(this.allData=t.data.products,this.setShowData()):this.getDataError(`(${t.data.message})`),this.isLoading=!1})).catch((t=>{this.isLoading=!1,this.getDataError(`(${t})`)}))},getDataError(t=""){this.emitter.emit("sendMsg",{message:`產品無法載入 ${t}`,status:"error"})},setShowData(){let t=0;if(this.isRandom){t=this.index;while(t===this.index)t=Math.floor(Math.random()*(this.allData.length-this.num));this.index=t,this.showData=this.allData.slice(this.index,this.index+this.num)}else for(let e=0;this.showData.length<this.num;e+=2)this.showData.push(this.allData[e])},addCart(t){this.$emit("addCart",t)}},created(){this.getData()}},g=s(89);const h=(0,g.Z)(m,[["render",d]]);var b=h},7747:function(t,e,s){s.r(e),s.d(e,{default:function(){return f}});var r=s(3396);const i={class:"container pb-5",style:{"min-height":"60vh"}},o=(0,r._)("h5",{class:"fw-bolder mb-3"},[(0,r._)("i",{class:"bi bi-check-circle me-2"}),(0,r.Uk)("完成訂單")],-1),a={class:"row justify-content-lg-between"},c={class:"col-lg-7"},l=(0,r._)("i",{class:"bi bi-caret-right-fill"},null,-1),n={class:"col-lg-4"};function d(t,e,s,d,u,p){const m=(0,r.up)("OrderStatus"),g=(0,r.up)("router-link"),h=(0,r.up)("OrderCard"),b=(0,r.up)("Orderlist"),w=(0,r.up)("WebRecommand");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",i,[o,(0,r._)("div",a,[(0,r._)("div",c,[(0,r.Wm)(m,{onOrderData:p.getOrder,isSearch:!1},null,8,["onOrderData"]),(0,r.Wm)(g,{to:"/products",class:"mb-5 btn btn-secondary"},{default:(0,r.w5)((()=>[(0,r.Uk)("繼續選購"),l])),_:1})]),(0,r._)("div",n,[u.getOrderComplete?((0,r.wg)(),(0,r.j4)(h,{key:0,"cart-info":u.orderProducts,isEdit:!1},{title:(0,r.w5)((()=>[(0,r.Uk)("訂單資料")])),coupon:(0,r.w5)((()=>[(0,r.Uk)("優惠券折扣：")])),_:1},8,["cart-info"])):(0,r.kq)("",!0),u.getOrderComplete?((0,r.wg)(),(0,r.j4)(b,{key:1,"cart-info":u.orderProducts,isEdit:!1},{title:(0,r.w5)((()=>[(0,r.Uk)("訂單明細")])),_:1},8,["cart-info"])):(0,r.kq)("",!0)])])]),(0,r.Wm)(w,{num:5,isRandom:!0,classicType:!0,showTitle:!0})],64)}var u=s(7061),p=s(6687),m=s(5486),g=s(5485),h={data(){return{orderProducts:{},getOrderComplete:!1}},props:["cartInfo"],components:{Orderlist:u.Z,OrderCard:p.Z,OrderStatus:m.Z,WebRecommand:g.Z},methods:{getOrder(t){this.orderProducts=t,this.getOrderComplete=!0}}},b=s(89);const w=(0,b.Z)(h,[["render",d]]);var f=w}}]);
//# sourceMappingURL=747.41bc031f.js.map
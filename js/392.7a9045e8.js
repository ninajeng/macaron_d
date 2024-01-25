"use strict";(self["webpackChunkproject_macaron"]=self["webpackChunkproject_macaron"]||[]).push([[392],{5486:function(t,e,r){r.d(e,{Z:function(){return O}});var s=r(3396),i=r(7139);const o={class:"row g-2 g-sm-3"},a={key:0,class:"col-12 border-bottom pb-3"},d=(0,s._)("h5",{class:"fw-bolder mb-3"},"選擇付款方式",-1),c={key:0,class:"d-flex mb-3 text-warning-emphasis"},n=(0,s._)("i",{class:"bi bi-exclamation-triangle-fill me-2"},null,-1),l=(0,s._)("p",{class:"mb-0",style:{"background-image":"linear-gradient(\r\n                  transparent 60%,\r\n                  var(--bs-warning-bg-subtle) 40%\r\n                )"}}," 訂單尚未完成，請完成付款手續 ",-1),u=[n,l],p={class:"input-group"},h={class:"form-select"},m=(0,s._)("option",{value:"線上刷卡"},"線上刷卡",-1),g=(0,s._)("option",{value:"ATM轉帳"},"ATM轉帳",-1),b={value:"門市付款"},w={key:1,class:"col-12"},_={class:"mb-0 d-none d-sm-inline-block",style:{"background-image":"linear-gradient(\r\n                transparent 60%,\r\n                var(--bs-success-bg-subtle) 40%\r\n              )"}},f={class:"mb-2 d-sm-none bg-success-subtle p-3 rounded lh-lg"},y=(0,s._)("div",{class:"col-sm-4"},[(0,s._)("h5",{class:"fs-6 mb-0 mt-2 mt-sm-0 fw-semibold"},"訂單狀態")],-1),v={class:"col-sm-8 text-gray"},k={class:"mb-0"},x=(0,s._)("div",{class:"col-sm-4"},[(0,s._)("h5",{class:"fs-6 mt-2 mt-sm-0 mb-0 fw-semibold"},"訂購人資料")],-1),D={class:"col-sm-8 text-gray"},$={class:"mb-1"},C={class:"mb-1"},z={class:"mb-1"},T={key:0,class:"mb-0",style:{"text-align":"justify"}};function I(t,e,r,n,l,I){const L=(0,s.up)("WebLoading");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(L,{"is-loading":l.isLoading},null,8,["is-loading"]),l.order.user?((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,i.C_)(l.order.is_paid?"mb-3":"mb-5")},[(0,s._)("div",{class:(0,i.C_)(["container p-0",{"mb-3 border-secondary p-4 border rounded":!l.order.is_paid}])},[(0,s._)("div",o,[l.order.is_paid?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",a,[d,l.order.is_paid?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",c,u)),(0,s._)("div",p,[(0,s._)("select",h,[m,g,(0,s._)("option",b,(0,i.zw)(l.order.user.address.indexOf("門市取貨")>-1?"門市取貨付款":"門市付款"),1)]),(0,s._)("button",{type:"button",class:"btn btn-secondary",onClick:e[0]||(e[0]=(...t)=>I.payment&&I.payment(...t))}," 付款 ")])])),l.order.is_paid?((0,s.wg)(),(0,s.iD)("div",w,[(0,s._)("p",_,(0,i.zw)(""+(l.order.user.address.indexOf("門市取貨")>-1?"商品將於七個工作天內完成，我們將與您聯繫確認取貨日期。":"商品將於七個工作天內送達。")),1),(0,s._)("p",f,(0,i.zw)(""+(l.order.user.address.indexOf("門市取貨")>-1?"商品將於七個工作天內完成，我們將與您聯繫確認取貨日期。":"商品將於七個工作天內送達。")),1)])):(0,s.kq)("",!0),y,(0,s._)("div",v,[(0,s._)("p",k,(0,i.zw)(l.order.is_paid?"訂單已成立":"尚未付款"),1)]),x,(0,s._)("div",D,[(0,s._)("p",$,(0,i.zw)(l.order.user.name),1),(0,s._)("p",C,(0,i.zw)(l.order.user.tel),1),(0,s._)("p",z,(0,i.zw)(l.order.user.email),1),(0,s._)("p",{class:(0,i.C_)(["mb-0",{"mb-1":l.order.message}])},(0,i.zw)(l.order.user.address),3),l.order.message?((0,s.wg)(),(0,s.iD)("p",T,(0,i.zw)(`訂單備註："${l.order.message}"`),1)):(0,s.kq)("",!0)])])],2)],2)):(0,s.kq)("",!0)],64)}r(560);var L={data(){return{order:{},orderProducts:{},orderId:"",isLoading:!1}},inject:["emitter"],emits:["orderData","getError"],props:["isSearch"],methods:{getOrder(t){const e=`https://vue3-course-api.hexschool.io/api/nn_macaron/order/${t}`;this.isLoading=!0,this.axios.get(e).then((e=>{e.data.success?(e.data.order.is_paid&&"complete"!==this.$route.name?this.$router.push(`/order/complete/${t}`):e.data.order.is_paid||"payment"===this.$route.name||this.$router.push(`/order/payment/${t}`),this.order=e.data.order,this.orderProducts.carts=Object.values(e.data.order.products),this.orderProducts.final_total=e.data.order.total,this.orderProducts.total=this.orderProducts.carts.reduce(((t,e)=>(t+=e.total,t)),0),this.$emit("orderData",this.orderProducts)):this.getOrderFail(),this.isLoading=!1})).catch((()=>{this.isLoading=!1,this.getOrderFail()}))},getOrderFail(){this.isSearch?this.$emit("getError"):(this.emitter.emit("sendMsg",{message:"無此訂單",status:"error"}),this.$router.replace("/cart"))},payment(){const t=`https://vue3-course-api.hexschool.io/api/nn_macaron/pay/${this.$route.params.id}`;this.isLoading=!0,this.axios.post(t).then((t=>{t.data.success?this.$router.push(`/order/complete/${this.$route.params.id}`):this.emitter.emit("sendMsg",{message:"付款失敗，請聯繫店家",status:"error"}),this.isLoading=!1})).catch((t=>{this.isLoading=!1,alert(t)}))}},created(){this.isSearch||this.getOrder(this.$route.params.id)}},j=r(89);const W=(0,j.Z)(L,[["render",I]]);var O=W},1170:function(t,e,r){r.d(e,{Z:function(){return y}});var s=r(3396),i=r(7139);const o={class:"card border-0"},a=["src","alt"],d={key:0,class:"position-absolute bottom-0"},c={key:0,class:"fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"},n={key:1,class:"fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"},l={class:"card-img-overlay p-0"},u={class:"d-flex justify-content-center align-items-center rounded py-3 d-lg-none",style:{background:"linear-gradient(\r\n              rgba(41, 41, 43, 0.5) 20%,\r\n              transparent\r\n            )"}},p={class:"fw-bolder text-white px-2 fs-5 text-center"},h={class:"h-100 d-none d-lg-flex flex-column justify-content-center align-items-center rounded productTitle",style:{"background-color":"rgba(41, 41, 43, 0.5)"}},m={class:"fw-bolder text-white px-3 fs-5 text-center mb-5"},g=(0,s._)("p",{class:"fw-bolder text-white fs-5 linkIcon"},[(0,s._)("i",{class:"bi bi-search"})],-1);function b(t,e,r,b,w,_){const f=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("img",{src:r.product.imageUrl,class:"card-img productImg",alt:r.product.title,style:(0,i.j5)([{"object-fit":"cover"},{height:r.height}])},null,12,a),r.showBadge?((0,s.wg)(),(0,s.iD)("div",d,["期間限定"===r.product.category?((0,s.wg)(),(0,s.iD)("p",c," 期間限定 ")):r.product.origin_price!==r.product.price?((0,s.wg)(),(0,s.iD)("p",n,(0,i.zw)(`特價 ${Math.floor(r.product.price/r.product.origin_price*10)} 折`),1)):(0,s.kq)("",!0)])):(0,s.kq)("",!0),(0,s._)("div",l,[(0,s._)("div",u,[(0,s._)("p",p,(0,i.zw)(r.product.title),1)]),(0,s.Wm)(f,{to:`/product/${r.product.id}`,class:"stretched-link productLink"},null,8,["to"]),(0,s._)("div",h,[(0,s._)("p",m,(0,i.zw)(r.product.title),1),g])])])}var w={props:["product","height","showBadge"]},_=r(89);const f=(0,_.Z)(w,[["render",b]]);var y=f},2698:function(t,e,r){r.d(e,{Z:function(){return C}});var s=r(3396),i=r(7139),o=r(9242);const a={class:"card h-100"},d={class:"zIndex position-absolute end-0 text-end p-2 icon-bg",style:{height:"5rem",width:"5rem"}},c=(0,s._)("i",{class:"bi bi-suit-heart"},null,-1),n=[c],l={key:0,class:"zIndex position-absolute mt-3 p-2 text-white bg-gray bg-opacity-75 rounded-end"},u={key:1,class:"zIndex position-absolute mt-3 p-2 text-white bg-gray bg-opacity-75 rounded-end"},p=["src","alt"],h={class:"card-body position-relative"},m={class:"d-flex flex-column justify-content-between h-100"},g={class:"card-title fw-bolder"},b={class:"mb-2"},w={key:0,class:"mb-2"},_={key:1,class:"mb-2"},f={class:"text-danger me-2"},y={class:"text-gray"},v=(0,s._)("i",{class:"bi bi-cart-plus me-2"},null,-1);function k(t,e,r,c,k,x){const D=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("div",d,[(0,s._)("a",{href:"#",class:(0,i.C_)(["link-primary fs-4",{collected:x.isCollected}]),onClick:e[0]||(e[0]=(0,o.iM)((t=>x.setCollect(r.product.id)),["prevent"]))},n,2)]),"期間限定"===r.product.category?((0,s.wg)(),(0,s.iD)("p",l," 期間限定 ")):r.product.origin_price!==r.product.price?((0,s.wg)(),(0,s.iD)("p",u,(0,i.zw)(`特價 ${Math.floor(r.product.price/r.product.origin_price*10)} 折`),1)):(0,s.kq)("",!0),(0,s.Wm)(D,{to:`/product/${r.product.id}`,class:"overflow-hidden rounded-top border-dark",onClick:x.scrollTop},{default:(0,s.w5)((()=>[(0,s._)("img",{src:r.product.imageUrl,class:"card-img-top productImg",alt:r.product.title,style:{height:"300px","object-fit":"cover"}},null,8,p)])),_:1},8,["to","onClick"]),(0,s._)("div",h,[(0,s.Wm)(D,{to:`/product/${r.product.id}`,class:"stretched-link",onClick:x.scrollTop},null,8,["to","onClick"]),(0,s._)("div",m,[(0,s._)("h5",g,(0,i.zw)(r.product.title),1),(0,s._)("div",null,[(0,s._)("p",b,(0,i.zw)(r.product.unit),1),r.product.origin_price===r.product.price?((0,s.wg)(),(0,s.iD)("p",w,(0,i.zw)(`NT$ ${t.$filters.currency(r.product.origin_price)}`),1)):((0,s.wg)(),(0,s.iD)("p",_,[(0,s._)("span",f,(0,i.zw)(`NT$ ${t.$filters.currency(r.product.price)}`),1),(0,s._)("del",y,(0,i.zw)(`NT$ ${t.$filters.currency(r.product.origin_price)}`),1)])),(0,s._)("a",{href:"#",class:"zIndex position-relative btn btn-outline-secondary w-100",onClick:e[1]||(e[1]=(0,o.iM)((t=>x.emitter.emit("addCart",{product_id:r.product.id,qty:1})),["prevent"]))},[v,(0,s.Uk)("加到購物車")])])])])])}var x={data(){return{collect:""}},computed:{isCollected(){return this.collect.findIndex((t=>t===this.product.id))>-1}},props:["product"],inject:["emitter"],methods:{setCollect(t){this.emitter.emit("setCollect",t)},scrollTop(){window.scrollTo({top:0,behavior:"smooth"})}},created(){this.emitter.on("collectInfo",(t=>{this.collect=t})),this.emitter.emit("getCollectInfo")}},D=r(89);const $=(0,D.Z)(x,[["render",k]]);var C=$},5485:function(t,e,r){r.d(e,{Z:function(){return b}});var s=r(3396),i=r(7139);const o={key:0,class:"bg-white"},a={key:0,class:"d-flex flex-wrap justify-content-between align-items-center mb-3"},d={class:"mb-0"},c=(0,s._)("i",{class:"bi bi-caret-right-fill"},null,-1),n={class:"row row-cols-md-3 row-cols-lg-5 g-4"};function l(t,e,r,l,u,p){const h=(0,s.up)("router-link"),m=(0,s.up)("ProductCardClassic"),g=(0,s.up)("ProductCard");return u.showData.length>0?((0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",{class:(0,i.C_)(["container py-5",{"pt-3":!r.showTitle}])},[r.showTitle?((0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("h5",d,[(0,s.WI)(t.$slots,"title",{},(()=>[(0,s.Uk)("推薦給您")]))]),(0,s.Wm)(h,{to:"/products",class:"link-secondary text-decoration-none",onClick:e[0]||(e[0]=t=>p.emitter.emit("setFilterStore",""))},{default:(0,s.w5)((()=>[(0,s.Uk)("看更多產品"),c])),_:1})])):(0,s.kq)("",!0),(0,s._)("div",n,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(u.showData,(t=>((0,s.wg)(),(0,s.iD)("div",{class:"col-12 flex-fill",key:t.id},[r.classicType?((0,s.wg)(),(0,s.j4)(m,{key:0,product:t,height:"300px",showBadge:!0},null,8,["product"])):((0,s.wg)(),(0,s.j4)(g,{key:1,product:t,onAddCart:p.addCart},null,8,["product","onAddCart"]))])))),128))])],2)])):(0,s.kq)("",!0)}r(560);var u=r(2698),p=r(1170),h={data(){return{allData:[],showData:[],index:0,isLoading:!1}},inject:["emitter"],props:["num","isRandom","classicType","showTitle"],emits:["addCart"],components:{ProductCard:u.Z,ProductCardClassic:p.Z},methods:{getData(){const t="https://vue3-course-api.hexschool.io/api/nn_macaron/products/all";this.isLoading=!0,this.axios.get(t).then((t=>{t.data.success?(this.allData=t.data.products,this.setShowData()):this.getDataError(`(${t.data.message})`),this.isLoading=!1})).catch((t=>{this.isLoading=!1,this.getDataError(`(${t})`)}))},getDataError(t=""){this.emitter.emit("sendMsg",{message:`產品無法載入 ${t}`,status:"error"})},setShowData(){let t=0;if(this.isRandom){t=this.index;while(t===this.index)t=Math.floor(Math.random()*(this.allData.length-this.num));this.index=t,this.showData=this.allData.slice(this.index,this.index+this.num)}else for(let e=0;this.showData.length<this.num;e+=2)this.showData.push(this.allData[e])},addCart(t){this.$emit("addCart",t)}},created(){this.getData()}},m=r(89);const g=(0,m.Z)(h,[["render",l]]);var b=g},7392:function(t,e,r){r.r(e),r.d(e,{default:function(){return k}});var s=r(3396),i=r(7139);const o={class:"container py-5"},a=(0,s._)("div",{class:"py-3 d-flex align-items-baseline justify-content-between border-bottom"},[(0,s._)("h5",{class:"mb-0"},"訂單查詢")],-1),d={class:"py-3",style:{"min-height":"50vh"}},c=(0,s._)("p",{class:"mb-2"},[(0,s.Uk)("訂單編號共20碼，"),(0,s._)("span",{class:"d-block d-sm-inline"},"如-Ni4rTAfW4To-DrkMO0G")],-1),n={key:0,class:"alert alert-warning border-warning d-inline-block"},l={class:"d-flex"},u=(0,s._)("i",{class:"bi bi-x-circle me-2"},null,-1),p={class:"mb-0"},h={class:"input-group",style:{"max-width":"400px"}},m=(0,s._)("button",{type:"submit",class:"btn btn-gray rounded-end"},[(0,s._)("i",{class:"bi bi-search me-2"}),(0,s.Uk)("查詢 ")],-1),g={class:"d-none"};function b(t,e,r,b,w,_){const f=(0,s.up)("WebLoading"),y=(0,s.up)("VField"),v=(0,s.up)("ErrorMessage"),k=(0,s.up)("VForm"),x=(0,s.up)("OrderStatus"),D=(0,s.up)("WebRecommand");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(f,{"is-loading":w.isLoading},null,8,["is-loading"]),(0,s._)("div",o,[a,(0,s._)("div",d,[c,w.searchError?((0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("div",l,[u,(0,s._)("p",p,(0,i.zw)(`查無此訂單"${w.errorId}"。請確認訂單號碼是否正確，或來電由專人為您服務。`),1)])])):(0,s.kq)("",!0),(0,s.Wm)(k,{onSubmit:_.searchTest},{default:(0,s.w5)((({errors:t})=>[(0,s._)("div",h,[(0,s.Wm)(y,{name:"訂單編號",class:(0,i.C_)(["form-control border border-gray border-end-0",{"is-invalid":t["訂單編號"]}]),placeholder:"請輸入20碼訂單編號",modelValue:w.orderId,"onUpdate:modelValue":e[0]||(e[0]=t=>w.orderId=t),rules:"length:20"},null,8,["class","modelValue"]),m,(0,s.Wm)(v,{name:"訂單編號",class:"invalid-feedback"})])])),_:1},8,["onSubmit"])])]),(0,s._)("div",g,[(0,s.Wm)(x,{onGetError:_.getError,isSearch:!0,ref:"OrderStatus"},null,8,["onGetError"])]),(0,s.Wm)(D,{num:5,isRandom:!0,classicType:!0,showTitle:!0})],64)}var w=r(5486),_=r(5485),f={data(){return{orderId:"",searchError:!1,errorId:"",isLoading:!1}},components:{OrderStatus:w.Z,WebRecommand:_.Z},methods:{searchTest(){this.isLoading=!0,this.$refs.OrderStatus.getOrder(this.orderId),this.errorId=this.orderId},getError(){this.isLoading=!1,this.searchError=!0}},mounted(){window.scrollTo({top:0})}},y=r(89);const v=(0,y.Z)(f,[["render",b]]);var k=v}}]);
//# sourceMappingURL=392.7a9045e8.js.map
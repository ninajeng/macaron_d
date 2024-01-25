"use strict";(self["webpackChunkproject_macaron"]=self["webpackChunkproject_macaron"]||[]).push([[394],{1122:function(t,e,i){i.d(e,{Z:function(){return a}});var s=i(3396);const r={class:"d-none"};function o(t,e,i,o,l,c){return(0,s.wg)(),(0,s.iD)("p",r,"購物車資訊")}var l={inject:["emitter"],methods:{getCartInfo(){this.emitter.emit("getCartInfo")}},created(){this.emitter.on("cartInfo",(t=>{this.$emit("updateInfo",t)})),this.getCartInfo()}},c=i(89);const n=(0,c.Z)(l,[["render",o]]);var a=n},7061:function(t,e,i){i.d(e,{Z:function(){return R}});var s=i(3396),r=i(7139),o=i(9242);const l={class:"py-2 d-flex align-items-baseline justify-content-between"},c={class:"mb-0 fw-normal"},n={class:"ms-1"},a={class:"list-group rounded-0"},d={class:"d-flex flex-column flex-sm-row"},u={style:{"max-width":"100px"},class:"d-flex align-items-center mb-2 mb-sm-0 me-sm-4"},p=["src","alt"],m={class:"px-0 px-sm-3 w-auto align-self-sm-center"},g={key:0,class:"mt-2 mb-0"},h={key:1,class:"mt-2 mb-0"},b={class:"text-danger"},f={class:"badge rounded-pill bg-graySlight text-dark ms-2",style:{"vertical-align":"baseline"}},w={class:"my-2"},y={key:2,class:"input-group input-group-sm w-auto mb-2"},_=["onClick"],k=(0,s._)("i",{class:"bi bi-dash-lg"},null,-1),v=[k],x={class:"input-group-text bg-white border-start-0 border-end-0 border-gray text-center d-inline-block",style:{"min-width":"50px"}},D=["onClick"],C=(0,s._)("i",{class:"bi bi-plus-lg"},null,-1),I=[C],$={key:3,class:"mb-2"},z={class:"mb-0"},j=["onClick"],q={key:0,class:"position-fixed",style:{"z-index":"1058","backdrop-filter":"blur(5px)",top:"-100vh",height:"300vh",left:"-100vw",width:"300vw"}},T={class:"d-flex flex-column justify-content-center align-items-center h-100"},W={class:"card border px-3 py-1 bg-light shadow-lg",style:{"max-width":"90vw"}},Z={class:"card-body text-center p-4"},M=(0,s._)("i",{class:"bi bi-exclamation-triangle-fill opacity-50",style:{"font-size":"4rem",color:"var(--bs-warning)"}},null,-1),U={class:"text-center"};function E(t,e,i,k,C,E){const L=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",l,[(0,s._)("h5",c,[(0,s.WI)(t.$slots,"title",{},(()=>[(0,s.Uk)("購物清單")])),(0,s._)("span",n,(0,r.zw)(`(${i.cartInfo.carts.reduce(((t,e)=>t+e.qty),0)})`),1)]),i.isEdit?((0,s.wg)(),(0,s.iD)("a",{key:0,href:"#",class:"link-gray link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",onClick:e[0]||(e[0]=(0,o.iM)(((...t)=>E.checkDeleteItem&&E.checkDeleteItem(...t)),["prevent"]))},"清空購物車")):(0,s.kq)("",!0)]),(0,s._)("ul",a,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.cartInfo.carts,(e=>((0,s.wg)(),(0,s.iD)("li",{class:(0,r.C_)(["list-group-item d-flex flex-column-reverse flex-sm-row border-gray-subtle border-start-0 border-end-0 px-0",{"text-gray":!i.isEdit}]),key:e.id},[(0,s._)("div",d,[(0,s._)("div",u,[(0,s._)("img",{src:e.product.imageUrl,alt:e.product.title,class:"img-fluid"},null,8,p)]),(0,s._)("div",m,[(0,s.Wm)(L,{to:`/product/${e.product.id}`,class:(0,r.C_)(["link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",{"fw-bolder":i.isEdit}]),target:"_blank"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,r.zw)(e.product.title),1)])),_:2},1032,["to","class"]),e.product.origin_price===e.product.price?((0,s.wg)(),(0,s.iD)("p",g,(0,r.zw)(`單價 NT$ ${t.$filters.currency(e.product.origin_price)}`),1)):((0,s.wg)(),(0,s.iD)("p",h,[(0,s.Uk)(" 單件優惠價 "),(0,s._)("span",b,(0,r.zw)(`NT$ ${t.$filters.currency(e.product.price)}`),1),(0,s._)("span",f,(0,r.zw)(`${Math.floor(e.product.price/e.product.origin_price*10)}折`),1)])),(0,s._)("p",w,(0,r.zw)(`規格：${e.product.unit}`),1),i.isEdit?((0,s.wg)(),(0,s.iD)("div",y,[(0,s._)("button",{type:"button",class:(0,r.C_)(["btn btn-outline-gray",{disabled:1===e.qty}]),onClick:t=>E.cartAdjustNum({product_id:e.product.id,qty:e.qty-1},e.id)},v,10,_),(0,s._)("span",x,(0,r.zw)(e.qty),1),(0,s._)("button",{type:"button",class:(0,r.C_)(["btn btn-outline-gray",{disabled:10===e.qty}]),onClick:t=>E.cartAdjustNum({product_id:e.product.id,qty:e.qty+1},e.id)},I,10,D)])):((0,s.wg)(),(0,s.iD)("p",$,(0,r.zw)(`數量：${e.qty}`),1)),(0,s._)("p",z,(0,r.zw)(`小計：${e.total} 元`),1)])]),i.isEdit?((0,s.wg)(),(0,s.iD)("button",{key:0,type:"button",class:"btn-close ms-auto",onClick:t=>E.checkDeleteItem(e),title:"移除品項"},null,8,j)):(0,s.kq)("",!0)],2)))),128))]),C.showDeleteConfirm?((0,s.wg)(),(0,s.iD)("div",q,[(0,s._)("div",T,[(0,s._)("div",W,[(0,s._)("div",Z,[M,(0,s._)("p",null,(0,r.zw)(`確定要${""===C.deleteMsg?"清空購物車":`將"${C.deleteMsg}"從購物車移除`}嗎？`),1),(0,s._)("div",U,[(0,s._)("button",{type:"button",class:"btn btn-outline-danger me-2",onClick:e[1]||(e[1]=(...t)=>E.deleteItem&&E.deleteItem(...t))},(0,r.zw)(""===C.deleteMsg?"清空":"移除"),1),(0,s._)("button",{type:"button",class:"btn btn-gray ms-2",onClick:e[2]||(e[2]=t=>C.showDeleteConfirm=!1)}," 取消 ")])])])])])):(0,s.kq)("",!0)],64)}var L={data(){return{showDeleteConfirm:!1,deleteMsg:"",temp:{}}},props:["cartInfo","isEdit"],inject:["emitter"],methods:{cartAdjustNum(t,e){this.emitter.emit("cartAdjustNum",{data:t,cartId:e})},checkDeleteItem(t={}){this.temp=t,t.product?this.deleteMsg=this.temp.product.title:this.deleteMsg="",this.showDeleteConfirm=!0},deleteItem(){this.temp.id?this.emitter.emit("cartDeleteItem",this.temp.id):this.emitter.emit("cartReset"),this.showDeleteConfirm=!1}}},N=i(89);const A=(0,N.Z)(L,[["render",E]]);var R=A},1170:function(t,e,i){i.d(e,{Z:function(){return _}});var s=i(3396),r=i(7139);const o={class:"card border-0"},l=["src","alt"],c={key:0,class:"position-absolute bottom-0"},n={key:0,class:"fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"},a={key:1,class:"fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"},d={class:"card-img-overlay p-0"},u={class:"d-flex justify-content-center align-items-center rounded py-3 d-lg-none",style:{background:"linear-gradient(\r\n              rgba(41, 41, 43, 0.5) 20%,\r\n              transparent\r\n            )"}},p={class:"fw-bolder text-white px-2 fs-5 text-center"},m={class:"h-100 d-none d-lg-flex flex-column justify-content-center align-items-center rounded productTitle",style:{"background-color":"rgba(41, 41, 43, 0.5)"}},g={class:"fw-bolder text-white px-3 fs-5 text-center mb-5"},h=(0,s._)("p",{class:"fw-bolder text-white fs-5 linkIcon"},[(0,s._)("i",{class:"bi bi-search"})],-1);function b(t,e,i,b,f,w){const y=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("img",{src:i.product.imageUrl,class:"card-img productImg",alt:i.product.title,style:(0,r.j5)([{"object-fit":"cover"},{height:i.height}])},null,12,l),i.showBadge?((0,s.wg)(),(0,s.iD)("div",c,["期間限定"===i.product.category?((0,s.wg)(),(0,s.iD)("p",n," 期間限定 ")):i.product.origin_price!==i.product.price?((0,s.wg)(),(0,s.iD)("p",a,(0,r.zw)(`特價 ${Math.floor(i.product.price/i.product.origin_price*10)} 折`),1)):(0,s.kq)("",!0)])):(0,s.kq)("",!0),(0,s._)("div",d,[(0,s._)("div",u,[(0,s._)("p",p,(0,r.zw)(i.product.title),1)]),(0,s.Wm)(y,{to:`/product/${i.product.id}`,class:"stretched-link productLink"},null,8,["to"]),(0,s._)("div",m,[(0,s._)("p",g,(0,r.zw)(i.product.title),1),h])])])}var f={props:["product","height","showBadge"]},w=i(89);const y=(0,w.Z)(f,[["render",b]]);var _=y},2698:function(t,e,i){i.d(e,{Z:function(){return I}});var s=i(3396),r=i(7139),o=i(9242);const l={class:"card h-100"},c={class:"zIndex position-absolute end-0 text-end p-2 icon-bg",style:{height:"5rem",width:"5rem"}},n=(0,s._)("i",{class:"bi bi-suit-heart"},null,-1),a=[n],d={key:0,class:"zIndex position-absolute mt-3 p-2 text-white bg-gray bg-opacity-75 rounded-end"},u={key:1,class:"zIndex position-absolute mt-3 p-2 text-white bg-gray bg-opacity-75 rounded-end"},p=["src","alt"],m={class:"card-body position-relative"},g={class:"d-flex flex-column justify-content-between h-100"},h={class:"card-title fw-bolder"},b={class:"mb-2"},f={key:0,class:"mb-2"},w={key:1,class:"mb-2"},y={class:"text-danger me-2"},_={class:"text-gray"},k=(0,s._)("i",{class:"bi bi-cart-plus me-2"},null,-1);function v(t,e,i,n,v,x){const D=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("div",c,[(0,s._)("a",{href:"#",class:(0,r.C_)(["link-primary fs-4",{collected:x.isCollected}]),onClick:e[0]||(e[0]=(0,o.iM)((t=>x.setCollect(i.product.id)),["prevent"]))},a,2)]),"期間限定"===i.product.category?((0,s.wg)(),(0,s.iD)("p",d," 期間限定 ")):i.product.origin_price!==i.product.price?((0,s.wg)(),(0,s.iD)("p",u,(0,r.zw)(`特價 ${Math.floor(i.product.price/i.product.origin_price*10)} 折`),1)):(0,s.kq)("",!0),(0,s.Wm)(D,{to:`/product/${i.product.id}`,class:"overflow-hidden rounded-top border-dark",onClick:x.scrollTop},{default:(0,s.w5)((()=>[(0,s._)("img",{src:i.product.imageUrl,class:"card-img-top productImg",alt:i.product.title,style:{height:"300px","object-fit":"cover"}},null,8,p)])),_:1},8,["to","onClick"]),(0,s._)("div",m,[(0,s.Wm)(D,{to:`/product/${i.product.id}`,class:"stretched-link",onClick:x.scrollTop},null,8,["to","onClick"]),(0,s._)("div",g,[(0,s._)("h5",h,(0,r.zw)(i.product.title),1),(0,s._)("div",null,[(0,s._)("p",b,(0,r.zw)(i.product.unit),1),i.product.origin_price===i.product.price?((0,s.wg)(),(0,s.iD)("p",f,(0,r.zw)(`NT$ ${t.$filters.currency(i.product.origin_price)}`),1)):((0,s.wg)(),(0,s.iD)("p",w,[(0,s._)("span",y,(0,r.zw)(`NT$ ${t.$filters.currency(i.product.price)}`),1),(0,s._)("del",_,(0,r.zw)(`NT$ ${t.$filters.currency(i.product.origin_price)}`),1)])),(0,s._)("a",{href:"#",class:"zIndex position-relative btn btn-outline-secondary w-100",onClick:e[1]||(e[1]=(0,o.iM)((t=>x.emitter.emit("addCart",{product_id:i.product.id,qty:1})),["prevent"]))},[k,(0,s.Uk)("加到購物車")])])])])])}var x={data(){return{collect:""}},computed:{isCollected(){return this.collect.findIndex((t=>t===this.product.id))>-1}},props:["product"],inject:["emitter"],methods:{setCollect(t){this.emitter.emit("setCollect",t)},scrollTop(){window.scrollTo({top:0,behavior:"smooth"})}},created(){this.emitter.on("collectInfo",(t=>{this.collect=t})),this.emitter.emit("getCollectInfo")}},D=i(89);const C=(0,D.Z)(x,[["render",v]]);var I=C},5485:function(t,e,i){i.d(e,{Z:function(){return b}});var s=i(3396),r=i(7139);const o={key:0,class:"bg-white"},l={key:0,class:"d-flex flex-wrap justify-content-between align-items-center mb-3"},c={class:"mb-0"},n=(0,s._)("i",{class:"bi bi-caret-right-fill"},null,-1),a={class:"row row-cols-md-3 row-cols-lg-5 g-4"};function d(t,e,i,d,u,p){const m=(0,s.up)("router-link"),g=(0,s.up)("ProductCardClassic"),h=(0,s.up)("ProductCard");return u.showData.length>0?((0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",{class:(0,r.C_)(["container py-5",{"pt-3":!i.showTitle}])},[i.showTitle?((0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("h5",c,[(0,s.WI)(t.$slots,"title",{},(()=>[(0,s.Uk)("推薦給您")]))]),(0,s.Wm)(m,{to:"/products",class:"link-secondary text-decoration-none",onClick:e[0]||(e[0]=t=>p.emitter.emit("setFilterStore",""))},{default:(0,s.w5)((()=>[(0,s.Uk)("看更多產品"),n])),_:1})])):(0,s.kq)("",!0),(0,s._)("div",a,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(u.showData,(t=>((0,s.wg)(),(0,s.iD)("div",{class:"col-12 flex-fill",key:t.id},[i.classicType?((0,s.wg)(),(0,s.j4)(g,{key:0,product:t,height:"300px",showBadge:!0},null,8,["product"])):((0,s.wg)(),(0,s.j4)(h,{key:1,product:t,onAddCart:p.addCart},null,8,["product","onAddCart"]))])))),128))])],2)])):(0,s.kq)("",!0)}i(560);var u=i(2698),p=i(1170),m={data(){return{allData:[],showData:[],index:0,isLoading:!1}},inject:["emitter"],props:["num","isRandom","classicType","showTitle"],emits:["addCart"],components:{ProductCard:u.Z,ProductCardClassic:p.Z},methods:{getData(){const t="https://vue3-course-api.hexschool.io/api/nn_macaron/products/all";this.isLoading=!0,this.axios.get(t).then((t=>{t.data.success?(this.allData=t.data.products,this.setShowData()):this.getDataError(`(${t.data.message})`),this.isLoading=!1})).catch((t=>{this.isLoading=!1,this.getDataError(`(${t})`)}))},getDataError(t=""){this.emitter.emit("sendMsg",{message:`產品無法載入 ${t}`,status:"error"})},setShowData(){let t=0;if(this.isRandom){t=this.index;while(t===this.index)t=Math.floor(Math.random()*(this.allData.length-this.num));this.index=t,this.showData=this.allData.slice(this.index,this.index+this.num)}else for(let e=0;this.showData.length<this.num;e+=2)this.showData.push(this.allData[e])},addCart(t){this.$emit("addCart",t)}},created(){this.getData()}},g=i(89);const h=(0,g.Z)(m,[["render",d]]);var b=h},394:function(t,e,i){i.r(e),i.d(e,{default:function(){return M}});var s=i(3396),r=i(7139);const o={class:"container py-5",style:{"min-height":"60vh"}},l={key:0},c={key:0,class:"row flex-column-reverse flex-lg-row justify-content-lg-between"},n={class:"col-lg-6"},a={class:"col-lg-4"},d={class:"card mb-5 border-secondary"},u={class:"card-body p-3 rounded"},p=(0,s._)("h5",{class:"mb-3 fw-semibold"},"購物車總計",-1),m={class:"border-bottom mb-1 pb-1"},g={class:"d-flex justify-content-between"},h=(0,s._)("p",{class:"mb-1"},"小計",-1),b={class:"mb-1"},f=(0,s._)("div",{class:"d-flex justify-content-between"},[(0,s._)("p",{class:"mb-1"},"運費"),(0,s._)("p",{class:"mb-1"},"活動免運")],-1),w={class:"d-flex justify-content-between border-top pt-1 mb-3"},y=(0,s._)("p",{class:"mb-1"},"總金額",-1),_={class:"mb-1 fw-bolder"},k=(0,s._)("div",null,null,-1),v={key:1},x=(0,s._)("h5",{class:"py-2 border-bottom"}," 購物車 (0) ",-1),D={class:"text-center py-5"},C=(0,s._)("p",{class:"me-sm-2 text-gray"},"購物車尚無資料",-1),I=(0,s._)("i",{class:"bi bi-caret-right-fill"},null,-1);function $(t,e,i,$,z,j){const q=(0,s.up)("WebLoading"),T=(0,s.up)("CartInfo"),W=(0,s.up)("Orderlist"),Z=(0,s.up)("router-link"),M=(0,s.up)("WebRecommand");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(q,{"is-loading":z.isLoading},null,8,["is-loading"]),(0,s.Wm)(T,{onUpdateInfo:j.updateInfo},null,8,["onUpdateInfo"]),(0,s._)("div",o,[z.cartInfo.carts.length>0?((0,s.wg)(),(0,s.iD)("div",l,[z.cartInfo.carts[0].product?((0,s.wg)(),(0,s.iD)("div",c,[(0,s._)("div",n,[(0,s.Wm)(W,{"cart-info":z.cartInfo,isEdit:!0},null,8,["cart-info"])]),(0,s._)("div",a,[(0,s._)("div",d,[(0,s._)("div",u,[p,(0,s._)("p",m,(0,r.zw)(`商品共 ${z.cartInfo.carts.reduce(((t,e)=>t+e.qty),0)} 件`),1),(0,s._)("div",g,[h,(0,s._)("p",b,(0,r.zw)(`${t.$filters.currency(z.cartInfo.total)}`),1)]),f,(0,s._)("div",w,[y,(0,s._)("p",_,(0,r.zw)(`NT$ ${t.$filters.currency(z.cartInfo.total)}`),1)]),(0,s.Wm)(Z,{to:"/order/check",class:"btn btn-secondary w-100"},{default:(0,s.w5)((()=>[(0,s.Uk)("去結帳")])),_:1})])])])])):(0,s.kq)("",!0),k])):((0,s.wg)(),(0,s.iD)("div",v,[x,(0,s._)("div",D,[C,(0,s.Wm)(Z,{to:"/products",class:"link-secondary fw-bolder text-decoration-none border-bottom border-secondary"},{default:(0,s.w5)((()=>[(0,s.Uk)("查看商品"),I])),_:1})])]))]),(0,s.Wm)(M,{num:5,isRandom:!0,classicType:!0,showTitle:!0})],64)}var z=i(7061),j=i(1122),q=i(5485),T={data(){return{cartInfo:{carts:[]},isLoading:!1}},components:{CartInfo:j.Z,Orderlist:z.Z,WebRecommand:q.Z},methods:{updateInfo(t){this.cartInfo=t,this.isLoading=!1}},created(){this.isLoading=!0}},W=i(89);const Z=(0,W.Z)(T,[["render",$]]);var M=Z}}]);
//# sourceMappingURL=394.f800137a.js.map
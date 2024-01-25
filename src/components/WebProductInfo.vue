<template>
  <div v-if="product.title" class="px-2">
    <div
      class="d-flex flex-wrap justify-content-between align-items-baseline mb-2"
    >
      <div class="d-flex flex-wrap align-items-baseline">
        <h2 class="mb-2 mb-lg-0 me-3">{{ product.title }}</h2>
        <div class="my-1">
          <a
            href="#"
            class="me-3"
            :class="{ collected: isCollected }"
            @click.prevent="setCollect(product.id)"
            ><i class="bi bi-suit-heart fs-4"></i
          ></a>
          <a href="#" class="me-3" @click.prevent="copyLink"
            ><i class="bi bi-share fs-4"></i
          ></a>
        </div>
      </div>
      <p class="text-gray mb-0">
        {{ `產品代碼：${product.id.substr(1, 8).toUpperCase()}` }}
      </p>
    </div>
    <ul class="list-unstyled lh-lg text-gray mt-4 mt-lg-2" style="text-align: justify">
      <li class="d-flex">
        <i class="bi bi-stars me-1"></i>{{ product.description }}
      </li>
      <li class="d-flex">
        <i class="bi bi-stars me-1"></i
        >選用新鮮食材、獨特低熱量配方、精心製作而成的美味點心。
      </li>
      <li class="d-flex">
        <i class="bi bi-stars me-1"></i
        >由經驗豐富的烘焙師手工製作，外殼酥脆、內餡飽滿，每一口都是完美的組合。
      </li>
      <li class="d-flex">
        <i class="bi bi-stars me-1"></i
        >我們的馬卡龍鮮豔多彩、煥發藝術感，無論是日常點心、歡聚、送禮或派對等重要場合，為您增添最精緻耀眼的點綴。
      </li>
      <li class="d-flex">
        <i class="bi bi-stars me-1"></i
        >提供精美的禮盒包裝，不論是送禮或自我品味都合適。訂購時可以在備註欄填寫喜歡的包裝色彩，免費為您客製化服務喔！
      </li>
    </ul>
    <p class="fs-4" v-if="product.origin_price === product.price">
      {{ `NT$${$filters.currency(product.origin_price)}元` }}
    </p>
    <p v-else>
      <span class="text-danger fs-4 me-2"
        >{{ `NT$${$filters.currency(product.price)}元` }}</span
      >
      <span
        class="badge rounded-pill bg-graySlight text-dark me-2"
        style="vertical-align: top"
        >{{ `${Math.floor((product.price / product.origin_price) * 10)}折` }}</span
      >
      <del class="text-gray"
        >{{ `NT$${$filters.currency(product.origin_price)}元` }}</del
      >
    </p>
    <p class="mb-2 text-gray">付款方式：線上刷卡/ATM轉帳/到店取貨付款</p>
    <p class="mb-3 text-gray">折價卷：本商品適用折價卷</p>
    <div class="d-flex flex-column flex-md-row">
      <div class="input-group me-md-3 mb-3 mb-md-0 w-100">
        <button
          type="button"
          class="btn btn-outline-graySlight py-2"
          @click="qty -= 1"
          :class="{ disabled: qty === 1 }"
        >
          <i class="bi bi-dash-lg"></i>
        </button>
        <input
          type="text"
          class="form-control text-center border-start-0 border-end-0"
          v-model="qty"
          @change="checkNum"
        />
        <button
          type="button"
          class="btn btn-outline-graySlight py-2"
          @click="qty++"
          :class="{ disabled: qty === 10 }"
        >
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
      <a
        href="#"
        class="zIndex position-relative btn btn-secondary w-100 py-2"
        @click.prevent="
          emitter.emit('addCart', { product_id: product.id, qty })
        "
        ><i class="bi bi-cart-plus me-2"></i>加到購物車</a
      >
    </div>
    <p class="mt-3 mb-0 text-gray">訂購數量上限為10，如有大量訂購需求，歡迎來電詢問！</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qty: 1,
      collect: ''
    }
  },
  props: ['product'],
  emits: ['addCart'],
  inject: ['emitter'],
  computed: {
    isCollected() {
      return this.collect.findIndex((id) => id === this.product.id) > -1
    }
  },
  methods: {
    checkNum() {
      this.qty = Number(this.qty)
      if (!this.qty) {
        this.qty = 1
      }
      if (this.qty < 1) {
        this.emitter.emit('sendMsg', {
          message: '訂購數量不可小於1',
          status: 'error'
        })
        this.qty = 1
      }
      if (this.qty > 10) {
        this.emitter.emit('sendMsg', {
          message: '訂購數量上限為10，如有大量訂購需求，歡迎來電詢問！',
          status: 'error'
        })
        this.qty = 10
      }
    },
    setQty(val) {
      this.qty = val
    },
    setCollect(id) {
      this.emitter.emit('setCollect', id)
    },
    copyLink() {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            this.emitter.emit('sendMsg', {
              message: '連結複製成功！',
              status: 'success'
            })
          })
          .catch(() => {
            this.emitter.emit('sendMsg', {
              message: '連結複製失敗',
              status: 'error'
            })
          })
      } else {
        this.emitter.emit('sendMsg', {
          message: '連結複製失敗',
          status: 'error'
        })
      }
    }
  },
  created() {
    this.emitter.on('collectInfo', (collect) => {
      this.collect = collect
    })
    this.emitter.emit('getCollectInfo')
  }
}
</script>

<style lang="scss">
.collected .bi-suit-heart.bi-suit-heart::before {
  content: '\f59d';
}
@media (min-width: 1200px) {
  .bi-suit-heart:hover.bi-suit-heart::before {
    content: '\f59d';
  }
  .bi-share:hover.bi-share::before {
    content: '\f52d';
  }
}
</style>

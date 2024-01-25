<template>
  <WebLoading :is-loading="isLoading"/>
  <CartInfo @updateInfo="updateInfo"/>
  <div class="container py-5" style="min-height: 60vh">
    <div v-if="cartInfo.carts.length > 0">
      <div
        class="row flex-column-reverse flex-lg-row justify-content-lg-between"
        v-if="cartInfo.carts[0].product"
      >
        <div class="col-lg-6">
          <Orderlist :cart-info="cartInfo" :isEdit="true"/>
        </div>
        <div class="col-lg-4">
          <div
            class="card mb-5 border-secondary"
          >
            <div class="card-body p-3 rounded">
              <h5 class="mb-3 fw-semibold">購物車總計</h5>
              <p class="border-bottom mb-1 pb-1">
                {{ `商品共 ${cartInfo.carts.reduce((acc, cur) => (acc += cur.qty), 0)} 件` }}
              </p>
              <div class="d-flex justify-content-between">
                <p class="mb-1">小計</p>
                <p class="mb-1">
                  {{ `${$filters.currency(cartInfo.total)}` }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-1">運費</p>
                <p class="mb-1">活動免運</p>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-1 mb-3"
              >
                <p class="mb-1">總金額</p>
                <p class="mb-1 fw-bolder">
                  {{ `NT$ ${$filters.currency(cartInfo.total)}` }}
                </p>
              </div>
              <router-link to="/order/check" class="btn btn-secondary w-100"
                >去結帳</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div v-else>
      <h5
        class="py-2 border-bottom"
      >
        購物車 (0)
      </h5>
      <div class="text-center py-5">
        <p class="me-sm-2 text-gray">購物車尚無資料</p>
        <router-link
          to="/products"
          class="link-secondary fw-bolder text-decoration-none border-bottom border-secondary"
          >查看商品<i class="bi bi-caret-right-fill"></i
        ></router-link>
      </div>
    </div>
  </div>
  <WebRecommand
    :num="5"
    :isRandom="true"
    :classicType="true"
    :showTitle="true"
  />
</template>

<script>
import Orderlist from '@/components/WebOrderlist.vue'
import CartInfo from '@/components/WebCartInfo.vue'
import WebRecommand from '@/components/WebRecommand.vue'
export default {
  data() {
    return {
      cartInfo: {
        carts: []
      },
      isLoading: false
    }
  },
  components: {
    CartInfo,
    Orderlist,
    WebRecommand
  },
  methods: {
    updateInfo(data) {
      this.cartInfo = data
      this.isLoading = false
    }
  },
  created() {
    this.isLoading = true
  }
}
</script>

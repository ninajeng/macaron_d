<template>
  <div class="container pb-5" style="min-height: 60vh">
    <h5 class="fw-bolder mb-3"><i class="bi bi-check-circle me-2"></i>完成訂單</h5>
    <div class="row justify-content-lg-between">
      <div class="col-lg-7">
        <OrderStatus @order-data="getOrder" :isSearch="false"/>
        <router-link
          to="/products"
          class="mb-5 btn btn-secondary"
          >繼續選購<i class="bi bi-caret-right-fill"></i
        ></router-link>
      </div>
      <div class="col-lg-4">
        <OrderCard
          :cart-info="orderProducts"
          :isEdit="false"
          v-if="getOrderComplete"
        >
          <template #title>訂單資料</template>
          <template #coupon>優惠券折扣：</template></OrderCard
        >
        <Orderlist
          :cart-info="orderProducts"
          :isEdit="false"
          v-if="getOrderComplete"
        >
          <template #title>訂單明細</template></Orderlist
        >
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
import OrderCard from '@/components/WebOrderCard.vue'
import OrderStatus from '@/components/WebOrderStatus.vue'
import WebRecommand from '@/components/WebRecommand.vue'
export default {
  data() {
    return {
      orderProducts: {},
      getOrderComplete: false
    }
  },
  props: ['cartInfo'],
  components: {
    Orderlist,
    OrderCard,
    OrderStatus,
    WebRecommand
  },
  methods: {
    getOrder(data) {
      this.orderProducts = data
      this.getOrderComplete = true
    }
  }
}
</script>

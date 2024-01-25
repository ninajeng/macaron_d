<template>
  <div class="container py-3 py-lg-5">
    <div class="row flex-column-reverse flex-lg-row justify-content-lg-between">
      <div class="col-lg-4" v-if="getOrderComplete">
        <OrderCard :cart-info="orderProducts" :isEdit="false">
          <template #title>訂單資料</template>
          <template #coupon>優惠券折扣：</template></OrderCard
        >
        <Orderlist :cart-info="orderProducts" :isEdit="false">
          <template #title>訂單明細</template></Orderlist
        >
      </div>
      <div class="col-lg-6">
        <OrderStatus @order-data="getOrder" :isSearch="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import Orderlist from '@/components/WebOrderlist.vue'
import OrderCard from '@/components/WebOrderCard.vue'
import OrderStatus from '@/components/WebOrderStatus.vue'
export default {
  data() {
    return {
      orderProducts: {},
      getOrderComplete: false
    }
  },
  inject: ['emitter'],
  components: {
    Orderlist,
    OrderCard,
    OrderStatus
  },
  methods: {
    getOrder(data) {
      this.orderProducts = data
      this.getOrderComplete = true
    }
  },
  created() {
    this.emitter.emit('updateCart')
  }
}
</script>

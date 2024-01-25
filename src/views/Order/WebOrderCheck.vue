<template>
  <div class="container py-5">
    <div
      class="row flex-column-reverse flex-lg-row justify-content-lg-between"
      v-if="cartInfo.carts[0]?.product"
    >
      <div class="col-lg-6">
        <Orderlist :cart-info="cartInfo" :isEdit="false"/>
      </div>
      <div class="col-lg-4">
        <OrderCard :cart-info="cartInfo" :isEdit="true">
          <template #title>訂單確認</template>
          <template #button
            ><router-link
              to="/order/purchaserData"
              class="btn btn-secondary w-100 mt-3"
              >下一步</router-link
            ></template
          >
        </OrderCard>
      </div>
    </div>
  </div>
</template>

<script>
import Orderlist from '@/components/WebOrderlist.vue'
import OrderCard from '@/components/WebOrderCard.vue'
export default {
  props: ['cartInfo'],
  components: {
    Orderlist,
    OrderCard
  }
}
</script>

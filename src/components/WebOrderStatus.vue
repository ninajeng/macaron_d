<template>
  <WebLoading :is-loading="isLoading" />
  <div :class="order.is_paid ? 'mb-3': 'mb-5'" v-if="order.user">
    <div
      class="container p-0"
      :class="{
        'mb-3 border-secondary p-4 border rounded': !order.is_paid
      }"
    >
      <div class="row g-2 g-sm-3">
        <div class="col-12 border-bottom pb-3" v-if="!order.is_paid">
          <h5 class="fw-bolder mb-3">選擇付款方式</h5>
          <div class="d-flex mb-3 text-warning-emphasis" v-if="!order.is_paid">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <p
              class="mb-0"
              style="
                background-image: linear-gradient(
                  transparent 60%,
                  var(--bs-warning-bg-subtle) 40%
                );
              "
            >
              訂單尚未完成，請完成付款手續
            </p>
          </div>
          <div class="input-group">
            <select class="form-select">
              <option value="線上刷卡">線上刷卡</option>
              <option value="ATM轉帳">ATM轉帳</option>
              <option value="門市付款">
                {{
                  order.user.address.indexOf('門市取貨') > -1
                    ? '門市取貨付款'
                    : '門市付款'
                }}
              </option>
            </select>
            <button type="button" class="btn btn-secondary" @click="payment">
              付款
            </button>
          </div>
        </div>
        <div class="col-12" v-if="order.is_paid">
          <p class="mb-0 d-none d-sm-inline-block"
              style="
              background-image: linear-gradient(
                transparent 60%,
                var(--bs-success-bg-subtle) 40%
              );
            ">
            {{
              `${
                order.user.address.indexOf('門市取貨') > -1
                  ? '商品將於七個工作天內完成，我們將與您聯繫確認取貨日期。'
                  : '商品將於七個工作天內送達。'
              }`
            }}
          </p>
          <p class="mb-2 d-sm-none bg-success-subtle p-3 rounded lh-lg">
            {{
              `${
                order.user.address.indexOf('門市取貨') > -1
                  ? '商品將於七個工作天內完成，我們將與您聯繫確認取貨日期。'
                  : '商品將於七個工作天內送達。'
              }`
            }}
          </p>
        </div>
        <div class="col-sm-4">
          <h5 class="fs-6 mb-0 mt-2 mt-sm-0 fw-semibold">訂單狀態</h5>
        </div>
        <div class="col-sm-8 text-gray">
          <p class="mb-0">{{ order.is_paid ? '訂單已成立' : '尚未付款' }}</p>
        </div>
        <div class="col-sm-4">
          <h5 class="fs-6 mt-2 mt-sm-0 mb-0 fw-semibold">訂購人資料</h5>
        </div>
        <div class="col-sm-8 text-gray">
          <p class="mb-1">{{ order.user.name }}</p>
          <p class="mb-1">{{ order.user.tel }}</p>
          <p class="mb-1">{{ order.user.email }}</p>
          <p class="mb-0" :class="{ 'mb-1': order.message }">
            {{ order.user.address }}
          </p>
          <p class="mb-0" style="text-align: justify" v-if="order.message">
            {{ `訂單備註："${order.message}"` }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      orderProducts: {},
      orderId: '',
      isLoading: false
    }
  },
  inject: ['emitter'],
  emits: ['orderData', 'getError'],
  props: ['isSearch'],
  methods: {
    getOrder(id) {
      const API_GETORDER = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.isLoading = true
      this.axios
        .get(API_GETORDER)
        .then((res) => {
          if (res.data.success) {
            if (res.data.order.is_paid && this.$route.name !== 'complete') {
              this.$router.push(`/order/complete/${id}`)
            } else if (
              !res.data.order.is_paid &&
              this.$route.name !== 'payment'
            ) {
              this.$router.push(`/order/payment/${id}`)
            }
            this.order = res.data.order
            this.orderProducts.carts = Object.values(res.data.order.products)
            this.orderProducts.final_total = res.data.order.total
            this.orderProducts.total = this.orderProducts.carts.reduce(
              (acc, cur) => {
                acc += cur.total
                return acc
              },
              0
            )
            this.$emit('orderData', this.orderProducts)
          } else {
            this.getOrderFail()
          }
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          this.getOrderFail()
        })
    },
    getOrderFail() {
      if (this.isSearch) {
        this.$emit('getError')
      } else {
        this.emitter.emit('sendMsg', {
          message: '無此訂單',
          status: 'error'
        })
        this.$router.replace('/cart')
      }
    },
    payment() {
      const API_PAY = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.$route.params.id}`
      this.isLoading = true
      this.axios
        .post(API_PAY)
        .then((res) => {
          if (res.data.success) {
            this.$router.push(`/order/complete/${this.$route.params.id}`)
          } else {
            this.emitter.emit('sendMsg', {
              message: '付款失敗，請聯繫店家',
              status: 'error'
            })
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          alert(e)
        })
    }
  },
  created() {
    if (!this.isSearch) {
      this.getOrder(this.$route.params.id)
    }
  }
}
</script>

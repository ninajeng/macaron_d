<template>
  <WebLoading :is-loading="isLoading"/>
  <div
    class="card mb-5 border-secondary"
    :class="{'border-0': !isEdit}"
  >
    <div class="card-body" :class="{'p-0': !isEdit}">
      <h5 class="fw-normal" :class="{'fw-bolder ms-2': isEdit}"><slot name="title">訂單確認</slot></h5>
      <div :class="isEdit ? 'px-2' : 'text-gray'">
        <p class="py-1 border-top mb-0">
          {{ `商品共 ${cartInfo.carts.reduce((acc, cur) => (acc += cur.qty), 0)} 件` }}
        </p>
        <div class="d-flex justify-content-between">
          <p class="mb-1">小計</p>
          <p class="mb-1">{{ $filters.currency(cartInfo.total) }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="mb-1">運費</p>
          <p class="mb-1">活動免運</p>
        </div>
        <div class="input-group mb-2 pt-1" v-if="isEdit">
          <input
            type="text"
            class="form-control border-gray border-end-0"
            placeholder="輸入優惠碼"
            v-model="couponCode"
          />
          <button type="button" class="btn btn-outline-gray" @click="useCoupon">
            套用
          </button>
        </div>
        <div
          class="d-flex justify-content-between flex-wrap"
          v-if="cartInfo.carts[0].coupon"
        >
          <p class="w-100 mb-1">
            <slot name="coupon">已套用的優惠券：</slot>
          </p>
          <p class="mb-1">
            {{
              `${cartInfo.carts[0].coupon.code} ${cartInfo.carts[0].coupon.title}`
            }}
          </p>
          <p class="mb-1 flex-fill text-end">
            {{ `-${$filters.currency(cartInfo.total - cartInfo.final_total)}` }}
          </p>
        </div>
        <div
          class="d-flex justify-content-between border-top pt-1"
        >
          <p class="mb-1">總金額</p>
          <p class="mb-1 fw-bolder">
            {{ `NT$ ${$filters.currency(cartInfo.final_total)}` }}
          </p>
        </div>
      </div>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponCode: '',
      isLoading: false
    }
  },
  props: ['cartInfo', 'isEdit'],
  inject: ['emitter'],
  methods: {
    useCoupon() {
      const API_USECOUPON = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      this.isLoading = true
      this.axios
        .post(API_USECOUPON, { data: { code: this.couponCode } })
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: '已套用優惠',
              status: 'success'
            })
            this.emitter.emit('updateCart')
          } else {
            this.couponError(res.data.message)
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.couponError(e)
        })
    },
    couponError(err) {
      this.emitter.emit('sendMsg', {
        message: err,
        status: 'error'
      })
    }
  }
}
</script>

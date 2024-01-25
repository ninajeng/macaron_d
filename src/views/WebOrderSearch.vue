<template>
  <WebLoading :is-loading="isLoading"/>
  <div class="container py-5">
    <div
      class="py-3 d-flex align-items-baseline justify-content-between border-bottom"
    >
      <h5 class="mb-0">訂單查詢</h5>
    </div>
    <div class="py-3" style="min-height: 50vh">
        <p class="mb-2">訂單編號共20碼，<span class="d-block d-sm-inline">如-Ni4rTAfW4To-DrkMO0G</span></p>
        <div
          class="alert alert-warning border-warning d-inline-block"
          v-if="searchError"
        >
        <div class="d-flex">
          <i class="bi bi-x-circle me-2"></i>
          <p class="mb-0">
            {{ `查無此訂單"${errorId}"。請確認訂單號碼是否正確，或來電由專人為您服務。` }}
          </p>
        </div>
        </div>
        <VForm v-slot="{ errors, validate }">
          <div class="input-group" style="max-width: 400px;">
            <VField
              name="訂單編號"
              class="form-control border border-gray border-end-0"
              :class="{ 'is-invalid': errors['訂單編號'] }"
              placeholder="請輸入20碼訂單編號"
              v-model="orderId"
              rules="length:20"
              @keypress="checkKeypress($event, validate)"
            />
            <button
              type="button"
              class="btn btn-gray"
              @click.prevent="search(validate)"
            >
              <i class="bi bi-search me-2"></i>查詢
            </button>
            <ErrorMessage
              name="訂單編號"
              class="invalid-feedback"
            />
          </div>
        </VForm>
    </div>
  </div>
  <div class="d-none">
    <OrderStatus
      @get-error="getError"
      :isSearch="true"
      ref="OrderStatus"
    />
  </div>
  <WebRecommand
    :num="5"
    :isRandom="true"
    :classicType="true"
    :showTitle="true"
  />
</template>

<script>
import OrderStatus from '@/components/WebOrderStatus.vue'
import WebRecommand from '@/components/WebRecommand.vue'
export default {
  data() {
    return {
      orderId: '',
      searchError: false,
      errorId: '',
      isLoading: false
    }
  },
  components: {
    OrderStatus,
    WebRecommand
  },
  methods: {
    async search(validate) {
      try {
        const isValid = await validate()
        if (!isValid.valid) return
        this.isLoading = true
        this.$refs.OrderStatus.getOrder(this.orderId)
        this.errorId = this.orderId
      } catch (e) {
        this.emitter.emit('sendMsg', {
          message: '訂單編號格式驗證失敗',
          status: 'error'
        })
      }
    },
    getError() {
      this.isLoading = false
      this.searchError = true
    },
    checkKeypress(e, validate) {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.search(validate)
      }
    }
  },
  mounted() {
    window.scrollTo({ top: 0 })
  }
}
</script>

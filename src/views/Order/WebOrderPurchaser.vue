<template>
  <WebLoading :is-loading="isLoading"/>
  <div class="container py-5">
    <div
      class="row flex-column-reverse flex-lg-row justify-content-lg-between"
      v-if="cartInfo.carts[0]?.product"
    >
      <div class="col-lg-4">
        <OrderCard :cart-info="cartInfo" :isEdit="false">
          <template #title>訂單資料</template>
          <template #coupon>優惠券折扣：</template></OrderCard
        >
        <Orderlist :cart-info="cartInfo" :isEdit="false"/>
      </div>
      <div class="col-lg-6">
        <div class="card border-secondary mb-5">
          <div class="card-body p-3 rounded">
            <h5 class="fw-bolder mb-3">填寫訂購人資料</h5>
            <VForm v-slot="{ errors }" @submit="onSubmit">
              <div class="mb-3">
                <label for="purchaser" class="form-label">訂購人姓名*</label>
                <VField
                  id="purchaser"
                  name="訂購人姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['訂購人姓名'] }"
                  placeholder="請輸入訂購人姓名"
                  rules="required"
                  v-model="purchaser.name"
                />
                <ErrorMessage
                  name="訂購人姓名"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email*</label>
                <VField
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 E-mail"
                  rules="email|required"
                  v-model="purchaser.email"
                />
                <ErrorMessage
                  name="email"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">手機*</label>
                <VField
                  id="tel"
                  name="手機"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['手機'] }"
                  placeholder="請輸入手機號碼"
                  :rules="isPhone"
                  v-model="purchaser.tel"
                />
                <ErrorMessage
                  name="手機"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3">
                <label for="delivery" class="form-label">運送方式*</label>
                <VField
                  id="delivery"
                  name="運送方式"
                  class="form-select"
                  :class="{ 'is-invalid': errors['運送方式'] }"
                  rules="required"
                  v-model="delivery.way"
                  as="select"
                >
                  <option value="" disabled>請選擇運送方式</option>
                  <option value="門市取貨">門市取貨</option>
                  <option value="貨運低溫宅配">貨運低溫宅配</option>
                  <option value="超商冷藏運送">超商冷藏運送</option>
                </VField>
                <ErrorMessage
                  name="運送方式"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3" v-if="delivery.way === '超商冷藏運送'">
                <label for="contact" class="form-label">配送門市*</label>
                <VField
                  id="contact"
                  name="地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請填寫配送超商門市"
                  rules="required"
                  v-model="delivery.address"
                />
                <ErrorMessage
                  name="地址"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3" v-else-if="delivery.way === '貨運低溫宅配'">
                <label for="contact" class="form-label">地址*</label>
                <VField
                  id="contact"
                  name="地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入收貨地址"
                  rules="required"
                  v-model="delivery.address"
                />
                <ErrorMessage
                  name="地址"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3">
                <label for="message" class="form-label"
                  >備註 (字數限制100字)</label
                >
                <VField
                  id="message"
                  name="備註"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['備註'] }"
                  placeholder="如欲指定禮盒包裝、緞帶顏色等特殊需求，請留言給我們，會有專人與您電話聯繫！"
                  rules="max:100"
                  v-model="message"
                  rows="3"
                  as="textarea"
                ></VField>
                <ErrorMessage
                  name="備註"
                  class="invalid-feedback"
                />
              </div>
              <button
                type="submit"
                class="btn btn-secondary w-100"
              >
                下一步
              </button>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Orderlist from '@/components/WebOrderlist.vue'
import OrderCard from '@/components/WebOrderCard.vue'
export default {
  data() {
    return {
      purchaser: {
        email: '',
        name: '',
        tel: '',
        address: ''
      },
      message: '',
      delivery: {
        way: '',
        address: ''
      },
      isLoading: false
    }
  },
  inject: ['emitter'],
  props: ['cartInfo'],
  components: {
    Orderlist,
    OrderCard
  },
  methods: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請填寫正確的電話號碼'
    },
    onSubmit() {
      this.purchaser.address = `${this.delivery.way}：${
          this.delivery.address || '到店'
        }`
      const API_ORDER = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.isLoading = true
      this.axios
        .post(API_ORDER, {
          data: { user: this.purchaser, message: this.message }
        })
        .then((res) => {
          if (res.data.success) {
            this.$router.push(`/order/payment/${res.data.orderId}`)
          } else {
            this.isLoading = false
            this.submitError(res.data.message)
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.submitError(e)
        })
    },
    submitError(err) {
      this.emitter.emit('sendMsg', {
        message: err,
        status: 'error'
      })
    }
  }
}
</script>

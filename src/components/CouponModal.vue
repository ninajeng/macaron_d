<template>
  <LoadingVue :active="isLoading" style="z-index: 1056"></LoadingVue>
  <div class="modal fade" tabindex="-1" ref="couponModal">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <VForm v-slot="{ errors }">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h1 class="modal-title fs-5 text-white">優惠券資料</h1>
            <button type="button" class="btn-close" @click="hideModal"></button>
          </div>
          <div class="modal-body p-4 text-secondary">
            <div class="mb-3">
              <label for="code" class="form-label">優惠券代碼*</label>
              <VField
                type="text"
                name="優惠券代碼"
                id="code"
                class="form-control"
                :class="{ 'is-invalid': formInvalid['優惠券代碼'] }"
                @change="delete formInvalid['優惠券代碼']"
                rules="required"
                v-model="coupon.code"
                placeholder="請輸入優惠券代碼"
              />
              <ErrorMessage name="優惠券代碼" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="title" class="form-label">優惠券名稱*</label>
              <VField
                type="text"
                name="優惠券名稱"
                id="title"
                class="form-control"
                :class="{ 'is-invalid': formInvalid['優惠券名稱'] }"
                @change="delete formInvalid['優惠券名稱']"
                rules="required"
                v-model="coupon.title"
                placeholder="請輸入優惠券名稱"
              />
              <ErrorMessage name="優惠券名稱" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="percent" class="form-label"
                >折扣內容* <span class="text-muted">(限制：1~99)</span></label
              >
              <div>
                <VField
                  type="number"
                  name="優惠券折扣數"
                  class="form-control d-inline-block me-1"
                  :class="{ 'is-invalid': formInvalid['優惠券折扣數'] }"
                  @change="delete formInvalid['優惠券折扣數']"
                  rules="required"
                  style="width: 250px"
                  id="percent"
                  v-model="coupon.percent"
                  min="1"
                  max="99"
                  placeholder="請輸入折扣數（如：90）"
                />
                =<span class="ms-1"
                  >{{ coupon.percent ? coupon.percent / 10 : '？' }}折</span
                >
                <ErrorMessage name="優惠券折扣數" class="invalid-feedback" />
              </div>
            </div>
            <div class="d-lg-flex">
              <div class="me-5">
                <label for="dueDate" class="form-label">優惠截止日期*</label>
                <VField
                  type="date"
                  name="截止日期"
                  class="form-control"
                  :class="{ 'is-invalid': formInvalid['截止日期'] }"
                  @change="delete formInvalid['截止日期']"
                  rules="required"
                  style="width: 250px"
                  id="dueDate"
                  ref="dueDateDefault"
                  v-model="dueDateLocal"
                  @input="dueDateLocal = $event.target.value"
                  min="2123-1-01"
                  max="2123-12-31"
                />
                <ErrorMessage name="截止日期" class="invalid-feedback" />
              </div>
              <div class="mt-3 mt-lg-0">
                <label for="dueTimeHour" class="form-label"
                  >優惠截止時間*</label
                >
                <div>
                  <VField
                    type="number"
                    name="截止時間(hour)"
                    class="form-control d-inline-block w-auto"
                    :class="{ 'is-invalid': formInvalid['截止時間(hour)'] }"
                    @change="delete formInvalid['截止時間(hour)']"
                    rules="required"
                    id="dueTimeHour"
                    v-model="dueTimeHour"
                    placeholder="時"
                    min="0"
                    max="23"
                  />：
                  <VField
                    type="number"
                    name="截止時間(minute)"
                    class="form-control d-inline-block w-auto"
                    :class="{ 'is-invalid': formInvalid['截止時間(minute)'] }"
                    @change="delete formInvalid['截止時間(minute)']"
                    rules="required"
                    v-model="dueTimeMinute"
                    placeholder="分"
                    min="0"
                    max="59"
                  />：
                  <VField
                    type="number"
                    name="截止時間(sec)"
                    class="form-control d-inline-block w-auto"
                    :class="{ 'is-invalid': formInvalid['截止時間(sec)'] }"
                    @change="delete formInvalid['截止時間(sec)']"
                    rules="required"
                    v-model="dueTimeSec"
                    placeholder="秒"
                    min="0"
                    max="59"
                  />
                  <ErrorMessage
                    name="截止時間(hour)"
                    class="invalid-feedback"
                  />
                  <ErrorMessage
                    name="截止時間(minute)"
                    class="invalid-feedback"
                  />
                  <ErrorMessage name="截止時間(sec)" class="invalid-feedback" />
                </div>
              </div>
            </div>
            <div class="form-check my-3">
              <input
                type="checkbox"
                name="is_enabled"
                id="is_enabled"
                class="form-check-input active"
                v-model="coupon.is_enabled"
                :checked="coupon.is_enabled === 1"
              />
              <label for="is_enabled" class="form-check-label">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-gray"
              @click="hideModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="updateCoupon(errors)"
            >
              {{ coupon.id ? '更新' : '新增' }}
            </button>
          </div>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  data() {
    return {
      modal: {},
      coupon: {
        code: '',
        title: '',
        percent: 90,
        is_enabled: true
      },
      dueDateDefault: '',
      dueDateLocal: '',
      dueTimeHour: '23',
      dueTimeMinute: '59',
      dueTimeSec: '59',
      formInvalid: {},
      isLoading: false
    }
  },
  props: ['tempCoupon'],
  emits: ['updateCoupon', 'createCoupon'],
  inject: ['emitter'],
  watch: {
    tempCoupon() {
      this.getData()
    },
    dueDate_unix() {
      if (this.dueDate_unix.toString().length === 10) {
        this.coupon.due_date = this.dueDate_unix
      }
    },
    dueTimeHour() {
      this.dueTimeHour = this.checkValue(this.dueTimeHour, 23, 0)
    },
    dueTimeMinute() {
      this.dueTimeMinute = this.checkValue(this.dueTimeMinute, 59, 0)
    },
    dueTimeSec() {
      this.dueTimeSec = this.checkValue(this.dueTimeSec, 59, 0)
    },
    coupon: {
      handler() {
        if (this.coupon.percent !== '') {
          this.coupon.percent = this.checkValue(this.coupon.percent, 99, 1)
        }
      },
      deep: true
    }
  },
  computed: {
    dueDate_unix() {
      if (
        !this.dueDateLocal ||
        this.dueTimeHour === '' ||
        !this.dueTimeMinute === '' ||
        !this.dueTimeSec === ''
      ) {
        return '請輸入截止日期與時間！'
      } else {
        const dateTime = `${this.dueDateLocal} ${this.dueTimeHour}:${this.dueTimeMinute}:${this.dueTimeSec}`
        return this.$filters.datetimeToUnix(dateTime)
      }
    }
  },
  methods: {
    showModal() {
      this.formInvalid = {}
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
      this.getData()
    },
    getData() {
      this.coupon = JSON.parse(JSON.stringify(this.tempCoupon))
      if (!this.coupon.due_date) {
        this.dueDateLocal = this.dueDateDefault
        this.dueTimeHour = 24
        this.dueTimeMinute = 59
        this.dueTimeSec = 59
        this.coupon.is_enabled = true
      } else {
        this.dueDateLocal = this.$filters.unixToDate(this.coupon.due_date)
        const time = this.$filters.unixToTime(this.coupon.due_date).split(':')
        this.dueTimeHour = time[0]
        this.dueTimeMinute = time[1]
        this.dueTimeSec = time[2]
      }
    },
    updateCoupon(errors = {}) {
      this.formInvalid = { ...errors }
      if (Object.keys(this.formInvalid).length === 0) {
        this.coupon.is_enabled = this.coupon.is_enabled ? 1 : 0
        if (this.coupon.id) {
          this.$emit('updateCoupon', this.coupon)
        } else {
          this.$emit('createCoupon', this.coupon)
        }
      }
    },
    checkValue(num, max, min) {
      if (num < min) return min
      else if (num > max) return max
      else return num
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.couponModal, { backdrop: 'static' })
    this.dueDateDefault = this.$filters.unixToDate(new Date() / 1000)
  }
}
</script>

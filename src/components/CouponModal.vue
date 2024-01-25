<template>
  <LoadingVue :active="isLoading" style="z-index: 1056"></LoadingVue>
  <div class="modal fade" tabindex="-1" ref="couponModal">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h1 class="modal-title fs-5 text-white">優惠券資料</h1>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body p-4 text-secondary">
            <div class="mb-3">
              <label for="code" class="form-label">優惠券代碼*</label>
              <input
                type="text"
                class="form-control"
                id="code"
                v-model="coupon.code"
                placeholder="請輸入優惠券代碼"
              />
            </div>
            <div class="mb-3">
              <label for="title" class="form-label">優惠券名稱*</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="coupon.title"
                placeholder="請輸入優惠券名稱"
              />
            </div>
            <div class="mb-3">
              <label for="percent" class="form-label"
                >折扣內容* <span class="text-muted">(限制：1~99)</span></label
              >
              <div>
                <input
                  type="number"
                  class="form-control d-inline-block me-1"
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
              </div>
            </div>
            <div class="d-lg-flex">
              <div class="me-5">
                <label for="dueDate" class="form-label">優惠截止日期*</label>
                <input
                  type="date"
                  class="form-control"
                  style="width: 250px"
                  id="dueDate"
                  ref="dueDateDefault"
                  v-model="dueDateLocal"
                  @input="dueDateLocal = $event.target.value"
                  min="2123-1-01"
                  max="2123-12-31"
                />
              </div>
              <div class="mt-3 mt-lg-0">
                <label for="dueTimeHour" class="form-label"
                  >優惠截止時間*</label
                >
                <div>
                  <input
                    type="number"
                    class="form-control d-inline-block w-auto"
                    id="dueTimeHour"
                    v-model="dueTimeHour"
                    placeholder="時"
                    min="0"
                    max="23"
                  />：
                  <input
                    type="number"
                    class="form-control d-inline-block w-auto"
                    id="dueHour"
                    v-model="dueTimeMinute"
                    placeholder="分"
                    min="0"
                    max="59"
                  />：
                  <input
                    type="number"
                    class="form-control d-inline-block w-auto"
                    id="dueHour"
                    v-model="dueTimeSec"
                    placeholder="秒"
                    min="0"
                    max="59"
                  />
                </div>
              </div>
            </div>
            <p class="text-muted ms-1" style="font-size: 0.75rem">
              {{ `截止日 unix 格式：${dueDate_unix}` }}
            </p>
            <div class="form-check mb-3">
              <input
                type="checkbox"
                name="is_enabled"
                id="is_enabled"
                class="form-check-input active"
                v-model="coupon.is_enabled"
                :checked="coupon.is_enabled === 1"
              />
              <label for="is_enabled" class="form-check-label">是否啟用*</label>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-gray" @click="hideModal">
            取消
          </button>
          <button type="button" class="btn btn-secondary" @click="updateCoupon">
            {{ coupon.id ? '更新' : '新增' }}
          </button>
        </div>
      </div>
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
        percent: 90,
        is_enabled: true
      },
      dueDateDefault: '',
      dueDateLocal: '',
      dueTimeHour: '23',
      dueTimeMinute: '59',
      dueTimeSec: '59',
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
    updateCoupon() {
      const error = this.checkFormatError().join(', ')
      if (error) {
        this.emitter.emit('sendMsg', {
          message: error,
          status: 'error',
          title: '資料格式錯誤'
        })
      } else {
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
    },
    checkFormatError() {
      const errMsg = []
      if (!this.coupon.code) errMsg.push('優惠券代碼為必填')
      if (!this.coupon.title) errMsg.push('優惠券名稱為必填')
      if (!this.coupon.percent) errMsg.push('折扣內容日為必填')
      if (!this.coupon.due_date) errMsg.push('優惠截止日為必填')
      return errMsg
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.couponModal, { backdrop: 'static' })
    this.dueDateDefault = this.$filters.unixToDate(new Date() / 1000)
  }
}
</script>

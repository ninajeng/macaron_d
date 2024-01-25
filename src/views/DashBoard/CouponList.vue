<template>
  <LoadingVue :active="isLoading" style="z-index: 1056"/>
  <CouponModal
    :temp-coupon="tempCoupon"
    @update-coupon="updateCoupon"
    @create-coupon="createCoupon"
    ref="couponModal"
  />
  <DeleteModal
    ref="deleteModal"
    :delete-item="deleteCoupon"
    :item="'優惠券'"
    @delete="deleteId"
  />
  <div class="d-flex justify-content-between pt-4 mb-3 pe-1">
    <h2 class="m-0 fw-bolder">優惠券列表</h2>
    <button
      type="button"
      class="btn btn-secondary align-self-center me-3"
      @click="editCoupon()"
    >
      新增優惠券
    </button>
  </div>
  <div class="overflow-x-auto mb-3">
    <table class="table table-hover align-middle text-nowrap">
      <thead class="border-dark">
        <tr>
          <th>優惠券代碼</th>
          <th>優惠券名稱</th>
          <th class="text-center">折扣內容</th>
          <th>優惠截止時間</th>
          <th>優惠券狀態</th>
          <th width="150" class="text-center">編輯/刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in couponList" :key="coupon.id">
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.title }}</td>
          <td class="text-center">{{ `${coupon.percent / 10}折` }}</td>
          <td>{{ $filters.unixToDatetime(coupon.due_date) }}</td>
          <td :class="checkStatus(coupon) ? 'text-success' : 'text-gray'">
            <i class="bi bi-check fw-bolder" v-if="checkStatus(coupon)"></i>
            <i class="bi bi-x" v-else></i>
            <span class="text-danger" v-if="coupon.due_date < Date.now().toString().substring(0, 10)">已過期</span>
            <span v-else>尚未過期</span>,
            <span class="text-danger" v-if="!coupon.is_enabled">未啟用</span>
            <span v-else>啟用</span>
          </td>
          <td class="text-center">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-outline-success"
                @click="editCoupon(coupon)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteConfirm(coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
  <Pagination :page-info="pageInfo" @set-page="getCoupon"/>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DeleteModal from '@/components/DelModal.vue'
import Pagination from '@/components/PaginationItem.vue'
export default {
  data() {
    return {
      couponList: [],
      tempCoupon: {},
      couponStatus: {},
      deleteCoupon: {},
      isLoading: false,
      pageInfo: {}
    }
  },
  inject: ['emitter'],
  components: {
    CouponModal,
    DeleteModal,
    Pagination
  },
  methods: {
    getCoupon(page = 1) {
      this.isLoading = true
      window.scrollTo({ top: 0 })
      const API_GETCOUPON = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=1`
      this.axios
        .get(API_GETCOUPON)
        .then((res) => {
          if (!res.data.success) {
            this.emitter.emit('sendMsg', {
              message: `優惠券讀取失敗：${res.data.message}`,
              status: 'error'
            })
          } else {
            this.couponList = res.data.coupons
            this.pageInfo = res.data.pagination
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: `優惠券讀取失敗：${e}`,
            status: 'error'
          })
        })
    },
    editCoupon(coupon = {}) {
      this.tempCoupon = coupon
      this.$refs.couponModal.showModal()
    },
    updateCoupon(coupon) {
      this.isLoading = true
      const API_UPDATE = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`
      this.axios
        .put(API_UPDATE, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: `優惠券已更新：${coupon.title}`,
              status: 'success'
            })
            this.$refs.couponModal.hideModal()
            this.getCoupon()
          } else {
            this.isLoading = false
            this.emitter.emit('sendMsg', {
              message: res.data.message.join(', '),
              status: 'error',
              title: '優惠券更新失敗'
            })
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: e,
            status: 'error',
            title: '優惠券更新失敗'
          })
        })
    },
    createCoupon(coupon) {
      const API_ADDCOUPON = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      this.isLoading = true
      this.axios
        .post(API_ADDCOUPON, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: `已新增優惠券：${coupon.title}`,
              status: 'success'
            })
            this.$refs.couponModal.hideModal()
            this.getCoupon()
          } else {
            this.isLoading = false
            this.emitter.emit('sendMsg', {
              message: res.data.message.join(', '),
              status: 'error',
              title: '優惠券新增失敗'
            })
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: e,
            status: 'error',
            title: '優惠券新增失敗'
          })
        })
    },
    deleteConfirm(coupon) {
      this.deleteCoupon = coupon
      this.$refs.deleteModal.showModal()
    },
    deleteId() {
      this.isLoading = true
      this.$refs.deleteModal.hideModal()
      const API_DELETE = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.deleteCoupon.id}`
      this.axios
        .delete(API_DELETE)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: `已刪除優惠券：${this.deleteCoupon.title}`,
              status: 'success'
            })
          } else {
            this.emitter.emit('sendMsg', {
              message: `${res.data.message}`,
              status: 'error',
              title: '優惠券刪除失敗'
            })
          }
          this.getCoupon(this.pageInfo.current_page)
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: `${e}`,
            status: 'error',
            title: '優惠券刪除失敗'
          })
        })
    },
    checkStatus(coupon) {
      return coupon.due_date > Date.now().toString().substring(0, 10) && coupon.is_enabled
    }
  },
  created() {
    this.getCoupon()
  }
}
</script>

<template>
  <LoadingVue :active="isLoading" style="z-index: 1056"/>
  <OrderModal :temp-order="tempOrder" @update-order="updateOrder" ref="orderModal"/>
  <DeleteModal
    ref="deleteModal"
    :delete-item="deleteOrder"
    :item="'訂單'"
    @delete="deleteId"
  />
  <div class="pt-4 mb-3">
    <h2 class="m-0 fw-bolder">訂單列表</h2>
  </div>
  <div class="overflow-x-auto mb-3">
    <table class="table table-hover align-middle text-nowrap">
      <thead>
        <tr>
          <th>訂單日期</th>
          <th>訂單編號</th>
          <th>訂單狀態</th>
          <th>訂購人</th>
          <th>使用優惠券</th>
          <th class="text-end">訂單金額</th>
          <th width="250" class="text-center">查看內容/刪除</th>
        </tr>
      </thead>
      <tbody v-if="orderList.length > 0">
        <tr v-for="order in orderList" :key="order.id">
          <td>{{ $filters.unixToDate(order.create_at) }}</td>
          <td>{{ order.id }}</td>
          <td :class="{'text-danger': !order.is_paid}">{{ order.is_paid ? '訂單已完成' : '尚未付款' }}</td>
          <td>{{ order.user.name }}</td>
          <td>{{ Object.values(order.products)[0].coupon ? Object.values(order.products)[0].coupon.title: '無' }}</td>
          <td class="text-end">{{ `$${$filters.currency(order.total)}` }}</td>
          <td class="text-center">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-outline-success"
                @click="editOrder(order)"
              >
              查看內容
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteConfirm(order)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :page-info="pageInfo" @set-page="getOrderList"/>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue'
import DeleteModal from '@/components/DelModal.vue'
import Pagination from '@/components/PaginationItem.vue'
export default {
  data() {
    return {
      orderList: [],
      tempOrder: {},
      deleteOrder: {},
      isLoading: false,
      pageInfo: {}
    }
  },
  components: {
    OrderModal,
    DeleteModal,
    Pagination
  },
  inject: ['emitter'],
  methods: {
    getOrderList(page = 1) {
      this.isLoading = true
      window.scrollTo({ top: 0 })
      const API_GETORDER = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.axios
        .get(API_GETORDER)
        .then((res) => {
          if (!res.data.success) {
            this.emitter.emit('sendMsg', {
              message: `訂單讀取失敗：${res.data.message}`,
              status: 'error'
            })
          } else {
            this.orderList = res.data.orders
            this.pageInfo = res.data.pagination
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: `訂單讀取失敗：${e}`,
            status: 'error'
          })
        })
    },
    deleteConfirm(order) {
      this.deleteOrder = order
      this.$refs.deleteModal.showModal()
    },
    editOrder(order) {
      this.tempOrder = order
      this.$refs.orderModal.showModal()
    },
    deleteId() {
      this.isLoading = true
      this.$refs.deleteModal.hideModal()
      const API_DELETEORDER = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.deleteOrder.id}`
      this.axios
        .delete(API_DELETEORDER)
        .then((res) => {
          if (!res.data.success) {
            this.emitter.emit('sendMsg', {
              message: `訂單刪除失敗：${res.data.message}`,
              status: 'error'
            })
          } else {
            this.emitter.emit('sendMsg', {
              message: '訂單已刪除',
              status: 'success'
            })
          }
          this.getOrderList(this.pageInfo.current_page)
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: `訂單刪除失敗：${e}`,
            status: 'error'
          })
        })
    },
    updateOrder(order) {
      const data = JSON.parse(JSON.stringify(order))
      data.is_paid = !data.is_paid
      const API_UPDATEORDER = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${data.id}`
      this.axios
        .put(API_UPDATEORDER, { data })
        .then((res) => {
          if (!res.data.success) {
            this.emitter.emit('sendMsg', {
              message: `訂單更新失敗：${res.data.message}`,
              status: 'error'
            })
            this.isLoading = false
          } else {
            this.emitter.emit('sendMsg', {
              message: '已更新訂單資訊',
              status: 'success'
            })
            this.$refs.orderModal.hideModal()
            this.getOrderList(this.pageInfo.current_page)
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: `訂單更新失敗：${e}`,
            status: 'error'
          })
        })
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

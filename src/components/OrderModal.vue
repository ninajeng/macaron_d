<template>
  <LoadingVue :active="isLoading" style="z-index: 1056"/>
  <div class="modal fade" tabindex="-1" ref="orderModal">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h1 class="modal-title fs-5 text-white">訂單內容</h1>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body text-nowrap" v-if="order.user">
          <div class="m-3 p-3 bg-secondary-subtle rounded overflow-x-auto">
            <h5 class="fw-bolder text-secondary">訂單總覽</h5>
            <div class="d-flex mb-1">
              <div class="me-5">
                <p class="mb-0 me-2 py-1">
                  <span class="fw-bolder pe-3">訂單狀態</span
                  ><span :class="{ 'text-danger': !order.is_paid }">{{
                    order.is_paid ? '訂單已完成' : '尚未付款'
                  }}</span>
                </p>
                <p class="mb-2 mt-1">
                  <span class="fw-bolder pe-3">訂單日期</span
                  >{{ $filters.unixToDatetime(order.create_at) }}
                </p>
                <p class="mb-2">
                  <span class="fw-bolder pe-3">訂單編號</span>{{ order.id }}
                </p>
              </div>
              <div class="d-flex">
                <p class="mb-0 py-1">
                  <span class="fw-bolder pe-3">修改狀態</span>
                </p>
                <button
                  type="button"
                  class="btn btn-sm btn-success py-1 me-2 align-self-start"
                  :class="{ disabled: order.is_paid }"
                  @click="$emit('updateOrder', order)"
                >
                  已完成
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-danger py-1 align-self-start"
                  :class="{ disabled: !order.is_paid }"
                  @click="$emit('updateOrder', order)"
                >
                  未完成
                </button>
              </div>
            </div>
            <table class="table border-dark mb-2">
              <thead>
                <tr class="text-center">
                  <th>商品數量</th>
                  <th>小計</th>
                  <th>運費</th>
                  <th>訂單優惠券</th>
                  <th>優惠券折抵</th>
                  <th>總計</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td>
                    {{ `共 ${orderItems.reduce((acc, cur) => (acc += cur.qty), 0)} 件` }}
                  </td>
                  <td>
                    {{
                      `${$filters.currency(order.total + couponInfo.total)} 元`
                    }}
                  </td>
                  <td>活動免運</td>
                  <td>{{ couponInfo.title }}</td>
                  <td>{{ `- ${$filters.currency(couponInfo.total)} 元` }}</td>
                  <td>{{ `$ ${$filters.currency(order.total)} 元` }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="m-3 p-3 bg-secondary-subtle rounded overflow-x-auto">
            <h5 class="fw-bolder text-secondary">訂購品項</h5>
            <table class="table table-hover border-dark mb-2 text-center">
              <thead>
                <tr>
                  <th>品名</th>
                  <th>產品代碼</th>
                  <th>數量</th>
                  <th>商品特價</th>
                  <th class="text-end">單價</th>
                  <th class="text-end">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderItems" :key="item.id">
                  <td>{{ item.product.title }}</td>
                  <td>{{ item.product.id }}</td>
                  <td>{{ item.qty }}</td>
                  <td>
                    {{
                      item.product.price === item.product.origin_price
                        ? '無'
                        : `${Math.floor(
                            (item.product.price / item.product.origin_price) *
                              10
                          )}折`
                    }}
                  </td>
                  <td class="text-end">
                    {{ $filters.currency(item.product.price) }}
                  </td>
                  <td class="text-end">
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="m-3 p-3 bg-secondary-subtle rounded overflow-x-auto">
            <h5 class="fw-bolder text-secondary">訂購人資料</h5>
            <div class="d-md-flex">
              <p class="mb-0 fw-bolder pe-3 text-nowrap">配送方式</p>
              <p class="mb-2 text-wrap" style="text-align: justify;">{{ order.user.address }}</p>
            </div>
            <div class="d-md-flex">
              <p class="mb-0 fw-bolder pe-3 text-nowrap">訂單備註</p>
              <p class="mb-2 text-wrap" style="text-align: justify;">{{ order.message ? order.message : '無' }}</p>
            </div>
            <table class="table border-dark mb-2 text-center">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>連絡電話</th>
                  <th>聯絡信箱</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ order.user.name }}</td>
                  <td>{{ order.user.tel }}</td>
                  <td>{{ order.user.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideModal">
            關閉
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
      order: {},
      orderItems: [],
      couponInfo: {
        total: '',
        title: ''
      },
      isLoading: false
    }
  },
  props: ['tempOrder'],
  emits: ['updateOrder'],
  watch: {
    tempOrder() {
      this.getData()
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
      this.order = JSON.parse(JSON.stringify(this.tempOrder))
      this.orderItems = Object.values(this.order.products)
      if (this.orderItems[0].coupon) {
        this.couponInfo.total =
          this.order.total / (this.orderItems[0].coupon.percent / 100) -
          this.order.total
        this.couponInfo.title = `${this.orderItems[0].coupon.code} ${this.orderItems[0].coupon.title}`
      } else {
        this.couponInfo.total = 0
        this.couponInfo.title = '無'
      }
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModal, { backdrop: 'static' })
  }
}
</script>

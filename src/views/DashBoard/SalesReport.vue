<template>
  <LoadingVue :active="isLoading" style="z-index: 1056"/>
  <div
    class="ps-4 pt-5 pb-2 sticky-sm-top border-bottom border-3 bg-white"
    style="z-index: 1; top: -30px"
  >
    <h2 class="fw-semibold mb-2">銷售統計</h2>
    <p class="mb-0">
      {{ `統計數據：${filterAllData ? `全部訂單 (共${ordersNum_allOrder}筆)` : `已完成的訂單 (共${ordersNum_finishedOrder}筆)`}` }}
    </p>
    <div class="d-flex align-items-center py-2">
      <p class="mb-0">資料篩選：</p>
      <button
        type="button"
        class="btn btn-sm btn-gray me-2"
        :class="{ disabled: filterAllData }"
        @click="setFilter(true)"
      >
        全部訂單
      </button>
      <button
        type="button"
        class="btn btn-sm btn-gray"
        :class="{ disabled: !filterAllData }"
        @click="setFilter(false)"
      >
        已完成的訂單
      </button>
    </div>
  </div>
  <div class="d-lg-flex justify-content-evenly mt-3 pb-4">
    <div class="leftZone">
      <div
        class="bg-warning-subtle border border-warning mx-2 p-3 rounded text-center mt-5 mt-lg-3"
      >
        <p class="mb-2 display-3 fw-bolder" v-if="getDataFinish">
          <span class="fs-4">NT$</span
          >{{
            filterAllData
              ? $filters.currency(totalPrice_allOrder)
              : $filters.currency(totalPrice_finishedOrder)
          }}
        </p>
        <p class="fs-4 mb-0">銷售總額</p>
      </div>
      <div class="border mt-5 mx-2 p-3 rounded d-flex flex-column overflow-x-auto">
        <p class="fs-4">訂單使用優惠券比例</p>
        <div class="chartZone couponPieChart align-self-center"></div>
      </div>
      <div class="border mt-5 mx-2 p-3 rounded d-flex flex-column overflow-x-auto">
        <p class="fs-4">訂單配送方式</p>
        <div class="chartZone deliveryPieChart align-self-center"></div>
      </div>
    </div>
    <div class="rightZone">
      <div class="border mt-5 mt-lg-3 mx-2 p-3 rounded overflow-x-auto">
        <p class="fs-4 mb-1">
          產品銷售排名<span class="ms-2 fs-6"
            >{{ `(${rankNum > 10 ? '全部排名' : `前${rankNum}名`})` }}</span
          >
        </p>
        <button
          type="button"
          class="btn btn-sm btn-gray me-2"
          :class="{
            disabled:
              rankNum ===
              (filterAllData
                ? saleItem_allOrder.length
                : saleItem_finishedOrder.length)
          }"
          @click="setRankNum(-1)"
        >
          全部排名
        </button>
        <button
          type="button"
          class="btn btn-sm btn-gray me-2"
          :class="{ disabled: rankNum === 10 }"
          @click="setRankNum(10)"
        >
          前10名
        </button>
        <button
          type="button"
          class="btn btn-sm btn-gray me-2"
          :class="{ disabled: rankNum === 5 }"
          @click="setRankNum(5)"
        >
          前5名
        </button>
        <div class="rankBarChart"></div>
      </div>
      <div class="border mt-5 mx-2 p-3 rounded d-flex flex-column overflow-x-auto">
        <p class="fs-4">產品種類銷售比例</p>
        <div class="chartZone categoryPieChart align-self-center"></div>
      </div>
    </div>
  </div>
</template>

<script>
import c3 from 'c3'
export default {
  data() {
    return {
      protoData_allOrder: {}, // {'A':1, 'B':2}
      protoData_finishedOrder: {},
      saleItem_allOrder: [], // [{name: 'A', num: 1}, {name: 'B', num: 2}]
      saleItem_finishedOrder: [],
      categories_allOrder: {},
      categories_finishedOrder: {},
      totalPrice_allOrder: 0,
      totalPrice_finishedOrder: 0,
      ordersNum_allOrder: 0,
      ordersNum_finishedOrder: 0,
      coupon_allOrder: {},
      coupon_finishedOrder: {},
      filterAllData: true,
      getDataFinish: false,
      isLoading: false,
      rankNum: 10,
      rankBarChart: {},
      categoryPieChart: {},
      couponPieChart: {},
      deliveryPieChart: {},
      deliveryWay: ['門市取貨', '貨運低溫宅配', '超商冷藏運送'],
      delivery_allOrder: {},
      delivery_finishedOrder: {},
      colorPattern: ['#9b9ec1', '#597a9d', '#a69cac', '#7d4f50', '#63696a'] // 紫, 藍, 灰, 咖啡, 綠
    }
  },
  inject: ['emitter'],
  methods: {
    getOrderList(page = 1) {
      this.isLoading = true
      const API_GETORDER = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.axios
        .get(API_GETORDER)
        .then((res) => {
          if (!res.data.success) {
            this.isLoading = false
            this.emitter.emit('sendMsg', {
              message: `資料讀取失敗：${res.data.message}`,
              status: 'error'
            })
          } else {
            res.data.orders.forEach((order) => {
              const orderIsPaid = order.is_paid
              const productsArry = Object.keys(order.products)
              const coupon = order.products[productsArry[0]].coupon
              const delivery = order.user.address
              this.updateCoupon(this.coupon_allOrder, coupon)
              this.updateDelivery(this.delivery_allOrder, delivery)
              this.ordersNum_allOrder += 1
              this.totalPrice_allOrder += order.total
              if (orderIsPaid) {
                this.updateCoupon(this.coupon_finishedOrder, coupon)
                this.updateDelivery(this.delivery_finishedOrder, delivery)
                this.ordersNum_finishedOrder += 1
                this.totalPrice_finishedOrder += order.total
              }

              productsArry.forEach((key) => {
                const title = order.products[key].product.title
                const category = order.products[key].product.category
                this.updateData(
                  this.protoData_allOrder,
                  title,
                  order.products[key].qty
                )
                this.updateData(
                  this.categories_allOrder,
                  category,
                  order.products[key].qty
                )
                if (orderIsPaid) {
                  this.updateData(
                    this.protoData_finishedOrder,
                    title,
                    order.products[key].qty
                  )
                  this.updateData(
                    this.categories_finishedOrder,
                    category,
                    order.products[key].qty
                  )
                }
              })
            })
            if (res.data.pagination.has_next) {
              this.getOrderList((page += 1))
            } else {
              this.saleItem_allOrder = this.sortData(this.protoData_allOrder)
              this.saleItem_finishedOrder = this.sortData(
                this.protoData_finishedOrder
              )
              this.setFilter(true)
              this.getDataFinish = true
              this.isLoading = false
            }
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: `資料讀取失敗：${e}`,
            status: 'error'
          })
        })
    },
    updateData(dataArry, item, qty) {
      if (!dataArry[item]) {
        dataArry[item] = qty
      } else {
        dataArry[item] += qty
      }
    },
    updateCoupon(data, coupon) {
      if (coupon) {
        this.updateData(data, `優惠代碼 ${coupon.code}`, 1)
      } else {
        this.updateData(data, '無套用優惠券', 1)
      }
    },
    updateDelivery(data, delivery) {
      for (let i = 0; i < this.deliveryWay.length; i++) {
        if (delivery.indexOf(this.deliveryWay[i]) > -1) {
          this.updateData(data, this.deliveryWay[i], 1)
        }
      }
    },
    sortData(protoData) {
      const data = []
      for (const key in protoData) {
        data.push({ name: key, num: protoData[key] })
      }
      data.sort((a, b) => b.num - a.num)
      return data
    },
    drawRankBarChart(data) {
      const rankData = [...data]
      rankData.length = this.rankNum
      const nameData = []
      const numData = []
      rankData.forEach((item, key) => {
        nameData.push(`No.${key + 1} ${item.name}`)
        numData.push(item.num)
      })
      numData.unshift('銷售數量')
      const tick = []
      for (let i = 0; i <= numData[1] + 1; i += 2) {
        tick.push(i)
      }
      if (!Object.keys(this.rankBarChart).length) {
        c3.generate({
          bindto: '.rankBarChart',
          data: {
            columns: [numData],
            type: 'bar',
            axes: {
              銷售數量: 'y2'
            }
          },
          color: {
            pattern: ['#9fa5aa']
          },
          axis: {
            rotated: true,
            x: {
              show: true,
              type: 'category',
              categories: nameData,
              tick: {
                multiline: false
              },
              label: {
                text: '產品名稱',
                position: 'outer-top'
              }
            },
            y: {
              show: false
            },
            y2: {
              show: true,
              label: {
                text: '銷售數量',
                position: 'outer-center'
              },
              tick: {
                values: tick
              }
            }
          },
          legend: {
            show: false
          },
          padding: {
            top: 30
          },
          size: {
            height: numData.length * 40
          }
        })
      } else {
        this.rankBarChart.load({ columns: [numData] })
      }
    },
    drawCategoryPieChart(data) {
      const newData = []
      for (const key in data) {
        newData.push([key, data[key]])
      }
      if (!Object.keys(this.categoryPieChart).length) {
        this.categoryPieChart = c3.generate({
          bindto: '.categoryPieChart',
          data: {
            columns: newData,
            type: 'pie'
          },
          color: {
            pattern: this.colorPattern
          },
          transition: {
            duration: 300
          }
        })
      } else {
        this.categoryPieChart.load({ columns: newData })
      }
    },
    drawCouponPieChart(data) {
      const newData = []
      for (const key in data) {
        newData.push([key, data[key]])
      }
      if (!Object.keys(this.couponPieChart).length) {
        this.couponPieChart = c3.generate({
          bindto: '.couponPieChart',
          data: {
            columns: newData,
            type: 'pie'
          },
          color: {
            pattern: this.colorPattern
          },
          transition: {
            duration: 300
          }
        })
      } else {
        this.couponPieChart.load({ columns: newData })
      }
    },
    drawDeliveryPieChart(data) {
      const newData = []
      for (const key in data) {
        newData.push([key, data[key]])
      }
      if (!Object.keys(this.deliveryPieChart).length) {
        this.deliveryPieChart = c3.generate({
          bindto: '.deliveryPieChart',
          data: {
            columns: newData,
            type: 'pie'
          },
          color: {
            pattern: this.colorPattern
          },
          transition: {
            duration: 300
          }
        })
      } else {
        this.deliveryPieChart.load({ columns: newData })
      }
    },
    setFilter(isAll) {
      this.filterAllData = isAll
      this.render(true)
    },
    setRankNum(num) {
      if (num < 0) {
        this.rankNum = this.filterAllData
          ? this.saleItem_allOrder.length
          : this.saleItem_finishedOrder.length
      } else {
        this.rankNum = num
      }
      this.render()
    },
    render(renderAll = false) {
      if (this.filterAllData) {
        this.drawRankBarChart(this.saleItem_allOrder)
        if (renderAll) {
          this.drawCategoryPieChart(this.categories_allOrder)
          this.drawCouponPieChart(this.coupon_allOrder)
          this.drawDeliveryPieChart(this.delivery_allOrder)
        }
      } else {
        this.drawRankBarChart(this.saleItem_finishedOrder)
        if (renderAll) {
          this.drawCategoryPieChart(this.categories_finishedOrder)
          this.drawCouponPieChart(this.coupon_finishedOrder)
          this.drawDeliveryPieChart(this.delivery_finishedOrder)
        }
      }
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style>
@import '~c3/c3.min.css';
text {
  font-size: 0.75rem;
  font-family: var(--bs-body-font-family);
}
.c3-axis-x-label,
.c3-axis-y2-label,
.c3-legend-item text {
  font-size: 1rem;
}
body {
  background: var(--bs-light);
  color: #4a5759;
}
@media (min-width: 992px){
  .leftZone {
      width: 40%;
  }
  .rightZone {
      width: 55%;
  }
  .chartZone {
      width: 80%;
  }
}
</style>

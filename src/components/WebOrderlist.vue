<template>
  <div class="py-2 d-flex align-items-baseline justify-content-between">
    <h5 class="mb-0 fw-normal">
      <slot name="title">購物清單</slot><span class="ms-1">{{ `(${cartInfo.carts.reduce((acc, cur) => (acc += cur.qty), 0)})` }}</span>
    </h5>
    <a
      href="#"
      class="link-gray link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
      @click.prevent="checkDeleteItem"
      v-if="isEdit"
      >清空購物車</a
    >
  </div>
  <ul class="list-group rounded-0">
    <li
      class="list-group-item d-flex flex-column-reverse flex-sm-row border-gray-subtle border-start-0 border-end-0 px-0"
      :class="{'text-gray': !isEdit}"
      v-for="item in cartInfo.carts"
      :key="item.id"
    >
      <div class="d-flex flex-column flex-sm-row">
        <div style="max-width: 100px" class="d-flex align-items-center mb-2 mb-sm-0 me-sm-4">
          <img
            :src="item.product.imageUrl"
            :alt="item.product.title"
            class="img-fluid"
          />
        </div>
        <div class="px-0 px-sm-3 w-auto align-self-sm-center">
          <router-link
            :to="`/product/${item.product.id}`"
            class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            :class="{'fw-bolder': isEdit}"
            target="_blank"
            >{{ item.product.title }}</router-link
          >
          <p
            class="mt-2 mb-0"
            v-if="item.product.origin_price === item.product.price"
          >
            {{ `單價 NT$ ${$filters.currency(item.product.origin_price)}` }}
          </p>
          <p v-else class="mt-2 mb-0">
            單件優惠價
            <span class="text-danger"
              >{{ `NT$ ${$filters.currency(item.product.price)}` }}</span
            >
            <span
              class="badge rounded-pill bg-graySlight text-dark ms-2"
              style="vertical-align: baseline"
              >{{ `${Math.floor((item.product.price / item.product.origin_price) * 10)}折` }}</span
            >
          </p>
          <p class="my-2">{{ `規格：${item.product.unit}` }}</p>
          <div class="input-group input-group-sm w-auto mb-2" v-if="isEdit">
            <button
              type="button"
              class="btn btn-outline-gray"
              :class="{ disabled: item.qty === 1 }"
              @click="
                cartAdjustNum(
                  { product_id: item.product.id, qty: item.qty - 1 },
                  item.id
                )
              "
            >
              <i class="bi bi-dash-lg"></i>
            </button>
            <span
              class="input-group-text bg-white border-start-0 border-end-0 border-gray text-center d-inline-block" style="min-width: 50px;"
              >{{ item.qty }}</span
            >
            <button
              type="button"
              class="btn btn-outline-gray"
              :class="{ disabled: item.qty === 10 }"
              @click="
                cartAdjustNum(
                  { product_id: item.product.id, qty: item.qty + 1 },
                  item.id
                )
              "
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <p class="mb-2" v-else>{{ `數量：${ item.qty }` }}</p>
          <p class="mb-0">{{ `小計：${ item.total } 元` }}</p>
        </div>
      </div>
      <button
        type="button"
        class="btn-close ms-auto"
        @click="checkDeleteItem(item)"
        title="移除品項"
        v-if="isEdit"
      ></button>
    </li>
  </ul>

  <div
    class="position-fixed"
    style="
      z-index: 1058;
      backdrop-filter: blur(5px);
      top: -100vh;
      height: 300vh;
      left: -100vw;
      width: 300vw;
    "
    v-if="showDeleteConfirm"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center h-100"
    >
      <div
        class="card border px-3 py-1 bg-light shadow-lg"
        style="max-width: 90vw"
      >
        <div class="card-body text-center p-4">
          <i class="bi bi-exclamation-triangle-fill opacity-50" style="font-size: 4rem; color: var(--bs-warning);"></i>
          <p>{{`確定要${deleteMsg === '' ? '清空購物車' : `將"${deleteMsg}"從購物車移除`}嗎？`}}</p>
          <div class="text-center">
            <button
              type="button"
              class="btn btn-outline-danger me-2"
              @click="deleteItem"
            >
              {{ deleteMsg === '' ? '清空' :'移除'}}
            </button>
            <button
              type="button"
              class="btn btn-gray ms-2"
              @click="showDeleteConfirm = false"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDeleteConfirm: false,
      deleteMsg: '',
      temp: {}
    }
  },
  props: ['cartInfo', 'isEdit'],
  inject: ['emitter'],
  methods: {
    cartAdjustNum(data, cartId) {
      this.emitter.emit('cartAdjustNum', { data, cartId })
    },
    checkDeleteItem(item = {}) {
      this.temp = item
      if (item.product) {
        this.deleteMsg = this.temp.product.title
      } else {
        this.deleteMsg = ''
      }
      this.showDeleteConfirm = true
    },
    deleteItem() {
      if (this.temp.id) {
        this.emitter.emit('cartDeleteItem', this.temp.id)
      } else {
        this.emitter.emit('cartReset')
      }
      this.showDeleteConfirm = false
    }
  }
}
</script>

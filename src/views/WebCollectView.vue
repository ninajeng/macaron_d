<template>
  <WebLoading :is-loading="isLoading" />
  <div class="container py-5">
    <div
      class="py-3 d-flex align-items-baseline justify-content-between border-bottom"
    >
      <h5 class="mb-0">
        {{ `我的收藏清單 (${collectProducts.length})` }}
      </h5>
      <a
        href="#"
        class="link-gray link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        @click.prevent="checkRemoveItem"
        v-if="collectProducts.length > 0"
        >清空我的收藏</a
      >
    </div>
    <div class="py-4">
      <div class="row row-cols-1 row-cols-lg-2 g-4" v-if="collectProducts.length"
        style="min-height: 60vh">
        <div
          class="col"
          v-for="product in collectProducts"
          :key="product.id"
        >
          <div class="card overflow-hidden">
            <div class="row g-0">
              <div class="col-md-4">
                <router-link :to="`/product/${product.id}`">
                  <img
                    :src="product.imageUrl"
                    class="collectImg w-100"
                    :alt="product.title"
                    style="height: 200px; object-fit: cover"
                  />
                </router-link>
              </div>
              <div class="col-md-7">
                <div
                  class="card-body d-flex justify-content-center align-items-center h-100 p-0 pt-3"
                >
                  <div class="ps-0 ps-md-3 text-center">
                    <router-link
                      :to="`/product/${product.id}`"
                      class="fw-bolder link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                      target="_blank"
                      >{{ product.title }}</router-link
                    >
                    <p
                      class="mt-2 mb-0"
                      v-if="product.origin_price === product.price"
                    >
                      {{
                        `單價 NT$${$filters.currency(
                          product.origin_price
                        )}元`
                      }}
                    </p>
                    <p v-else class="mt-2 mb-0">
                      優惠價
                      <span class="text-danger">{{
                        `NT$${$filters.currency(product.price)}元`
                      }}</span>
                      <span
                        class="badge rounded-pill text-white bg-gray ms-1"
                        >{{
                          `${Math.floor(
                            (product.price / product.origin_price) * 10
                          )}折`
                        }}</span
                      >
                    </p>
                    <p class="my-2">{{ `規格：${product.unit}` }}</p>
                    <a
                      href="#"
                      class="btn btn-outline-secondary"
                      @click.prevent="
                        emitter.emit('addCart', {
                          product_id: product.id,
                          qty: 1
                        })
                      "
                      ><i class="bi bi-cart-plus me-2"></i>加到購物車</a
                    >
                  </div>
                </div>
              </div>
              <div class="text-end p-2 d-block d-md-none">
                <a
                  href="#"
                  @click.prevent="checkRemoveItem(product)"
                  class="text-decoration-none text-muted"
                  ><i class="bi bi-trash3 text-gray me-1"></i>移除收藏</a
                >
              </div>
              <div class="col-1 text-end d-none d-md-block">
                <div class="m-2">
                  <a
                    href="#"
                    @click.prevent="checkRemoveItem(product)"
                    title="從收藏中移除"
                    ><i class="bi bi-trash3 text-gray"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="text-center py-4 mb-5"
        style="min-height: 40vh"
        v-else
      >
        <p class="me-sm-2 text-gray">尚無收藏</p>
        <router-link
          to="/products"
          class="link-secondary fw-bolder text-decoration-none border-bottom border-secondary"
          >查看商品<i class="bi bi-caret-right-fill"></i
        ></router-link>
      </div>
    </div>
  </div>

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
    v-if="showRemoveConfirm"
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
          <p>{{`確定要${removeMsg === '' ? '清空收藏' : `將"${removeMsg}"從收藏中移除`}嗎？`}}</p>
          <div class="text-center">
            <button
              type="button"
              class="btn btn-outline-danger me-2"
              @click="removeItem"
            >
              {{ removeMsg === '' ? '清空' :'移除'}}
            </button>
            <button
              type="button"
              class="btn btn-gray ms-2"
              @click="showRemoveConfirm = false"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <WebRecommand :num="5" :isRandom="true" :classicType="true" :showTitle="true" />
</template>

<script>
import WebRecommand from '@/components/WebRecommand.vue'
export default {
  data() {
    return {
      collectIds: [],
      collectProducts: [],
      isLoading: false,
      temp: {},
      removeMsg: '',
      showRemoveConfirm: false
    }
  },
  components: {
    WebRecommand
  },
  inject: ['emitter'],
  watch: {
    collectIds() {
      this.getProductList()
    }
  },
  methods: {
    getCollectId() {
      this.emitter.emit('getCollectInfo')
    },
    getProductList() {
      this.isLoading = true
      this.dataCount = 0
      const API_GETPRODUCTS = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.axios.get(API_GETPRODUCTS)
        .then(res => {
          const { products } = res.data
          this.collectProducts = []
          this.collectIds.forEach(id => this.collectProducts.push(products.find(item => item.id === id)))
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.emitter.emit('sendMsg', {
            message: e,
            status: 'error'
          })
          this.$router.push('/products')
        })
    },
    checkRemoveItem(item = {}) {
      this.temp = item
      if (this.temp.id) {
        this.removeMsg = this.temp.title
      } else {
        this.removeMsg = ''
      }
      this.showRemoveConfirm = true
    },
    removeItem() {
      this.emitter.emit('setCollect', this.temp.id)
      this.showRemoveConfirm = false
      this.getProductList()
    }
  },
  created() {
    this.emitter.on('collectInfo', (data) => {
      this.collectIds = data
    })
    this.getCollectId()
  }
}
</script>

<style>
.collectImg:hover {
  opacity: 0.85;
}
</style>

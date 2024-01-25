<template>
  <WebLoading :is-loading="isLoading"/>
  <div class="container my-5">
    <div class="row justify-content-center align-items-center gy-5">
      <div class="col-lg-5">
        <nav
          class="mb-4 mb-lg-0"
          style="
            --bs-breadcrumb-divider: url(
              &#34;data:image/svg + xml,
              %3Csvgxmlns='http://www.w3.org/2000/svg'width='8'height='8'%3E%3Cpathd='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'fill='%236c757d'/%3E%3C/svg%3E&#34;
            );
          "
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link
                class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                to="/"
                >首頁</router-link
              >
            </li>
            <li class="breadcrumb-item">
              <router-link
                class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                to="/products"
                @click="setFilterStore('')"
                >產品列表</router-link
              >
            </li>
            <li class="breadcrumb-item">
              <router-link
                class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                to="/products"
                @click="setFilterStore(product.category)"
                >{{ product.category }}</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ product.title }}
            </li>
          </ol>
        </nav>
        <ProductImg :product="product"/>
      </div>
      <div class="col-lg-6">
        <ProductInfo :product="product" @add-cart="addCart" ref="productInfo" />
      </div>
      <div class="col-12">
        <ProductInfoTab :product="product"/>
      </div>
    </div>
  </div>
  <WebRecommand :num="4" :isRandom="true" :classicType="false" :showTitle="true" ref="recommand">
    <template #title>猜你喜歡</template>
  </WebRecommand>
</template>

<script>
import ProductInfo from '@/components/WebProductInfo.vue'
import ProductImg from '@/components/WebProductImg.vue'
import ProductInfoTab from '@/components/WebProductInfoTab.vue'
import WebRecommand from '@/components/WebRecommand.vue'
import emitter from '@/methods/emitter'
export default {
  data() {
    return {
      product: {},
      tabIndex: 0,
      isLoading: false,
      productId: ''
    }
  },
  emits: ['addCart'],
  inject: ['emitter'],
  components: {
    ProductImg,
    ProductInfo,
    ProductInfoTab,
    WebRecommand
  },
  methods: {
    getInfo() {
      this.productId = this.$route.params.id
      const API_GETPRODUCT = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.productId}`
      this.isLoading = true
      this.axios
        .get(API_GETPRODUCT)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product
            document.title += ` - ${this.product.title}`
          } else {
            this.getInfoError()
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.getInfoError(e)
        })
    },
    getInfoError(err = '找不到產品') {
      this.emitter.emit('sendMsg', {
        message: err,
        status: 'error'
      })
      this.$router.push('/products')
    },
    addCart(data) {
      this.$emit('addCart', data)
    },
    setFilterStore(val) {
      emitter.emit('setFilterStore', val)
    }
  },
  created() {
    this.getInfo()
  },
  updated() {
    if (this.productId !== this.$route.params.id) {
      this.getInfo()
      this.$refs.productInfo.setQty(1)
      this.$refs.recommand.setShowData()
    }
  }
}
</script>

<style>
.nav-tabs .nav-link.active {
  background-color: var(--bs-secondary-bg-subtle);
  font-weight: bolder;
}
</style>

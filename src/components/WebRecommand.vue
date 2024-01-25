<template>
  <div class="bg-white" v-if="showData.length > 0">
    <div class="container py-5" :class="{ 'pt-3': !showTitle }">
      <div
        class="d-flex flex-wrap justify-content-between align-items-center mb-3"
        v-if="showTitle"
      >
        <h5 class="mb-0">
          <slot name="title">推薦給您</slot>
        </h5>
        <router-link
          to="/products"
          class="link-secondary text-decoration-none"
          @click="emitter.emit('setFilterStore', '')"
          >看更多產品<i class="bi bi-caret-right-fill"></i
        ></router-link>
      </div>
      <div class="row row-cols-md-3 row-cols-lg-5 g-4">
        <div
          class="col-12 flex-fill"
          v-for="product in showData"
          :key="product.id"
        >
          <ProductCardClassic
            :product="product"
            :height="'300px'"
            :showBadge="true"
            v-if="classicType"
          />

          <ProductCard
            :product="product"
            @add-cart="addCart"
            v-else
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './WebProductCard.vue'
import ProductCardClassic from '@/components/WebProductCard-classic.vue'
export default {
  data() {
    return {
      allData: [],
      showData: [],
      index: 0,
      isLoading: false
    }
  },
  inject: ['emitter'],
  props: ['num', 'isRandom', 'classicType', 'showTitle'],
  emits: ['addCart'],
  components: {
    ProductCard,
    ProductCardClassic
  },
  methods: {
    getData() {
      const API_GETDATA = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.axios
        .get(API_GETDATA)
        .then((res) => {
          if (res.data.success) {
            this.allData = res.data.products
            this.setShowData()
          } else {
            this.getDataError(`(${res.data.message})`)
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.getDataError(`(${e})`)
        })
    },
    getDataError(err = '') {
      this.emitter.emit('sendMsg', {
        message: `產品無法載入 ${err}`,
        status: 'error'
      })
    },
    setShowData() {
      let random = 0
      if (this.isRandom) {
        random = this.index
        while (random === this.index) {
          random = Math.floor(Math.random() * (this.allData.length - this.num))
        }
        this.index = random
        this.showData = this.allData.slice(this.index, this.index + this.num)
      } else {
        for (let i = 0; this.showData.length < this.num; i += 2) {
          this.showData.push(this.allData[i])
        }
      }
    },
    addCart(data) {
      this.$emit('addCart', data)
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style>
.productTitle {
  opacity: 0;
  transition: all 0.5s;
}
.productLink:hover + .productTitle {
  opacity: 1;
  .linkIcon {
    transform: scale(3);
  }
}
.linkIcon {
  transform: scale(1);
  transition: all 1s;
}
</style>

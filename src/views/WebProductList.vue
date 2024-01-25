<template>
  <WebLoading :is-loading="isLoading"/>
  <div class="container my-5">
    <h5 class="fw-bolder mb-4">產品列表</h5>
    <div class="row justify-content-between">
      <div class="col-lg-3">
        <ProductCategory
          :categories="categories"
          :filter="filter"
          @set-filter="setFilter"
          class="sticky-sm-top pe-lg-2 me-0  me-lg-3"
          style="top: 110px; z-index: 1"
        />
      </div>
      <div class="col-lg-9">
        <div class="alert alert-danger d-flex" v-if="filterData.length === 0">
          <i class="bi bi-exclamation-triangle-fill me-1"></i>
          <p class="mb-0">
            找不到產品
            <span v-if="filter"
              >{{ `(關鍵字："${filter}")，請使用其他關鍵字搜尋` }}</span
            >
          </p>
        </div>
        <div class="row row-cols-1 row-cols-lg-3 g-3" v-else>
          <div
            class="col"
            v-for="product in filterData"
            :key="product.id"
          >
            <ProductCard :product="product" @add-cart="addCart" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/WebProductCard.vue'
import ProductCategory from '@/components/WebProductCategory.vue'
export default {
  data() {
    return {
      allData: [],
      filter: '',
      categories: {},
      isLoading: false
    }
  },
  emits: ['addCart'],
  inject: ['emitter'],
  components: {
    ProductCard,
    ProductCategory
  },
  computed: {
    filterData() {
      if (this.filter === '') return this.allData
      else {
        return this.allData.filter(
          (item) =>
            item.category === this.filter ||
            item.title.indexOf(this.filter) > -1
        )
      }
    }
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
            this.getCategories()
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
    getCategories() {
      this.categories[''] = this.allData.length
      this.allData.forEach((item) => {
        if (Object.keys(this.categories).indexOf(item.category) === -1) {
          this.categories[item.category] = 1
        } else {
          this.categories[item.category] += 1
        }
      })
    },
    setFilter(val) {
      this.filter = val
    },
    addCart(data) {
      this.$emit('addCart', data)
    }
  },
  created() {
    this.getData()
    this.emitter.on('filterStore', (val) => {
      this.filter = val
    })
    this.emitter.emit('getFilterStore')
  }
}
</script>

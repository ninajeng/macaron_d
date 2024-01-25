<template>
  <WebLoading :is-loading="isLoading"/>
  <nav class="webNav sticky-top" ref="webNav">
    <div class="container">
      <div class="navbar navbar-expand-lg align-items-baseline">
        <div class="d-flex align-items-baseline">
          <router-link class="navbar-brand me-2" to="/home" @click="closeNav"
            ><h1 class="m-0 fs-3 logo">
              macar<i class="bi bi-egg-fill"></i>n
            </h1></router-link
          >
          <p class="m-0 d-none d-sm-block title">頂級法式馬卡龍</p>
        </div>
        <button type="button" class="navbar-toggler" @click="toggleCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" ref="navbarNav">
          <ul
            class="navbar-nav d-flex w-100 justify-content-end pb-1"
          >
            <li class="nav-item mx-2">
              <router-link
                class="nav-link px-2 py-1 my-2 my-lg-0"
                to="/products"
                @click="closeNav(true)"
                ><i class="bi bi-list-task me-1"></i>選產品</router-link
              >
            </li>
            <li class="nav-item mx-2">
              <router-link
                class="nav-link px-2 py-1 my-2 my-lg-0"
                to="/collect"
                @click="closeNav"
                ><i class="bi bi-suit-heart-fill me-1"></i>我的收藏</router-link
              >
            </li>
            <li class="nav-item mx-2">
              <router-link
                class="nav-link px-2 py-1 my-2 my-lg-0"
                to="/orderSearch"
                @click="closeNav"
                ><i class="bi bi-person-fill me-1"></i>訂單查詢</router-link
              >
            </li>
            <li class="nav-item ms-2">
              <router-link
                class="nav-link px-2 py-1 my-2 my-lg-0"
                to="/cart"
                @click="closeNav"
                ><i class="bi bi-cart-fill me-1"></i>購物車({{
                  isNaN(totalQty) ? '-' : totalQty
                }})</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <div
    class="toTop d-flex align-items-center justify-content-center opacity-0"
    ref="toTop"
  >
    <button
      type="button"
      class="btn btn-sm btn-primary h-100 w-100 text-white"
      @click="scrollToTop"
    >
      TOP
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartInfo: {},
      filterStore: '',
      API_CART: `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
      isLoading: false,
      collect: '',
      date: ''
    }
  },
  inject: ['emitter'],
  computed: {
    totalQty() {
      if (this.cartInfo.carts && this.cartInfo.carts.length > 0) {
        return this.cartInfo.carts.reduce((acc, cur) => {
          acc += cur.qty
          return acc
        }, 0)
      } else {
        return 0
      }
    }
  },
  methods: {
    toggleCollapse() {
      const classArr = [...this.$refs.navbarNav.classList]
      if (classArr.findIndex(className => className === 'show') === -1) {
        this.initNav()
        this.$refs.navbarNav.classList.add('show')
      } else {
        this.$refs.navbarNav.classList.remove('show')
      }
    },
    getCartInfo() {
      // 不使用loading畫面
      this.isLoading = true
      this.axios
        .get(this.API_CART)
        .then((res) => {
          if (res.data.success) {
            this.cartInfo = res.data.data
            this.sendCartInfo()
          } else {
            this.sendErrorMsg(`購物車資料無法取得：${res.data.messages}`)
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.sendErrorMsg(`購物車資料無法取得：${e}`)
        })
    },
    addCart(data) {
      let showNumMaxMsg = false
      let numMaxMsg = {}
      const cartIndex = this.cartInfo.carts.findIndex(
        (item) => item.product_id === data.product_id
      )
      if (cartIndex > -1) {
        if (this.cartInfo.carts[cartIndex].qty === 10) {
          this.emitter.emit('sendMsg', {
            message:
              '購物車訂購數量已達上限(數量10)，如有大量訂購需求，歡迎來電詢問！',
            status: 'error',
            title: this.cartInfo.carts[cartIndex].product.title
          })
          return
        } else if (this.cartInfo.carts[cartIndex].qty + data.qty > 10) {
          data.qty = 10 - this.cartInfo.carts[cartIndex].qty
          showNumMaxMsg = true
          numMaxMsg = {
            message: '訂購數量上限為10，如有大量訂購需求，歡迎來電詢問！',
            status: 'error',
            title: this.cartInfo.carts[cartIndex].product.title
          }
        }
      }

      this.isLoading = true
      this.axios
        .post(this.API_CART, { data })
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: res.data.message,
              status: 'success'
            })
            if (showNumMaxMsg) this.emitter.emit('sendMsg', numMaxMsg)
            this.getCartInfo()
          } else {
            this.sendErrorMsg(`無法加入購物車：${res.data.message}`)
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.sendErrorMsg(`無法加入購物車：${e}`)
        })
    },
    cartAdjustNum(data, cartId) {
      this.isLoading = true
      this.axios
        .put(`${this.API_CART}/${cartId}`, { data })
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: res.data.message,
              status: 'success'
            })
            this.getCartInfo()
          } else {
            this.sendErrorMsg(`無法更新購物車：${res.data.message}`)
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.sendErrorMsg(`無法更新購物車：${e}`)
        })
    },
    cartDeleteItem(cartId) {
      this.isLoading = true
      this.axios
        .delete(`${this.API_CART}/${cartId}`)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: '已刪除品項',
              status: 'success'
            })
            this.getCartInfo()
          } else {
            this.sendErrorMsg(`無法更新購物車：${res.data.message}`)
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.sendErrorMsg(`無法更新購物車：${e}`)
        })
    },
    cartReset() {
      this.isLoading = true
      this.axios
        .delete(`${this.API_CART}s`)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('sendMsg', {
              message: '已清空購物車',
              status: 'success'
            })
            this.getCartInfo()
          } else {
            this.sendErrorMsg(`無法清空購物車：${res.data.message}`)
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.sendErrorMsg(`無法清空購物車：${e}`)
        })
    },
    sendErrorMsg(err) {
      this.emitter.emit('sendMsg', {
        message: err,
        status: 'error'
      })
    },
    sendCartInfo() {
      if (this.cartInfo.carts) this.emitter.emit('cartInfo', this.cartInfo)
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    closeNav(clearfilter = false) {
      this.$refs.navbarNav.classList.remove('show')
      if (clearfilter) this.filterStore = ''
      this.scrollToTop()
    },
    getCollect() {
      const cookieData = document.cookie
        .split('; ')
        .find((row) => row.startsWith('macarOnCollect='))
        ?.split('=')[1]
      if (!cookieData) {
        this.collect = []
      } else {
        this.collect = cookieData.split(',')
      }
      document.cookie = `macarOnCollect=${this.collect}; expires=${this.date}`
      this.getCollectInfo()
    },
    setCollect(id) {
      let addItem = false
      if (!id) {
        this.collect = []
      } else {
        this.getCollect()
        const index = this.collect.findIndex((item) => item === id)
        if (index < 0) {
          this.collect.push(id)
          addItem = true
        } else {
          this.collect.splice(index, 1)
        }
      }
      document.cookie = `macarOnCollect=${this.collect}; expires=${this.date}`
      this.getCollectInfo()
      if (addItem) {
        this.emitter.emit('sendMsg', {
          message: '已加入收藏',
          status: 'success'
        })
      }
    },
    getCollectInfo() {
      if (this.collect !== '') this.emitter.emit('collectInfo', this.collect)
    },
    navStyle() {
      this.$refs.navbarNav.classList.remove('show')
      if (window.scrollY !== 0) {
        this.$refs.webNav.classList.add('shadow')
        this.$refs.toTop.classList.remove('opacity-0')
      } else {
        this.$refs.webNav.classList.remove('shadow')
        this.$refs.toTop.classList.add('opacity-0')
      }
    },
    initNav() {
      this.$refs.webNav.style.backgroundColor = 'var(--bs-primary-bg-subtle)'
      this.$refs.webNav.style.color = 'var(--bs-primary-text-emphasis)'
      document.querySelectorAll('.nav-link').forEach(item => {
        item.style.color = 'var(--bs-nav-link-color)'
      })
    },
    setNavEvent() {
      window.addEventListener('scroll', this.changeNavColor)
    },
    removeNavEvent() {
      window.removeEventListener('scroll', this.changeNavColor)
    },
    changeNavColor() {
      if (window.scrollY === 0) {
        this.$refs.webNav.style.backgroundColor = 'transparent'
        this.$refs.webNav.style.color = 'white'
        document.querySelectorAll('.nav-link').forEach(item => {
          item.style.color = 'var(--bs-primary)'
        })
      } else {
        this.initNav()
      }
    }
  },
  created() {
    this.date = new Date()
    this.date.setMonth(this.date.getMonth() + 6)
    this.date.setDate(1)
    this.getCartInfo()
    // 產品加入購物車
    this.emitter.on('addCart', (data) => this.addCart(data))
    // 修改購物車
    this.emitter.on('cartAdjustNum', (info) =>
      this.cartAdjustNum(info.data, info.cartId)
    )
    // 刪除單筆購物車資料
    this.emitter.on('cartDeleteItem', (cartId) => this.cartDeleteItem(cartId))
    // 清空購物車
    this.emitter.on('cartReset', () => this.cartReset())
    // 其他元件取得購物車資料
    this.emitter.on('getCartInfo', () => this.sendCartInfo())
    // 重新取得購物車資料
    this.emitter.on('updateCart', () => this.getCartInfo())
    // 設定產品清單類別(暫存)
    this.emitter.on('setFilterStore', (val) => {
      this.filterStore = val
    })
    // 取得產品清單類別(暫存)
    this.emitter.on('getFilterStore', () =>
      this.emitter.emit('filterStore', this.filterStore)
    )
    // 取得cookie我的收藏資料
    this.getCollect()
    // 設定我的收藏資料
    this.emitter.on('setCollect', (id) => this.setCollect(id))
    // 其他元件取得我的收藏資料
    this.emitter.on('getCollectInfo', () => this.getCollectInfo())
  },
  mounted() {
    window.addEventListener('scroll', this.navStyle)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.navStyle)
    this.removeNavEvent()
  }
}
</script>

<style>
.logo {
  color: var(--bs-primary);
  transition: all 0.5s;
}
.toTop {
  height: 50px;
  width: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: all 0.5s;
  z-index: 1057;
}
.toTop button {
  border-radius: 50%;
}
.webNav {
  transition: all 0.5s;
}
.webNav .active {
  background: white;
}
.webNav .navbar-brand.active {
  background: none;
  border-bottom: 0px;
}
@media (min-width: 992px) {
  .webNav .nav-link {
    border-bottom: 2px solid transparent;
  }
  .webNav .nav-link:hover {
    border-bottom: 2px solid white;
  }
  .webNav .active {
    background: none;
    border-bottom: 2px solid white;
  }
  .navbar-brand.active {
    background-image: none;
  }
}
@media (min-width: 1200px) {
  .logo:hover {
    color: var(--bs-secondary);
  }
}
</style>

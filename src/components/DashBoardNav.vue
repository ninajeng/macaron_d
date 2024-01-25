<template>
  <LoadingVue :active="isLoading"/>
  <nav
    class="webNav navbar navbar-expand-lg bg-primary-subtle fw-bolder"
    data-bs-theme="light"
  >
    <div class="container">
      <div class="d-flex align-items-baseline me-3">
        <router-link class="navbar-brand p-0 me-2" to="/home"
          ><h1 class="fs-3 mb-0 dashLogo">
            macar<i class="bi bi-egg-fill"></i>n
          </h1></router-link
        >
        <p class="m-0 d-none d-sm-block">後台管理</p>
      </div>
      <button
        type="button"
        class="navbar-toggler"
        @click="toggleCollapse"
        v-if="isLogin"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="navbarNav" v-if="isLogin">
        <ul class="navbar-nav d-flex w-100 justify-content-end py-1">
          <li class="nav-item mx-2">
            <router-link class="nav-link px-2 py-1 my-2 my-lg-0" to="/dashboard/salesReport"
              @click="closeNav"
              >銷售統計</router-link
            >
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link px-2 py-1 my-2 my-lg-0" to="/dashboard/products"
              @click="closeNav"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link px-2 py-1 my-2 my-lg-0" to="/dashboard/coupons"
              @click="closeNav"
              >優惠券列表</router-link
            >
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link px-2 py-1 my-2 my-lg-0" to="/dashboard/orders"
              @click="closeNav"
              >訂單列表</router-link
            >
          </li>
        </ul>
        <button
          type="button"
          class="btn btn-sm btn-outline-gray text-nowrap ms-2"
          @click="logout"
        >
          登出
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/methods/emitter'
export default {
  data() {
    return {
      isLoading: false
    }
  },
  props: ['isLogin'],
  methods: {
    toggleCollapse() {
      this.$refs.navbarNav.classList.toggle('show')
    },
    closeNav() {
      this.$refs.navbarNav.classList.remove('show')
    },
    logout() {
      this.$refs.navbarNav.classList.remove('show')
      this.isLoading = true
      const API_LOGOUT = `${process.env.VUE_APP_API}logout`
      this.axios
        .post(API_LOGOUT)
        .then((res) => {
          this.$router.push('/login')
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          emitter.emit('sendMsg', {
            message: `登出失敗(${e})`,
            status: 'error'
          })
        })
    }
  }
}
</script>

<style>
.dashLogo {
  color: var(--bs-primary);
  transition: all 0.5s;
}
.dashLogo:hover {
  color: var(--bs-secondary);
}
.webNav .active {
  background: var(--bs-white);
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
</style>

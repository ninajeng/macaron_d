<template>
  <DashBoardNav :isLogin="true"/>
  <div class="bg-white dashboardView">
    <div class="container">
      <ToastList/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import DashBoardNav from '@/components/DashBoardNav.vue'
import ToastList from '@/components/ToastList.vue'
import emitter from '@/methods/emitter.js'
export default {
  components: {
    DashBoardNav,
    ToastList
  },
  provide() {
    return {
      emitter
    }
  },
  methods: {
    redirect() {
      this.$router.replace('/dashboard/products')
    }
  },
  created() {
    const API_CHECK = `${process.env.VUE_APP_API}api/user/check`
    const AUTH_TOKEN = document.cookie
      .split('; ')
      .find((row) => row.startsWith('webToken='))
      ?.split('=')[1]

    this.axios.defaults.headers.common.Authorization = AUTH_TOKEN
    this.axios.post(API_CHECK).then((res) => {
      if (!res.data.success) {
        alert(res.data.message)
        this.$router.push('/login')
      }
    })
  }
}
</script>

<style>
.dashboardView{
  min-height: calc(100vh - 58px);
}
</style>

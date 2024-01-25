<template>
  <div class="homeView d-flex flex-column" style="min-height: 100vh">
    <WebNav ref="WebNav"/>
    <ToastList/>
    <router-view/>
    <WebFooter class="mt-auto"/>
  </div>
</template>

<script>
import WebNav from '@/components/WebNav.vue'
import WebFooter from '@/components/WebFooter.vue'
import ToastList from '@/components/ToastList.vue'
import emitter from '@/methods/emitter.js'
export default {
  components: {
    WebNav,
    WebFooter,
    ToastList
  },
  provide() {
    return {
      emitter
    }
  },
  methods: {
    checkRoute() {
      if (this.$route.name === 'home') {
        this.$refs.WebNav.changeNavColor()
        this.$refs.WebNav.setNavEvent()
      } else {
        this.$refs.WebNav.initNav()
        this.$refs.WebNav.removeNavEvent()
      }
    }
  },
  mounted() {
    this.checkRoute()
  },
  updated() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    this.checkRoute()
  },
  beforeUnmount() {
    this.$refs.WebNav.removeNavEvent()
  }
}
</script>

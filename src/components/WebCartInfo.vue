<template>
  <p class="d-none">購物車資訊</p>
</template>

<script>
export default {
  inject: ['emitter'],
  methods: {
    getCartInfo() {
      this.emitter.emit('getCartInfo')
    }
  },
  created() {
    this.emitter.on('cartInfo', (data) => {
      this.$emit('updateInfo', data)
    })
    this.getCartInfo()
  }
}
</script>

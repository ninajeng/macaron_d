<template>
  <div class="mt-5">
    <CartInfo @updateInfo="updateInfo"/>
    <CheckStep :step="step" v-if="step < 4"/>
    <router-view :cart-info="cartInfo" v-if="getDataComplete"/>
  </div>
</template>

<script>
import CheckStep from '@/components/WebOrderCheckStep.vue'
import CartInfo from '@/components/WebCartInfo.vue'
export default {
  data() {
    return {
      cartInfo: {},
      getDataComplete: false,
      stepArr: ['check', 'purchaserData', 'payment', 'complete'],
      step: 3
    }
  },
  components: {
    CartInfo,
    CheckStep
  },
  methods: {
    updateInfo(data) {
      this.cartInfo = data
    },
    setStep() {
      this.step = this.stepArr.indexOf(this.$route.name) + 1
    }
  },
  watch: {
    cartInfo() {
      if (
        this.step < 3 &&
        this.cartInfo.carts &&
        this.cartInfo.carts.length < 1
      ) {
        this.$router.replace('/cart')
      } else {
        this.getDataComplete = true
      }
    }
  },
  updated() {
    this.setStep()
  },
  created() {
    this.setStep()
  }
}
</script>

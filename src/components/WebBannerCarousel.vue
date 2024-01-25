<template>
  <div class="position-relative overflow-hidden" v-if="bannerImages.length > 0">
    <div class="banner position-relative">
      <img
        class="bannerImg position-absolute"
        :style="{ left: `${key * 100}%` }"
        :src="img"
        :alt="'banner' + key"
        v-for="(img, key) in bannerImages"
        :key="'image' + key"
      />
    </div>
    <div
      class="position-absolute top-0 w-100 h-100 d-flex justify-content-center justify-content-md-between align-items-center"
      v-if="bannerImages.length > 1"
    >
      <button
        type="button"
        class="btn btn-light rounded-0 h-100 d-none d-md-block carousel-btn"
        @click="changeIndex(index - 1)"
      >
        <i class="bi bi-caret-left-fill"></i>
      </button>
      <div class="flex-fill d-flex flex-column h-100">
        <div class="flex-fill d-flex align-items-center justify-content-center mt-5">
          <div class="d-flex flex-column align-items-center justify-content-center p-3 text-gray fw-bolder rounded" :class="{'opacity-25': bannerDisable}" style="
                background-color: rgba(255, 255, 255, 0.5);
                backdrop-filter: blur(5px);
                box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.5);
                transition: opacity 1s;
                min-width: 800px;
              ">
            <h2 class="fw-bolder mt-3">精品級法式點心</h2>
            <p class="fs-2">每一口都值得回味</p>
            <router-link to="/products" class="btn btn-primary opacity-75 fw-bolder text-white"
              >看更多產品</router-link
            >
          </div>
        </div>
        <div class="d-flex justify-content-center mt-auto">
          <button
            type="button"
            class="btn btn-sm btn-light rounded-circle opacity-25 mx-2 mb-3 p-2"
            :class="{ 'opacity-50': index === key }"
            @click="changeIndex(key)"
            v-for="(img, key) in sorceImages"
            :key="'control' + key"
          ></button>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-light rounded-0 h-100 d-none d-md-block carousel-btn"
        @click="changeIndex(index + 1)"
      >
        <i class="bi bi-caret-right-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      timeCounter: '',
      bannerImages: [],
      banner: {},
      moveStep: 0,
      bannerDisable: true
    }
  },
  props: ['sorceImages'],
  watch: {
    index() {
      const moveSpeed = 1.5
      this.banner.style.transition = `transform ${moveSpeed}s`
      this.banner.style.transform = `translateX(${this.moveStep * 100}%)`
    }
  },
  methods: {
    changeIndex(newIndex) {
      if (this.bannerDisable) return
      this.moveStep = this.index - newIndex
      if (newIndex < 0) {
        this.index = this.sorceImages.length - 1
      } else if (newIndex >= this.sorceImages.length) {
        this.index = 0
      } else {
        this.index = newIndex
      }
      clearInterval(this.timeCounter)
      this.setCounter()
    },
    setCounter() {
      this.timeCounter = setInterval(() => {
        this.changeIndex(this.index + 1)
      }, 5000)
    },
    setBanner() {
      this.bannerImages = [
        ...this.sorceImages.slice(this.index),
        ...this.sorceImages.slice(0, this.index)
      ]
      this.bannerImages = [...this.bannerImages.slice(1), ...this.bannerImages]
    }
  },
  created() {
    this.setBanner()
  },
  mounted() {
    this.banner = document.querySelector('.banner')
    this.banner.style.left = `${(this.sorceImages.length - 1) * -100}%`
    this.banner.addEventListener('transitionstart', () => {
      this.bannerDisable = true
    })
    this.banner.addEventListener('transitionend', () => {
      this.banner.style.transition = 'transform 0s'
      this.banner.style.transform = 'translateX(0%)'
      this.setBanner()
      this.bannerDisable = false
    })
    if (this.sorceImages.length > 1) {
      this.setCounter()
      this.bannerDisable = false
    }
  }
}
</script>

<style>
.banner {
  height: 85vh;
  width: 100%;
}
.bannerImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.carousel-btn {
  opacity: 0;
}
.carousel-btn:hover {
  opacity: 0.25;
}
</style>

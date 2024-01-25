<template>
  <div class="bg-light p-2 pb-0" v-if="product.imageUrl">
    <div class="position-relative imgBlock">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="img-fluid position-absolute top-50 start-50 translate-middle h-100 rounded"
        style="object-fit: contain"
        :class="{ imageActive: product.imageUrl === showImage }"
      />
      <img
        v-for="(img, key) in product.imagesUrl"
        :key="'imgBig' + key"
        :src="img"
        :alt="product.title"
        class="img-fluid position-absolute top-50 start-50 translate-middle h-100 rounded"
        style="object-fit: contain"
        :class="{ imageActive: img === showImage }"
      />
    </div>
    <div
      class="d-flex p-2 overflow-x-auto"
      style="height: 100px"
      v-if="product.imagesUrl"
    >
      <button
        type="button"
        class="btn flex-fill border-secondary"
        style="min-width: 100px"
        @click="showImage = product.imageUrl"
        :class="showImage === product.imageUrl ? 'border-secondary': 'border-light'"
      >
        <img
          :src="product.imageUrl"
          :alt="product.title"
          class="img-fluid h-100 rounded"
        />
      </button>
      <button
        type="button"
        v-for="(img, key) in product.imagesUrl"
        :key="'img' + key"
        class="btn flex-fill border-secondary"
        style="min-width: 100px"
        @click="showImage = img"
        :class="showImage === img ? 'border-secondary': 'border-light'"
      >
        <img
          :src="img"
          :alt="`${product.title}${key}`"
          class="img-fluid h-100 rounded"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showImage: ''
    }
  },
  props: ['product'],
  watch: {
    product() {
      this.showImage = this.product.imageUrl
    }
  }
}
</script>

<style>
.imgBlock img {
  opacity: 0;
  transition: all 0.5s;
}

.imgBlock .imageActive {
  opacity: 1;
}

.imgBlock {
  height: 500px;
}

@media (max-width: 500px) {
  .imgBlock {
    height: 200px;
  }
}
</style>

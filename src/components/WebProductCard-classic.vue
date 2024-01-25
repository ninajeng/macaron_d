<template>
    <div class="card border-0">
      <img
        :src="product.imageUrl"
        class="card-img productImg"
        :alt="product.title"
        style="object-fit: cover"
        :style="{'height': height}"
      />
      <div class="position-absolute bottom-0" v-if="showBadge">
        <p
          class="fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"
          v-if="product.category === '期間限定'"
        >
          期間限定
        </p>
        <p
          class="fs-6 ms-3 badge rounded-pill bg-gray bg-opacity-75"
          v-else-if="product.origin_price !== product.price"
        >
          {{ `特價 ${Math.floor((product.price / product.origin_price) * 10)} 折` }}
        </p>
      </div>
      <div class="card-img-overlay p-0">
        <div
          class="d-flex justify-content-center align-items-center rounded py-3 d-lg-none"
          style="
            background: linear-gradient(
              rgba(41, 41, 43, 0.5) 20%,
              transparent
            );
          "
        >
          <p class="fw-bolder text-white px-2 fs-5 text-center">
            {{ product.title }}
          </p>
        </div>
        <router-link
          :to="`/product/${product.id}`"
          class="stretched-link productLink"
        ></router-link>
        <div
          class="h-100 d-none d-lg-flex flex-column justify-content-center align-items-center rounded productTitle"
          style="background-color: rgba(41, 41, 43, 0.5)"
        >
          <p class="fw-bolder text-white px-3 fs-5 text-center mb-5">
            {{ product.title }}
          </p>
          <p class="fw-bolder text-white fs-5 linkIcon">
            <i class="bi bi-search"></i>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['product', 'height', 'showBadge']
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

<template>
  <div :ref="`toast-${ToastId}`" class="toast mb-2 toastPosition">
    <div
      class="toast-header d-flex justify-content-between"
      v-if="toastMsg.title"
      :class="toastMsg.status === 'error' ? 'bg-danger' : 'bg-success'"
    >
      <p class="m-0 text-white">
        {{ toastMsg.title }}
      </p>
      <button
        type="button"
        class="btn-close btn-close-sm pe-3"
        @click="hideToast"
      ></button>
    </div>
    <div class="toast-body d-flex justify-content-between">
      <div class="d-flex">
        <i
          v-if="toastMsg.status === 'success'"
          class="bi bi-check-circle-fill me-2 text-success"
        ></i>
        <i v-else class="bi bi-exclamation-triangle-fill me-2 text-danger"></i>
        <p class="m-0" style="text-align: justify">{{ toastMsg.message }}</p>
      </div>
      <button
        type="button"
        class="btn-close btn-close-sm ms-2"
        v-if="!toastMsg.title"
        @click="hideToast"
      ></button>
    </div>
    <div
      class="toastBar rounded-bottom"
      :class="{
        'bg-success': toastMsg.status === 'success',
        'bg-danger': toastMsg.status === 'error'
      }"
    ></div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast'
export default {
  data() {
    return {
      toastItem: {}
    }
  },
  props: ['toastMsg', 'ToastId'],
  methods: {
    hideToast() {
      this.toastItem.hide()
    }
  },
  mounted() {
    this.toastItem = Toast.getOrCreateInstance(
      this.$refs[`toast-${this.ToastId}`],
      {
        delay: 2000
      }
    )
    this.toastItem.show()
  }
}
</script>

<style>
.toast{
  --bs-toast-max-width: none;
}
@media (min-width: 768px){
  .toast{
    --bs-toast-max-width: 350px;
  }
}
.toastBar {
  height: 5px;
  width: 0%;
  opacity: 0.5;
  animation: toastBar 2.7s;
}
.toastPosition {
  animation: toastPosition 0.5s;
}
@keyframes toastBar {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
@keyframes toastPosition {
  0% {
    transform: rotateZ(10deg);
  }
  70% {
    transform: rotateZ(-5deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>

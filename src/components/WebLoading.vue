<template>
  <div
    class="position-fixed bg-dark bg-opacity-75"
    style="
      z-index: 1058;
      backdrop-filter: blur(5px);
      top: -100vh;
      height: 300vh;
      left: -100vw;
      width: 300vw;
    "
    v-if="isLoading"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center h-100"
    >
      <div class="macaron-animation">
        <div class="macaron macaron-top"></div>
        <div class="macaron macaron-mid"></div>
        <div class="macaron macaron-bottom"></div>
      </div>
      <div class="floor">
        <div class="floor-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isLoading']
}
</script>

<style>
.macaron {
  width: 50px;
  height: 10px;
  background-color: rgb(255, 238, 0);
}
.macaron-top {
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.macaron-bottom {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
.macaron-mid {
  height: 5px;
  margin-left: 2px;
  width: 46px;
  border-radius: 5px;
  background-color: rgb(255, 187, 0);
  margin-top: 1px;
  margin-bottom: 1px;
}
.floor {
  width: 200px;
  height: 5px;
}
.floor-content {
  background-color: var(--bs-gray);
  height: 100%;
  width: 40%;
  animation: floor 0.5s infinite linear;
}
.macaron-animation {
  margin-bottom: 10px;
  animation: macaron 0.5s infinite;
}
@keyframes floor {
  0% {
    transform: translateX(150%);
  }
  45% {
    transform: translateX(75%);
  }
  55% {
    transform: translateX(75%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes macaron {
  0% {
    transform: translateX(-50%) translateY(-50%) scaleY(1.1) scaleX(0.8);
  }
  50% {
    transform: translateX(0%) translateY(0%) scaleY(1) scaleX(1);
  }
  100% {
    transform: translateX(50%) translateY(-100%) scaleY(1.1) scaleX(0.8);
  }
}
</style>

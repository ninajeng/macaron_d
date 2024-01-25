<template>
  <div class="container">
    <h5 class="mb-0 fw-bolder text-center">結帳</h5>
    <div class="d-none d-md-flex justify-content-between mt-2">
      <template v-for="(info, key) in stepInfo" :key="info">
        <div class="d-flex flex-column align-items-center w-100" :class="{stepLine :key < stepInfo.length - 1, stepLineEnable: step < key + 2}">
          <div class="rounded-circle text-center mb-2" :class="step > key ? 'stepEnable' : 'stepDisable'" style="width: 25px; height: 25px;">
            <p class="m-0 text-white">{{ key + 1 }}</p>
          </div>
          <p class="mb-0">{{ info }}</p>
        </div>
      </template>
    </div>
    <div class="accordion d-md-none mt-2 rounded overflow-hidden border" id="accordionStep">
      <div class="accordion-item border-0 rounded-0">
        <template
          v-for="(info, key) in stepInfo"
          :key="'accordionStepInfo' + key"
        >
          <h2 class="accordion-header" v-if="step === key + 1">
            <button
              type="button"
              class="accordion-button collapsed rounded-0 fw-bolder collapseStepBtn bg-white stepsBtn"
              @click="toggleCollapse"
            >
              {{ `STEP ${key + 1}：${info}` }}
            </button>
          </h2>
          <div
            class="accordion-collapse collapse rounded-0 collapseStep"
            :style="{
              color:
                step !== key + 1 ? 'var(--bs-gray)' : 'var(--bs-dark)'
            }"
            data-bs-parent="#accordionStep"
            v-else
          >
            <div class="accordion-body">
              <p class="mb-0">{{ `STEP ${key + 1}：${info}` }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepInfo: ['確認明細、輸入優惠碼', '填寫訂購人資料', '付款', '訂單完成']
    }
  },
  props: ['step'],
  methods: {
    toggleCollapse() {
      document.querySelectorAll('.collapseStep').forEach(item => item.classList.toggle('show'))
      document.querySelector('.collapseStepBtn').classList.toggle('collapsed')
    }
  }
}
</script>

<style>
.stepLine{
  position: relative;
  z-index: -2;
}
.stepLine::before{
  content: '';
  width: 100%;
  height: 2px;
  background-color: var(--bs-gray);
  position: absolute;
  top: 12px;
  transform: translateX(50%);
  z-index: -1;
}
.stepLineEnable.stepLine::before{
  background-color: var(--bs-graySlight);
}
.stepEnable{
  background-color: var(--bs-gray);
}
.stepDisable{
  background-color: var(--bs-graySlight);
}
.stepsBtn:not(.collapsed) {
    box-shadow: none;
}
</style>

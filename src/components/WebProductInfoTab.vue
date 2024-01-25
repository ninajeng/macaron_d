<template>
  <div v-if="product.title">
    <nav class="productInfoTab">
      <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
        <button
          type="button"
          class="nav-link link-secondary border-bottom-0 active"
          data-bs-toggle="tab"
          data-bs-target="#info-spec"
        >
          產品規格
        </button>
        <button
          type="button"
          class="nav-link link-secondary border-bottom-0"
          data-bs-toggle="tab"
          data-bs-target="#info-store"
        >
          保存方法
        </button>
        <button
          type="button"
          class="nav-link link-secondary border-bottom-0"
          data-bs-toggle="tab"
          data-bs-target="#info-delivery"
        >
          取貨方式
        </button>
      </div>
    </nav>
    <div
      class="tab-content p-4 rounded-bottom"
      style="min-height: 180px"
    >
      <div class="tab-pane fade show active" id="info-spec">
        <ul class="list-unstyled lh-lg mb-0" style="text-align: justify">
          <li>{{ `內容：${ product.content }` }}</li>
          <li>{{ `規格：${ product.unit }` }}</li>
          <li>葷素：奶蛋素</li>
          <li>保存期限：三日</li>
        </ul>
      </div>
      <div class="tab-pane fade show" id="info-store">
        <ul class="list-unstyled lh-lg mb-0" style="text-align: justify">
          <li class="d-flex">
            <i class="bi bi-1-circle me-2"></i>
            <p class="mb-0">
              <span class="fw-bolder">低溫儲存</span>：請保持低溫冷藏。
            </p>
          </li>
          <li class="d-flex">
            <i class="bi bi-2-circle me-2"></i>
            <p class="mb-0">
              <span class="fw-bolder">密封包裝</span
              >：拆開包裝後，請將點心存放在密封容器或食物袋中，以避免空氣和潮濕進入，保持口感與風味。
            </p>
          </li>
          <li class="d-flex">
            <i class="bi bi-3-circle me-2"></i>
            <p class="mb-0">
              <span class="fw-bolder">避免照射陽光</span
              >：避免將點心暴露在陽光下，以免外觀與口感受損。請將它們放在陰涼處，遠離陽光和高溫。
            </p>
          </li>
          <li class="d-flex">
            <i class="bi bi-4-circle me-2"></i>
            <p class="mb-0">
              <span class="fw-bolder">快速享用</span
              >：我們選用新鮮食材，堅持不添加化學防腐，給您最健康的美味。點心保存期限為3日，包裝上有標示到期日，建議您盡速品味！
            </p>
          </li>
        </ul>
      </div>
      <div class="tab-pane fade show" id="info-delivery">
        <p class="mb-2">
          提供門市取貨、貨運低溫宅配、超商冷藏運送。活動期間，不限金額免運費！
        </p>
        <p class="mb-2">
          商品將於七個工作天內送達。若選擇門市取貨，我們將與您聯繫確認取貨日期。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/js/dist/tab'
export default {
  props: ['product']
}
</script>

<style>
.productInfoTab .nav .nav-link.active{
  background-color: white;
}
</style>

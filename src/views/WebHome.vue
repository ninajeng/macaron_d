<template>
  <WebLoading :is-loading="isLoading" />
  <div class="bg-white">
    <BannerCarousel :sorce-images="bannerImages" class="position-relative bannerBackground" style="top: -65px;" />
  </div>
  <div class="bg-white overflow-hidden sectionPadding">
    <div class="container">
      <h3 class="text-center fw-bolder text-primary-emphasis mb-3 mb-md-5">
        我們用心，給您最好
      </h3>
      <div
        class="row feature justify-content-center align-items-center py-2 rounded"
        :class="{ 'flex-row-reverse': key % 2 === 1 }"
        style="margin-bottom: 60px;"
        v-for="(feature, key) in featureDescribe"
        :key="feature.title"
      >
        <div class="col-md-5 feature-describe rounded">
          <div
            class="text-center p-3"
            :data-aos="key % 2 === 0 ? 'fade-right' : 'fade-left'"
            data-aos-duration="2000"
          >
            <h4 class="fw-bolder">{{ feature.title }}</h4>
            <p class="m-0">{{ feature.content }}</p>
          </div>
        </div>
        <div class="col-md-6 feature-image">
          <img
            class="img-fluid rounded"
            :src="feature.image"
            :alt="feature.title"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white sectionPadding" v-if="getProductsFinish">
    <div class="container">
      <h3 class="text-center mb-5 fw-bolder text-primary-emphasis">官網限定優惠</h3>
      <div
        class="row mb-4 justify-content-center align-items-center gx-4 gy-3 flex-column-reverse flex-lg-row"
        v-for="(product, key) in featuredProductsInfo"
        :key="product.id"
        :class="{ 'flex-lg-row-reverse': key % 2 === 0 }"
        :style="key !== 0 ? 'margin-top: 60px' : ''"
      >
        <div
          class="col-lg-5 text-center text-lg-start"
          v-if="product.content"
        >
          <h4 class="fw-semibold d-none d-lg-block">
            <router-link
              :to="`/product/${product.id}`"
              class="link-dark text-decoration-none"
              >{{ product.title }}</router-link
            >
            <span class="ms-2 fs-6 text-gray">({{ product.unit }})</span>
          </h4>
          <hr class="my-2 d-none d-lg-block" />
          <p
            v-html="adjustSentence(product.content)"
            class="lh-lg mb-1 d-none d-lg-block text-gray"
          ></p>
          <p class="lh-lg mb-1 d-lg-none mt-2 mb-3">{{ product.content }}</p>
          <hr class="my-2 d-none d-lg-block" />
          <p class="mb-2">
            <span class="text-danger fs-4 me-2"
              >{{ `NT$ ${$filters.currency(product.price)}` }}</span
            >
            <span
              class="badge rounded-pill bg-graySlight text-dark me-2"
              style="vertical-align: top"
              >{{
                `${Math.floor((product.price / product.origin_price) * 10)}折`
              }}</span
            >
            <del class="text-gray">{{
              `NT$ ${$filters.currency(product.origin_price)}`
            }}</del>
          </p>
          <p class="text-gray mb-2 d-lg-none">{{ `規格：${product.unit}` }}</p>
          <a
            href="#"
            class="zIndex position-relative btn btn-outline-secondary mt-2 mt-lg-0"
            @click.prevent="
              emitter.emit('addCart', { product_id: product.id, qty: 1 })
            "
            ><i class="bi bi-cart-plus me-2"></i>加到購物車</a
          >
        </div>
        <div class="col-lg-6" v-if="product.content" data-aos="fade-up">
          <ProductCardClassic :product="product" :height="'400px'" :showBadge="false" />
        </div>
      </div>
    </div>
  </div>

  <div class="bg-light sectionPadding" ref="anniversary">
    <div class="container text-center">
      <h3 class="fw-bolder align-middle text-primary-emphasis mb-3">
        \ 週年慶活動開跑 /
      </h3>
      <div class="border rounded position-relative pt-4 px-3" style="margin-top: 60px;" data-aos="zoom-in-up" data-aos-duration="2000">
        <h4 class="fw-bolder fs-3 position-absolute top-0 start-50 translate-middle bg-light px-3">
          <span
            class="badge bg-secondary-subtle text-secondary rounded-pill align-middle me-2"
            style="font-size: 0.5em"
            >好禮一</span
          >
          <span class="align-middle d-none d-md-inline">新朋友下單享優惠</span>
        </h4>
        <h4 class="d-md-none fw-bolder fs-3 mt-3 mb-3">新朋友下單享優惠</h4>
        <p class="mt-2 mt-md-5 mb-md-3">
          新朋友限定優惠！立即使用折扣碼，結帳金額享九折優惠。
        </p>
        <div
          class="d-flex flex-wrap mb-2 justify-content-center overflow-hidden pb-3 pb-md-5"
        >
          <p class="display-6 me-2 my-1">
            <i class="bi bi-ticket-perforated-fill fs-3"></i>
            newfriend
          </p>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary my-1"
            @click="copyCode('newfriend', $event)"
          >
            複製優惠碼
          </button>
        </div>
      </div>
      <div class="border rounded position-relative pt-4 mb-2" style="margin-top: 80px;" data-aos="zoom-in-up" data-aos-duration="2000">
        <h4 class="fw-bolder fs-3 position-absolute top-0 start-50 translate-middle bg-light px-3">
          <span
            class="badge bg-secondary-subtle text-secondary rounded-pill align-middle me-2"
            style="font-size: 0.5em"
            >好禮二</span
          >
          <span class="align-middle d-none d-md-inline">不限金額皆免運費</span>
        </h4>
        <h4 class="d-md-none fw-bolder fs-3 mt-3 mb-3">不限金額皆免運費</h4>
        <p class="mt-4 mb-0">提供三大取貨服務</p>
        <div class="d-flex flex-wrap justify-content-evenly align-items-center py-3">
          <div
            class="text-center m-3"
            v-for="delivery in deliveryWays"
            :key="delivery.way"
          >
            <div class="delivery">
              <img :src="delivery.image" :alt="delivery.way" />
            </div>
            <h5 class="mt-3">{{ delivery.way }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white sectionPadding position-relative">
    <div class="container text-end">
      <h3 class="fw-bolder text-primary-emphasis text-center">
        人氣商品
      </h3>
      <router-link
          to="/products"
          class="link-secondary text-decoration-none"
          @click="emitter.emit('setFilterStore', '')"
          >看更多產品<i class="bi bi-caret-right-fill"></i
        ></router-link>
    </div>
    <WebRecommand :num="4" :isRandom="false" :classicType="false" :showTitle="false" />
  </div>

  <div class="container" ref="subscribe">
    <div
      class="row justify-content-end align-items-center"
      style="min-height: 500px"
    >
      <div
        class="col-lg-7 bg-light bg-opacity-25 py-2 rounded"
        style="backdrop-filter: blur(2px)"
      >
        <h3 class="fw-bolder mb-3 text-primary-emphasis">訂閱我們</h3>
        <p>
          訂閱 macarOn
          電子報，獲得最新優惠與活動訊息，還可享有訂閱限定的折扣優惠！於下方輸入電子信箱，並按下訂閱按鈕，將立即獲得<span
            class="text-danger fw-semibold"
            >訂閱折扣碼</span
          >，結帳金額享八五折優惠！
        </p>
        <VForm v-slot="{ errors }" @submit="subscribe">
          <div class="input-group">
            <VField
              name="信箱"
              type="email"
              class="form-control border border-gray border-end-0"
              :class="{ 'is-invalid': errors['信箱'] }"
              placeholder="請輸入 E-mail"
              ref="userEmail"
              v-model="userEmail"
              rules="email|required"
            />
            <button
              type="submit"
              class="btn btn-gray rounded-end"
            >
              訂閱並取得折扣碼
            </button>
            <ErrorMessage name="信箱" class="invalid-feedback"/>
          </div>
        </VForm>
      </div>
    </div>
  </div>

  <!-- 訂閱區塊的背景圖 -->
  <div class="fixed-top w-100 h-100 subscribeBackground" v-show="!isScrollTop"></div>
  <div
    v-show="subscribeView"
    class="position-fixed"
    style="
      z-index: 1058;
      backdrop-filter: blur(5px);
      top: -100vh;
      height: 300vh;
      left: -100vw;
      width: 300vw;
    "
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center h-100"
    >
      <div
        class="card text-primary-emphasis border px-3 py-1 bg-light shadow-lg"
        style="max-width: 90vw"
      >
        <button
          type="button"
          class="btn btn-sm btn-gray position-absolute rounded-circle"
          style="top: 10px; right: 10px;"
          @click="closeSubscribeView"
        >
          <i class="bi bi-x-lg"></i>
        </button>
        <div class="card-body">
          <h3 class="fw-bolder">訂閱成功！</h3>
          <p
            class="mb-2 text-secondary d-inline-block"
            style="
              background-image: linear-gradient(
                transparent 60%,
                var(--bs-secondary-bg-subtle) 40%
              );
            "
            ref="subscribeEmail"
          >
            訂閱Email
          </p>
          <p class="mb-2">感謝您訂閱 macarOn 電子報！</p>
          <p class="mb-2">搶先獻上訂閱折扣碼，結帳金額享八五折優惠</p>
          <div class="d-flex flex-wrap mb-4 mb-md-3">
            <p class="mb-2 display-6 me-2">
              <i class="bi bi-ticket-perforated-fill fs-3 me-2"></i>
              <span>MCOmemb</span>
            </p>
            <button
              type="button"
              class="btn btn-sm btn-primary align-self-center"
              @click="copyCode('MCOmemb', $event)"
              ref="copyBtn"
            >
              複製優惠碼
            </button>
          </div>
          <div class="text-center">
            <button
              type="button"
              class="btn btn-outline-gray"
              @click="closeSubscribeView"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerCarousel from '@/components/WebBannerCarousel.vue'
import ProductCardClassic from '@/components/WebProductCard-classic.vue'
import WebRecommand from '@/components/WebRecommand.vue'
import AOS from 'aos'
AOS.init({
  offset: 100, // offset (in px) from the original trigger point
  delay: 300, // values from 0 to 3000, with step 50ms
  duration: 1000 // values from 0 to 3000, with step 50ms
})
export default {
  data() {
    return {
      bannerImages: [
        'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1702358864882.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=oM5TlSijR1vMNQtYmYXOgbLaJQwl0Gz0VQlpJHkw9XwQwd07M5TaVY4Pnf5%2FktT0Ed9LGOWT0elHG0Ht1j61QA13HJ7fpBLPf03umSWsrWA5R6fG5Bhmu7prV%2F%2Byq8UwxbpxmpiQgIthdn0c%2BDh6BpflGLEq%2B7N50H%2F7d2mOtrC5BtJjWfH75FUvM%2FwtOEK1yjztL7F1Diam5%2F5sOypANcDa0wIIuCBQN95mfDbzNY0Fc17sCrdapxrQAJprZWySXLk1uR%2FxQ5yBAY5UJxY9bEUy7a4BgsHeT9BO7EabgfBvnUhPzE%2BS%2BuIkWvEiulvytWA2eiZlxSPlUDECHa8pSQ%3D%3D',
        'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1702358908364.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bF%2FbqfCcl%2FD2m%2FeXkv3W9ivbpbkfL4L%2B8zPl14vt0ByA9LVHrm%2Fk5wnk3cmLPKNIu9sCxXrNuEgBpNRBYVIhZF1ctjA5ckdXPCftnGuGrDEH2qgjUCNHQeonUgoAVk8rqjgZBpg6ywebVApWs%2FS0TfqWGxtbWBmz%2FOuwKYnsZtF9TPwIx0heL4l0d2a32aeh%2FkkOSYWe1WsddM2dnncdvxitJYiwU2mfgYZpf1WzrHRfErCUSUv5L%2Bhl%2Bj%2FpY%2FVVvOruqK3AmlEQOyWAkRE8p0g%2Fl20goW0U651wMRtshVqASYANN7ruUj0KCpH4GTwa8mcRzjP7Cl6YdZXafMVg8A%3D%3D',
        'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700547322880.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=FNhU%2F2KjMjyrak3XDCaSByEqsv%2FHBGu6wpOM6c%2Flv3kbWuMsIlsQhO4jBDoBCYmDQUeOItGevqL7OUHXJgMgGPucfXoR%2FPcD6RgJ7JNZ%2Bt35pjDYoGgRWwvjBbF6joeHQCtHaTaNYb9xVectAnQfapwCedezLtJllXlyBYm8wIYRMNXwyWMPcSF%2FMRuzgbLEKmheBHOaICF88m4ST8qbI%2FigNpOq%2F%2F0YlP%2BkLbnZcP4hsPiVlzBCmqlvDBM1%2FTJs4SVa5yQKcYIr8qaRGOEFFQ9dbeQhxL1q5sb0phNlRudxQxZDOrUC4HIPI98ol6%2BqJA%2B75Pse2eWnoD3x0lf7sA%3D%3D',
        'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700547350774.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hesbZ0j88e85SU04AWUaDDPgKswQjaGRBVNPSGcD477dPD%2F94ob7TvIEvIHOziJQmqs9fBaoJeU63uYcj%2FzBh%2FYOS4t1WaMOB%2FZ2j7VDoWmjdHhDXy0J%2FKzkiOJcUJblsyQ5Y4Ozy4bjtm%2FfWlvRrCN9UDBWhMlktARUfgHmLKtZnZVoepYGNphLuPOuWhNi5dwdctg1Ev3NhXBs9C5xfWwTrF0rlZhyRXVUtrG1xcdWned2wI1erRvSmaKpf%2BZVd%2Fbj6VKIVD7m52sQB0gdo9mfwndl6%2BzTdsRWxmDFxzd1JCCHJpz6%2BBXWjGz6h9PWWU8VwDiJkcvwHkMlo7YYDA%3D%3D',
        'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700547331394.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dZKsiPqgpqTxYrjp3Ip6VILxX9VWJVcO1W7XF8m2%2BdPUFolE1pDTyL9imU0JKQa5IATWkQhr7lIJ8zPEqqXkD0kQkPXt5H5Jh2ewGyU6ORZiPFEW92jmonjuClq5F%2BpMDtMoM7WfV0mDE1ZFEp0V%2FKeSQnKdqsoWfdztTfAssLUR6Zsj6fZu%2B9JFuUL7pHY8tbtuEQKuXv4qPL%2F8ogEb5pEk0coBRaLkk138vGsXZRSWXxKyIc1cZ7rZrbgkWG2Vy%2FOtG%2F1Han%2BznIak%2BEGiSpzYUW4dQR0au0ksCQqhZCTUPOHGdnxRqFhbf75brWx2wKHhYpfeX%2BKJoPA3DtQUVQ%3D%3D'
      ],
      featuredProductsId: [
        {
          id: '-NhkSxjcw0blB6bdsN2L'
        },
        {
          id: '-NhkFgYVUIPsrWPtONg-'
        }
      ],
      featuredProductsInfo: [],
      getProductsFinish: true,
      deliveryWays: [
        {
          way: '門市取貨',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700578441045.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=N%2BdqoBj8M7oNyrw0LbdGiE2Br53t0QzOwbxYo3ur8a3SgAagv4r3TyjGw4wggEGnob6JE%2F2MiKeA2tibZ11PYH%2Fa3EIkv6OaAxggPsHNvLt4mB2PkRkQ2FUXfQDWF%2F9HPBjdz7oAWNfOMP6L8SJoTvl4%2FqjPQHs34WQ%2BthGEhf024KtCUsTKlCN0T%2BaXxQno%2FEG4GGhr7hOy%2FBCQvjptDUp5uPvjAYb%2FBgQuKEnpai12pz%2BL98kywSOmfs1YnlNKU9oj0atg02uDYSpS8O9mGl0YlFYnQ5IRwqQFpxR8LOhSZxWLZvMMD1FX6kn%2BLJW1RVxTocu%2BdZ6ZrzQe2ndizw%3D%3D'
        },
        {
          way: '貨運低溫宅配',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700578452764.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bxjQ3tCE2k4uVjA5Re90Wy%2FQV24EBuNDGrbPui73O5cC08PDOeVozY4eJdxlyRzaPYYoqC7PV0Q2v%2ByExrE%2Fsif8hJBxsFZCwup21%2FlgT8iWonn0mKO%2FpC9aRlM2Zc%2BKeD0Dn2pKLe4Ge%2FIyGJJsAxEiCueaytif2rRkMHcxVbgP%2F9q9UgY0eKNMn8xMLCPT13c4am7%2BHh6QejxTN2IfT%2B%2F6MflAxBS4nrs2cmEqOejKpciBBxbmB0vCpT2In%2FiZ5UjQ7Byq5LL0%2BicLLBfptXzGkcdJ%2FuiyhhgYEIIZgHGuSmvqNUyUHPK78P72KBXOYafOZaZj1NvA2CQ5TM4JIg%3D%3D'
        },
        {
          way: '超商冷藏運送',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700578463742.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hHuIA7adBvasOabvHeE4TVkZQfF6WBKwjDSKX8j%2F4LrK0KgQmJFeVkNNNC93IN3bidDasud0Y7TyuFmUL3FW99Y3SZ0sf0g36N6kwV0dBu5bpaif0IE6wWjtmugxF92V7xazVDEdB9emFAHFCWVz8VBFBQpHwLV3b6TTiELmGR8xRR3Gp01ydb9YlIEbgh1K0OT48cw1Z0l35KK564p86zFLvm3313Kssin4cJfX7OCAm9GlVlvdYAMwCEKfEwnuT9wQzyvNRuzl7G1HZULpleS6poTQTiD%2Bunbdh2pokYKAewepxniahoNnoImEyWbOHOFS9AbuCCUQqQC4s0ykyQ%3D%3D'
        }
      ],
      featureDescribe: [
        {
          title: '嚴選新鮮食材',
          content: '選用高品質食材製成，外殼酥脆、內餡飽滿',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700550140065.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IBKFyCkQ%2FHKuMiczpTGxWcUnu0Enb0D%2FJjFrXhPXehMISaVXLnPODLGtjGnmb3ZZn9lZCN9nLtBLKUgXBzuLSHL4fzaDwcI3VbcCQqp6wM9Utewg1w7MUSybN5SHMjmqOkdwiVkqtqt%2FZ0NSOcSugTCsJ8Inma8NVDw0e6tUqDCO0ZsTxuHxNIn8hk%2BarurdVrIBxk8Pm%2FANeqX7g0kYDLRuLcwaO3esGFh92nSlKEsrvxEGruGoYssyXVICD8rWovp6YgQrITJJCowgzd6OSaDYVS%2FmSuTbre4zNrTBPEcC18AR3twQ8VhH9mWRWdUABbzToG%2Bk%2BfM3kGk5iFFN4A%3D%3D'
        },
        {
          title: '手工精心製作',
          content: '我們用心，讓每一顆馬卡龍都是完美組合',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700623562475.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=h5SwGs8PVy6KAjR%2BoGbtF1M70j7%2BDfDNIpHng3EB4F8DIjKmqc0b2A8v6y%2FpWQe861ywEPaQAla5mjpwJ4lz3nrhy7IBndvp2fAkB5u6zAsL%2FypFFmv%2B1OMUozZOw4pVsOR9iM8zqnO8%2F4Lz4Q59O5oDWecnpoXVeji68B0krWgkI0VyQf5iKMtVx1bfpyBfqryU4rdLjuqNtiE0XHRrqbgGq5irfORWqIOW4SflQBOQF1CWieWINb6GW2gmB%2BZcsJ54EMPxNUd43uYy2Noo68ZnbnQ4kKAqQuyR9c5QKePT574h5U2Vi3%2FJ%2BfephfpoZ6kobHc0HfRqiCmHo7%2Fo9A%3D%3D'
        },
        {
          title: '多樣化口味',
          content: '從經典口味到當季限定風味，滿足您的味蕾',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700623591077.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=iq%2FabU1zLVE%2F7hLIrCXeVj3kmnhxrtgTuwxUTuP%2FNrAHTMmye%2FqPINTRL3akO1vEmbbHd1F31lk5HzJ4XaIBiOklPLoERFFEw8OJgrHj0WNvnto5i5kPyWE2DEsVkyrurjIMuYvZ3I%2FAZ%2Bwi4kYQK8%2Fn1886%2B2jx1RP%2FvgzUlKsEGgoYHbJGnDd43tBeT7%2F3zQqGPN9%2BCqW3xcV%2Fi6cfiOrLp4EVTPlLdlx%2Bgwx7q23VyX4bVH6Dz%2F%2F74hNfpsB6zQ0om9IQKz6EmC56tIV5f%2F1UfxZMyCP3jRrAeHGfX6zrLjAI924sWtYhsQwTvaue9PlzgvD802NLn65VakVfQg%3D%3D'
        },
        {
          title: '獨特禮盒包裝',
          content: '精美的禮盒包裝，為每一刻增添奢華',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1700624298368.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=PND61nSJZ02VdjulofkCsDUj3XSzwHA04VkHt8oItnxgACweO7ZpO2PdVAtIWR8sK9FlyBilT574xXJGya%2BM54SqFY6i2pQuNyQpEsXgJZ3B9utTwkHHxW%2F0%2FL5QNO811z%2BmvIaMXUnlpt89vjS5nJN46xDgLaSwekdjzO4B82bYV6F4mueuFsSflLTEDeZwsZ2nfiJ7JeCrT8u6MHyfalzzgjdp6PYYlZ1dx1ALvrnbR%2BUhOlRiH%2BT2bmohOCGQVbSfbWfo1WQ0iV4S5wTtrzpAswru%2BGYpHcERtkqRD3z7UZy3JMPA%2B%2BfQ5bykkQ9g3GcqfdvyFx5C52t%2FAq%2BIvA%3D%3D'
        }
      ],
      isScrollTop: true,
      subscribeView: false,
      userEmail: '',
      isLoading: false
    }
  },
  inject: ['emitter'],
  components: {
    BannerCarousel,
    ProductCardClassic,
    WebRecommand
  },
  methods: {
    subscribe() {
      this.$refs.subscribeEmail.textContent = this.userEmail
      this.subscribeView = true
      this.$refs.userEmail.reset()
    },
    copyCode(code, e) {
      e.target.classList.add('disabled')
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(code)
          .then(() => {
            e.target.innerHTML = '<i class="bi bi-check me-1"></i>已複製'
            e.target.classList.add('btn-success')
            e.target.classList.add('btn-outline-success')
          })
          .catch(() => {
            e.target.innerHTML = '<i class="bi bi-x"></i>複製失敗'
            e.target.classList.add('btn-danger')
            e.target.classList.add('btn-outline-danger')
          })
      } else {
        e.target.innerHTML = '<i class="bi bi-x"></i>複製失敗'
        e.target.classList.add('btn-danger')
        e.target.classList.add('btn-outline-danger')
      }
    },
    closeSubscribeView() {
      this.subscribeView = false
      this.btnReset()
    },
    btnReset() {
      this.$refs.copyBtn.classList.remove('disabled')
      this.$refs.copyBtn.classList.remove('btn-success')
      this.$refs.copyBtn.classList.remove('btn-outline-success')
      this.$refs.copyBtn.classList.remove('btn-danger')
      this.$refs.copyBtn.classList.remove('btn-outline-danger')
      this.$refs.copyBtn.innerHTML = '複製折扣碼'
    },
    async getData() {
      try {
        this.isLoading = true
        await Promise.all([
          ...this.featuredProductsId.map((product, key) =>
            this.getProductData(product)
          )
        ])
        this.getProductsFinish = true
        this.isLoading = false
      } catch (e) {
        this.emitter.emit('sendMsg', {
          message: e,
          status: 'error'
        })
      }
    },
    getProductData(product) {
      return new Promise((resolve, reject) => {
        const API_GETPRODUCT = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${product.id}`
        this.axios
          .get(API_GETPRODUCT)
          .then((res) => {
            if (res.data.success) {
              this.featuredProductsInfo.push(res.data.product)
            } else {
              this.emitter.emit('sendMsg', {
                message: '找不到產品',
                status: 'error'
              })
            }
            resolve()
          })
          .catch((e) => {
            this.emitter.emit('sendMsg', {
              message: e,
              status: 'error'
            })
            reject(new Error('Failed: get product data'))
          })
      })
    },
    adjustSentence(content) {
      return content.replaceAll('，', '<br>').replace('。', '')
    },
    checkPositionY() {
      if (window.scrollY === 0) {
        this.isScrollTop = true
      } else {
        this.isScrollTop = false
      }
    }
  },
  created() {
    this.getData()
    this.emitter.emit('setNavColor')
    window.addEventListener('scroll', this.checkPositionY)
  },
  beforeUnmount() {
    this.emitter.emit('removeNavColor')
    window.removeEventListener('scroll', this.checkPositionY)
  }
}
</script>

<style>
.delivery {
  max-height: 250px;
  max-width: 250px;
  aspect-ratio: 1;
  position: relative;
  z-index: 1;
}
.delivery::before {
  content: '';
  background-color: var(--bs-secondary-bg-subtle);
  position: absolute;
  top: 5px;
  left: 10px;
  bottom: -5px;
  right: -10px;
  border-radius: 50%;
  z-index: -1;
}
.delivery img {
  height: 100%;
  width: 100%;
  object-position: center;
  object-fit: cover;
  border-radius: 50%;
}
.subscribeBackground {
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1702696009212.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DR1SJPMCeigeIgJNvQyrpVzBohFCLhuLdqf%2Fs6wrQSdN43jX33yNZSaJw3NxniqCz1ARhD9Yxly4NVxpiiUv7FmsQLLJnZgBQkA6QtMKuWxABfuP3OTlC%2BrJbZsqIL9frAhh4u29pIf0JrargCEKLfzVXSIz5bax0RXqu2yvDWUqlZhAq76%2BN2Gsdxy805ep1p4ctYwLLN1Q25HeuVhbwxVri6TYmmSFVMxM6oEAgco0JrwLKY6%2FSteoZkwNq%2B%2FDhGq88zwJCcddrsEWvVoDS5tinIOGZfeakPWSKArI4PoRdQ33sLNIdq5ah%2FfcM3a2ffBC6OWQx1IbfQzwoO8jow%3D%3D);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: -1;
}
.feature-describe {
  background-color: var(--bs-light);
  box-shadow: 0;
  z-index: 2;
}
.feature-image {
  z-index: 1;
}
.feature {
  background-color: var(--bs-light);
  padding-bottom: 1rem;
}
.sectionPadding{
  padding-top: 60px;
  padding-bottom: 60px;
}
@media (min-width: 992px) {
  .subscribeBackground {
    background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1705566266013.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=NCwxHoHcElPJtXZUEp9%2BXOAizX%2Bqd%2BHFUI%2B9ByMJIFlI4MJqySRIZgC2YQAxnVFU1yf3m1fyDpXBDDycaxVMVvA%2F0kzel0ryFnJatFqq%2BrCHFouOgdRRQsaUstDPxiWu9OclwL1xsbsp2c9QcUIRtNaIqTHquWK3UlvUrdFYd4rWpIGick%2Fh4wsFLfmuVg4Rs2FYECSmaIzwAEoYHfrVUN17201xkCG7y5y%2FRAj0cVPfzlaWmz13d%2FJV8vrqQXG%2FkkArhkYu6K0R9lDWRluZBd%2B%2BUOlrvXGnSkR71bJnwPU75P0PqKCKZlJlnuAYymdTz8raTsfpRAXSfrqoZCiMbA%3D%3D);
    background-position: left top;
  }
}
@media (min-width: 768px) {
  .feature:nth-of-type(odd) {
    .feature-describe {
      transform: translateX(30px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .feature-image {
      transform: translateX(-30px);
    }
  }
  .feature:nth-of-type(even) {
    .feature-describe {
      transform: translateX(-30px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .feature-image {
      transform: translateX(30px);
    }
  }
  .feature {
    background-color: transparent;
    padding: 0;
  }
}
</style>

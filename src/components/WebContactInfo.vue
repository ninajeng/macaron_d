<template>
  <div
    class="d-md-flex flex-wrap justify-content-center text-start"
    v-if="!withIcon"
  >
    <p
      :class="{
        'me-3': index < Object.keys(info).length - 1
      }"
      v-for="(data, key, index) in info"
      :key="data.name"
    >
      <span class="me-2 fw-semibold">{{ data.name }}:</span
      ><a
        v-if="key === 'phone' || key === 'email'"
        :href="key === 'phone' ? 'tel:+' : 'mailto:'"
        class="text-primary-emphasis text-decoration-none"
        >{{ data.info }}</a
      ><span v-else>{{ formatToText(data.info) }}</span>
    </p>
  </div>
  <div class="bg-primary-subtle" v-else>
    <div class="container py-4 py-md-5">
      <h3 class="text-center fw-bolder text-primary-emphasis mb-1">聯絡我們</h3>
      <div class="d-flex flex-wrap justify-content-center">
        <div
          class="contactInfo d-flex justify-content-center"
          v-for="(data, key, index) in info"
          :key="data.name"
          data-aos="zoom-out"
          :data-aos-duration="600 + index * 800"
        >
          <div
            class="rounded-circle d-flex flex-column justify-content-center align-items-center text-center m-3 position-relative shadow"
            style="aspect-ratio: 1; width: 250px"
          >
            <p v-html="data.icon" class="display-4 infoIcon"></p>
            <h5 class="fw-bolder">{{ data.name }}</h5>
            <a
              v-if="key === 'phone' || key === 'email'"
              :href="
                key === 'phone'
                  ? `tel:+886-${data.info.slice(1)}`
                  : `mailto:${data.info.slice(1)}`
              "
              class="text-decoration-none stretched-link"
              >{{ data.info }}</a
            >
            <p v-html="formatToHtml(data.info)" v-else></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        time: {
          name: '營業時間',
          info: '(周一公休) /每週二至週日 /11:00~21:00',
          icon: '<i class="bi bi-calendar-check-fill"></i>'
        },
        address: {
          name: '地址',
          info: '桃園市桃園區/桃園路1號',
          icon: '<i class="bi bi-house-door-fill"></i>'
        },
        phone: {
          name: '電話',
          info: '03-33445566',
          icon: '<i class="bi bi-telephone-fill"></i>'
        },
        email: {
          name: '電子信箱',
          info: 'marcaron@email.com',
          icon: '<i class="bi bi-envelope-fill"></i>'
        }
      }
    }
  },
  props: ['withIcon'],
  methods: {
    formatToHtml(text) {
      return text.replaceAll('/', '<br>')
    },
    formatToText(text) {
      return text.replaceAll('/', '')
    }
  }
}
</script>

<style lang="scss">
.contactInfo {
  width: 100%;
  h5,
  p,
  a {
    color: var(--bs-primary-text-emphasis);
    transition: all 0.5s;
  }
  div {
    background-color: var(--bs-white);
    transition: all 0.5s;
  }
  .infoIcon {
    color: var(--bs-primary);
    transition: all 1s;
  }
}
.contactInfo:hover {
  h5,
  p,
  a {
    color: var(--bs-white);
  }
  div {
    background-color: var(--bs-primary);
  }
  .infoIcon {
    color: var(--bs-secondary);
  }
}
@media (min-width: 768px) {
  .contactInfo {
    width: 35%;
  }
}
@media (min-width: 1200px) {
  .contactInfo {
    width: 25%;
  }
}
</style>

<template>
  <div class="bg-light">
    <div class="container text-md-center py-5">
      <div class="mb-4">
        <a href="#" class="fs-3 logo fw-medium text-decoration-none"
          >macar<i class="bi bi-egg-fill"></i>n
          <h1 class="m-0 fs-3 logo"></h1
        ></a>
      </div>
      <ul
        class="d-none d-md-flex flex-wrap w-100 justify-content-center list-unstyled mb-4"
      >
        <li>
          <router-link
            class="link-gray text-decoration-none px-3 border-end border-2"
            to="/"
            >使用條款</router-link
          >
        </li>
        <li>
          <router-link
            class="link-gray text-decoration-none px-3 border-end border-2"
            to="/"
            >隱私權政策</router-link
          >
        </li>
        <li>
          <router-link
            class="link-gray text-decoration-none px-3"
            to="/login"
            >後台登入</router-link
          >
        </li>
      </ul>
      <WebContactInfo :withIcon="false"/>
      <p class="text-gray border-top border-primary mb-0 pt-4 mt-1">
        本網站無商業用途，僅供練習使用
      </p>
    </div>
  </div>
</template>

<script>
import WebContactInfo from './WebContactInfo.vue'
export default {
  components: {
    WebContactInfo
  }
}
</script>

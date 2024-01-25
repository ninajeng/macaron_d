<template>
  <LoadingVue :active="isLoading"/>
  <div
    class="d-flex flex-column"
    style="
      min-height: 100vh;
      background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/nn_macaron/1702358864882.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=oM5TlSijR1vMNQtYmYXOgbLaJQwl0Gz0VQlpJHkw9XwQwd07M5TaVY4Pnf5%2FktT0Ed9LGOWT0elHG0Ht1j61QA13HJ7fpBLPf03umSWsrWA5R6fG5Bhmu7prV%2F%2Byq8UwxbpxmpiQgIthdn0c%2BDh6BpflGLEq%2B7N50H%2F7d2mOtrC5BtJjWfH75FUvM%2FwtOEK1yjztL7F1Diam5%2F5sOypANcDa0wIIuCBQN95mfDbzNY0Fc17sCrdapxrQAJprZWySXLk1uR%2FxQ5yBAY5UJxY9bEUy7a4BgsHeT9BO7EabgfBvnUhPzE%2BS%2BuIkWvEiulvytWA2eiZlxSPlUDECHa8pSQ%3D%3D);
      background-size: cover;
      background-position: top center;
    "
  >
    <DashBoardNav :isLogin="false"/>
    <div class="container">
      <ToastList/>
    </div>
    <div class="container py-5 flex-grow-1 d-flex align-items-center">
      <div class="row w-100 justify-content-center">
        <div class="col-lg-5">
          <div class="p-3 bg-light bg-opacity-25 rounded">
            <h2 class="mt-2 mb-3 text-center">後台登入</h2>
            <VForm v-slot="{ errors }" @submit="submit">
              <div class="form-floating mb-4">
                <VField
                  type="email"
                  name="email"
                  id="username"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  rules="email|required"
                  v-model="user.username"
                  placeholder="請輸入帳號"
                />
                <ErrorMessage
                  name="email"
                  class="invalid-feedback"
                />
                <label for="username">帳號</label>
              </div>
              <div class="form-floating mb-4">
                <VField
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['password'] }"
                  rules="required"
                  v-model="user.password"
                  placeholder="請輸入帳號"
                />
                <ErrorMessage
                  name="password"
                  class="invalid-feedback"
                />
                <label for="password">密碼</label>
              </div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn bg-primary text-white"
                >
                  登入
                </button>
              </div>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardNav from '@/components/DashBoardNav.vue'
import ToastList from '@/components/ToastList.vue'
import emitter from '@/methods/emitter.js'
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  components: {
    DashBoardNav,
    ToastList
  },
  provide() {
    return {
      emitter
    }
  },
  methods: {
    submit() {
      this.isLoading = true
      const API_LOGIN = `${process.env.VUE_APP_API}admin/signin`
      this.axios
        .post(API_LOGIN, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `webToken=${token}; expires=${new Date(expired)}`
            this.$router.push('/dashboard/salesReport')
          } else {
            emitter.emit('sendMsg', {
              message: res.data.message,
              status: 'error'
            })
            this.user.password = ''
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          emitter.emit('sendMsg', {
            message: `登入失敗(${e})`,
            status: 'error'
          })
        })
    }
  },
  mounted() {
    const API_CHECK = `${process.env.VUE_APP_API}api/user/check`
    const AUTH_TOKEN = document.cookie
      .split('; ')
      .find((row) => row.startsWith('webToken='))
      ?.split('=')[1]
    this.axios.defaults.headers.common.Authorization = AUTH_TOKEN
    this.isLoading = true
    this.axios.post(API_CHECK).then((res) => {
      this.isLoading = false
      if (res.data.success) {
        this.$router.push('/dashboard/salesReport')
      }
    })
  }
}
</script>

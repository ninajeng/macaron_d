import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import LoadingVue from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import WebLoading from '@/components/WebLoading.vue'
import { currency, unixToDate, unixToTime, unixToDatetime, datetimeToUnix } from '@/methods/filters'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, length, max } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

defineRule('required', required)
defineRule('email', email)
defineRule('length', length)
defineRule('max', max)
configure({
  generateMessage: localize({ zh_TW: zhTW })
})
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$filters = { currency, unixToDate, unixToTime, unixToDatetime, datetimeToUnix }
app.use(VueAxios, axios)
app.use(router)
app.component('LoadingVue', LoadingVue)
app.component('WebLoading', WebLoading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')

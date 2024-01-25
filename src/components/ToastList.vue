<template>
  <div class="position-fixed top-0 end-0 mx-2 mx-md-4" style="z-index: 1056; margin-top: 4.5rem;">
    <Toast
      :toast-msg="msg"
      :ToastId="key"
      v-for="(msg, key) in messages"
      :key="'msg' + key"
    />
  </div>
</template>

<script>
import Toast from '@/components/ToastItem.vue'
export default {
  data() {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  methods: {
    addMessage(message, status, title) {
      this.messages.push({ message, status, title })
    }
  },
  components: {
    Toast
  },
  created() {
    this.emitter.on('sendMsg', (data) => {
      this.addMessage(data.message, data.status, data.title)
    })
  }
}
</script>

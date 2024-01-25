<template>
  <div class="modal fade" id="delModal" tabindex="-1" ref="delModal">
    <div class="modal-dialog">
      <div class="modal-content text-center">
        <div class="modal-body pb-4 pt-2">
          <div class="pb-1">
            <i class="bi bi-exclamation-triangle-fill opacity-50" style="font-size: 4rem; color: var(--bs-warning);"></i>
            <p class="fw-bolder mb-2">{{ `確定要刪除"${item} ${deleteItem.title || deleteItem.id}"？` }}</p>
            <p class="text-gray">刪除後將無法復原</p>
          </div>
          <button
            type="button"
            class="btn btn-outline-danger me-1"
            @click="$emit('delete')"
          >
            確認
          </button>
          <button type="button" class="btn btn-gray ms-1" @click="hideModal">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle'
export default {
  data() {
    return {
      modal: {}
    }
  },
  props: ['deleteItem', 'item'],
  emits: ['delete'],
  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.delModal)
  }
}
</script>

<template>
  <div class="modal fade" id="delModal" tabindex="-1" ref="delModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">{{ `是否刪除${item}` }}</h5>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <p>{{ `刪除"${item} ${deleteItem.title || deleteItem.id}"？ (刪除後將無法復原)` }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-gray" @click="hideModal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('delete')"
          >
            確認
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

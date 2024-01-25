<template>
  <LoadingVue :active="isLoading" style="z-index: 1056" />
  <div class="modal fade" id="productModal" tabindex="-1" ref="productModal">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <VForm v-slot="{ errors }">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h1 class="modal-title fs-5 text-white">
              {{ product.id ? '編輯產品' : '新增產品' }}
            </h1>
            <button type="button" class="btn-close" @click="hideModal"></button>
          </div>
          <div class="modal-body">
            <div class="row flex-column-reverse flex-md-row">
              <div class="col-lg-4">
                <div class="mb-3">
                  <p class="mb-2 fw-semibold">產品主要圖片</p>
                  <div v-if="product.imageUrl">
                    <img
                      :src="product.imageUrl"
                      :alt="product.title"
                      class="img-fluid mb-2"
                    />
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control imagesList"
                        v-model="product.imageUrl"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="product.imageUrl = ''"
                      >
                        重新上傳
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label"
                        >輸入圖片網址</label
                      >
                      <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model="product.imageUrl"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="imageFile" class="form-label">上傳圖片</label>
                      <input
                        type="file"
                        name="imageFile"
                        id="imageFile"
                        class="form-control"
                        ref="imageFile_main"
                        @change="uploadFile(true)"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div v-for="(url, key) in product.imagesUrl" :key="'url' + key">
                  <p class="mb-2 fw-semibold">
                    {{ `產品其他圖片 - ${key + 1}` }}
                  </p>
                  <div v-if="url">
                    <img
                      :src="url"
                      :alt="`${product.title}-其他圖片${key + 1}`"
                      class="img-fluid mb-2"
                    />
                    <div class="input-group mb-3">
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="deleteImage(key)"
                      >
                        刪除欄位
                      </button>
                      <input
                        type="text"
                        class="form-control imagesList"
                        v-model="product.imagesUrl[key]"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="product.imagesUrl[key] = ''"
                      >
                        重新上傳
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <div class="mb-3">
                      <label :for="`imageUrl_${key}`" class="form-label"
                        >輸入圖片網址</label
                      >
                      <input
                        type="text"
                        :name="`imageUrl_${key}`"
                        :id="`imageUrl_${key}`"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model="product.imagesUrl[key]"
                      />
                    </div>
                    <div class="mb-3">
                      <label :for="`imageFile_${key}`" class="form-label"
                        >上傳圖片</label
                      >
                      <input
                        type="file"
                        :name="`imageFile_${key}`"
                        :id="`imageFile_${key}`"
                        class="form-control"
                        :ref="'imageFile' + key"
                        @change="uploadFile(false, key)"
                      />
                    </div>
                    <div class="mb-3">
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="deleteImage(key)"
                      >
                        刪除欄位
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
                <div
                  class="mb-3"
                  v-if="!product.imagesUrl || product.imagesUrl.length < 5"
                >
                  <button
                    type="button"
                    class="btn btn-outline-gray w-100"
                    @click="product.imagesUrl.push('')"
                  >
                    新增圖片欄位
                  </button>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="mb-3">
                  <label for="title" class="form-label fw-semibold"
                    >標題*</label
                  >
                  <VField
                    type="text"
                    name="標題"
                    id="title"
                    class="form-control"
                    :class="{ 'is-invalid': formInvalid['標題'] }"
                    @change="delete formInvalid['標題']"
                    rules="required"
                    placeholder="請輸入產品標題"
                    v-model="product.title"
                    required
                  />
                  <ErrorMessage name="標題" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <div class="row">
                    <div class="col">
                      <label for="category" class="form-label fw-semibold"
                        >分類*</label
                      >
                      <VField
                        type="text"
                        name="分類"
                        id="category"
                        class="form-control"
                        :class="{ 'is-invalid': formInvalid['分類'] }"
                        @change="delete formInvalid['分類']"
                        rules="required"
                        placeholder="請輸入產品分類"
                        v-model="product.category"
                        required
                      />
                      <ErrorMessage name="分類" class="invalid-feedback" />
                    </div>
                    <div class="col">
                      <label for="unit" class="form-label fw-semibold"
                        >單位*</label
                      >
                      <VField
                        type="text"
                        name="單位"
                        id="unit"
                        class="form-control"
                        :class="{ 'is-invalid': formInvalid['單位'] }"
                        @change="delete formInvalid['單位']"
                        rules="required"
                        placeholder="請輸入單位"
                        v-model="product.unit"
                        required
                      />
                      <ErrorMessage name="單位" class="invalid-feedback" />
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="row">
                    <div class="col">
                      <label for="origin_price" class="form-label fw-semibold"
                        >原價*</label
                      >
                      <VField
                        type="num"
                        name="原價"
                        id="origin_price"
                        class="form-control"
                        :class="{ 'is-invalid': formInvalid['原價'] }"
                        @change="delete formInvalid['原價']"
                        rules="numeric|required"
                        placeholder="請輸入原價"
                        v-model.number="product.origin_price"
                        required
                      />
                      <ErrorMessage name="原價" class="invalid-feedback" />
                    </div>
                    <div class="col">
                      <label for="price" class="form-label fw-semibold"
                        >售價*</label
                      >
                      <VField
                        type="num"
                        name="售價"
                        id="price"
                        class="form-control"
                        :class="{ 'is-invalid': formInvalid['售價'] }"
                        @change="delete formInvalid['售價']"
                        rules="numeric|required"
                        placeholder="請輸入售價"
                        v-model.number="product.price"
                        required
                      />
                      <ErrorMessage name="售價" class="invalid-feedback" />
                    </div>
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label fw-semibold"
                    >產品描述</label
                  >
                  <textarea
                    name="description"
                    id="description"
                    rows="2"
                    class="form-control"
                    placeholder="請輸入產品描述"
                    v-model="product.description"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label fw-semibold"
                    >說明內容</label
                  >
                  <textarea
                    name="content"
                    id="content"
                    rows="2"
                    class="form-control"
                    placeholder="請輸入產品說明內容"
                    v-model="product.content"
                  ></textarea>
                </div>
                <div class="form-check mb-3">
                  <input
                    type="checkbox"
                    name="is_enabled"
                    id="is_enabled"
                    class="form-check-input active"
                    v-model="product.is_enabled"
                    :checked="product.is_enabled === 1"
                  />
                  <label for="is_enabled" class="form-check-label fw-semibold"
                    >是否啟用</label
                  >
                </div>
                <hr class="d-lg-none" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-gray"
              @click="hideModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="updateProduct(errors)"
            >
              {{ product.id ? '更新' : '新增' }}
            </button>
          </div>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  data() {
    return {
      modal: {},
      product: {
        title: '',
        category: '',
        unit: '',
        origin_price: '',
        price: ''
      },
      formInvalid: {},
      isLoading: false
    }
  },
  props: ['tempProduct'],
  emits: ['updateProduct', 'createProduct'],
  inject: ['emitter'],
  watch: {
    tempProduct() {
      this.getData()
    }
  },
  methods: {
    showModal() {
      this.formInvalid = {}
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
      this.getData()
    },
    getData() {
      this.product = JSON.parse(JSON.stringify(this.tempProduct))
      if (!this.product.imagesUrl) this.product.imagesUrl = []
    },
    updateProduct(errors) {
      this.formInvalid = { ...errors }
      if (Object.keys(this.formInvalid).length === 0) {
        if (this.product.imagesUrl) {
          for (let i = this.product.imagesUrl.length - 1; i > -1; i--) {
            if (this.product.imagesUrl[i] === '') {
              this.product.imagesUrl.splice(i, 1)
            }
          }
        }
        if (this.product.id) {
          this.$emit('updateProduct', this.product)
        } else {
          this.$emit('createProduct', this.product)
        }
      }
    },
    uploadFile(isMainImage, key = 0) {
      this.isLoading = true
      let file
      if (isMainImage) file = this.$refs.imageFile_main.files[0]
      else file = this.$refs[`imageFile${key}`][0].files[0]
      const form = new FormData()
      const API_UPLOADFILE = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      form.append('file-to-upload', file)
      this.axios.post(API_UPLOADFILE, form).then((res) => {
        if (res.data.success) {
          if (isMainImage) {
            this.product.imageUrl = res.data.imageUrl
          } else {
            if (!this.product.imagesUrl) this.product.imagesUrl = []
            this.product.imagesUrl[key] = res.data.imageUrl
          }
          file = undefined
        } else {
          alert(res.data.message.code || res.data.message)
        }
        this.isLoading = false
      })
    },
    deleteImage(key) {
      this.product.imagesUrl.splice(key, 1)
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal, { backdrop: 'static' })
  }
}
</script>

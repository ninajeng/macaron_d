<template>
  <div class="mb-5">
    <p class="mb-2">
      分類篩選<span v-if="!searchKey">{{
        `：${filter ? filter : '全部產品'}`
      }}</span>
    </p>
    <select class="form-select mb-3" @change="setCategory">
      <option disabled :selected="searchKey !== ''">請選擇產品分類</option>
      <option :value="key" v-for="(type, key) in categories" :key="'type' + type" :selected="filter === key">
        {{ `${key ? key : '全部產品'} (${type})` }}
      </option>
    </select>
    <p class="mb-2">{{ `關鍵字搜尋${searchKey ? `："${searchKey}"` : ''}` }}</p>
    <div
      class="list-group-item list-group-item-action"
      :class="{ active: searchKey }"
    >
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="如：巧克力"
          ref="searchInput"
        />
        <button type="button" class="btn btn-graySlight" @click="search()">
          <i class="bi bi-search me-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapseCategory: {},
      collapseSearch: {},
      searchKey: ''
    }
  },
  props: ['categories', 'filter'],
  methods: {
    setCategory(e) {
      this.searchKey = ''
      this.$refs.searchInput.value = ''
      this.$emit('setFilter', e.target.value)
    },
    search() {
      this.searchKey = this.$refs.searchInput.value
      this.$emit('setFilter', this.searchKey)
    }
  },
  updated() {
    window.scrollTo({ top: 0 })
  }
}
</script>

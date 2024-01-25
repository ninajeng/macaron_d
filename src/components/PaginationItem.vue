<template>
  <nav aria-label="Page navigation" v-if="pageInfo.total_pages > 1">
    <ul class="pagination justify-content-center pb-3 mb-0">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          :class="{ disabled: !pageInfo.has_pre }"
          @click.prevent="setPage(pageInfo.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pageInfo.total_pages"
        :key="'page' + page"
      >
        <a
          class="page-link"
          href="#"
          :class="{ active: pageInfo.current_page === page }"
          @click.prevent="setPage(page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          :class="{ disabled: !pageInfo.has_next }"
          @click.prevent="setPage(pageInfo.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pageInfo'],
  methods: {
    setPage(page) {
      this.$emit('setPage', page)
    }
  }
}
</script>

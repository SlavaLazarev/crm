<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <loader v-if="loading"/>
    <p v-else-if="!records.length" class="center">Записей пока нет. <router-link to="/record">Добавьте первую запись</router-link></p>
    <section v-else>
      <history-table :records="items" />
      <paginate
       v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '../mixins/pagination.mixin'
import HistoryTable from "../components/HistoryTable";
import {Pie} from "vue-chartjs";


export default {
  metaInfo() {
    return  { title: this.$title('MenuHistory')}
  },
  name: 'History',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    // categories: []
}),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    // this.setup()


    this.setupPagination(this.records.map((record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }
    })))
    this.loading = false
  },
  methods: {
    setup() {
      this.renderChart()
    }
  },
  components: {HistoryTable},
}
</script>

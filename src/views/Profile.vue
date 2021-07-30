<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{ "Name" | localize }}</label>
        <small
            class="helper-text invalid"
            v-if="($v.name.$dirty && !$v.name.required)"
        >{{ "MessageEnterName" | localize }}</small>
      </div>
      <div class="switch">
        <label>En
        <input type="checkbox" v-model="isRuLocale">
        <span class="lever"></span>
        Ru
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>

<script>
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";
// import localizeFilter from "../filters/localize.filter";

export default {
  metaInfo() {
    return  { title: this.$title('ProfileTitle')}
  },
  name: 'Profile',
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields()
    })
  },
  validations: {
    name: {required},
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    submitHandler: async function () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

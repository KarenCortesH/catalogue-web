<template>
  <div class="row initial-row">
    <div class="col-md-6 offset-md-3">
      <div class="row">
        <!-- solo renderizo este div si ya todo se consulto -->
        <div v-if="!loading" class="container">
          <!-- renderizo las caregorias pre establecidas -->
          <div id="categories-carousel-wraper">
            <CategoriesCarousel v-bind:categories="presetCategories" />
          </div>
          <!-- renderizo las secciones luego de haberlas consultado -->
          <div id="sections-wraper">
            <div v-for="section in sections" :key="section.name">
              <Section v-bind:section="section" />
            </div>
          </div>
          <div id='categories-list-wraper'>
            <CategoriesList
              v-bind:categories="categories"
            />
          </div>
        </div>
        <!-- solo renderizo este div cuando se esta consultando -->
        <div v-if="loading" class="w-50 mx-auto">
          <div class="alert alert-info text-center" role="alert">Cargando...</div>
        </div>
        <!-- solo se renderizo este div cuando salgo salio mal -->
        <div v-if="message" class="w-50 mx-auto">
          <div class="alert alert-danger text-center" role="alert">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// componente carrusel de categorias
import CategoriesCarousel from '../components/CategoriesCarousel/CategoriesCarousel';
// servicio para contacterme con el api en todo lo relacionado a categorias
import categoryService from '../services/category.service';
// componente seccion
import Section from '../components/Section/Section';
// servicio para contactarme con el api en todo lo relacionado a secciones
import sectionService from '../services/section.service';
// componente de lista de categorias
import CategoriesList from '../components/CategoriesList/CategoriesList';

export default {
  name: 'HomeView',
  components: {
    Section,
    CategoriesCarousel,
    CategoriesList
  },
  data() {
    return {
      sections: [],
      presetCategories: [],
      categories: [],
      message: '',
      loading: false
    };
  },
  computed: {
    // valor para determinar si el usuario estar loggeado o no
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    // function para cargar los datos
    async loadData() {
      this.loading = true;

      try {
        // cargo las categorias pre definidas
        const presetCategoriesData = await categoryService.getInitialPresetCategories();

        // cargo las secciones
        const sectionsData = await sectionService.getSections();

        // cargo las categorias
        const categoriesData = await categoryService.getCategoriesForList();

        this.presetCategories = presetCategoriesData;

        this.sections = sectionsData;

        this.categories = categoriesData;
      } catch (error) {
        console.error(error);
        this.message = 'error en el api.';
      }

      this.loading = false;
    }
  },
  mounted() {
    // si el usuario no se encuenta loggeado no deberia de estar aquí y lo envio al login
    if (!this.loggedIn) {
      return this.$router.push('/login');
    }

    this.loadData();
  }
};
</script>

<style scoped>
.initial-row {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
#categories-carousel-wraper {
  margin-bottom: 0.5rem;
}
</style>
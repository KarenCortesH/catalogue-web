<template>
  <div class="row initial-row">
    <div class="col-md-6 offset-md-3">
      <!-- solo renderizo este div si ya todo se consulto -->
      <div v-if="!loading" class="container">
        <!-- renderizo las categorias de la categoria padre solo luego de haberlas consultado -->
        <div id="categories-carousel-wraper">
          <CategoriesCarousel v-bind:categories="childCategories" />
        </div>
        <div class="w-50 mx-auto">
          <h1>Productos</h1>
        </div>
        <!-- renderizo el input que me ayuda a filtar los productos -->
        <div class="row">
          <div class="input-group mb-3">
            <input
              v-model="productFilter.name"
              type="text"
              class="form-control"
              placeholder="Nombre del producto"
              aria-label="Nombre del producto"
              aria-describedby="btn-buscar"
            />
            <div class="input-group-append">
              <button
                v-on:click="search"
                class="btn btn-outline-secondary"
                type="button"
                id="btn-search"
                name="btn-search"
              >Buscar</button>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- renderizo los productos y sus imagenes solo cuando los he consultado -->
          <div
            v-for="product in productsToRender"
            :key="product.id"
            class="col-md-6"
            id="product-carousel-wraper"
          >
            <ProductCarousel v-bind:product="product" />
          </div>
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
</template>

<script>
import CategoriesCarousel from '../components/CategoriesCarousel/CategoriesCarousel';
import categoryService from '../services/category.service';
import ProductModel from '../models/product.model';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';

export default {
  name: 'CatalogueView',
  data() {
    return {
      // objeto product que utilizo para filtrar los productos
      productFilter: new ProductModel({ name: '' }),
      // id actual de la categoria en la url / ruta
      currentCategoryId: null,
      // arreglo de categorias hijas de la categoria identificada con el currentCategoryId
      childCategories: [],
      // arreglo de productos relacionado a la categoria identificada con el currentCategoryId
      productsFromCategory: [],
      // arreglo de productos que se envian a renderizar, puntualmente me ayudan en el filtro
      productsToRender: [],
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  components: {
    CategoriesCarousel,
    ProductCarousel
  },
  methods: {
    // funcion para obtener el id de la categoria de la url / path
    handleCurrentCategoryId() {
      const { id } = this.$route.params;

      if (!id || !parseInt(id, 10)) {
        return this.$router.push('/home');
      }

      this.currentCategoryId = id;

      console.log('currentCategoryId', this.currentCategoryId);

      return true;
    },
    // funcion para cargar los datos de la pantalla 
    async loadData() {
      this.loading = true;

      try {
        // obtengo la data relacionada con la categoria padre
        const data = await categoryService.getCategoriesAndProductsFromCategory(
          this.currentCategoryId
        );

        const { childCategories, products } = data;

        // asigno la data para que sea renderizada
        this.childCategories = childCategories;
        this.productsFromCategory = products;
        this.productsToRender = products;
      } catch (error) {
        console.error(error);
        this.message = 'error en el api.';
      }

      this.loading = false;
    },
    // funcion encargada de filtar los productos
    search: function (event) {
      // console.log('productFilter', this.productFilter);

      // obtengo el valor que tenga el input donde de la busqueda
      const { name: searchName } = this.productFilter;

      // asigno a un arreglo temporal para evitar muraciones en estado
      const tempProducts = [...this.productsFromCategory];

      // filtro los productos baso en searchName
      this.productsToRender = tempProducts.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );

      console.log('productsToRender', this.productsToRender);
    }
  },
  created: function () {
    // obtengo el current category id de la url
    this.handleCurrentCategoryId();
  },
  mounted() {
    // console.log('currentCategoryId', this.currentCategoryId);

    if (!this.loggedIn) {
      this.$router.push('/login');
    }

    this.loadData();
  },
  watch: {
    $route(to, from) {
      // console.log('to', to);
      // console.log('from', from);

      // reacciono a los cambios en la ruta
      const result = this.handleCurrentCategoryId();

      // solamente cargo la data si pude obtener el currentCategoryId
      if (result) this.loadData();
    }
  }
};
</script>

<style scoped>
#product-carousel-wraper {
  margin-bottom: 0.5rem;
}
</style>
<template>
  <div class="row">
    <div v-for="category in categoriesToShow" :key="category.id" class="col-md-12">
        <router-link :to="`/catalogo/${category.id}`">
          <img class="img-fluid" :src="category.image" :alt="category.name">
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesListComponent',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categoriesToShow: [...this.categories]
    };
  },
  mounted() {
    console.log('categories', this.categories);
  }
};
</script>

<style scoped>
  img {
    width: 100%;
  }
</style>
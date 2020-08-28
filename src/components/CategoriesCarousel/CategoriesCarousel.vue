<template>
   <div class="container">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
         <div class="carousel-inner">
            <div  v-for="(category, index) in categoriesToShow" :key="category.id"
                  class="carousel-item" :class="{ 'active': index === 0 }">
                <router-link :to="`/catalogo/${category.id}`">
                  <img v-bind:src="category.image" class="d-block w-100" v-bind:alt="category.name">
                </router-link>
            </div>
         </div>
         <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
         <span class="sr-only">Previous</span>
         </a>
         <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
         <span class="carousel-control-next-icon" aria-hidden="true"></span>
         <span class="sr-only">Next</span>
         </a>
      </div>
   </div>
</template>

<script>

  export default {
    name: 'CategoriesCarouselComponent',
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
      // console.log('categories', this.categories);
    }
  };
</script>
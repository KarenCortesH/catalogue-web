<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <img class="img-fluid" v-bind:src="sectionToShow.image" v-bind:alt="sectionToShow.name">
      </div>

      <div class="col-md-12">
          <div class="row justify-content-around">
            <div v-for="product in sectionToShow.products" :key="product.id" class="col-6">
              <ProductCard 
                v-bind:product="product"
              />
            </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
  import SectionModel from '../../models/section.model';

  import ProductCard from './ProductCard/ProductCard';

  export default {
    name: 'SectionComponent',
    props: {
      section: {
        type: SectionModel,
        default: () => new SectionModel({})
      }
    },
    data() {
      return {
        sectionToShow: { ...this.section }
      };
    },
    components: {
      ProductCard
    },
    mounted() {
      // console.log('section', this.section);
    }
  };
</script>

<style scoped>
  img {
    width: 100%;
  }
</style>
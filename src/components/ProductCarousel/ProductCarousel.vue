<template>
   <div class="container">
      <div class="card">
         <div :id="`carouselProduct${productToShow.id}`" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
               <li v-for="(image, i) in productToShow.images" :key="image.id"
                :data-slide-to="i" :class="{ 'active': i === 0 }" :data-target="`#carouselProduct${productToShow.id}`"></li>
            </ol>
            <div class="carousel-inner">
               <div v-for="(image, i) in productToShow.images" :key="image.id"
                :class="{ 'active': i === 0 }" class="carousel-item">
                  <img :src="image.url" class="d-block w-100" :alt="productToShow.name">
               </div>
            </div>
            <a class="carousel-control-prev" :href="`#carouselProduct${productToShow.id}`" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" :href="`#carouselProduct${productToShow.id}`" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
         </div>
         <div class="card-body">
           <h5 class="card-title">{{productToShow.name}}</h5>
            <a href="#" class="btn btn-sm btn-primary float-left">Order Now</a>	
            <div class="h5 float-right">
               <span class="price-new">${{productToShow.price}}</span>
            </div>
            <!-- price-wrap.// -->
         </div>
      </div>
   </div>
</template>

<script>
  import ProductModel from '../../models/product.model';

  export default {
    name: 'ProductCarouselComponent',
    props: {
      product: {
        type: ProductModel,
        default: () => new ProductModel({})
      }
    },
    data() {
      return {
        productToShow: { ...this.product }
      };
    }
  };
</script>
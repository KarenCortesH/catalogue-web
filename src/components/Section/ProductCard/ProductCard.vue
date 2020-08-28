<template>
   <div class="container">
      <div class="card">
         <img class="card-img" v-bind:src="productToShow.image" v-bind:alt="productToShow.name">
      </div>
      <p>
         <span class="product-span-name">{{productToShow.name}}</span>
         <br/>
         <span class="product-span-category">{{productToShow.description}}</span>
         <br/>
         <span class="product-span-price">{{productToShow.price}}</span>
      </p>
   </div>
</template>

<script>
  import ProductModel from '../../../models/product.model';

  export default {
    name: 'ProductCardComponent',
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
    },
    mounted() {
      // console.log('product', this.product);
    }
  };
</script>

<style scoped>
  .product-span-name {
    font-weight: bold;
  }
  .product-span-category {
    color: #9e9e9e!important;
  }
  .product-span-price {
    color: #f06292 !important
  }
</style>
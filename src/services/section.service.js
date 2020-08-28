import axios from 'axios';

import SectionModel from '../models/section.model';
import ProductModel from '../models/product.model';


const API_URL = process.env.VUE_APP_API_BASE_URL;

// import { sections } from './section.mock';
 
class SectionService {

  // function para obtener las secciones
  async getSections() {

    // consulto el api para obtener las secciones
    const response = await axios({
      url: `${API_URL}/api/v1/categories/sections`,
      method: 'get'
    });

    const { data } = response;

    // console.log('data', data);

    // para cada seccion parseo su respectiva data
    const handledSections = data.map(sectionItem => {
      const { name, image, products = [] } = sectionItem;

      // parseo cada producto
      const parsedProducts = products.map(productItem => {
        const {
          id,
          name: productName,
          price,
          image: imageProduct } = productItem;

        const correctImageProduct = `${API_URL}${imageProduct.url}?vuetify-preload`;

        const parsedProduct = new ProductModel({
          id,
          name: productName,
          description: 'TEXTILES',
          price, image: correctImageProduct
        });

        return parsedProduct;
      });

      const correctImage = `${API_URL}${image}?vuetify-preload`;
      const parsedSection = new SectionModel({ name, image: correctImage, products: parsedProducts });

      return parsedSection;
    });

    return handledSections;
  }
}

export default new SectionService();

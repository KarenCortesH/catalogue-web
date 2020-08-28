import axios from 'axios';

import CategoryModel from '../models/category.model';
import ProductModel from '../models/product.model';

const API_URL = process.env.VUE_APP_API_BASE_URL;

class CategoryService {

  // funcion para cargar las categorias pre establecidas
  async getInitialPresetCategories () {
    const presetCategories = [
      new CategoryModel({
        id: 8,
        name: 'Ropa Interior',
        parent_id: 1,
        image: `${API_URL}/img/categories/textiles-ropa-interior.png`
      }),
      new CategoryModel({
        id: 428,
        name: 'Seamless',
        parent_id: 50,
        image: `${API_URL}/img/categories/textiles-fajas-dama-seamless.png`
      }),
      new CategoryModel({
        id: 429,
        name: 'Tapabocas',
        parent_id: 1,
        image: `${API_URL}/img/categories/textiles-tapabocas.png`
      })
    ];

    return presetCategories;
  }

  // funcion para obtener las categorias y productos de una categoria padre
  async getCategoriesAndProductsFromCategory (categoryId) {
    // peticiono el servicio
    const response = await axios({
      url: `${API_URL}/api/v2/categories/${categoryId}/products`,
      method: 'get'
    });

    const { data } = response;

    // separo los datos
    const { categories: category, products = [] } = data;

    if (!category) {
      throw new Error('can not get data.categories.');
    }

    // parseo los productos transformandolos a instancias del modelo
    const parsedProducts = products.map(item => {
      return new ProductModel({
        id: item.id,
        name: item.name,
        image: null,
        price: item.price,
        category_id: item.category_id,
        images: item.images.map(image => ({ id: image.id, url: `${API_URL}${image.url}` }))
      });
    });

    
    const parsedCategory = new CategoryModel({
      id: category.id,
      name: category.name,
      parent_id: category.parent_id,
      image: `${API_URL}${category.image}`
    });

    const { categories: childCategories = [] } = category;

    const parsedChildCategories = childCategories.map(item => {
      return new CategoryModel({
        id: item.id,
        name: item.name,
        parent_id: item.parent_id,
        image: `${API_URL}${item.image}`
      });
    });

    // console.log('parsedCategory', parsedCategory);
    // console.log('parsedChildCategories', parsedChildCategories);
    // console.log('products', parsedProducts);

    return {
      category: parsedCategory,
      childCategories: parsedChildCategories,
      products: parsedProducts
    };
  }

  // funcion para obtener las categorias para la lista
  async getCategoriesForList() {
    const response = await axios({
      url: `${API_URL}/api/v2/categories`,
      method: 'get'
    });

    const { data } = response;

    if (!Array.isArray(data)) {
      throw new Error('response.data is not an array');
    }

    const parsedCategories = data.map(item => {
      return new CategoryModel({
        id: item.id,
        name: item.name,
        parent_id: item.parent_id,
        image: `${API_URL}${item.image}`
      });
    });

    return parsedCategories;
  }
}

export default new CategoryService();
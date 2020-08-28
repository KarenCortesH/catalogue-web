export default class Section {
  constructor({
    name,
    image,
    products
  }) {
    this.name = name;
    this.image = image || 'https://api.tissini.app/img/categories/bestsellers.png?vuetify-preload';
    this.products = products;
  }
}

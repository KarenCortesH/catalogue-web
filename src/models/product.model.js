export default class Product {
  constructor({
    id,
    name,
    description,
    price,
    image,
    category_id,
    images
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category_id = category_id;
    this.images = images || [];
  }
}

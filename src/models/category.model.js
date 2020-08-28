export default class Category {
  constructor({
    id,
    name,
    image,
    parent_id
  }) {
    this.id = id;
    this.name = name;
    this.image = image || 'https://api.tissini.app/img/categories/ropa-interior-prominent.jpg';
    this.parent_id = parent_id;
  }
}
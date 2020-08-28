// modelo para representar la estructura de un usuario / customer
export default class User {
  constructor({
    id,
    entitynumber,
    name,
    firstname,
    lastname,
    mobilephone,
    salesrep,
    store_name,
    store_name_active
  }) {
    this.id = id;
    this.entitynumber = entitynumber;
    this.name = name;
    this.firstname = firstname;
    this.lastname = lastname;
    this.mobilephone = mobilephone;
    this.salesrep = salesrep;
    this.salesrep = store_name;
    this.store_name_active = store_name_active;
  }
}

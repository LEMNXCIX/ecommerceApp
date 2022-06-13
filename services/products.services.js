const ProductsModel = require("../models/product.model");

class Products {
  /**
   * Obtener todos los productos
   * @returns Todos los productos
   */
  async getAll() {
    const products = await ProductsModel.find();
    return products;
  }

  /**
   * Crear nuevo producto
   * @param {Object} data Datos del producto
   * @returns Producto creado
   */
  async create(data) {
    const products = await ProductsModel.create(data);
    return products;
  }
}
module.exports = Products;

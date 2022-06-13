const CartModel = require("../models/cart.model");

class Cart {
  /**
   * Obtener productos del carrito
   * @param {String} idUser Id del usuario del carrito
   * @returns Objeto con los productos del carrito
   */
  async getItems(idUser) {
    const result = await CartModel.findById(idUser);
    return result.items;
  }

  /**
   * Anadir productos al carrito
   * @param {String} idUser Id del usuario
   * @param {String} idProduct
   * @param {Number} amount Total de los prosuctos del carrito
   * @returns Carrito actualizado con los nuevos productos
   */
  async addToCart(idUser, idProduct, amount) {
    const result = await CartModel.findByIdAndUpdate(
      idUser,
      {
        $push: {
          items: {
            _id: idProduct,
            amount,
          },
        },
      },
      { new: true }
    ).populate("items._id");
    return result;
  }

  /**
   * Crear carrito de compras
   * @param {String} idUser Id del usuario
   * @returns Carrito creado
   */
  async create(idUser) {
    const cart = await CartModel.create({
      _id: idUser,
      items: [],
    });
    return cart;
  }
}
module.exports = Cart;

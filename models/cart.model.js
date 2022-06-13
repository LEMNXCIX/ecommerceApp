const { mongoose } = require("../config/db.config");

//Construcion del Esquema del carrito
const CartSchema = new mongoose.Schema({
  _id: {
    //Id del carrito es el mismo del usuario
    //Relacion simulada de 1 a 1
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [
    {
      _id: {
        //Id del produto del carrito es el mismo 
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      amount: Number,
    },
  ],
});

//Definir el nombre del modelo junto a su esquema construido
const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;

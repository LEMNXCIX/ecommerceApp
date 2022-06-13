const { mongoose } = require("../config/db.config");

//Construimos el esquema de los productos
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Inserte un nombre"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Inserte una descripcion"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Inserte un precio"],
  },
  image: {
    type: String,
    required: [true, "Inserte una imagen"],
  },
  stock: {
    type: Number,
    required: [true, "Inserte una cantidad"],
  },
});

//Definir el nombre del modelo junto al esquema construido
const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;

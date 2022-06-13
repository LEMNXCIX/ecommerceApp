const { mongoose } = require("../config/db.config");

//Construimos el esquema de los usuarios
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Inserte el nombre"],
    minlength: [3, "El nombre debe ser mayor a 3 caracteres"],
    maxlength: [100, "El nombre no debe ser mayor a 100 caracteres"],
    trim: true,
    //Quita lso espacios antes o despues de la palabra " hola" / "hola " / " hola " = "hola"
  },
  email: {
    type: String,
    required: [true, "Inserte el email"],
    trim: true,
    unique: [true, "Email ya registrado"],
    match: [/^[\w\.-]+@[\w]+\.[\.\w]+$/, "Email no valido"],
  },
  password: {
    type: String,
    required: [true, "Inserte una contrasenia"],
  },
  role: {
    type: Number,
    default: 1, //Rol de usuario basico
  },
  profilePic: String,
  provider: {
    local: Boolean,
    facebook: Boolean,
    google: Boolean,
    twitter: Boolean,
    github: Boolean,
  },
  idProvider: {
    facebook: String,
    google: String,
    twitter: String,
    github: String,
  },
});

//Definir el nombre del modelo junto al esquema construido
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

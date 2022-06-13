const duplicatedError = require("./duplicatedError.helpers");
const validationError = require("./validationError.helpers");

/**
 * Manipulacion de errores de la BD
 * @param {Object} error Error generado en Services
 * @returns Objeto con el error especifico
 */

function dbError(error) {
  if (error.code === 11000) {
    return {
      created: false,
      errors: duplicatedError(error.keyValue),
    };
  }

  // Error en la validacion de datos
  return {
    created: false,
    errors: validationError(error.errors),
  };
}

module.exports = dbError;

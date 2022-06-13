const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index.config");

//El objetivo es validar el rol del usuario, pero primero se realizan otras validaciones separadas en diferentes funciones para fragmentar toda la validacion

/**
 * Validar el rol del usuario
 * @param {Number} role Rol del usuario
 * @returns Validez del usuario
 */
function authValidation(role) {
  return (req, res, next) => {
    req.neededRole = role;
    return validateToken(req, res, next);
  };
}
/**
 * Validar la existencia del token en la cookie
 * @param {Request} req Peticion
 * @param {Response} res Respuesta de la peticion
 * @param {next} next Funcion de express para ejecutar el siguiente middleware
 * @returns Token verificado, Mensaje de error
 */
function validateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "A token is required for this process",
    });
  }

  return verifyToken(token, req, res, next);
}

/**
 * Validar el token de la cookie
 * @param {token} token Token de la cookie
 * @param {Request} req Peticion
 * @param {Response} res Respuesta de la peticion
 * @param {next} next Algoooo
 * @returns Token validado, Mensaje de error
 */
function verifyToken(token, req, res, next) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    delete decoded.iat;
    delete decoded.exp;
    req.user = decoded;

    return validateRole(req, res, next);
  } catch ({ message, name }) {
    return res.status(403).json({
      success: false,
      message,
      type: name,
    });
  }
}

/**
 * Validar el rol del usuario
 * @param {Request} req Peticion
 * @param {Response} res Respuesta de la peticion
 * @param {next} next Algo next XD
 * @returns Validar el rol del usuario, si: seguir, no: Mensaje
 */
function validateRole(req, res, next) {
  if (req.user.role >= req.neededRole) {
    return next();
  }

  return res.status(403).json({
    success: false,
    messages: "Permisos insuficiente. Necesitas un rol mayor",
  });
}

module.exports = authValidation;

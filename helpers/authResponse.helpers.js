const { production } = require("../config/index.config");

/**
 * Creacion de la cookie con el token
 * @param {Response} res Respuesta del body??
 * @param {Objet} result El resultado de la peticion
 * @param {Number} statusCode Codigo del estatus http
 * @returns La misma respuesta con una cookie que contiene el token
 */
function authResponse(res, result, statusCode) {
  if (result.success) {
    const { token, ...data } = result;

    //Creamos la cookie
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: production, //! Solo disponible a través de https*
        sameSite: "none",
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        // La fecha de expiracion debe ser la misma que la del token
      })
      .json(data);
  }
  return res.status(statusCode).json(result);
}

/**
 * Creacion de la cookie con el token para los diferentes proveedores de inicio de sesion
 * @param {Response} res Respuesta del body??
 * @param {Object} result El resultado de la peticion
 * @param {Number} statusCode Codigo del estaus http
 * @returns La misma respuesta con una cookie con el token
 */
function providerResponse(res, result, statusCode) {
  if (result.succes) {
    const { token, ...data } = result;
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: production, //Solo disponible a través de https*
        sameSite: "none",
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      })
      .redirect("http://localhost:3000"); //Nos regresa al "Home" en el frontend
  }
  return res.status(statusCode).json(result);
}

/**
 * Eliminar la cookie
 * @param {Response} res Respuesta de la peticion
 * @returns Una cookie vacia
 */
function deleteCookie(res) {
  return res
    .cookie("token", "", {
      //Es vacio para quitar el token de la cookie
      expires: new Date(),
      httpOnly: true,
      sameSite: "none",
      secure: production,
    })
    .json({
      success: true,
      message: "Se ha cerrado sesion correctamente",
    });
}

module.exports = { authResponse, deleteCookie, providerResponse };

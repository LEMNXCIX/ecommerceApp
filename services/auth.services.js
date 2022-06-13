const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index.config");
const User = require("./users.services");

class Auth {
  async login(data) {
    const { email, password } = data;
    const userServ = new User();
    const user = await userServ.getByEmail(email);

    if (user && (await this.#compare(password, user.password))) {
      return this.#getUserData(user);
    }

    return {
      success: false,
      errors: ["Las credenciales son incorrectas"],
    };
  }

  /**
   * Creacion del usuario
   * @param {Object} data Datos del usuario
   * @returns Usuario creado
   */
  async signup(data) {
    if (data && data.password) {
      data.password = await this.#encrypt(data.password);
    }
    data.provider = {
      local: true,
    };

    const userServ = new User();
    const result = await userServ.create(data);
    if (!result.created) {
      return {
        success: false,
        errors: result.errors,
      };
    }

    return this.#getUserData(result.user);
  }

  /**
   * Inicar sesion o crear con proveedores
   * @param {Object} data Datos del usuario
   * @returns Usuario del proveedor
   */
  async socialLogin(data) {
    const userServ = new User();
    const user = {
      idProvider: data.id,
      name: data.displayName,
      email: data.emails[0].value,
      profilePic: data.photos[0].value,
      provider: data.provider,
    };
    const result = await userServ.getOrCreateByProvider(user);

    if (!result.created) {
      // Verificar si el correo está en uso
      return {
        success: false,
        errors: result.errors,
      };
    }

    return this.#getUserData(result.user);
  }

  /**
   * Obtener (selecionar) datos del usuario
   * @param {Object} user Datos del usuario
   * @returns Datos filtrados del usuario junto al token
   */
  #getUserData(user) {
    const userData = {
      role: user.role,
      name: user.name,
      email: user.email,
      provider: user.provider,
      idProvider: user.idProvider,
      id: user.id,
    };

    const token = this.#createToken(userData);
    return {
      success: true,
      user: userData,
      token,
    };
  }

  /**
   * Creacion del token
   * @param {Object} userData Datos del usuario
   * @returns Token con expiracion
   */
  #createToken(userData) {
    const token = jwt.sign(userData, jwtSecret, {
      expiresIn: "7d",
    });
    return token;
  }
  /**
   * Encriptacion
   * @param {String} string String (password) para encriptar
   * @returns Hash
   */
  async #encrypt(string) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(string, salt);

      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Comparar la contrasena plana con la codificada
   * @param {String} string Contrasenia plana
   * @param {String} hash Contraseni encriptada
   * @returns Contrasena comparada
   */
  async #compare(string, hash) {
    try {
      return await bcrypt.compare(string, hash);
    } catch (error) {
      return false;
    }
  }
}

module.exports = Auth;

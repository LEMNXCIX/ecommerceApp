const {
  oauthClientID,
  oauthClientSecret,
  callbackURL,
  production,
  callbackURLDev,
  facebookAppID,
  facebookAppSecret,
  twitterConsumerID,
  twitterConsumerSecret,
} = require("../config/index.config");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("pasGitHubsport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

/**
 * Contruir la URL del callback para el proveedor selecionado
 * @param {String} provider Proveedor del servicio
 * @returns URL
 */
const callbackUrl = (provider) =>
  `${production ? callbackURL : callbackURLDev}/api/auth/${provider}/callback`;

/**
 * Obtener el perfil
 * @param {*} accesToken
 * @param {*} refreshToken
 * @param {*} profile Informacion del perfil del usuario
 * @param {Function} done Indica que se ha completado la accion
 */
const getProfile = (accesToken, refreshToken, profile, done) => {
  done(null, { profile });
};

/**
 * Perfil de usuario: Google
 * @returns Perfil del usuario que ha iniciado sesion co Google
 */
const useGoogleStrategy = () => {
  return new GoogleStrategy(
    {
      clientID: oauthClientID,
      clientSecret: oauthClientSecret,
      callbackURL: callbackUrl("google"),
    },
    getProfile
  );
};

/**
 * Perfil de usuario: Facebook
 * @returns Perfil del usuario que ha iniciado sesion con Facebook
 */
const useFacebookStrategy = () => {
  return new FacebookStrategy(
    {
      clientID: facebookAppID,
      clientSecret: facebookAppSecret,
      callbackURL: callbackUrl("facebook"),
      profileFields: ["id", "emails", "displayName", "name", "photos"],
    },
    getProfile
  );
};

/**
 * Perfil de usuario: Twitter
 * @returns Perfil del usuario que ha iniciado sesion con Twitter
 */
const useTwitterStrategy = () => {
  return new TwitterStrategy(
    {
      consumerKey: twitterConsumerID,
      consumerSecret: twitterConsumerSecret,
      callbackURL: callbackUrl("twitter"),
      includeEmail: true,
    },
    getProfile
  );
};

/**
 * Perfil de usuario: GitHub
 * @returns Perfil del usuario que ha iniciado sesion con GitHub
 */
const useGitHubStrategy = () => {
  return new GitHubStrategy(
    {
      clientID: githubClientID,
      clientSecret: githubClientSecret,
      callbackURL: callbackUrl("github"),
      escope: ["user:email"],
    },
    getProfile
  );
};

module.exports = {
  useGoogleStrategy,
  useFacebookStrategy,
  useTwitterStrategy,
  useGitHubStrategy,
};

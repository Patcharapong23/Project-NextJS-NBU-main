jwt.verify(
  token,
  process.env.JWT_SECRET ||
    _.get(strapi.plugins["users-permissions"], "config.jwtSecret") ||
    "oursecret",
  {},
  function (err, tokenPayload = {}) {
    if (err) {
      return reject(new Error("Invalid token."));
    }
    resolve(tokenPayload);
  }
);

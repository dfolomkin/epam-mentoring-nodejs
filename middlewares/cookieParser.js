const cookieParser = () => (req, res, next) => {
  const splittedCookie =
    (req.headers.cookie && req.headers.cookie.split('; ')) || [];
  let parsedCookies = {};

  splittedCookie.forEach(item => {
    const tokenPair = item.split('=');

    parsedCookies[tokenPair[0]] = tokenPair[1];
  });
  req.parsedCookies = parsedCookies;
  next();
};

module.exports = cookieParser;

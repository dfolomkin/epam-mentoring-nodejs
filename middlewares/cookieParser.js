const cookieParser = () => (req, res, next) => {
  const splittedCookie =
    (req.headers.cookie && req.headers.cookie.split('; ')) || [];
  let parsedCookies = {};

  splittedCookie.forEach(item => {
    const cookiePair = item.split('=');

    parsedCookies[cookiePair[0]] = cookiePair[1];
  });
  req.parsedCookies = parsedCookies;
  next();
};

module.exports = cookieParser;

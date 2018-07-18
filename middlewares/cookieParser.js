const cookieParser = () => (req, res, next) => {
  const cookiesArray = req.headers.cookie.split('; ') || [];

  req.parsedCookies = cookiesArray.map(item => {
    const itemArray = item.split('=');
    return {
      [itemArray[0]]: itemArray[1]
    };
  });
  next();
};

module.exports = cookieParser;

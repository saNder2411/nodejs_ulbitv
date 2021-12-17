module.exports = (baseUrl) => (req, res, next) => {
  const { pathname, searchParams } = new URL(req.url, baseUrl)
  const params = {}
  searchParams.forEach((value, key) => (params[key] = value))
  req.pathname = pathname
  req.params = params
  next()
}

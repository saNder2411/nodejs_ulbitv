module.exports = (baseUrl) => (req, res) => {
  const { pathname, searchParams } = new URL(req.url, baseUrl)
  const params = {}
  searchParams.forEach((value, key) => (params[key] = value))
  req.pathname = pathname
  req.params = params
}

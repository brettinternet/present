const pathRank = (path: string) => {
  return (path.match(/\//g) || []).length
}

const removeSlashes = (path: string) => {
  return path.replace(/\//g, "")
}

export const sortPaths = (a: string, b: string) => {
  const aPath = pathRank(a)
  const bPath = pathRank(b)
  if (aPath === bPath) return removeSlashes(a) > removeSlashes(b) ? 1 : -1
  return aPath > bPath ? 1 : -1
}

export const removeTrailingSlash = (str: string) => {
  return str.slice(-1) === "/" ? str.slice(0, -1) : str + "/"
}

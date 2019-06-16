import Cookie from 'js-cookie'

const tokenName = 'token'

export function getToken () {
  return Cookie.get(tokenName)
}

export function setToken (val) {
  return Cookie.set(tokenName, val)
}

export function removeToken () {
  return Cookie.remove(tokenName)
}

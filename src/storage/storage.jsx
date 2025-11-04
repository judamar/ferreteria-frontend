const storage = {
  get(key) {
    const val = window.localStorage.getItem(key)
    if (!val) return null
    return JSON.parse(val)
  },
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  delete(key) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}

export default storage

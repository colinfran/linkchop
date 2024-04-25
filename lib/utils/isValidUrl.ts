const isValidHostname = (str: string): boolean => {
  const hostnameRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return hostnameRegex.test(str)
}

export const isValidUrl = (str: string): boolean => {
  try {
    const parsedUrl = new URL(str)
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return false
    }
    if (!isValidHostname(parsedUrl.hostname)) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

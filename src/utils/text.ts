export const sliceText = (string: string, length: number) => {
    const newStr = string.split('')
    const slice = newStr.slice(0, length)
    return slice.join('')
  }
  
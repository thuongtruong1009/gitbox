export const handleDate = (time: string) => {
    const date = new Date(time)
    const year = date.getUTCFullYear().toString()
    const month = date.getUTCMonth().toString()
    const day = date.getUTCDay().toString()
    const result = day.concat('/').concat(month).concat('/').concat(year)
    return result
}
export default {
  dateFormat (dateParam) {
    const date = new Date(dateParam)

    const YY = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const MM = ('00' + month).slice(-2)
    const DD = ('00' + day).slice(-2)
    const hh = ('00' + hour).slice(-2)
    const mm = ('00' + minute).slice(-2)
    const ss = ('00' + second).slice(-2)

    const result = `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`

    return result
  }
}

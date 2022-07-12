export const timeStampFormat = (timestamp: string) => {
  let timeStamp: number
  if (timestamp.length === 13) {
    timeStamp = new Date(parseInt(timestamp)).getTime()
  } else {
    timeStamp = new Date(timestamp).getTime()
  }
  const date = new Date(timeStamp)
  const Y = date.getFullYear() + "-"
  const M = (date.getMonth() + 1).toString().padStart(2, "0") + "-"
  const D = date.getDate().toString().padStart(2, "0") + " "
  const h = date.getHours().toString().padStart(2, "0") + ":"
  const m = date.getMinutes().toString().padStart(2, "0") + ":"
  const s = date.getSeconds().toString().padStart(2, "0")
  return Y + M + D + h + m + s
}

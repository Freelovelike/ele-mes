const success = (args: string) => {
  console.log(`%c${args}`, "color: #00ff00")
}
const error = (args: string) => {
  console.log(`%c${args}`, "color: #ff0000")
}
const warning = (args: string) => {
  console.log(`%c${args}`, "color: #ffa500")
}
const info = (args: string) => {
  console.log(`%c${args}`, "color: #0000ff")
}

export { success, error, warning, info }

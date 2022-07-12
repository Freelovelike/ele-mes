type MonthType = {
  result: number
}
export const everyMonthDays = (): MonthType[] => {
  let currentMonth: number = 0
  const months = new Set<MonthType>()
  const year = new Date().getFullYear()
  new Array(12).fill(1).map((_, index) => {
    currentMonth = index + 1
    const result = new Date(year, currentMonth, 0).getDate()
    months.add({ result })
  })
  return Array.from(months)
}

export const getMonthDay = (year: number, month: number): number => {
  const result = new Date(year, month, 0).getDate()
  return result
}

type dataSet = { year: number; month: number; day: number; endDay: number }

export const getSixMonth = (dateTime: number, offset: number = 8) => {
  let data: dataSet[] = []
  let startMonth: number = 0
  let endMonth: number = 0
  let during: number = 0
  const date = new Date(dateTime)
  let first: dataSet = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    endDay: getMonthDay(date.getFullYear(), date.getMonth() + 1),
  }
  startMonth = date.getMonth() + 1
  data.push(first)
  date.setMonth(date.getMonth() + offset)
  first = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: 1,
    endDay: date.getDate(),
  }
  endMonth = date.getMonth() + 1
  data.push(first)
  // during = endMonth - startMonth - 2 + 1
  during = offset - 2 + 1
  const date1 = new Date(dateTime)
  for (let i = 0; i < during; i++) {
    date1.setMonth(date1.getMonth() + 1)
    first = {
      year: date1.getFullYear(),
      month: date1.getMonth() + 1,
      day: 1,
      endDay: getMonthDay(date1.getFullYear(), date1.getMonth() + 1),
    }
    data.push(first)
  }
  return data
}

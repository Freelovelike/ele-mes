import moment from "moment"
import { NextPage } from "next"
import React from "react"

export const addCalendar = (
  startTime: string,
  endTime: string,
  Today: {
    year: number
    month: number
    day: number
  }
) => {
  //将矩形加入图中
  const start = new Date(startTime)
  const end = new Date(endTime)
  const today = new Date(`${Today.year}-${Today.month}-${Today.day} 00:00:00`)
  const width = (end.getTime() - start.getTime()) / 10800000 //矩形的宽度
  const marginLeft = (start.getTime() - today.getTime()) / 10800000 //矩形的marginLeft

  return { width: `${width}px`, marginLeft: `${marginLeft}px` }
}

//将秒转化为（天-小时-分钟-秒）
export const turnTime = (seconds: number) => {
  const daySec = 24 * 60 * 60
  const hourSec = 60 * 60
  const minSec = 60
  const day = Math.floor(seconds / daySec)
  const hour = Math.floor((seconds % daySec) / hourSec)
  const min = Math.floor((seconds % hourSec) / minSec)
  const sec = Math.floor(seconds % minSec)
  return { day: day, hour: hour, min: min, sec: sec }
}

export const getYMD = (
  Today: {
    year: number
    month: number
    day: number
  },
  BackDay: number
) => {
  let newYear = Today.year
  let newMonth = Today.month
  let newDay = Today.day
  const days = moment(`${newYear}-${newMonth}`).daysInMonth() //当月天数
  if (newDay + BackDay <= days) {
    newDay = newDay + BackDay
    return { newYear, newMonth, newDay }
  }
  const BackDay2 = BackDay - (days - newDay + 1)
  newDay = 1
  newMonth = newMonth + 1
  if (newMonth > 12) {
    newYear++, (newMonth = 1)
  }
  return getYMD({ year: newYear, month: newMonth, day: newDay }, BackDay2)
}
const width = 16
const onePxSec = 86400 / width //1px表示多少秒
export const changeCalendar = (
  marginLeft: number,
  startTime: string,
  endTime: string,
  Today: {
    year: number
    month: number
    day: number
  }
) => {
  //移动矩形后，得到此刻的日期
  const start = new Date(startTime)
  const end = new Date(endTime)
  const offsetSec = (end.getTime() - start.getTime()) / 1000
  const width = offsetSec / onePxSec //矩形的宽度
  const back = turnTime(marginLeft * onePxSec)
  const back2 = getYMD(
    { year: Today.year, month: Today.month, day: Today.day },
    back.day
  )
  const newStartTime = `${back2.newYear}-${back2.newMonth}-${back2.newDay} ${
    back.hour > 9 ? "" : 0
  }${back.hour}:${back.min > 9 ? "" : 0}${back.min}:${back.sec > 9 ? "" : 0}${
    back.sec
  }`
  const newEndTime = moment(
    new Date(newStartTime).getTime() + width * 10800000
  ).format("YYYY-MM-DD HH:mm:ss")

  return { newStartTime, newEndTime }
}

const test3: NextPage<test3Props> = () => {
  return <div></div>
}

export default test3
interface test3Props {}

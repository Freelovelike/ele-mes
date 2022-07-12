import moment from "moment"
import { NextPage } from "next"
import React, { ReactNode, useEffect } from "react"
import styled from "styled-components"

interface TimeLineProps {
  width: number
  day: number
}
//获得今天
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const dayin = date.getDate()
const days = new Date(year, month, 0).getDate()
export const Today = { year: year, month: month, day: dayin }

const TimeLine: NextPage<TimeLineProps> = ({ width, day }) => {
  useEffect(() => {}, [])

  const getMonths = () => {
    // const needMonth = new Array(day === 30 ? 2 : day === 90 ? 4 : 7)
    const needMonth = new Array(Math.floor(day / 30) + 1)
      .fill(0)
      .map((_, index) => {
        if (Today.month + index <= 12)
          return { year: Today.year, mon: Today.month + index }
        return { year: Today.year + 1, mon: Today.month + index - 12 }
      })
    const MonthDays = needMonth.map((item) => {
      const d = new Date(item.year, item.mon, 0)
      return d.getDate() * width
    })
    return { needMonth, MonthDays }
  }

  const getSundays = (date: Date) => {
    const daysr = date.getDay() || 7
    const ThisSun = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (7 - daysr)
    )
    const LastSun =
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (7 - daysr)
      ).getTime() -
      86400000 * 7
    let Sunday = LastSun
    const FinalSun = ThisSun.setMonth(ThisSun.getMonth() + Math.floor(day / 30))
    const a = Math.ceil((FinalSun - LastSun) / (86400000 * 7)) //总周数
    const Arr = new Array(a).fill(0).map((_, index) => {
      return Sunday + 86400000 * 7 * index
    })
    return Arr
  }
  const translateLeft = () => {
    //时间轴向左移动距离
    const day = date.getDay() || 7
    const LastSun =
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (7 - day)
      ).getTime() -
      86400000 * 7
    const now = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    const Back = (now - LastSun) / 86400000
    return Back
  }
  return (
    <Container>
      <RightTop>
        <TopTop translateX={`-${(Today.day - 1) * width}px`}>
          {getMonths().MonthDays.map((item, index) => {
            return (
              <MonthBox key={index} width={`${item}px`}>
                {getMonths().needMonth[index].year}-
                {getMonths().needMonth[index].mon}月
              </MonthBox>
            )
          })}
        </TopTop>
        {Math.floor(day / 30) >= 4 ? (
          <TopUnder translateX={`-${translateLeft() * width}px`}>
            {getSundays(new Date()).map((item, index) => {
              return (
                <WeekBox width={`${7 * width}px`} key={index}>
                  {moment(item).format("DD")}
                </WeekBox>
              )
            })}
          </TopUnder>
        ) : (
          <TopUnder translateX={`-${translateLeft() * 0}px`}>
            {(() => {
              let nodes: ReactNode[] = []
              const daa = new Date(new Date().getTime())
              for (let i = 0; i < day; i++) {
                i === 0
                  ? daa.setDate(daa.getDate())
                  : daa.setDate(daa.getDate() + 1)
                nodes.push(
                  <DayBox key={i} width={`${width}px`}>
                    {daa.getDate()}
                  </DayBox>
                )
              }
              return nodes
            })()}
          </TopUnder>
        )}
      </RightTop>
    </Container>
  )
}

export default TimeLine

const Container = styled.div`
  height: 100%;
  width: fit-content;
`
const RightTop = styled.div`
  width: fit-content;
  height: 34px;
  background: #cecece;
  position: relative;
  top: 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`
const TopTop = styled.div<{ translateX: string }>`
  transform: translateX(${({ translateX }) => translateX});
  width: 200%;
  height: 50%;
  user-select: none;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
`
const TopUnder = styled.div<{ translateX: string }>`
  transform: translateX(${({ translateX }) => translateX});
  width: 200%;
  height: 50%;
  user-select: none;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
`
const MonthBox = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 17px;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-top: 1px solid #333333;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`
const WeekBox = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 17px;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`
const DayBox = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 17px;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`

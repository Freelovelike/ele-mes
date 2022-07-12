import moment from "moment"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import {
  CalendarInput,
  useCreateCalendarAndBucketMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"

const add: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ fetching: createItemFetching }, createCalendarAndBucket] =
    useCreateCalendarAndBucketMutation()
  const [obj, setObj] = useState<ObjectType>(initialData)
  const [calendars, setCalendars] = useState<CalendarInput[]>([])
  useEffect(() => {
    obj.calendars = calendars
    setObj({ ...obj })
  }, [calendars])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")

  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      obj[e.target.name] = e.target.value
      setObj({ ...obj })
    }
  }
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.name) {
      return setIsCorrect(true)
    }
    const result = await createCalendarAndBucket({
      data: {
        name: ob.name,
      },
      calendarDatas: [
        ...ob.calendars.map((item) => {
          item.priority = +item.priority
          item.value = +item.value
          return item
        }),
      ],
    })
    if (result?.data?.createCalendarAndBucket?.errors) {
      error(result?.data?.createCalendarAndBucket?.errors?.[0].message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(
            result?.data?.createCalendarAndBucket?.data?.id.toString()
          )
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/manufacturing/calendarbucket/${result?.data?.createCalendarAndBucket?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/manufacturing/calendarbucket" })
      }
    }
  }
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>增加 CalendarBucket</span>
        </div>
        <div className='btn'>
          <BlueBtn
            fetching={createItemFetching}
            content={"保存"}
            canClick={true}
            onClick={() => CreateItemFunc(obj)}
          />
          <EditSave
            addMore={true}
            onClick={() => CreateItemFunc(obj, "saveAndCreate")}
          />
          <EditSave
            addMore={false}
            onClick={() => CreateItemFunc(obj, "saveAndContinueEdit")}
          />
        </div>
        {isCorrect && <div className='incorrect'>请检查输入是否正确</div>}
        <div className='content'>
          <div className='item'>
            <label htmlFor='name'>名称:</label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='name'
                placeholder='名称'
                name='name'
                value={obj.name}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
          <div className='item' style={{ display: "none" }}>
            <label htmlFor='value'>值:</label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='value'
                placeholder='值'
                name='value'
                value={obj.value}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className='calendar'>
          <div>
            <p className='bottom_line'>日历:排班表</p>
          </div>
          <table id='theadTr'>
            <thead>
              <tr>
                <th>开始日期</th>
                <th>结束日期</th>
                <th>值</th>
                <th>优先值</th>
                <th>星期日</th>
                <th>星期一</th>
                <th>星期二</th>
                <th>星期三</th>
                <th>星期四</th>
                <th>星期五</th>
                <th>星期六</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>删除？</th>
              </tr>
            </thead>
            <tbody>
              {calendars.map((_calen, index) => {
                return (
                  <CalendarContainer
                    indexLocation={index}
                    setState={setCalendars}
                    data={calendars}
                    key={index}
                  />
                )
              })}
            </tbody>
          </table>
          <div className='addContanier'>
            <span
              onClick={() => {
                const today = new Date()
                const YYMMDD = `${today.getFullYear()}-${
                  today.getMonth() + 1
                }-${today.getDate()}`
                const toDayZero = new Date(
                  new Date().toLocaleDateString()
                ).getTime()
                const startTime =
                  new Date(`${YYMMDD} 09:00`).getTime() - toDayZero
                const endTime =
                  new Date(`${YYMMDD} 18:00`).getTime() - toDayZero
                const endDate = new Date(`${YYMMDD} 18:00`).getTime()
                const startDate = new Date(`${YYMMDD} 08:00`).getTime()
                let calen = {
                  startDate,
                  endDate,
                  endTime,
                  startTime,
                  priority: 10,
                  value: 1,
                  weekday: [true, true, true, true, true, true, true], //周日---到---周六
                }
                calendars.push(calen)
                setCalendars([...calendars])
              }}
            >
              增加一个日历：排班表
            </span>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default add

const Container = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
  .calendar {
    #theadTr {
      position: relative;
      width: 100%;
      margin-top: 15px;
      font-size: 14px;
      font-weight: normal;
      thead {
        th {
          font-weight: normal;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        tr {
          border-bottom: 1px solid #ccc;
          border-top: 1px solid #ccc;
        }
      }
    }
    .bottom_line {
      border-bottom: 1px solid #ccc;
    }
    .addContanier {
      border: 1px solid #ccc;
      padding: 5px 8px;
      span {
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .correct {
    background-color: green;
    border-color: #ff6b84;
    color: white;
    height: 50px;
    border-radius: 4px;
    padding: 6px 12px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .incorrect {
    background-color: #ff8585;
    border-color: #ff6b84;
    color: white;
    height: 50px;
    border-radius: 4px;
    padding: 6px 12px;
    box-sizing: border-box;
  }
  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 20px;
    font-size: 13px;
    width: 100%;
    /* border: 1px solid yellow; */
    .item_item {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      color: #737373;
      width: 100%;
    }
    input {
      padding: 6px 12px;
      /* width: 90%; */
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      outline: none;
      &:focus {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
          0 0 8px rgb(102 175 233 / 60%);
      }
      &::placeholder {
        font-size: 13px;
        color: #7c7c7ccc;
      }
    }
    select {
      padding: 6px 12px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #ccc;
      background-color: #ffffff;
      /* border:none; */
      &:focus {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
          0 0 8px rgb(102 175 233 / 60%);
      }
    }
    label {
      /* border: 1px solid black; */
      text-align: right;
      width: 30%;
    }
  }

  .Head {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    #NM {
      font-size: 14px;
      font-weight: bold;
    }
    .title {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      column-gap: 5px;
      margin: 18px 0 9px 0;
      box-sizing: border-box;
      font-weight: 500;
      font-size: 18px;
    }
    .btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      column-gap: 10px;
    }
    .content {
      width: 100%;
      display: flex;
      margin-top: 30px;
      flex-direction: column;
      row-gap: 5px;
      justify-content: center;
      align-items: center;
    }
  }
  .footer {
    .advance {
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: row;
      column-gap: 10px;
    }
    .advance_content {
      display: flex;
      margin-top: 30px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 5px;
    }
  }
`

interface addProps {}
interface calendarContainerProps {
  data: CalendarInput[]
  indexLocation: number
  setState: React.Dispatch<React.SetStateAction<CalendarInput[]>>
}
type ObjectType = {
  name: string
  value: string
  calendars: CalendarInput[]
}
const initialData = {
  name: "",
  value: "",
  calendars: [] as CalendarInput[],
}
const CalendarContainer: NextPage<calendarContainerProps> = ({
  data,
  indexLocation,
  setState,
}) => {
  const [nativeData, setNativeData] = useState<CalendarInput>(
    data[indexLocation]
  )
  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    nativeData.weekday[e.target.name] = !nativeData.weekday[e.target.name]
    setNativeData({ ...nativeData })
  }
  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name.includes("Date")) {
      nativeData[e.currentTarget.name] = new Date(
        e.currentTarget.value
      ).getTime()
      setNativeData({ ...nativeData })
      return
    }
    if (e.currentTarget.name.includes("Time")) {
      nativeData[e.currentTarget.name] =
        +e.currentTarget.value.split(":")[0] * 60 * 60 * 1000 +
        +e.currentTarget.value.split(":")[1] * 60 * 1000
      setNativeData({ ...nativeData })
      return
    }
    nativeData[e.currentTarget.name] = e.currentTarget.value
    setNativeData({ ...nativeData })
  }
  useEffect(() => {
    data[indexLocation] = nativeData
    setState([...data])
  }, [nativeData])

  return (
    <CalendarC>
      <td>
        <input
          type='datetime-local'
          name='startDate'
          defaultValue={moment(nativeData.startDate).format("YYYY-MM-DDThh:mm")}
          onChange={getData}
        />
      </td>
      <td>
        <input
          type='datetime-local'
          name='endDate'
          defaultValue={moment(nativeData.endDate).format("YYYY-MM-DDThh:mm")}
          onChange={getData}
        />
      </td>
      <td>
        <input
          type='text'
          value={nativeData.value}
          name='value'
          onChange={getData}
        />
      </td>
      <td>
        <input
          type='text'
          value={nativeData.priority}
          name='priority'
          onChange={getData}
        />
      </td>
      {nativeData.weekday?.map((day, index) => {
        return (
          <td key={index}>
            <input
              type='checkbox'
              name={`${index}`}
              checked={day}
              onChange={onChangeCheck}
            />
          </td>
        )
      })}
      <td>
        <input
          type='time'
          name='startTime'
          defaultValue={moment(nativeData.startTime).format("hh:mm")}
          onChange={getData}
        />
      </td>
      <td>
        <input
          type='time'
          name='endTime'
          defaultValue={moment(nativeData.endTime).format("hh:mm")}
          onChange={getData}
        />
      </td>
      <td>
        <button
          onClick={() => setState(data.filter((_, i) => i !== indexLocation))}
        >
          删除
        </button>
      </td>
    </CalendarC>
  )
}
const CalendarC = styled.tr``

import moment from "moment"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Container } from "../../../../components/styled/container"
import {
  Calendar,
  CalendarInput,
  useCalendarBucketQuery,
  useDeletecalendarBucketsMutation,
  useUpdateCalendarBucketMutation,
} from "../../../../src/generated/graphql"
import { error, success } from "../../../../utils/log"

const add: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ data: calendarBucketData }] = useCalendarBucketQuery({
    variables: { calendarBucketId: +router.query.id || 0 },
  })
  const [{ fetching: createItemFetching }, updateCalendarAndBucket] =
    useUpdateCalendarBucketMutation()
  const [obj, setObj] = useState<ObjectType>(initialData)
  const [calendars, setCalendars] = useState<CalendarInput[]>([])
  const [calendarsolder, setCalendarsolder] = useState<Calendar[]>([])
  useEffect(() => {
    if (calendarBucketData?.calendarBucket) {
      setCalendarsolder([
        ...calendarBucketData?.calendarBucket.calendars.map((i) => {
          return { ...i, calendarBucket: null }
        }),
      ])
    }
  }, [calendarBucketData?.calendarBucket])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  useEffect(() => {
    if (calendarBucketData?.calendarBucket) {
      obj.name = calendarBucketData?.calendarBucket?.name
      setObj({ ...obj })
    }
  }, [calendarBucketData?.calendarBucket])
  const [objectName, setObjectName] = useState<string>("")

  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      obj[e.target.name] = e.target.value
      setObj({ ...obj })
    }
  }
  const [, deleteOperation] = useDeletecalendarBucketsMutation()
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.name) {
      return setIsCorrect(true)
    }
    /**
     * 更新操作有问题,jukeng
     * */
    const result = await updateCalendarAndBucket({
      updateCalendarBucketId: +router.query.id,
      data: {
        name: ob.name,
        calendarsId: calendarBucketData.calendarBucket?.calendars.map(
          (i) => +i.id
        ),
      },
      // calendarDatas: [
      //   ...ob.calendars.map((item) => {
      //     item.priority = +item.priority
      //     item.value = +item.value
      //     return item
      //   }),
      // ],
    })
    if (result?.data?.updateCalendarBucket?.errors) {
      error(result?.data?.updateCalendarBucket?.errors?.[0].message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(result?.data?.updateCalendarBucket?.data?.id.toString())
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/manufacturing/calendarbucket/${result?.data?.updateCalendarBucket?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/manufacturing/calendarbucket", query: {} })
      }
    }
  }
  const DeleteItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteOperation({ ids: [+router.query.id] })
      if (result?.data?.deletecalendarBuckets) {
        return router.push("/manufacturing/calendarbucket")
      }
    })
  }
  return (
    <Con>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>编辑 CalendarBucket</span>
        </div>
        <Menu detailRouterPath='' supplierRouterPath=''></Menu>
        <div className='btnContainer'>
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
          <DelButton onClick={DeleteItem}>删除</DelButton>
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
              <>
                {calendarsolder.map((_, index) => {
                  let data = calendarBucketData.calendarBucket.calendars.map(
                    (i) => {
                      return { ...i, calendarBucket: null }
                    }
                  )

                  return (
                    <CalendarQuerysDataContainer
                      data={data}
                      indexLocation={index}
                      setState={setCalendarsolder}
                      key={index}
                    />
                  )
                })}
                {calendars.map((_, index) => {
                  return (
                    <CalendarContainer
                      indexLocation={index}
                      setState={setCalendars}
                      data={calendars}
                      key={index}
                    />
                  )
                })}
              </>
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
                  weekday: [true, true, true, true, true, true, true],
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
    </Con>
  )
}

export default add
const Con = styled(Container)`
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
`
interface addProps {}
interface calendarContainerProps {
  data: CalendarInput[]
  indexLocation: number
  setState: React.Dispatch<React.SetStateAction<CalendarInput[]>>
}
interface calendarQuerysContainerProps {
  data: Calendar[]
  indexLocation: number
  setState: React.Dispatch<React.SetStateAction<Calendar[]>>
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
    nativeData[e.currentTarget.name] = e.currentTarget.value
    setNativeData({ ...nativeData })
  }
  useEffect(() => {
    // 直接修改就好了
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
const CalendarQuerysDataContainer: NextPage<calendarQuerysContainerProps> = ({
  data,
  indexLocation,
  setState,
}) => {
  const [nativeData, setNativeData] = useState<Calendar>(data[indexLocation])
  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    nativeData.weekday[e.target.name] = !nativeData.weekday[e.target.name]
    setNativeData({ ...nativeData })
  }
  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    nativeData[e.currentTarget.name] = e.currentTarget.value
    setNativeData({ ...nativeData })
  }
  useEffect(() => {
    // 直接修改就好了
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
      {nativeData.weekday
        ?.map((i) => (i === "true" ? true : false))
        .map((day, index) => {
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

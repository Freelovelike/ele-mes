import moment from "moment"
import { NextPage } from "next"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Card } from "../../../components/Card/Card"
import Material from "../../../components/gantt/plan/material"
import TimeLine from "../../../components/gantt/plan/TimeLine"
import Track from "../../../components/gantt/plan/track"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { Container as Menu } from "../../../components/PagePart/DetailMenu"
import { TD, TH } from "../../../components/PagePart/TH"
import { Btn } from "../../../components/Products"
import {
  Resource,
  useResourcesQuery,
  useUpdateWorkMutation,
  Work,
} from "../../../src/generated/graphql"

interface indexProps {}

const index: NextPage<indexProps> = () => {
  /**
   * 警告!!!
   * 这里的拖动引发的更新操作全部是在前端完成，但是有个漏洞，就是在Works修改页面竟然可以直接编辑
   * 时间，所以这里的更新我不确定会和其他编辑时间是否冲突。
   * 我镇的不知道。。。
   * */
  const [{ data: resources }] = useResourcesQuery()
  const [data, setData] = useState<Resource[]>([])
  const [wid, setWid] = useState<number>(8)
  const [day, setDay] = useState<number>(180)
  const [left, setLeft] = useState(false)
  const [isModify, setIsModify] = useState(false)
  const needUpdate = useRef<Work[]>([])
  const [, updateWork] = useUpdateWorkMutation()
  const [demandId, setDemandId] = useState<number>(0)
  useEffect(() => {
    if (resources?.resources?.data) {
      setData(resources.resources.data as Resource[])
    }
  }, [resources?.resources])
  useEffect(() => {
    const widthNode = document.getElementById("planEditBody")
    const res = (+widthNode?.clientWidth * 0.85) / day
    setWid(res)
    window.onresize = () => {
      const res = (+widthNode?.clientWidth * 0.85) / day
      setWid(res)
    }
  }, [day])
  /**
   * 这个函数需要传递过去接收更改的状态并且改变现有状态实现实时更新，
   * 实现拖动更新以及更新其他关联状态
   * */
  const change = (da?: any, dx?: number) => {
    needUpdate.current = []
    const newData = data.map((item, _) => {
      item.works = item["works"].map((work, _) => {
        if (work.id === da.id) {
          return work
        }
        if (work.batch === da.batch) {
          work.startDate = work.startDate + dx
          work.endDate = work.endDate + dx
          needUpdate.current = [...needUpdate.current, work]
        }
        return work
      })
      return item
    })
    setData([...newData])
    setIsModify(true)
    if (da) {
      needUpdate.current = [...needUpdate.current, da]
    }
  }
  const scrollFun = (e: React.WheelEvent<HTMLDivElement>) => {
    const wuhu = document.getElementsByClassName("wuhu")
    Array.from(wuhu).forEach((item) => {
      item.scrollTop = e.deltaY
    })
  }
  const deleteItem = (id: number) => {
    setData(data.filter((i) => i.id !== id))
  }
  const selectDay = () => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setDay(+e.currentTarget.innerText.replace(/\D/g, ""))
    }
  }
  const updateWorks = async () => {
    let res = []
    for await (let i of needUpdate.current) {
      const result = await updateWork({
        updateWorkId: i.id,
        data: {
          completedQuantity: i.completedQuantity,
          name: i.name,
          operationId: i.operation.id,
          quantity: i.quantity,
          startDate: new Date(i.startDate),
          endDate: new Date(i.endDate),
          resource: i.resource.id,
        },
      })
      if (result.data?.updateWork?.data?.id) {
        res.push(1)
        setIsModify(false)
      }
    }
    if (res.length === needUpdate.current.length) {
      console.log("更新成功")
      needUpdate.current = []
    }
  }
  const [mtt, setMtt] = useState<Work>()
  const WorkArr = ["添加", "ID", "名称", "地址", "最大值", "排班表"]
  const matArr = ["ID", "名称", "数量", "状态", "开始时间", "结束时间"]
  const selectResource = (dat: Resource) => {
    return () => {
      if (!data.map((i) => i.id).includes(dat?.id)) {
        return setData([...data, dat])
      }
      console.log("已经存在")
    }
  }
  const selectWork = (data: any) => {
    setMtt(data)
    setDemandId(data["demand"]["id"])
    setLeft(true)
  }
  const watchUpdate = (i: Work) => {
    needUpdate.current = [...needUpdate.current, i]
      .map((w) => {
        return Array.from(
          new Set([...needUpdate.current, i].map((work) => work.id))
        ).includes(w.id)
          ? w
          : undefined
      })
      .filter((i) => i !== undefined)
  }
  return (
    <Container>
      <div className='container'>
        <h4>计划编辑器</h4>

        <div className='dayContainer'>
          {[7, 30, 90, 180, 365].map((i, _) => {
            return (
              <div
                className='day'
                key={_}
                style={{ backgroundColor: day === i ? "#88b2c6" : "white" }}
                onClick={selectDay()}
              >
                {i}天
              </div>
            )
          })}
        </div>
        <div className='planEditBody' id='planEditBody'>
          <div
            className='wuhu left'
            id='left'
            onWheel={(e) => {
              scrollFun(e)
            }}
          >
            {/* 第一处改动 */}
            {data.map((i, index) => {
              return (
                <div
                  key={index}
                  className='resourceNames'
                  onMouseOver={(e) => {
                    e.currentTarget.innerHTML = "delete"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.innerHTML = i.name
                  }}
                  onClick={() => deleteItem(i.id)}
                >
                  {i.name}
                </div>
              )
            })}
          </div>
          <div className='right'>
            <TimeLine width={wid} day={day} />
            <div
              className='wuhu workLine'
              onWheel={(e) => {
                scrollFun(e)
              }}
            >
              {data
                .map((i) => i.works)
                .map((i) => {
                  return (
                    <Track
                      count={day}
                      width={wid}
                      key={Math.random().toString()}
                    >
                      {i.map((j, Jindex) => {
                        return (
                          <Material
                            deman={demandId === j.demand.id}
                            key={Jindex + "1"}
                            data={j}
                            width={wid}
                            change={change}
                            onSelect={selectWork}
                          />
                        )
                      })}
                    </Track>
                  )
                })}
            </div>
          </div>
        </div>
        <Mid>
          <div
            style={{
              display: "flex",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            <BlueBtn
              content='保存'
              canClick={isModify}
              onClick={() => {
                updateWorks()
              }}
            />
            <p style={{ color: "red", marginLeft: "10px" }}>*</p>
            <p>请先创建生产单</p>
          </div>

          <Menu style={{ marginTop: "0px" }}>
            <span>
              <div
                className={left ? "active" : ""}
                onClick={() => {
                  setLeft(true)
                }}
              >
                描述
              </div>
              <div
                className={!left ? "active" : ""}
                onClick={() => {
                  setLeft(false)
                }}
              >
                生产资料
              </div>
            </span>
          </Menu>
        </Mid>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          {left ? (
            <div className='cards'>
              <div className='card'>
                <Card title='描述' customer={true}>
                  {mtt ? (
                    <WorkTable>
                      <WorkColumn>
                        {matArr.map((item, index) => {
                          return (
                            <p key={index} style={{ fontWeight: "bolder" }}>
                              {item}
                            </p>
                          )
                        })}
                      </WorkColumn>
                      <WorkColumn>
                        <p>{mtt.id}</p>
                        <p>{mtt.name}</p>
                        <p>{mtt.quantity}</p>
                        <p>{mtt.status}</p>
                        <input
                          type='datetime-local'
                          value={moment(mtt.startDate).format(
                            "YYYY-MM-DDThh:mm"
                          )}
                          onChange={(e) => {
                            let newD = new Date(e.target.value).getTime()
                            const workTime = mtt.endDate - mtt.startDate
                            const dx = newD - mtt.startDate
                            setMtt({
                              ...mtt,
                              startDate: newD,
                            })

                            setData(
                              data.map((item, _index) => {
                                item.works = item.works.map((i, _) => {
                                  if (i.id === mtt.id) {
                                    i.startDate = newD
                                    i.endDate = newD + workTime
                                    watchUpdate(i)
                                    return i
                                  }
                                  if (i.batch === mtt.batch) {
                                    i.startDate = i.startDate + dx
                                    i.endDate = i.endDate + dx
                                  }
                                  watchUpdate(i)
                                  return i
                                })
                                return item
                              })
                            )
                            setMtt({
                              ...mtt,
                            })
                            setIsModify(true)
                          }}
                        />
                        <input
                          type='datetime-local'
                          value={moment(mtt.endDate).format("YYYY-MM-DDThh:mm")}
                          onChange={(e) => {
                            let newD = new Date(e.target.value).getTime()
                            const workTime = mtt.endDate - mtt.startDate
                            const dx = newD - mtt.endDate
                            setMtt({
                              ...mtt,
                              endDate: newD,
                            })
                            setData(
                              data.map((item, _index) => {
                                item.works = item.works.map((i, _) => {
                                  if (i.id === mtt.id) {
                                    i.endDate = newD
                                    i.startDate = newD - workTime
                                    watchUpdate(i)
                                    return i
                                  }
                                  if (i.batch === mtt.batch) {
                                    i.startDate = i.startDate + dx
                                    i.endDate = i.endDate + dx
                                  }
                                  watchUpdate(i)
                                  return i
                                })
                                return item
                              })
                            )
                            setMtt({
                              ...mtt,
                            })
                            setIsModify(true)
                          }}
                        />
                      </WorkColumn>
                    </WorkTable>
                  ) : (
                    <h3>未选中对象</h3>
                  )}
                </Card>
              </div>
            </div>
          ) : (
            <Under>
              <table>
                <thead>
                  <tr>
                    {WorkArr.map((item, index) => {
                      return <TH index={index} title={item} key={index} />
                    })}
                  </tr>
                </thead>
                <tbody>
                  {resources &&
                    resources.resources &&
                    resources.resources.data &&
                    resources.resources.data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <TD>
                            <Btn onClick={selectResource(item as Resource)}>
                              添加
                            </Btn>
                          </TD>
                          <TD>{item.id}</TD>
                          <TD>{item.name}</TD>
                          <TD>{item.location.name}</TD>
                          <TD>{item.maximum}</TD>
                          {/* 原来是calendar */}
                          <TD>{item.calendarBucket.name}</TD>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </Under>
          )}
        </div>
      </div>
    </Container>
  )
}

export default index

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .dayContainer {
    user-select: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    column-gap: 5px;
    .day {
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  .container {
    width: 90%;
    /* border: 1px solid green; */
    h4 {
      font-weight: bold;
      margin: 18px 0px 18px 20px;
    }
    .planEditBody {
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow: hidden;
      border: 1px solid #ccc;
      border-radius: 8px;
      .left {
        display: flex;
        overflow: auto;
        flex-direction: column;
        width: 15%;
        border-right: 1px solid #ccc;
        padding: 34px 0 0 0;
        box-sizing: border-box;
        .resourceNames {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid white;
          height: 60px;
          min-height: 60px;
          :hover {
            background-color: rgba(255, 0, 0, 0.4);
          }
        }
      }
      .right {
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        /* 设置滚动条的样式 */
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        /* 滚动槽 */
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        /* 滚动条滑块 */
        ::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.1);
          -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
        }
        ::-webkit-scrollbar-thumb:window-inactive {
          background: rgba(255, 0, 0, 0.4);
        }
        display: flex;
        flex-direction: column;
        width: 85%;
        /* border: 1px solid red; */
        .timeLine {
          height: 34px;
          min-height: 34px;
          border: 1px solid yellow;
        }
        .workLine {
          position: relative;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`
const Mid = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
`
const WorkTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 5px 8px;
  justify-content: flex-start;
`
const WorkColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  color: #333333;
  font-size: 13px;
  line-height: 19px;
  min-width: 138px;
`
const Under = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid #cccccc;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  box-sizing: border-box;
  overflow: auto;
`

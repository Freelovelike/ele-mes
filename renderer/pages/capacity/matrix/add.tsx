import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styled from "styled-components"
import Search from "../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../components/dataType"
import { Drawer } from "../../../components/Drawer"
import { Operations } from "../../../components/Operations"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import { Resources } from "../../../components/Resources"
import {
  Operation,
  Resource,
  useCreateMatrixMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../../sales/product/add"

interface addProps {}
type ObjectType = {
  cost: string
  Duration: string
  fromId: StruectType
  name: string
  priority: string
  toId: StruectType
  resourceId: StruectType
}

const add: NextPage<addProps> = () => {
  const initialData = {
    cost: "",
    Duration: "",
    fromId: { id: 0, name: "" },
    name: "",
    priority: "",
    toId: { id: 0, name: "" },
    resourceId: { id: 0, name: "" },
  }
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const Select1 = (data: Operation) => {
    const { id, name } = data
    obj.fromId = { id, name }
    setObj({ ...obj })
  }
  const Select2 = (data: Operation) => {
    const { id, name } = data
    obj.toId = { id, name }
    setObj({ ...obj })
  }
  const Select3 = (data: Resource) => {
    const { id, name } = data
    obj.resourceId = { id, name }
    setObj({ ...obj })
  }
  const router = useRouter()
  const [{ fetching: createItemFetching }, createItem] =
    useCreateMatrixMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
  const getOnlyNumber = (target: string) => {
    return target.replace(/\D/g, "")
  }
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (typeof initialData[e.target.name] === "object") {
        return (obj[e.target.name]["name"] = e.target.value)
      }
      obj[e.target.name] = e.target.value
      setObj({ ...obj })
    }
  }
  //创建方法
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.name || !!!ob.fromId || !!!ob.toId) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      data: {
        Duration: +getOnlyNumber(ob.Duration),
        cost: +getOnlyNumber(ob.cost),
        fromId: +ob.fromId.id,
        name: ob.name,
        priority: +getOnlyNumber(ob.priority),
        toId: +ob.toId.id,
        resourceId: +ob.resourceId.id,
      },
    })
    if (result?.data?.createMatrix?.errors) {
      error(result?.data?.createMatrix?.errors?.[0].message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/capacity/matrix/${result?.data?.createMatrix?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/capacity/matrix", query: {} })
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
          <span>增加</span>
          <span>换线准备矩阵</span>
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
            <label htmlFor='name' id='NM'>
              名称:
            </label>
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
          <div className='item'>
            <label htmlFor='fromId'>初始操作:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='fromId'
                  placeholder='初始操作'
                  name='fromId'
                  value={obj.fromId.name}
                  onChange={getMainData()}
                />
                <Sea
                  onClick={() => {
                    setOpen1(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='toId'>目标操作:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='toId'
                  placeholder='目标操作'
                  name='toId'
                  value={obj.toId.name}
                  onChange={getMainData()}
                />
                <Sea
                  onClick={() => {
                    setOpen2(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='resourceId'>生产资料:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='resourceId'
                  placeholder='生产资料'
                  name='resourceId'
                  value={obj.resourceId.name}
                  onChange={getMainData()}
                />
                <Sea
                  onClick={() => {
                    setOpen3(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='cost'>花费:</label>
            <div className='item_item'>
              <input
                type='text'
                id='cost'
                name='cost'
                value={obj.cost}
                onChange={getMainData()}
              />
            </div>
          </div>
          {/* Duration */}
          <div className='item'>
            <label htmlFor='priority'>优先值:</label>
            <div className='item_item'>
              <input
                type='text'
                id='priority'
                name='priority'
                value={obj.priority}
                onChange={getMainData()}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='Duration'>所需时间（秒）:</label>
            <div className='item_item'>
              <input
                type='text'
                id='Duration'
                name='Duration'
                value={obj.Duration}
                onChange={getMainData()}
              />
            </div>
          </div>
        </div>
      </div>
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Operations Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Operations Select={Select2} setOpen={setOpen2} />
      </Drawer>
      <Drawer show={open3} onClosure={() => setOpen3(false)}>
        <Resources Select={Select3} setOpen={setOpen3} />
      </Drawer>
    </Container>
  )
}

export default add

const Container = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
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

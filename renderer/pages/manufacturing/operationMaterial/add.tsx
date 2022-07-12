import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styled from "styled-components"
import Search from "../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../components/dataType"
import { Drawer } from "../../../components/Drawer"
import { Items } from "../../../components/Items"
import { Operations } from "../../../components/Operations"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import {
  Item,
  Operation,
  useCreateOperationMaterialMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../../sales/product/add"

interface addProps {}
type ObjectType = {
  operation: StruectType
  item: StruectType
  type: string
  quantity: string
  priority: string
}
const initialData: ObjectType = {
  operation: { id: 0, name: "" },
  item: { id: 0, name: "" },
  type: "开始",
  quantity: "1",
  priority: "10",
}
const add: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ fetching: createItemFetching }, createItem] =
    useCreateOperationMaterialMutation()
  const [obj, setObj] = useState<ObjectType>(initialData)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
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
  const Select1 = (data: Operation) => {
    const { name, id } = data
    obj.operation = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Item) => {
    const { name, id } = data
    obj.item = { name, id }
    setObj({ ...obj })
  }
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.operation || !!!ob.item) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      data: {
        priority: +ob.priority,
        operationId: +ob.operation.id,
        itemId: +ob.item.id,
        type: ob.type === "开始" ? "start" : "end",
        quantity: +ob.quantity,
      },
    })
    if (result?.data?.createOperationMaterial?.errors) {
      return error(result?.data?.createOperationMaterial?.errors?.[0].message)
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(
          result?.data?.createOperationMaterial?.data?.id?.toString()
        )
        setObj(initialData)
        return
      }
      router.push({
        pathname: `/manufacturing/operationMaterial/${result?.data?.createOperationMaterial.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/manufacturing/operationMaterial", query: {} })
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
          <span>物料清单</span>
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
            <label htmlFor='operation'>所属操作:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='operation'
                  placeholder='所属操作'
                  name='operation'
                  value={obj.operation.name}
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
            </div>
          </div>
          <div className='item'>
            <label htmlFor='item'>物料:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='item'
                  placeholder='物料'
                  name='item'
                  value={obj.item.name}
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
            </div>
          </div>
          <div className='item'>
            <label htmlFor='type'>原料或制成品:</label>
            <div className='item_item'>
              <select
                name='type'
                id='type'
                value={obj.type}
                onChange={getMainData()}
              >
                <option value='开始'>原料</option>
                <option value='结束'>制成品</option>
              </select>
              <span>在操作计划前或者后的消耗或生产物料</span>
            </div>
          </div>

          <div className='item'>
            <label htmlFor='priority'>优先值:</label>
            <div className='item_item'>
              <input
                type='text'
                placeholder='优先值'
                id='priority'
                name='priority'
                value={obj.priority}
                onChange={getMainData()}
              />
              <span>优先值越大越优先</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='quantity'>数量:</label>
            <div className='item_item'>
              <input
                type='text'
                placeholder='数量'
                id='quantity'
                name='quantity'
                value={obj.quantity}
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
        <Items Select={Select2} setOpen={setOpen2} />
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

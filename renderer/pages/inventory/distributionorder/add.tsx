import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styled from "styled-components"
import Search from "../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../components/dataType"
import Demands from "../../../components/Demands"
import { Drawer } from "../../../components/Drawer"
import { Locations } from "../../../components/Locations"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import { Products } from "../../../components/Products"
import {
  Demand,
  Item,
  Location,
  useCreateDistributionOrderMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../../sales/product/add"

interface addProps {}
type ObjectType = {
  destinationId: StruectType
  itemId: StruectType
  originId: StruectType
  name: string
  quantity: string
  receiptDate: string
  shippingDate: string
  status: string
  demand: StruectType
}

const add: NextPage<addProps> = () => {
  const router = useRouter()
  const initialData = {
    name: "",
    destinationId: { id: 0, name: "" },
    itemId: { id: 0, name: "" },
    originId: { id: 0, name: "" },
    quantity: "",
    receiptDate: "",
    shippingDate: "",
    status: "",
    demand: { id: null, name: "" },
  }
  const [{ fetching: createItemFetching }, createDistributionOrder] =
    useCreateDistributionOrderMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
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
  const Select1 = (data: Item) => {
    const { name, id } = data
    obj.itemId = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { name, id } = data
    obj.originId = { name, id }
    setObj({ ...obj })
  }
  const Select3 = (data: Location) => {
    const { name, id } = data
    obj.destinationId = { name, id }
    setObj({ ...obj })
  }
  const Select4 = (data: Demand) => {
    const { name, id } = data
    obj.demand = { name, id }
    setObj({ ...obj })
  }

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)

  //创建方法
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.itemId || !!!obj.destinationId || !!!obj.originId) {
      return setIsCorrect(true)
    }
    const result = await createDistributionOrder({
      data: {
        destinationId: +ob.destinationId.id,
        itemId: +ob.itemId.id,
        name: ob.name,
        originId: +ob.originId.id,
        quantity: +ob.quantity,
        receiptDate: new Date(ob.receiptDate).getTime(),
        shippingDate: new Date(ob.shippingDate).getTime(),
        status: ob.status,
        demandId: +ob.demand.id,
      },
    })
    if (!result?.data?.createDistributionOrder?.data?.id) {
      return error("创建失败！")
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(
          result?.data?.createDistributionOrder?.data?.id.toString()
        )
        setObj({} as ObjectType)
        return
      }
      router.push({
        pathname: `/inventory/distributionorder/${result?.data?.createDistributionOrder?.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/inventory/distributionorder", query: {} })
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
          <span>配送订单</span>
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
            <label htmlFor='itemId'>物料:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='itemId'
                  placeholder='物料'
                  name='itemId'
                  value={obj.itemId.name}
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
            <label htmlFor='originId'>出发地</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='originId'
                  placeholder='出发地'
                  name='originId'
                  value={obj.originId.name}
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
            <label htmlFor='destinationId'>目的地:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='destinationId'
                  placeholder='目的地'
                  name='destinationId'
                  value={obj.destinationId.name}
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
            <label htmlFor='quantity' id='NM'>
              数量:
            </label>
            <div className='item_item'>
              <input
                type='text'
                id='quantity'
                placeholder='数量'
                name='quantity'
                value={obj.quantity}
                onChange={getMainData()}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='shippingDate'>发货日期:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='shippingDate'
                placeholder='shippingDate'
                name='shippingDate'
                value={obj.shippingDate}
                onChange={getMainData()}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='receiptDate'>收货日期:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='receiptDate'
                placeholder='receiptDate'
                name='receiptDate'
                value={obj.receiptDate}
                onChange={getMainData()}
              />
            </div>
          </div>

          <div className='item'>
            <label htmlFor='status'>状态:</label>
            <div className='item_item'>
              <select
                name='status'
                id='status'
                value={obj.status}
                onChange={getMainData()}
              >
                <option value='---'>------</option>
                <option value='proposed'>提议的</option>
                <option value='approved'>经核准的</option>
                <option value='confirmed'>已确定</option>
                <option value='completed'>completed</option>
                <option value='closed'>已结束</option>
              </select>
              <span>订单状态</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='demand'>需求（可选）:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='demand'
                  placeholder='需求（可选）'
                  name='demand'
                  value={obj.demand.name}
                  onChange={getMainData()}
                />
                <Sea
                  onClick={() => {
                    setOpen4(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='name' id='NM'>
              外部ID（可选）:
            </label>
            <div className='item_item'>
              <input
                type='text'
                id='name'
                placeholder='外部ID（可选）'
                name='name'
                value={obj.name}
                onChange={getMainData()}
              />
              <span>用于连接外部数据库</span>
            </div>
          </div>
        </div>
      </div>
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Products Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Locations Select={Select2} setOpen={setOpen2} />
      </Drawer>
      <Drawer show={open3} onClosure={() => setOpen3(false)}>
        <Locations Select={Select3} setOpen={setOpen3} />
      </Drawer>
      <Drawer show={open4} onClosure={() => setOpen4(false)}>
        <Demands Select={Select4} setOpen={setOpen4} />
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

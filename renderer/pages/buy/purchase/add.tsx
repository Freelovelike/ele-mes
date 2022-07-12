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
import { Supplier as SupplierC } from "../../../components/Supplier"
import {
  Demand,
  Item,
  Location,
  Supplier,
  useCreatePurchaseMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../../sales/product/add"

interface addProps {}
type inuptType = {
  OrderingDate: string
  ReceiptDate: string
  itemId: StruectType
  locationId: StruectType
  quantity: string
  referto: string
  status: string
  supplierId: StruectType
  demand: StruectType
}
const addLocation: NextPage<addProps> = () => {
  const router = useRouter()
  const initailData: inuptType = {
    OrderingDate: new Date().toLocaleDateString(),
    ReceiptDate: new Date().toLocaleDateString(),
    itemId: { id: 0, name: "" },
    locationId: { id: 0, name: "" },
    quantity: "",
    referto: "",
    status: "",
    supplierId: { id: 0, name: "" },
    demand: { id: null, name: "" },
  }
  const [{ fetching: createLocationFetching }, CreateSupplier] =
    useCreatePurchaseMutation()
  const [open1, setOpen1] = useState<boolean>(false)
  const [open2, setOpen2] = useState<boolean>(false)
  const [open3, setOpen3] = useState<boolean>(false)
  const [open4, setOpen4] = useState<boolean>(false)
  //获取收集主要的数据
  const [obj, setObj] = useState<inuptType>(initailData)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (typeof initailData[e.target.name] === "object") {
      return (obj[e.target.name]["name"] = e.target.value)
    }
    obj[e.target.name] = e.target.value
    setObj({ ...obj })
  }
  const Select1 = (data: Item) => {
    const { id, name } = data
    obj.itemId = { id, name }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { id, name } = data
    obj.locationId = { id, name }
    setObj({ ...obj })
  }
  const Select3 = (data: Supplier) => {
    const { id, name } = data
    obj.supplierId = { id, name }
    setObj({ ...obj })
  }
  const Select4 = (data: Demand) => {
    const { name, id } = data
    obj.demand = { name, id }
    setObj({ ...obj })
  }

  //创建方法
  const CreateItemFunc = async (
    ob: inuptType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.referto) {
      return setIsCorrect(true)
    }
    const result = await CreateSupplier({
      data: {
        orderingDate: new Date(ob.OrderingDate),
        receiptDate: new Date(ob.ReceiptDate),
        itemId: +ob.itemId.id,
        locationId: +ob.locationId.id,
        quantity: +ob.quantity,
        name: ob.referto,
        status: ob.status,
        supplierId: +ob.supplierId.id,
        demandId: +ob.demand.id,
      },
    })
    if (result.error) {
      return console.log(result.error)
    }
    if (result?.data?.createPurchase?.data) {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.referto)
          setObj(initailData)
          return
        }
        router.push({
          pathname: `/buy/purchase/${result?.data?.createPurchase?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/buy/purchase", query: {} })
      }
    } else {
      error(result.data.createPurchase.errors[0].message)
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
          <span>采购订单</span>
        </div>
        <div className='btn'>
          <BlueBtn
            fetching={createLocationFetching}
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
                  onChange={getMainData}
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
            <label htmlFor='locationId'>收货地点:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='locationId'
                  placeholder='收货地点'
                  name='locationId'
                  value={obj.locationId.name}
                  onChange={getMainData}
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
            <label htmlFor='supplierId'>供应商:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='supplierId'
                  placeholder='供应商'
                  name='supplierId'
                  value={obj.supplierId.name}
                  onChange={getMainData}
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
            <label htmlFor='quantity'>数量:</label>
            <div className='item_item'>
              <input
                type='text'
                id='quantity'
                placeholder='数量'
                name='quantity'
                value={obj.quantity}
                onChange={getMainData}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='OrderingDate'>下单日期:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='OrderingDate'
                placeholder='orderingDate'
                name='OrderingDate'
                onChange={getMainData}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='ReceiptDate'>收货日期:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='ReceiptDate'
                placeholder='ReceiptDate'
                name='ReceiptDate'
                onChange={getMainData}
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
                onChange={getMainData}
              >
                <option value='------'>------</option>
                <option value='proposed'>提议</option>
                <option value='approved'>核准</option>
                <option value='confirmed'>确定</option>
                <option value='completed'>完成</option>
                <option value='closed'>结束</option>
              </select>
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
                  onChange={getMainData}
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
            <label htmlFor='referto' id='NM'>
              外部ID（可选）:
            </label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='referto'
                placeholder='外部ID（可选）'
                name='referto'
                value={obj.referto}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData}
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
        <SupplierC Select={Select3} setOpen={setOpen3} />
      </Drawer>
      <Drawer show={open4} onClosure={() => setOpen4(false)}>
        <Demands Select={Select4} setOpen={setOpen4} />
      </Drawer>
    </Container>
  )
}

export default addLocation

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

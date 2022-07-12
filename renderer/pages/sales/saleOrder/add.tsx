import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styled from "styled-components"
import Search from "../../../assets/Image/leftSearch.svg"
import { Customers } from "../../../components/Customers"
import { StruectType } from "../../../components/dataType"
import { Drawer } from "../../../components/Drawer"
import { Locations } from "../../../components/Locations"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import { Products } from "../../../components/Products"
import {
  Customer,
  Item,
  Location,
  useCreateOrderMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../product/add"

interface addProps {}
type ObjectType = {
  itemId: StruectType
  locationId: StruectType
  name: string
  priority: number
  status: string
  quantity: number
  customerId: StruectType
  dueDate: string
}
let initialData: ObjectType = {
  itemId: { id: 0, name: "" },
  locationId: { id: 0, name: "" },
  customerId: { id: 0, name: "" },
  name: "",
  priority: 10,
  status: "开放",
  quantity: 1,
  dueDate: "",
}
const add: NextPage<addProps> = () => {
  const router = useRouter()
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [{ fetching: createItemFetching }, createOrder] =
    useCreateOrderMutation()
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
    obj.itemId.id = data.id
    obj.itemId.name = data.name
    setObj({ ...obj })
  }
  const Select2 = (data: Customer) => {
    obj.customerId.id = data.id
    obj.customerId.name = data.name
    setObj({ ...obj })
  }
  const Select3 = (data: Location) => {
    obj.locationId.id = data.id
    obj.locationId.name = data.name
    setObj({ ...obj })
  }
  //创建方法
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.name) {
      return setIsCorrect(true)
    }
    const result = await createOrder({
      data: {
        itemId: +ob.itemId.id,
        locationId: +ob.locationId.id,
        customerId: +ob.customerId.id,
        name: ob.name,
        priority: +ob.priority,
        status: ob.status,
        quantity: +ob.quantity,
        dueDate: new Date(ob.dueDate).getTime(),
      },
    })

    if (result?.data?.createOrder?.errors) {
      error(result?.data?.createOrder?.errors?.[0].message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initialData)
          return router.replace({ pathname: "/sales/saleOrder/add", query: {} })
        }
        router.push({
          pathname: `/sales/saleOrder/${result?.data?.createOrder?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/sales/saleOrder", query: {} })
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
          <span>销售订单</span>
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
            <label htmlFor='description'>产品:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='itemId'
                  placeholder='产品'
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
            </div>
          </div>
          <div className='item'>
            <label htmlFor='cost'>收货地点:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='locationId'
                  placeholder='收货地点'
                  name='locationId'
                  value={obj.locationId.name}
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
            </div>
          </div>
          <div className='item'>
            <label htmlFor='description'>客户:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='customerId'
                  placeholder='客户'
                  name='customerId'
                  value={obj.customerId.name}
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
            <label htmlFor='dueDate' id='NM'>
              截止日期:
            </label>
            <div className='item_item'>
              <Inp>
                <input
                  type={"date"}
                  id='dueDate'
                  placeholder={"截止日期"}
                  name='dueDate'
                  value={obj.dueDate}
                  onChange={getMainData()}
                />
              </Inp>
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
                placeholder={"数量"}
                name='quantity'
                value={obj.quantity}
                onChange={getMainData()}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='description'>优先级:</label>
            <div className='item_item'>
              <input
                type='text'
                id='priority'
                placeholder='优先级'
                name='priority'
                value={obj.priority}
                onChange={getMainData()}
              />
              <span>越大越优先</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='cost'>状态:</label>
            <div className='item_item'>
              <select name='location' id='location' defaultValue={"open"}>
                <option value='-'>------</option>
                <option value='inquiry'>查询</option>
                <option value='quote'>报价</option>
                <option value='open'>开放</option>
                <option value='closed'>已结束</option>
                <option value='canceled'>已取消</option>
              </select>
              <span>需求的状态。只有 "开发"的需求才会有做计划</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='name' id='NM'>
              外部ID（可选）:
            </label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='name'
                placeholder='外部ID（可选）'
                name='name'
                value={obj.name}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
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
        <Customers Select={Select2} setOpen={setOpen2} />
      </Drawer>
      <Drawer show={open3} onClosure={() => setOpen3(false)}>
        <Locations Select={Select3} setOpen={setOpen3} />
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
    .dateClass {
      display: inline;
      position: relative;
      #date {
        border: none;
        outline: none;
        width: 0px;
        height: 0px;
        background: none;
        background-color: rgba(0, 0, 0, 0, 0);
        ::-webkit-calendar-picker-indicator {
          position: absolute;
          left: 0;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 1px;
          box-shadow: inset 0 1px #fff, 0 1px #eee;
          background-color: #eee;
          background-image: -webkit-linear-gradient(top, #f0f0f0, #e6e6e6);
        }
      }
    }

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
      /* width: 95%; */
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

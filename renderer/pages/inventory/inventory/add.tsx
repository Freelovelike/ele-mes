import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Search from "../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../components/dataType"
import { Drawer } from "../../../components/Drawer"
import { Locations } from "../../../components/Locations"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import { Products } from "../../../components/Products"
import {
  Item,
  Location,
  useCreateInventoryMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../../sales/product/add"

interface addProps {}
type ObjectType = {
  location: StruectType
  item: StruectType
  onHand: string
  minium: string
}

const add: NextPage<addProps> = () => {
  const initialData = {
    location: { id: 0, name: "" },
    item: { id: 0, name: "" },
    onHand: "0",
    minium: "0",
  }
  const router = useRouter()
  const [{ fetching: createItemFetching }, createItem] =
    useCreateInventoryMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
  useEffect(() => {
    console.log(obj)
  }, [obj])

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
    const { id, name } = data
    obj.item = { id, name }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { id, name } = data
    obj.location = { id, name }
    setObj({ ...obj })
  }
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.item || !!!obj.location) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      data: {
        Minimum: parseInt(obj.minium),
        itemId: +obj.item.id,
        locationId: +obj.location.id,
        onHand: parseInt(obj.onHand),
      },
    })
    if (result.data.createInventory.errors) {
      return error(result.data.createInventory.errors[0].message)
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(result?.data?.createInventory?.data?.id.toString())
        setObj(initialData)
        return
      }
      router.push({
        pathname: `/inventory/inventory/${result?.data?.createInventory?.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/inventory/inventory", query: {} })
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
          <span>库存</span>
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
            <label htmlFor='item' id='NM'>
              物料:
            </label>
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
            <label htmlFor='location' id='NM'>
              地点:
            </label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='location'
                  placeholder='地点'
                  name='location'
                  value={obj.location.name}
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
            <label htmlFor='onHand'>现有库存量:</label>
            <div className='item_item'>
              <input
                type='text'
                id='onHand'
                placeholder='现有库存量'
                name='onHand'
                value={obj.onHand}
                onChange={getMainData()}
              />
              <span>目前存货</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='minium'>安全库存:</label>
            <div className='item_item'>
              <input
                type='number'
                id='minium'
                placeholder='安全库存'
                name='minium'
                value={obj.minium}
                onChange={getMainData()}
              />
              <span>安全库存</span>
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

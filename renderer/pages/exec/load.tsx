import { NextPage } from "next"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Search from "../../assets/Image/leftSearch.svg"
import { StruectType } from "../../components/dataType"
import { Drawer } from "../../components/Drawer"
import { Locations } from "../../components/Locations"
import { Products } from "../../components/Products"
import { Item, Location, useExecMutation } from "../../src/generated/graphql"
import { Inp, Sea } from "../sales/product/add"

interface loadProps {}
type objType = {
  location: StruectType
  item: StruectType
  quantity: string
}
const load: NextPage<loadProps> = () => {
  const initialData = {
    location: { id: 0, name: "" },
    item: { id: 0, name: "" },
    quantity: "",
  }
  const [obj, setObj] = useState<objType>(initialData)

  const getMainData = (
    e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    obj[e.target.name] = e.target.value
    setObj({ ...obj })
  }
  const Select1 = (data: Item) => {
    const { name, id } = data
    obj.item = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { name, id } = data
    obj.location = { name, id }
    setObj({ ...obj })
  }
  const [{ fetching }, execFunc] = useExecMutation()
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [res, setResult] = useState<string>()
  useEffect(() => {
    if (obj.quantity || obj.item.name || obj.location.name) {
      return setIsCorrect(false)
    }
  }, [obj])
  const load = async () => {
    if (!!!obj.quantity || !!!obj.item.name || !!!obj.location.name) {
      return setIsCorrect(true)
    }
    const result = await execFunc({
      itemName: obj.item.name,
      locationName: obj.location.name,
      quantity: +obj.quantity,
    })
    setResult(JSON.stringify(["结果:", result?.data]))
  }
  return (
    <Container>
      <div className='Head'>
        <div className='title'>
          <h3>执行</h3>
        </div>
        <div className='btn'>
          <button id='loadBtn' onClick={!fetching ? load : null}>
            {!fetching ? "执行" : "正在执行..."}
          </button>
        </div>
        {isCorrect && <div className='incorrect'>请检查输入是否正确</div>}
        <div className='content'>
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
            <label htmlFor='quantity'>数量:</label>
            <div className='item_item'>
              <input
                type='number'
                id='quantity'
                placeholder='数量'
                name='quantity'
                value={obj.quantity}
                onChange={getMainData}
              />
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div>{res}</div>
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

export default load

const Container = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
  #loadBtn {
    border: 1px solid #ccc;
    outline: none;
    padding: 5px 8px;
    border-radius: 5px;
    :hover {
      background-color: #666;
      color: white;
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

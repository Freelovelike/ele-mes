import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styled from "styled-components"
import Search from "../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../components/dataType"
import Demands from "../../../components/Demands"
import { Drawer } from "../../../components/Drawer"
import { Operations } from "../../../components/Operations"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import { Resources } from "../../../components/Resources"
import { Works } from "../../../components/Works"
import {
  Demand,
  Operation,
  Resource,
  useCreateWorkMutation,
  Work,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../../sales/product/add"

interface addProps {}
type ObjectType = {
  name: string
  operation: StruectType
  quantity: string
  complete_quantity: string
  start_time: Date
  end_time: Date
  owner: StruectType
  status: string
  resource: StruectType
  demand: StruectType
}
const initialData = {
  name: "",
  operation: { id: 0, name: "" },
  quantity: "",
  complete_quantity: "",
  start_time: new Date(),
  end_time: new Date(),
  owner: { id: 0, name: "" },
  status: "",
  resource: { id: 0, name: "" },
  demand: { id: null, name: "" },
}
const add: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ fetching: createItemFetching }, createItem] = useCreateWorkMutation()
  const [obj, setObj] = useState<ObjectType>(initialData)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (typeof initialData[e.target.name] === "object") {
        return (obj[e.target.name]["name"] = e.target.value)
      }
      obj[e.target.name] = e.target.value.split("T").join(" ")
      setObj({ ...obj })
    }
  }
  const Select = (data: Operation) => {
    const { name, id } = data
    obj.operation = { name, id }
    setObj({ ...obj })
  }
  const Select1 = (data: Resource) => {
    const { name, id } = data
    obj.resource = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Work) => {
    const { name, id } = data
    obj.owner = { name, id }
    setObj({ ...obj })
  }
  const Select3 = (data: Demand) => {
    const { name, id } = data
    obj.demand = { name, id }
    setObj({ ...obj })
  }
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.name) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      data: {
        completedQuantity: parseInt(ob.complete_quantity),
        name: ob.name,
        operationId: ob.operation.id,
        ownerId: ob.owner.id,
        quantity: parseInt(ob.quantity),
        endDate: ob.end_time,
        startDate: ob.start_time,
        status: ob.status,
        resource: +ob.resource.id,
        demandId: +ob.demand.id,
      },
    })
    if (result?.data?.createWork?.errors) {
      error(result?.data?.createWork?.errors?.[0].message)
    } else {
      success("????????????")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/manufacturing/work/${result?.data?.createWork?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/manufacturing/work", query: {} })
      }
    }
  }
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`??????${objectName}???????????????????????????????????????`}</div>
        )}
        <div className='title'>
          <span>??????</span>
          <span>?????????</span>
        </div>
        <div className='btn'>
          <BlueBtn
            fetching={createItemFetching}
            content={"??????"}
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
        {isCorrect && <div className='incorrect'>???????????????????????????</div>}
        <div className='content'>
          <div className='item'>
            <label htmlFor='name' id='NM'>
              ??????:
            </label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='name'
                placeholder='??????'
                name='name'
                value={obj.name}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"??????????????????"}</span>
              ) : null}
              <span>???????????????</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='operation'>??????:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='operation'
                  placeholder='??????'
                  name='operation'
                  value={obj.operation.name}
                  onChange={getMainData()}
                />
                <Sea
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='resource'>????????????:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='resource'
                  placeholder='????????????'
                  name='resource'
                  value={obj.resource.name}
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
            <label htmlFor='quantity' id='NM'>
              ??????:
            </label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='quantity'
                placeholder='??????'
                name='quantity'
                value={obj.quantity}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"??????????????????"}</span>
              ) : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='complete_quantity'>????????????:</label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='complete_quantity'
                placeholder='????????????'
                name='complete_quantity'
                value={obj.complete_quantity}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"??????????????????"}</span>
              ) : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='start_time'>????????????:</label>
            <div className='item_item'>
              <input
                style={{ width: "202px" }}
                type='datetime-local'
                name='start_time'
                id='start_time'
                onChange={getMainData()}
              />
              <span>????????????</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='end_time'>????????????:</label>
            <div className='item_item'>
              <input
                style={{ width: "202px" }}
                type='datetime-local'
                name='end_time'
                id='end_time'
                onChange={getMainData()}
              />
              <span>????????????</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='owner'>?????????:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='owner'
                  placeholder='?????????'
                  name='owner'
                  value={obj.owner.name}
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
              <span>??????</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='unit'>??????:</label>
            <div className='item_item'>
              <select name='status' id='status' onChange={getMainData()}>
                <option value='-'>------</option>
                <option value='proposed'>??????</option>
                <option value='approved'>??????</option>
                <option value='confirmed'>??????</option>
                <option value='completed'>??????</option>
                <option value='closed'>??????</option>
              </select>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='demand'>??????????????????:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='demand'
                  placeholder='??????????????????'
                  name='demand'
                  value={obj.demand.name}
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
        </div>
      </div>
      <Drawer show={open} onClosure={() => setOpen(false)}>
        <Operations Select={Select} setOpen={setOpen} />
      </Drawer>
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Works Select={Select2} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Resources Select={Select1} setOpen={setOpen2} />
      </Drawer>
      <Drawer show={open3} onClosure={() => setOpen3(false)}>
        <Demands Select={Select3} setOpen={setOpen3} />
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

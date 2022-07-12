import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import Search from "../../../assets/Image/leftSearch.svg"
import { Drawer } from "../../../components/Drawer"
import { Items } from "../../../components/Items"
import { Locations } from "../../../components/Locations"
import { Operations } from "../../../components/Operations"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../components/PagePart/EditSave"
import {
  Item,
  Location,
  Operation,
  useCreateOperationMaterialMutation,
  useCreateOperationMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { Inp, Sea } from "../../sales/product/add"

interface addProps {}

const addLocation: NextPage<addProps> = () => {
  const router = useRouter()
  const initialData = {
    name: "",
    type: "",
    itemId: { id: 0, name: "" },
    durationPerUnit: "",
    duration: "",
    locationId: { id: 0, name: "" },
    ownerId: { id: 0, name: "" },
  }
  const [{ fetching: createLocationFetching }, createOperation] =
    useCreateOperationMutation()
  //获取收集主要的数据
  const [, createOpMl] = useCreateOperationMaterialMutation()
  const [obj, setObj] = useState(initialData)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = (e: any) => {
    if (typeof initialData[e.target.name] === "object") {
      return (obj[e.target.name]["name"] = e.target.value)
    }
    obj[e.target.name] = e.target.value
    setObj({ ...obj })
  }
  const Select = (data: Item) => {
    const { name, id } = data
    obj.itemId = { name, id }
    setObj({ ...obj })
  }
  const Select1 = (data: Location) => {
    const { name, id } = data
    obj.locationId = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Operation) => {
    const { name, id } = data
    obj.ownerId = { name, id }
    setObj({ ...obj })
  }
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  //创建方法
  const CreateItemFunc = async (
    ob: any,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.name) {
      return setIsCorrect(true)
    }
    const result = await createOperation({
      data: {
        name: ob.name.trim(),
        duration: +ob.duration,
        type: ob.type,
        durationPerUnit: +ob.durationPerUnit,
        locationId: +ob.locationId.id,
        ownerId: +ob.ownerId.id,
      },
    })

    if (result?.data?.createOperation?.data) {
      success("创建成功")
      await createOpMl({
        data: {
          priority: 0,
          itemId: +obj.itemId.id,
          operationId: result.data.createOperation.data.id,
          quantity: 1,
          type: "end",
        },
      })
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/manufacturing/operation/${result?.data?.createOperation?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/manufacturing/operation", query: {} })
      }
    } else {
      error(result.data?.createOperation.errors[0].message)
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
          <span>操作</span>
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
            <label htmlFor='locationId'>地点</label>
            <Inp>
              <input
                type='text'
                id='locationId'
                placeholder='地点'
                name='locationId'
                value={obj.locationId.name}
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
          </div>
          <div className='item'>
            <label htmlFor='itemId'>制成品:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='itemId'
                  placeholder='制成品'
                  name='itemId'
                  value={obj.itemId.name}
                  onChange={getMainData}
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
            <label htmlFor='type'>工序时间分类</label>
            <select
              id='type'
              className='item_item'
              name='type'
              onChange={getMainData}
              value={obj.type}
            >
              <option value='-----'>------</option>
              <option value='fixed_time'>固定时间</option>
              <option value='time_per'>单位时间</option>
            </select>
          </div>

          {obj.type === "fixed_time" ? (
            <div className='item'>
              <label htmlFor='duration'>持续时间(单位: 秒):</label>
              <div className='item_item'>
                <input
                  type='text'
                  id='duration'
                  placeholder='持续时间(例如：1)'
                  name='duration'
                  value={obj.duration}
                  onChange={getMainData}
                />
                <span>固定生产时间的设置和开销</span>
              </div>
            </div>
          ) : null}
          {obj.type === "time_per" ? (
            <div className='item'>
              <label htmlFor='durationPerUnit'>每单位持续时间(单位: 秒):</label>
              <div className='item_item'>
                <input
                  type='text'
                  id='durationPerUnit'
                  placeholder='每单位持续时间(例如：1)'
                  name='durationPerUnit'
                  value={obj.durationPerUnit}
                  onChange={getMainData}
                />
                <span>每件物料的生产时间</span>
              </div>
            </div>
          ) : null}
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
                onChange={getMainData}
              />
              <span>用于连接外部数据库</span>
            </div>
          </div>
        </div>
      </div>
      <Drawer show={open} onClosure={() => setOpen(false)}>
        <Items Select={Select} setOpen={setOpen} />
      </Drawer>
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Locations Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Operations Select={Select2} setOpen={setOpen2} />
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

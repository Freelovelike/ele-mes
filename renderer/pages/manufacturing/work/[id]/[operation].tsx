import moment from "moment"
import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../../components/dataType"
import Demands from "../../../../components/Demands"
import { Drawer } from "../../../../components/Drawer"
import { Operations } from "../../../../components/Operations"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Resources } from "../../../../components/Resources"
import { Container } from "../../../../components/styled/container"
import { Works } from "../../../../components/Works"
import {
  Demand,
  Operation,
  Resource,
  useDeleteworksMutation,
  useUpdateWorkMutation,
  useWorkQuery,
  Work,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type ObjectType = {
  name: string
  operation: StruectType
  quantity: string
  complete_quantity: string
  start_time: string
  end_time: string
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
  start_time: "",
  end_time: "",
  owner: { id: 0, name: "" },
  status: "",
  resource: { id: 0, name: "" },
  demand: { id: null, name: "" },
}
const add: NextPage<addProps> = () => {
  const router = useRouter()
  const [, deleteWork] = useDeleteworksMutation()
  const [{ fetching: createItemFetching }, createItem] = useUpdateWorkMutation()
  const [{ data: workDataFetch }] = useWorkQuery({
    variables: { workId: Number(router.query.id) },
  })
  const workData = workDataFetch?.work
  const [obj, setObj] = useState<ObjectType>(initialData)
  useEffect(() => {
    if (workDataFetch?.work) {
      setObj({
        resource: { id: workData.resource.id, name: workData.resource.name },
        name: workData.name,
        operation: { id: workData.operation.id, name: workData.operation.name },
        quantity: workData.quantity.toString(),
        complete_quantity: workData.completedQuantity.toString(),
        start_time: workData.startDate.toString(),
        end_time: workData.endDate.toString(),
        owner: { id: workData.owner?.id, name: workData.owner?.name },
        status: workData.status,
        demand: { id: workData.demand?.id, name: workData.demand?.name },
      })
    }
  }, [workDataFetch])
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
  const Select = (data: Operation) => {
    const { name, id } = data
    obj.operation = { name, id }
    setObj({ ...obj })
  }
  const Select1 = (data: Work) => {
    const { name, id } = data
    obj.owner = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Resource) => {
    const { name, id } = data
    obj.resource = { name, id }
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
      updateWorkId: parseInt(router.query.id as string),
      data: {
        resource: +ob.resource.id,
        completedQuantity: parseInt(ob.complete_quantity),
        name: ob.name,
        operationId: ob.operation.id,
        ownerId: ob.owner.id,
        quantity: parseInt(ob.quantity),
        endDate: ob.end_time,
        startDate: ob.start_time,
        status: ob.status,
        demandId: ob.demand.id,
      },
    })
    if (result?.data?.updateWork?.errors) {
      error(result?.data?.updateWork?.errors?.[0].message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initialData)
          return router.push({
            pathname: `/manufacturing/work/add`,
          })
        }
        router.push({
          pathname: `/manufacturing/work/${result?.data?.updateWork?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/manufacturing/work", query: {} })
      }
    }
  }
  const DeleteItemFunc = async () => {
    const result = await deleteWork({
      ids: [parseInt(router.query.id as string)],
    })
    if (result?.data?.deleteworks) {
      success("删除成功")
      router.push({ pathname: "/manufacturing/work", query: {} })
    }
  }
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>
            生产单{router.query.id}:{isDetail(router) ? "详情" : "编辑"}{" "}
          </span>
        </div>
        <Menu detailRouterPath='/' supplierRouterPath='/'></Menu>
        <div className='btnContainer'>
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
          <DelButton onClick={DeleteItemFunc}>删除</DelButton>
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
              <span>唯一标识符</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='operation'>操作:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='operation'
                  placeholder='操作'
                  name='operation'
                  value={obj.operation.name || "----"}
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
            <label htmlFor='resource'>生产资料:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='resource'
                  placeholder='生产资料'
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
              数量:
            </label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='quantity'
                placeholder='数量'
                name='quantity'
                value={obj.quantity}
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
            <label htmlFor='complete_quantity'>完成数量:</label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='complete_quantity'
                placeholder='完成数量'
                name='complete_quantity'
                value={obj.complete_quantity}
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
            <label htmlFor='start_time'>开始日期:</label>
            <div className='item_item'>
              <input
                style={{ width: "202px" }}
                type='datetime-local'
                name='start_time'
                id='start_time'
                value={moment(+obj.start_time).format("YYYY-MM-DDThh:mm")}
                onChange={getMainData()}
              />
              <span>开始日期</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='end_time'>结束日期:</label>
            <div className='item_item'>
              <input
                style={{ width: "202px" }}
                type='datetime-local'
                name='end_time'
                id='end_time'
                value={moment(+obj.end_time).format("YYYY-MM-DDThh:mm")}
                onChange={getMainData()}
              />
              <span>结束日期</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='owner'>拥有者:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='owner'
                  placeholder='拥有者'
                  name='owner'
                  value={obj.owner.name || "----"}
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
              <span>父类</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='unit'>状态:</label>
            <div className='item_item'>
              <select
                name='status'
                id='status'
                onChange={getMainData()}
                value={obj.status}
              >
                <option value='-'>------</option>
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
        <Works Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Resources Select={Select2} setOpen={setOpen2} />
      </Drawer>
      <Drawer show={open3} onClosure={() => setOpen3(false)}>
        <Demands Select={Select3} setOpen={setOpen3} />
      </Drawer>
    </Container>
  )
}

export default add

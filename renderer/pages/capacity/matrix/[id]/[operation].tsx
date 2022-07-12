import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../../components/dataType"
import { Drawer } from "../../../../components/Drawer"
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { Operations } from "../../../../components/Operations"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Resources } from "../../../../components/Resources"
import { Container } from "../../../../components/styled/container"
import {
  Operation,
  Resource,
  useDeletematrixsMutation,
  useMatrixQuery,
  useUpdateMatrixMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

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
  let initialData: ObjectType = {
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
  const [{ data: matrixData }] = useMatrixQuery({
    variables: { matrixId: +router.query.id || 0 },
  })
  const [{ fetching: createItemFetching }, createItem] =
    useUpdateMatrixMutation()
  const [, deleteMatrix] = useDeletematrixsMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
  useEffect(() => {
    if (matrixData?.matrix) {
      const Data = matrixData?.matrix
      initialData.Duration = Data.Duration.toString()
      initialData.cost = Data.cost.toString()
      initialData.fromId.id = Data.from.id
      initialData.fromId.name = Data.from.name
      initialData.name = Data.name
      initialData.priority = Data.priority.toString()
      initialData.toId.id = Data.to.id
      initialData.toId.name = Data.to.name
      initialData.resourceId = {
        id: Data.resource.id,
        name: Data.resource.name,
      }
      setObj(initialData)
    }
  }, [matrixData])
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
      updateMatrixId: +router.query.id,
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
    if (!result?.data?.updateMatrix?.data?.id) {
      error("不存在")
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/capacity/matrix/${result?.data?.updateMatrix?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/capacity/matrix" })
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
          <span>换线准备矩阵</span>
          <span>{router.query.id || 0} </span>
          <span>{isDetail(router) ? "详情" : "编辑"}：</span>
        </div>
        <Menu detailRouterPath='' supplierRouterPath=''></Menu>
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
          <DelButton
            onClick={() => {
              DeleteConfirm(async () => {
                const result = await deleteMatrix({ ids: [+router.query.id] })
                if (result?.data?.deletematrixs) {
                  router.push("/capacity/matrix")
                }
              })
            }}
          >
            删除
          </DelButton>
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
            <label htmlFor='priority'>priority:</label>
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
            <label htmlFor='Duration'>Duration:</label>
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

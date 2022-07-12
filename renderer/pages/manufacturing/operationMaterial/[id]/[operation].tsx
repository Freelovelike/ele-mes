import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../../components/dataType"
import { Drawer } from "../../../../components/Drawer"
import { Items } from "../../../../components/Items"
import { Operations } from "../../../../components/Operations"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Container } from "../../../../components/styled/container"
import {
  Item,
  Operation,
  useDeleteoperationMaterialsMutation,
  useOperationMaterialQuery,
  useUpdateOperationMaterialMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

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
const operation: NextPage<addProps> = () => {
  const router = useRouter()
  const [, deleteOperationMaterial] = useDeleteoperationMaterialsMutation()
  const [{ data: MaterialData }] = useOperationMaterialQuery({
    variables: { operationMaterialId: Number(router.query.id) },
  })
  const [{ fetching: createItemFetching }, createItem] =
    useUpdateOperationMaterialMutation()
  const [obj, setObj] = useState<ObjectType>(initialData)

  useEffect(() => {
    if (MaterialData?.operationMaterial) {
      setObj({
        priority: MaterialData.operationMaterial.priority.toString(),
        item: {
          id: MaterialData.operationMaterial.item.id,
          name: MaterialData.operationMaterial.item.name,
        },
        operation: {
          id: MaterialData.operationMaterial.operation.id,
          name: MaterialData.operationMaterial.operation.name,
        },
        quantity: MaterialData.operationMaterial.quantity.toString(),
        type: MaterialData.operationMaterial.type,
      })
    }
  }, [MaterialData])

  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
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
  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (typeof initialData[e.target.name] === "object") {
        return (obj[e.target.name]["name"] = e.target.value)
      }
      obj[e.target.name] = e.target.value
      setObj({ ...obj })
    }
  }
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.operation || !!!ob.item) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      updateOperationMaterialId: +router.query.id,
      data: {
        priority: +ob.priority,
        operationId: +ob.operation.id,
        itemId: +ob.item.id,
        type: ob.type,
        quantity: +ob.quantity,
      },
    })
    if (result?.data?.updateOperationMaterial?.errors) {
      return error(result?.data?.updateOperationMaterial?.errors?.[0].message)
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(
          result?.data?.updateOperationMaterial?.data?.id?.toString()
        )
        setObj(initialData)
        return router.push({
          pathname: `/manufacturing/operationMaterial/add`,
        })
      }
      router.push({
        pathname: `/manufacturing/operationMaterial/${result?.data?.updateOperationMaterial.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/manufacturing/operationMaterial", query: {} })
    }
  }
  const DeleteItem = async () => {
    const result = await deleteOperationMaterial({
      ids: [Number(router.query.id)],
    })
    if (result?.data?.deleteoperationMaterials) {
      success("删除成功")
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
          <span>物料清单 </span>
          <span>{MaterialData?.operationMaterial?.id}:</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
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
          <DelButton onClick={DeleteItem}>删除</DelButton>
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
                <option value='----'>----</option>
                <option value='开始'>原料</option>
                <option value='结束'>制成品</option>
                <option value='Batch transfer'>Batch transfer</option>
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

export default operation

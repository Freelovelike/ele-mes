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
  useDeleteoperationResourcesMutation,
  useOperationResourceQuery,
  useUpdateOperationResourceMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type ObjectType = {
  operation: StruectType
  resource: StruectType
  quantity: string
}
const initialData = {
  operation: { id: 0, name: "" },
  resource: { id: 0, name: "" },
  quantity: "1.0",
}
const operation: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ data: operationResourceData }] = useOperationResourceQuery({
    variables: { operationResourceId: +router.query.id || 0 },
  })
  const [{ fetching: createItemFetching }, createItem] =
    useUpdateOperationResourceMutation()
  const [obj, setObj] = useState<ObjectType>(initialData)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const Select1 = (data: Operation) => {
    const { name, id } = data
    obj.operation = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Resource) => {
    const { name, id } = data
    obj.resource = { name, id }
    setObj({ ...obj })
  }
  const [, deleteOperationResource] = useDeleteoperationResourcesMutation()
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
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.operation || !!!ob.resource) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      updateOperationResourceId: Number(router.query.id),
      data: {
        operationId: +ob.operation.id,
        resourceId: +ob.resource.id,
        quantity: +ob.quantity,
      },
    })
    if (result?.data?.updateOperationResource?.errors) {
      return error(result?.data?.updateOperationResource?.errors?.[0].message)
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(
          result?.data?.updateOperationResource?.data?.id?.toString()
        )
        setObj(initialData)
        return router.push({
          pathname: `/manufacturing/operationResource/add`,
        })
      }
      router.push({
        pathname: `/manufacturing/operationResource/${result?.data?.updateOperationResource?.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/manufacturing/operationResource", query: {} })
    }
  }
  const DeleteItemFunc = () => {
    DeleteConfirm(async () => {
      const result = await deleteOperationResource({ ids: [+router.query.id] })
      if (result?.data?.deleteoperationResources) {
        router.push("/manufacturing/operationResource")
      }
    })
  }
  useEffect(() => {
    if (operationResourceData?.operationResource) {
      obj.operation = {
        id: operationResourceData.operationResource?.operation?.id,
        name: operationResourceData.operationResource?.operation?.name,
      }
      obj.quantity =
        operationResourceData?.operationResource?.quantity.toString()
      obj.resource = {
        id: operationResourceData?.operationResource?.resource?.id,
        name: operationResourceData?.operationResource?.resource?.name,
      }
      setObj({ ...obj })
    }
  }, [operationResourceData?.operationResource])

  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>资源清单</span>
          <span>{operationResourceData?.operationResource?.id}</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        <Menu detailRouterPath='/' supplierRouterPath='/' />
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
            <label htmlFor='quantity'>所需生产资料数量:</label>
            <div className='item_item'>
              <input
                type='text'
                placeholder='所需生产资料数量'
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
        <Resources Select={Select2} setOpen={setOpen2} />
      </Drawer>
    </Container>
  )
}

export default operation

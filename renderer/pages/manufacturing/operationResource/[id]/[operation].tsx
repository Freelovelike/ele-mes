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
    success("????????????")
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
          <div className='correct'>{`??????${objectName}???????????????????????????????????????`}</div>
        )}
        <div className='title'>
          <span>????????????</span>
          <span>{operationResourceData?.operationResource?.id}</span>
          <span>{isDetail(router) ? "??????" : "??????"}</span>
        </div>
        <Menu detailRouterPath='/' supplierRouterPath='/' />
        <div className='btnContainer'>
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
          <DelButton onClick={DeleteItemFunc}>??????</DelButton>
        </div>

        {isCorrect && <div className='incorrect'>???????????????????????????</div>}
        <div className='content'>
          <div className='item'>
            <label htmlFor='operation'>????????????:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='operation'
                  placeholder='????????????'
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
            <label htmlFor='quantity'>????????????????????????:</label>
            <div className='item_item'>
              <input
                type='text'
                placeholder='????????????????????????'
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

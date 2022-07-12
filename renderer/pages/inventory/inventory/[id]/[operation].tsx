import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../../components/dataType"
import { Drawer } from "../../../../components/Drawer"
import { Locations } from "../../../../components/Locations"
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Products } from "../../../../components/Products"
import { Container } from "../../../../components/styled/container"
import {
  Item,
  Location,
  useDeleteinventorysMutation,
  useInventoryQuery,
  useUpdateInventoryMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type ObjectType = {
  location: StruectType
  item: StruectType
  onHand: string
  minium: string
}

const operation: NextPage<addProps> = () => {
  const initialData = {
    location: { id: 0, name: "" },
    item: { id: 0, name: "" },
    onHand: "0",
    minium: "0",
  }
  const router = useRouter()
  const [, deleteInvent] = useDeleteinventorysMutation()
  const [{ fetching: createItemFetching }, updateInventory] =
    useUpdateInventoryMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
  const [{ data: inventoryData }] = useInventoryQuery({
    variables: { inventoryId: parseFloat(router.query.id as string) || 0 },
  })
  useEffect(() => {
    if (inventoryData?.inventory) {
      const data = inventoryData.inventory
      const { id, name } = data.item
      obj.item.id = id
      obj.item.name = name
      obj.location.id = data.location.id
      obj.location.name = data.location.name
      obj.minium = data.Minimum.toString()
      obj.onHand = data.onHand.toString()
      setObj({ ...obj })
    }
  }, [inventoryData?.inventory])
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
    if (!!!ob.item || !!!ob.location) {
      return setIsCorrect(true)
    }
    const result = await updateInventory({
      updateInventoryId: +router.query.id,
      data: {
        Minimum: parseInt(ob.minium),
        itemId: +ob.item.id,
        locationId: +ob.location.id,
        onHand: parseInt(ob.onHand),
      },
    })
    if (result.data.updateInventory.errors) {
      return error(result.data.updateInventory.errors[0].message)
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(result?.data?.updateInventory?.data?.id.toString())
        setObj(initialData)
        return router.push({
          pathname: `/inventory/inventory/add`,
        })
      }
      router.push({
        pathname: `/inventory/inventory/${result?.data?.updateInventory?.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/inventory/inventory", query: {} })
    }
  }
  const DeleteItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteInvent({
        ids: [parseInt(router.query.id as string)],
      })
      if (result?.data?.deleteinventorys) {
        success("删除成功")
        router.push({ pathname: `/inventory/inventory` })
      }
    })
  }
  const Select1 = (data: Item) => {
    const { id, name } = data
    obj.item = { id, name }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { id, name } = data
    obj.item = { id, name }
    setObj({ ...obj })
  }
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>库存</span>
          <span>{inventoryData?.inventory?.id || 0}</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        {/* 跳转的路径，此处为测试 */}
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
          <DelButton onClick={DeleteItem}>删除</DelButton>
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
            <label htmlFor='onHand'>目前存货:</label>
            <div className='item_item'>
              <input
                type='text'
                id='onHand'
                defaultValue={inventoryData?.inventory?.onHand || 0}
                placeholder='现有库存量'
                name='onHand'
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
                defaultValue={inventoryData?.inventory?.Minimum || 0}
                name='minium'
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

export default operation

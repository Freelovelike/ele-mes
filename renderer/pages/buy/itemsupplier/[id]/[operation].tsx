import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../../components/dataType"
import { Drawer } from "../../../../components/Drawer"
import { Locations } from "../../../../components/Locations"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Products } from "../../../../components/Products"
import { Container } from "../../../../components/styled/container"
import { Supplier as SupplierC } from "../../../../components/Supplier"
import {
  Item,
  Location,
  Supplier,
  useDeleteitemSuppliersMutation,
  useItemSupplierQuery,
  useUpdateItemSupplierMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type ObjectType = {
  cost: string
  itemId: StruectType
  leadTime: string
  locationId: StruectType
  supplierId: StruectType
  priority: string
}

const add: NextPage<addProps> = () => {
  const initialData: ObjectType = {
    cost: "",
    itemId: { id: 0, name: "" },
    leadTime: "",
    locationId: { id: 0, name: "" },
    supplierId: { id: 0, name: "" },
    priority: "",
  }
  const router = useRouter()
  const [{ data: itemSupplierData }] = useItemSupplierQuery({
    variables: { itemSupplierId: +router.query.id || 0 },
  })
  const [{ fetching: createItemFetching }, createItem] =
    useUpdateItemSupplierMutation()
  const [, deleteItemSupplier] = useDeleteitemSuppliersMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
  useEffect(() => {
    if (itemSupplierData?.itemSupplier) {
      const Data = itemSupplierData?.itemSupplier
      initialData.cost = Data.cost.toString()
      initialData.itemId = { id: Data.item.id, name: Data.item.name }
      initialData.leadTime = Data.leadTime.toString()
      initialData.locationId = {
        id: Data.location.id,
        name: Data.location.name,
      }
      initialData.supplierId = {
        id: Data.supplier.id,
        name: Data.supplier.name,
      }
      setObj(initialData)
    }
  }, [itemSupplierData])

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
  const Select2 = (data: Supplier) => {
    const { name, id } = data
    obj.supplierId = { name, id }
    setObj({ ...obj })
  }
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const sty = isCorrect ? { border: "1px solid #ff6b84" } : {}
  const color = { color: "#ff6b84" }
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!!!ob.cost) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      updateItemSupplierId: +router.query.id,
      data: {
        priority: +ob.priority,
        cost: +ob.cost,
        itemId: +ob.itemId.id,
        leadTime: +ob.leadTime,
        locationId: +ob.locationId.id,
        supplierId: +ob.supplierId.id,
      },
    })
    if (result?.data?.updateItemSupplier?.errors) {
      error(result?.data?.updateItemSupplier?.errors[0]?.message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(result?.data?.updateItemSupplier?.data?.id.toString())
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/buy/itemsupplier/${result?.data?.updateItemSupplier?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/buy/itemsupplier", query: {} })
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
          <span>物料供应商{router.query.id}:</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
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
            onClick={async () => {
              const result = await deleteItemSupplier({
                ids: [+router.query.id],
              })
              if (result) {
                router.push("/buy/itemsupplier")
              }
            }}
          >
            删除
          </DelButton>
        </div>

        {isCorrect && <div className='incorrect'>请检查输入是否正确</div>}
        <div className='content'>
          <div className='item'>
            <label htmlFor='cost'>成本:</label>
            <div className='item_item'>
              <input
                style={sty}
                type='number'
                id='cost'
                placeholder='成本'
                name='cost'
                value={obj.cost}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? <span style={color}>{"此项为必填项"}</span> : null}
            </div>
          </div>
          {/* priority */}
          <div className='item'>
            <label htmlFor='priority'>优先值:</label>
            <div className='item_item'>
              <input
                style={sty}
                type='number'
                id='priority'
                placeholder='优先值越大越优先'
                name='priority'
                value={obj.priority}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? <span style={color}>{"此项为必填项"}</span> : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='leadTime'>送货所需时间(天):</label>
            <div className='item_item'>
              <input
                style={sty}
                type='number'
                id='leadTime'
                placeholder='送货所需时间(天)'
                name='leadTime'
                value={obj.leadTime}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData()}
              />
              {isCorrect ? <span style={color}>{"此项为必填项"}</span> : null}
            </div>
          </div>

          <div className='item'>
            <label htmlFor='itemId'>物料:</label>
            <div className='item_item'>
              <Inp>
                <input
                  style={sty}
                  type='text'
                  id='itemId'
                  placeholder='物料'
                  name='itemId'
                  value={obj.itemId.name}
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
              {isCorrect ? <span style={color}>{"此项为必填项"}</span> : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='owner'>收货地点:</label>
            <div className='item_item'>
              <Inp>
                <input
                  style={sty}
                  type='text'
                  id='locationId'
                  placeholder='收货地点'
                  name='locationId'
                  value={obj.locationId.name}
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
              {isCorrect ? <span style={color}>{"此项为必填项"}</span> : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='supplierId'>供应商:</label>
            <div className='item_item'>
              <Inp>
                <input
                  style={sty}
                  type='text'
                  id='supplierId'
                  placeholder='供应商'
                  name='supplierId'
                  value={obj.supplierId.name}
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
              {isCorrect ? <span style={color}>{"此项为必填项"}</span> : null}
            </div>
          </div>
        </div>
      </div>
      <Drawer show={open} onClosure={() => setOpen(false)}>
        <Products Select={Select} setOpen={setOpen} />
      </Drawer>
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Locations Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <SupplierC Select={Select2} setOpen={setOpen2} />
      </Drawer>
    </Container>
  )
}

export default add

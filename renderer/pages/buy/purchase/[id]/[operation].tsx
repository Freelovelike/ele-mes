import moment from "moment"
import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { StruectType } from "../../../../components/dataType"
import Demands from "../../../../components/Demands"
import { Drawer } from "../../../../components/Drawer"
import { Locations } from "../../../../components/Locations"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Products } from "../../../../components/Products"
import { Container } from "../../../../components/styled/container"
import { Supplier as SupplierC } from "../../../../components/Supplier"
import {
  Demand,
  Item,
  Location,
  Supplier,
  useCreatePurchaseMutation,
  usePurchaseQuery,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type inuptType = {
  OrderingDate: string
  ReceiptDate: string
  itemId: StruectType
  locationId: StruectType
  quantity: string
  referto: string
  status: string
  supplierId: StruectType
  demand: StruectType
}
const addLocation: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ data: purchaseData }] = usePurchaseQuery({
    variables: { purchaseId: +router.query.id || 0 },
  })
  const initailData: inuptType = {
    OrderingDate: new Date().toLocaleDateString(),
    ReceiptDate: new Date().toLocaleDateString(),
    itemId: { id: 0, name: "" },
    locationId: { id: 0, name: "" },
    quantity: "",
    referto: "",
    status: "",
    supplierId: { id: 0, name: "" },
    demand: { id: null, name: "" },
  }
  const [{ fetching: createLocationFetching }, CreateSupplier] =
    useCreatePurchaseMutation()
  const [open1, setOpen1] = useState<boolean>(false)
  const [open2, setOpen2] = useState<boolean>(false)
  const [open3, setOpen3] = useState<boolean>(false)
  const [open4, setOpen4] = useState(false)
  //获取收集主要的数据
  const [obj, setObj] = useState<inuptType>(initailData)

  useEffect(() => {
    if (purchaseData?.purchase) {
      const datas = purchaseData.purchase
      ;(obj.OrderingDate = datas.orderingDate.toString()),
        (obj.ReceiptDate = datas.receiptDate.toString()),
        (obj.itemId = { id: datas.item?.id, name: datas.item?.name })
      obj.locationId = { id: datas.location?.id, name: datas.location?.name }
      ;(obj.quantity = datas.quantity.toString()),
        (obj.referto = datas.name),
        (obj.status = datas.status),
        (obj.supplierId = {
          id: datas.supplier?.id,
          name: datas.supplier?.name,
        })
    }
    setObj({ ...obj })
  }, [purchaseData?.purchase])

  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (typeof initailData[e.target.name] === "object") {
      return (obj[e.target.name]["name"] = e.target.value)
    }
    obj[e.target.name] = e.target.value
    setObj({ ...obj })
  }
  const Select1 = (data: Item) => {
    const { id, name } = data
    obj.itemId = { id, name }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { id, name } = data
    obj.locationId = { id, name }
    setObj({ ...obj })
  }
  const Select3 = (data: Supplier) => {
    const { id, name } = data
    obj.supplierId = { id, name }
    setObj({ ...obj })
  }
  const Select4 = (data: Demand) => {
    const { name, id } = data
    obj.demand = { name, id }
    setObj({ ...obj })
  }

  //创建方法
  const CreateItemFunc = async (
    ob: inuptType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.referto) {
      return setIsCorrect(true)
    }
    const result = await CreateSupplier({
      data: {
        orderingDate: new Date(ob.OrderingDate),
        receiptDate: new Date(ob.ReceiptDate),
        itemId: +ob.itemId.id,
        locationId: +ob.locationId.id,
        quantity: +ob.quantity,
        name: ob.referto,
        status: ob.status,
        supplierId: +ob.supplierId.id,
        demandId: +ob.demand.id,
      },
    })
    if (result.error) {
      return console.log(result.error)
    }
    if (result?.data?.createPurchase?.data) {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.referto)
          setObj(initailData)
          return
        }
        router.push({
          pathname: `/buy/purchase/${result?.data?.createPurchase?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/buy/purchase", query: {} })
      }
    } else {
      error(result.data.createPurchase.errors[0].message)
    }
  }
  const Delete = () => {}
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>采购订单 {router.query.id}:</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        <Menu detailRouterPath='' supplierRouterPath=''></Menu>
        <div className='btnContainer'>
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
          <DelButton onClick={Delete}>删除</DelButton>
        </div>

        {isCorrect && <div className='incorrect'>请检查输入是否正确</div>}
        <div className='content'>
          <div className='item'>
            <label htmlFor='itemId'>物料:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='itemId'
                  placeholder='物料'
                  name='itemId'
                  value={obj.itemId.name || ""}
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
            <label htmlFor='locationId'>收货地点:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='locationId'
                  placeholder='收货地点'
                  name='locationId'
                  value={obj.locationId.name || ""}
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
            <label htmlFor='supplierId'>供应商:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='supplierId'
                  placeholder='供应商'
                  name='supplierId'
                  value={obj.supplierId.name || ""}
                  onChange={getMainData}
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
            <label htmlFor='quantity'>数量:</label>
            <div className='item_item'>
              <input
                type='text'
                id='quantity'
                placeholder='数量'
                name='quantity'
                value={obj.quantity}
                onChange={getMainData}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='OrderingDate'>orderingDate:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='OrderingDate'
                placeholder='orderingDate'
                name='OrderingDate'
                defaultValue={moment(obj.OrderingDate).format(
                  "YYYY-MM-DDThh:mm:ss"
                )}
                onChange={getMainData}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='ReceiptDate'>ReceiptDate:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='ReceiptDate'
                placeholder='ReceiptDate'
                name='ReceiptDate'
                defaultValue={moment(obj.ReceiptDate).format(
                  "YYYY-MM-DDThh:mm:ss"
                )}
                onChange={getMainData}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='status'>状态:</label>
            <div className='item_item'>
              <select
                name='status'
                id='status'
                value={obj.status}
                onChange={getMainData}
              >
                <option value='------'>------</option>
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
                  onChange={getMainData}
                />
                <Sea
                  onClick={() => {
                    setOpen4(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='referto' id='NM'>
              外部ID（可选）:
            </label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='referto'
                placeholder='外部ID（可选）'
                name='referto'
                value={obj.referto}
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
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Products Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Locations Select={Select2} setOpen={setOpen2} />
      </Drawer>
      <Drawer show={open3} onClosure={() => setOpen3(false)}>
        <SupplierC Select={Select3} setOpen={setOpen3} />
      </Drawer>
      <Drawer show={open4} onClosure={() => setOpen4(false)}>
        <Demands Select={Select4} setOpen={setOpen4} />
      </Drawer>
    </Container>
  )
}

export default addLocation

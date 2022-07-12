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
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Products } from "../../../../components/Products"
import { Container } from "../../../../components/styled/container"
import {
  Demand,
  Item,
  Location,
  useDeletedistributionOrdersMutation,
  useDistributionOrderQuery,
  useUpdateDistributionOrderMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type ObjectType = {
  name: string
  destinationId: StruectType
  itemId: StruectType
  originId: StruectType
  quantity: string
  receiptDate: string
  shippingDate: string
  status: string
  demand: StruectType
}

const operation: NextPage<addProps> = () => {
  const router = useRouter()
  const initialData = {
    name: "",
    destinationId: { id: 0, name: "" },
    itemId: { id: 0, name: "" },
    originId: { id: 0, name: "" },
    quantity: "",
    receiptDate: "",
    shippingDate: "",
    status: "",
    demand: { id: null, name: "" },
  }
  const [{ data: distributionData }] = useDistributionOrderQuery({
    variables: { distributionOrderId: +router.query.id || 0 },
  })
  const [, deleteDis] = useDeletedistributionOrdersMutation()
  const [{ fetching: createItemFetching }, updateDistributionOrder] =
    useUpdateDistributionOrderMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
  useEffect(() => {
    if (distributionData?.distributionOrder) {
      setObj({
        destinationId: {
          id: distributionData?.distributionOrder?.destination.id,
          name: distributionData?.distributionOrder?.destination.name,
        },
        itemId: {
          id: distributionData?.distributionOrder?.item?.id,
          name: distributionData?.distributionOrder?.item?.name,
        },
        name: distributionData?.distributionOrder?.name,
        originId: {
          id: distributionData?.distributionOrder?.origin?.id,
          name: distributionData?.distributionOrder?.origin?.name,
        },
        quantity: distributionData?.distributionOrder?.quantity.toString(),
        receiptDate: moment(
          distributionData?.distributionOrder?.receiptDate
        ).format("YYYY-MM-DDTHH:mm:ss"),
        shippingDate: moment(
          distributionData?.distributionOrder?.shippingDate
        ).format("YYYY-MM-DDTHH:mm:ss"),
        status: distributionData?.distributionOrder?.status,
        demand: {
          id: distributionData?.distributionOrder?.demand?.id,
          name: distributionData?.distributionOrder?.demand?.name,
        },
      })
    }
  }, [distributionData?.distributionOrder])

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
    if (!!!ob.itemId || !!!ob.destinationId || !!!ob.name) {
      return setIsCorrect(true)
    }
    const result = await updateDistributionOrder({
      updateDistributionOrderId: +router.query.id,
      data: {
        destinationId: +ob.destinationId.id,
        itemId: +ob.itemId.id,
        name: ob.name,
        originId: +ob.originId.id,
        quantity: +ob.quantity,
        receiptDate: new Date(ob.receiptDate).getTime(),
        shippingDate: new Date(ob.shippingDate).getTime(),
        status: ob.status,
        demandId: +ob.demand.id,
      },
    })
    if (!result.data.updateDistributionOrder.data.id) {
      return error("创建失败！")
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(
          result?.data?.updateDistributionOrder?.data?.id.toString()
        )
        setObj({} as ObjectType)
        return router.push({
          pathname: "/inventory/distributionorder/add",
        })
      }
      router.push({
        pathname: `/inventory/distributionorder/${result?.data?.updateDistributionOrder?.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/inventory/distributionorder", query: {} })
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteDis({ ids: [+router.query.id] })
      if (result.data?.deletedistributionOrders) {
        success("删除成功")
        router.push({ pathname: "/inventory/distributionorder", query: {} })
      }
    })
  }

  const Select1 = (data: Item) => {
    const { name, id } = data
    obj.itemId = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { name, id } = data
    obj.originId = { name, id }
    setObj({ ...obj })
  }
  const Select3 = (data: Location) => {
    const { name, id } = data
    obj.destinationId = { name, id }
    setObj({ ...obj })
  }
  const Select4 = (data: Demand) => {
    const { name, id } = data
    obj.demand = { name, id }
    setObj({ ...obj })
  }

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>物料配送 </span>
          <span>{distributionData?.distributionOrder?.name}:</span>
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
          <DelButton onClick={DelItem}>删除</DelButton>
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
                  value={obj.itemId.name}
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
            <label htmlFor='originId'>出发地:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='originId'
                  placeholder='出发地'
                  name='originId'
                  value={obj.originId.name}
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
            <label htmlFor='destinationId'>目的地:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='destinationId'
                  placeholder='目的地'
                  name='destinationId'
                  value={obj.destinationId.name}
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
            <label htmlFor='quantity' id='NM'>
              数量:
            </label>
            <div className='item_item'>
              <input
                type='text'
                id='quantity'
                placeholder='数量'
                name='quantity'
                value={obj.quantity}
                onChange={getMainData()}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='shippingDate'>发货日期:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='shippingDate'
                placeholder='shippingDate'
                name='shippingDate'
                value={obj.shippingDate}
                onChange={getMainData()}
              />
            </div>
          </div>
          <div className='item'>
            <label htmlFor='receiptDate'>收货日期:</label>
            <div className='item_item'>
              <input
                type='datetime-local'
                id='receiptDate'
                placeholder='receiptDate'
                name='receiptDate'
                value={obj.receiptDate}
                onChange={getMainData()}
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
                onChange={getMainData()}
              >
                <option value='---'>------</option>
                <option value='proposed'>提议的</option>
                <option value='approved'>经核准的</option>
                <option value='confirmed'>已确定</option>
                <option value='completed'>completed</option>
                <option value='closed'>已结束</option>
              </select>
              <span>订单状态</span>
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
                    setOpen4(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='name' id='NM'>
              外部ID（可选）:
            </label>
            <div className='item_item'>
              <input
                type='text'
                id='name'
                placeholder='外部ID（可选）'
                name='name'
                value={obj.name}
                onChange={getMainData()}
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
        <Locations Select={Select3} setOpen={setOpen3} />
      </Drawer>
      <Drawer show={open4} onClosure={() => setOpen4(false)}>
        <Demands Select={Select4} setOpen={setOpen4} />
      </Drawer>
    </Container>
  )
}

export default operation

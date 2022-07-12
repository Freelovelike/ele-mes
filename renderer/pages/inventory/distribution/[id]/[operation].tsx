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
  useDeletedistributionsMutation,
  useDistributionQuery,
  useUpdateDistributionMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type ObjectType = {
  item: StruectType
  location: StruectType
  desLocation: StruectType
  Date: string
  priority: string
}

const add: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ data: distributionData }] = useDistributionQuery({
    variables: { distributionId: +router.query.id || 0 },
  })
  const [, deleteDis] = useDeletedistributionsMutation()
  const [{ fetching: createItemFetching }, createItem] =
    useUpdateDistributionMutation()
  //获取收集主要的数据
  const initialData = {
    item: { id: 0, name: "" },
    location: { id: 0, name: "" },
    desLocation: { id: 0, name: "" },
    Date: "",
    priority: "",
  }
  const [obj, setObj] = useState<ObjectType>(initialData)
  const Select1 = (data: Item) => {
    const { name, id } = data
    obj.item = { name, id }
    setObj({ ...obj })
  }
  const Select2 = (data: Location) => {
    const { name, id } = data
    obj.location = { name, id }
    setObj({ ...obj })
  }
  const Select3 = (data: Location) => {
    const { name, id } = data
    obj.desLocation = { name, id }
    setObj({ ...obj })
  }

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  useEffect(() => {
    if (distributionData?.distribution) {
      setObj({
        Date: distributionData?.distribution?.leadTime.toString(),
        desLocation: {
          id: distributionData?.distribution?.location?.id,
          name: distributionData?.distribution?.location?.name,
        },
        item: {
          id: distributionData?.distribution?.item.id,
          name: distributionData?.distribution?.item.name,
        },
        location: {
          id: distributionData?.distribution?.origin?.id,
          name: distributionData?.distribution?.origin?.name,
        },
        priority: distributionData?.distribution?.priority.toString(),
      })
    }
  }, [distributionData?.distribution])

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
    if (!!!ob.item || !!!ob.location || !!!ob.desLocation) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      updateDistributionId: parseInt(router.query.id as string),
      data: {
        priority: +ob.priority,
        itemId: ob.item.id,
        leadTime: parseInt(ob.Date),
        locationId: ob.location.id,
        originId: ob.desLocation.id,
      },
    })
    if (!result.data.updateDistribution.data.id) {
      return error("创建失败！")
    }
    success("创建成功")
    if (other) {
      if (other === "saveAndCreate") {
        setObjectName(result?.data?.updateDistribution?.data?.id.toString())
        setObj({} as ObjectType)
        return router.push({
          pathname: "/inventory/distribution/add",
        })
      }
      router.push({
        pathname: `/inventory/distribution/${result?.data?.updateDistribution?.data?.id}/change`,
      })
    } else {
      router.push({ pathname: "/inventory/distribution", query: {} })
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteDis({ ids: [+router.query.id] })
      if (result.data?.deletedistributions) {
        success("删除成功")
        router.push({ pathname: "/inventory/distribution", query: {} })
      }
    })
  }
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>物料配送 </span>
          <span>{distributionData?.distribution?.id}:</span>
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
            <label htmlFor='item' id='NM'>
              对象:
            </label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='item'
                  placeholder='对象'
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
              <span>Destination location to be replenished</span>
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='desLocation' id='NM'>
              转出地点:
            </label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='desLocation'
                  placeholder='转出地点'
                  name='desLocation'
                  value={obj.desLocation.name}
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
              <span>Destination location to be replenished</span>
              {isCorrect ? (
                <span style={{ color: "#ff6b84" }}>{"此项为必填项"}</span>
              ) : null}
            </div>
          </div>
          <div className='item'>
            <label htmlFor='Date'>交货提前期:</label>
            <div className='item_item'>
              <input
                type='text'
                id='Date'
                placeholder='交货提前期'
                name='Date'
                value={obj.Date}
                onChange={getMainData()}
              />
              <span>Transport lead time</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='priority'>优先值:</label>
            <div className='item_item'>
              <input
                type='text'
                id='priority'
                placeholder='优先值'
                name='priority'
                value={obj.priority}
                onChange={getMainData()}
              />
              <span>0-10优先值越小越高</span>
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
    </Container>
  )
}

export default add

import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { Calendars } from "../../../../components/Calendars"
import { StruectType } from "../../../../components/dataType"
import { Drawer } from "../../../../components/Drawer"
import { Locations } from "../../../../components/Locations"
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Resources } from "../../../../components/Resources"
import { Container } from "../../../../components/styled/container"
import {
  CalendarBucket,
  Location,
  Resource,
  useDeleteresourcesMutation,
  useResourceQuery,
  useUpdateResourceMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}
type ObjectType = {
  name: string
  location: StruectType
  maximum: number
  calendarId: StruectType
  ownerId: StruectType
}

const add: NextPage<addProps> = () => {
  const initData: ObjectType = {
    name: "",
    maximum: 0,
    location: { id: 0, name: "" },
    calendarId: { id: 0, name: "" },
    ownerId: { id: 0, name: "" },
  }
  const router = useRouter()
  const [, deleteResource] = useDeleteresourcesMutation()
  const [{ data: resourceData }] = useResourceQuery({
    variables: { resourceId: +router.query.id || 0 },
  })
  const [{ fetching: createItemFetching }, createItem] =
    useUpdateResourceMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initData)
  useEffect(() => {
    if (resourceData?.resource) {
      console.log(resourceData?.resource)
      setObj({
        name: resourceData.resource.name,
        maximum: resourceData.resource.maximum,
        location: {
          id: resourceData.resource.location?.id,
          name: resourceData.resource.location?.name,
        },
        calendarId: {
          id: resourceData.resource.calendarBucket?.id,
          name: resourceData.resource.calendarBucket?.name,
        },
        ownerId: {
          id: resourceData.resource.owner?.id || 0,
          name: resourceData.resource.owner?.name,
        },
      })
    }
  }, [resourceData])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof initData[e.target.name] === "object") {
        return (obj[e.target.name]["name"] = e.target.value)
      }
      obj[e.target.name] = e.target.value
      setObj({ ...obj })
    }
  }
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const Select1 = (data: Location) => {
    const { id, name } = data
    obj.location = { id, name }
    setObj({ ...obj })
  }
  const Select2 = (data: CalendarBucket) => {
    const { id, name } = data
    obj.calendarId = { id, name }
    setObj({ ...obj })
  }
  const Select3 = (data: Resource) => {
    const { id, name } = data
    obj.ownerId = { id, name }
    setObj({ ...obj })
  }
  //创建方法
  const CreateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!ob.name) {
      return setIsCorrect(true)
    }
    const result = await createItem({
      updateResourceId: +router.query.id,
      data: {
        calendarBucketId: +ob.calendarId.id, //标志，原本是calendarId
        locationId: +obj.location.id,
        name: ob.name.trim(),
        maximum: +obj.maximum,
        ownerId: +obj.ownerId.id,
      },
    })
    if (result?.data?.updateResource?.errors) {
      error(result?.data?.updateResource?.errors?.[0].message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initData)
          return
        }
        router.push({
          pathname: `/capacity/resource/${result?.data?.updateResource?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/capacity/resource", query: {} })
      }
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteResource({ ids: [+router.query.id] })
      if (result.data?.deleteresources) {
        return router.push("/capacity/resource")
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
          <span>生产资料 </span>
          <span>{resourceData?.resource?.name}:</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        {/* 这里 detailRouterPath 和 supplierRouterPath 是需要跳转的路径，暂时没有*/}
        <Menu
          detailRouterPath={`/capacity/resource/${router.query.id}`}
          supplierRouterPath={`/supplypath/resource/${resourceData?.resource?.name}`}
        />
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
          <div>
            <DelButton onClick={DelItem}>删除</DelButton>
          </div>
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
                value={obj.name || ""}
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
            <label htmlFor='location'>地点:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='location'
                  placeholder='地点'
                  name='location'
                  value={obj.location.name || ""}
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
            <label htmlFor='maximum'>最大值:</label>
            <div className='item_item'>
              <input
                type='number'
                id='maximum'
                name='maximum'
                value={obj.maximum || 0}
                onChange={getMainData()}
              />
              <span>资源量</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='maximum'>CalendarId:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='string'
                  id='calendarId'
                  name='calendarId'
                  value={obj.calendarId.name || ""}
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
              <span>calendar</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='ownerId'>拥有者:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='ownerId'
                  placeholder='拥有者'
                  name='ownerId'
                  value={obj.ownerId.name || ""}
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
              <span>父类</span>
            </div>
          </div>
        </div>
      </div>
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Locations Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Calendars Select={Select2} setOpen={setOpen2} />
      </Drawer>
      <Drawer show={open3} onClosure={() => setOpen3(false)}>
        <Resources Select={Select3} setOpen={setOpen3} />
      </Drawer>
    </Container>
  )
}

export default add

import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Container } from "../../../../components/styled/container"
import {
  useDeletelocationsMutation,
  useLocationQuery,
  useUpdateLocationMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"

interface addProps {}
type ObjectType = {
  name: string
  description: string
}

const changeLocation: NextPage<addProps> = () => {
  const router = useRouter()
  const [, deleteLocation] = useDeletelocationsMutation()
  const [{ data }] = useLocationQuery({
    variables: { locationId: parseFloat(router.query.id as string) || 0 },
  })
  const [{ fetching: updateLocationFetching }, updateLocation] =
    useUpdateLocationMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>({
    name: "",
    description: "",
  })
  useEffect(() => {
    if (data?.location) {
      setObj({
        name: data.location.name,
        description: data.location.description,
      })
    }
  }, [data])
  const [open, setOpen] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      obj[e.target.name] = e.target.value
      setObj({ ...obj })
    }
  }
  //创建方法
  const updateItemFunc = async (
    ob: ObjectType,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.name) {
      return setIsCorrect(true)
    }
    const result = await updateLocation({
      data: { description: ob.description, name: ob.name.trim() },
      updateLocationId: parseInt(router.query.id as string),
    })
    if (result.data.updateLocation.errors) {
      error(result.data.updateLocation.errors[0].message)
    } else {
      success("更新成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObj({
            name: "",
            description: "",
          })
          return router.push({ pathname: "/sales/location/add", query: {} })
        }
        setObjectName(obj.name)
        router.push({
          pathname: `/sales/location/${router.query.id as string}/change`,
          query: {},
        })
      } else {
        router.push({ pathname: "/sales/location" })
      }
    }
  }
  const DeleteItemFunc = () => {
    DeleteConfirm(async () => {
      const result = await deleteLocation({
        ids: [parseInt(router.query.id as string)],
      })
      if (result.data?.deletelocations) {
        success("删除成功")
        router.push({ pathname: "/sales/location" })
      }
    })
  }
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续编辑对象。`}</div>
        )}
        <div className='title'>
          <span>位置</span>
          <span>{data?.location?.name || "加载中..."} :</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        <Menu detailRouterPath='/' supplierRouterPath='/'></Menu>
        <div className='btnContainer'>
          <div className='btn'>
            <BlueBtn
              fetching={updateLocationFetching}
              content={"保存"}
              canClick={true}
              onClick={() => updateItemFunc(obj)}
            />
            <EditSave
              addMore={true}
              onClick={() => updateItemFunc(obj, "saveAndCreate")}
            />
            <EditSave
              addMore={false}
              onClick={() => updateItemFunc(obj, "saveAndContinueEdit")}
            />
          </div>
          <DelButton onClick={DeleteItemFunc}>删除</DelButton>
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
              <span>唯一标识符</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='description'>描述:</label>
            <div className='item_item'>
              <input
                type='text'
                id='description'
                placeholder='描述'
                name='description'
                value={obj.description}
                onChange={getMainData()}
              />
            </div>
          </div>
          {/* <div className='item'>
            <label htmlFor='owner'>拥有者:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='owner'
                  placeholder='拥有者'
                  name='owner'
                  value={obj.owner}
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
              <span>父类</span>
            </div>
          </div> */}
        </div>
      </div>
      {/* <Drawer show={open} onClosure={() => setOpen(false)}>
        <Locations Select={Select} setOpen={setOpen}></Locations>
      </Drawer> */}
    </Container>
  )
}

export default changeLocation

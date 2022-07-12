import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Search from "../../../../assets/Image/leftSearch.svg"
import { Drawer } from "../../../../components/Drawer"
import { Items } from "../../../../components/Items"
import { Locations as Loc } from "../../../../components/Locations"
import { Operations } from "../../../../components/Operations" //Locations
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Container } from "../../../../components/styled/container"
import {
  Item,
  Location,
  Operation,
  useDeleteoperationsMutation,
  useOperationQuery,
  useUpdateOperationMaterialMutation,
  useUpdateOperationMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"
import { Inp, Sea } from "../../../sales/product/add"

interface addProps {}

const operationDetail: NextPage<addProps> = () => {
  const router = useRouter()
  const Id = router.query.id as string
  const [{ data: operationData }] = useOperationQuery({
    variables: { operationId: +Id || 0 },
  })
  const [, deleteOperation] = useDeleteoperationsMutation()
  const [{ fetching: createLocationFetching }, updateOperation] =
    useUpdateOperationMutation()
  const [, updateMaterial] = useUpdateOperationMaterialMutation()
  //获取收集主要的数据
  const initialData = {
    name: "",
    type: "",
    itemId: { id: 0, name: "" },
    durationPerUnit: "",
    duration: "",
    locationId: { id: 0, name: "" },
    ownerId: { id: 0, name: "" },
  }
  const [obj, setObj] = useState(initialData)
  useEffect(() => {
    if (operationData?.operation) {
      const item = operationData.operation.operationMaterials.filter(
        (item) => item.type === "end"
      )
      setObj({
        name: operationData.operation.name,
        type: operationData.operation.type,
        durationPerUnit: operationData.operation.durationPerUnit.toString(),
        duration: operationData.operation.duration.toString(),
        locationId: {
          id: operationData.operation.location.id,
          name: operationData.operation.location.name,
        },
        ownerId: {
          id: operationData.operation.owner?.id || undefined,
          name: operationData.operation.owner?.name || "",
        },
        itemId: { id: item[0].item.id, name: item[0].item.name },
      })
    }
  }, [operationData])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = (e: any) => {
    if (typeof initialData[e.target.name] === "object") {
      return (obj[e.target.name]["name"] = e.target.value)
    }
    obj[e.target.name] = e.target.value
    setObj({ ...obj })
  }
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
  const Select2 = (data: Operation) => {
    const { name, id } = data
    obj.ownerId = { name, id }
    setObj({ ...obj })
  }
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  //创建方法
  const CreateItemFunc = async (
    ob: any,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.name) {
      return setIsCorrect(true)
    }
    const result = await updateOperation({
      updateOperationId: +Id,
      data: {
        name: ob.name.trim(),
        duration: +ob.duration,
        type: ob.type,
        durationPerUnit: +ob.durationPerUnit,
        locationId: +ob.locationId.id,
        ownerId: +ob.ownerId.id,
      },
    })
    const modifyMaterial = await updateMaterial({
      updateOperationMaterialId:
        operationData?.operation?.operationMaterials?.[0].id,
      data: {
        priority: operationData?.operation?.operationMaterials?.[0].priority,
        itemId: +ob.itemId.id,
        operationId: +Id,
        quantity: operationData?.operation?.operationMaterials?.[0].quantity,
        type: operationData?.operation?.operationMaterials?.[0].type,
      },
    })
    if (
      result?.data?.updateOperation?.data &&
      modifyMaterial?.data?.updateOperationMaterial?.data?.id
    ) {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj(initialData)
          return
        }
        router.push({
          pathname: `/manufacturing/operation/${result?.data?.updateOperation?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/manufacturing/operation" })
      }
    } else {
      error(result?.data?.updateOperation?.errors[0].message)
    }
  }
  const DeleteItem = async () => {
    const result = await deleteOperation({ ids: [+Id] })
    if (result?.data?.deleteoperations) {
      router.push("/manufacturing/operation")
    }
  }
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>操作 {router.query.id} :</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        {operationData && operationData.operation ? (
          <Menu
            detailRouterPath={`/manufacturing/operation/${Id}/detail`}
            supplierRouterPath={`/supplypath/operation/${operationData?.operation?.name}`}
          />
        ) : null}

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
          <DelButton onClick={DeleteItem}>删除</DelButton>
        </div>

        {isCorrect && <div className='incorrect'>请检查输入是否正确</div>}
        <div className='content'>
          <div className='item'>
            <label htmlFor='type'>类型</label>
            <select
              id='type'
              className='item_item'
              name='type'
              value={obj.type}
              onChange={getMainData}
            >
              <option value='fixed_time'>固定时间</option>
              <option value='time_per'>单位时间</option>
              <option value='routing'>串联工序(顺序号)</option>
              <option value='alternate'>备用工序(优先级)</option>
              <option value='split'>并联工序(%)</option>
              <option value='purchase'>购买</option>
              <option value='transport'>运输</option>
            </select>
          </div>
          <div className='item'>
            <label htmlFor='itemId'>对象:</label>
            <div className='item_item'>
              <Inp>
                <input
                  type='text'
                  id='itemId'
                  placeholder='对象'
                  name='itemId'
                  value={obj.itemId.name}
                  onChange={getMainData}
                />
                <Sea
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  <Image src={Search} layout='fill' quality={100} />
                </Sea>
              </Inp>
              <span>此操作产生的项目</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='locationId'>地点</label>
            <Inp>
              <input
                type='text'
                id='locationId'
                placeholder='地点'
                name='locationId'
                value={obj.locationId.name}
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
          </div>
          <div className='item'>
            <label htmlFor='duration'>持续时间(单位:秒):</label>
            <div className='item_item'>
              <input
                disabled={!(obj.type === "fixed_time")}
                type='text'
                id='duration'
                placeholder='持续时间'
                name='duration'
                value={obj.duration}
                onChange={getMainData}
              />
              <span>固定生产时间的设置和开销</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='durationPerUnit'>每单位持续时间(单位:秒):</label>
            <div className='item_item'>
              <input
                disabled={!(obj.type === "time_per")}
                type='text'
                id='durationPerUnit'
                placeholder='每单位持续时间'
                name='durationPerUnit'
                value={obj.durationPerUnit}
                onChange={getMainData}
              />
              <span>每件物料的生产时间</span>
            </div>
          </div>
          <div className='item'>
            <label htmlFor='name' id='NM'>
              外部ID（可选）:
            </label>
            <div className='item_item'>
              <input
                style={isCorrect ? { border: "1px solid #ff6b84" } : {}}
                type='text'
                id='name'
                placeholder='外部ID（可选）'
                name='name'
                value={obj.name}
                onBlur={(e) => {
                  !!e.target.value.trim() && setIsCorrect(false)
                }}
                onChange={getMainData}
              />
              <span>用于连接外部数据库</span>
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
                  value={obj.ownerId.name}
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
              <span>父操作（必须是串联、并联或备选类型）</span>
            </div>
          </div> */}
        </div>
      </div>
      <Drawer show={open} onClosure={() => setOpen(false)}>
        <Items Select={Select} setOpen={setOpen} />
      </Drawer>
      <Drawer show={open1} onClosure={() => setOpen1(false)}>
        <Loc Select={Select1} setOpen={setOpen1} />
      </Drawer>
      <Drawer show={open2} onClosure={() => setOpen2(false)}>
        <Operations Select={Select2} setOpen={setOpen2} />
      </Drawer>
    </Container>
  )
}

export default operationDetail

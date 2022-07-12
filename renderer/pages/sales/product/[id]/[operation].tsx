import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Container } from "../../../../components/styled/container"
import {
  useDeleteitemsMutation,
  useItemQuery,
  useUpdateItemMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"

interface addProps {}
type ObjectType = {
  name: string
  description: string
}

const detail: NextPage<addProps> = () => {
  const initialData = {
    name: "",
    description: "",
  }
  const router = useRouter()
  const [, deleteItem] = useDeleteitemsMutation()
  const [{ data }] = useItemQuery({
    variables: { itemId: parseFloat(router.query.id as string) || 0 },
  })
  const [open, setOpen] = useState(false)
  const [{ fetching: createItemFetching }, createItem] = useUpdateItemMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initialData)
  useEffect(() => {
    if (data?.item) {
      setObj({
        name: data.item.name,
        description: data.item.description,
      })
    }
  }, [data])

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
    const result = await createItem({
      data: { description: ob.description, name: ob.name.trim() },
      updateItemId: parseInt(router.query.id as string),
    })
    if (result.data.updateItem.errors) {
      error(result.data.updateItem.errors[0].message)
    } else {
      success("更新成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObj({
            name: "",
            description: "",
          })
          return router.push({ pathname: "/sales/product/add", query: {} })
        }
        setObjectName(obj.name)
        router.push({
          pathname: `/sales/product/${router.query.id}/change`,
          query: {},
        })
      } else {
        router.push({ pathname: "/sales/product" })
      }
    }
  }
  const DeleteItemFunc = () => {
    DeleteConfirm(async () => {
      const result = await deleteItem({
        ids: [parseInt(router.query.id as string)],
      })
      if (result.data?.deleteitems) {
        success("删除成功")
        router.push({ pathname: "/sales/product" })
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
          <span>对象</span>
          <span>{data?.item?.name || "加载中..."}</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        <Menu
          detailRouterPath={`/sales/product/${router.query.id}/detail`}
          supplierRouterPath={`/supplypath/item/${data?.item?.name}`}
        />
        <div className='btnContainer'>
          <div className='btn'>
            <BlueBtn
              fetching={createItemFetching}
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
        <Products Select={Select} setOpen={setOpen} />
      </Drawer> */}
    </Container>
  )
}
export default detail

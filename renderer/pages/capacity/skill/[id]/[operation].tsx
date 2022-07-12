import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { DeleteConfirm } from "../../../../components/Modal/Delete"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Container } from "../../../../components/styled/container"
import {
  useDeleteskillsMutation,
  useSkillQuery,
  useUpdateSkillMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"

interface addProps {}
type ObjectType = {
  name: string
}

const operation: NextPage<addProps> = () => {
  const initData: ObjectType = {
    name: "",
  }
  const router = useRouter()
  const [, deleteSkill] = useDeleteskillsMutation()
  const [{ data: resourceData }] = useSkillQuery({
    variables: { skillId: +router.query.id || 0 },
  })
  const [{ fetching: createItemFetching }, createItem] =
    useUpdateSkillMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState<ObjectType>(initData)
  useEffect(() => {
    if (resourceData?.skill) {
      console.log(resourceData?.skill)
      setObj({
        name: resourceData?.skill?.name,
      })
    }
  }, [resourceData])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [objectName, setObjectName] = useState<string>("")
  const getMainData = () => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      obj[e.target.name] = e.target.value
      setObj({ ...obj })
    }
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
      updateSkillId: +router.query.id,
      data: {
        name: ob.name,
      },
    })
    if (result?.data?.updateSkill?.errors) {
      error(result?.data?.updateSkill?.errors?.[0].message)
    } else {
      success("创建成功")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(result?.data?.updateSkill?.data?.id.toString())
          setObj(initData)
          return
        }
        router.push({
          pathname: `/capacity/skill/${result?.data?.updateSkill?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/capacity/skill" })
      }
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteSkill({ ids: [+router.query.id] })
      if (result.data?.deleteskills) {
        return router.push("/capacity/skill")
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
          <span>资源技能</span>
          <span>{resourceData?.skill?.id}:</span>
          <span>{isDetail(router) ? "详情" : "编辑"}</span>
        </div>
        <Menu
          detailRouterPath={`/capacity/skill/${router.query.id}/detail`}
          supplierRouterPath={`/`}
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
        </div>
      </div>
    </Container>
  )
}

export default operation

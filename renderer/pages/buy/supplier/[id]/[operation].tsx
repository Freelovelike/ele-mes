import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { BlueBtn, DelButton } from "../../../../components/PagePart/BlueBtn"
import Menu from "../../../../components/PagePart/DetailMenu"
import { EditSave } from "../../../../components/PagePart/EditSave"
import { Container } from "../../../../components/styled/container"
import {
  useDeletesuppliersMutation,
  useSupplierQuery,
  useUpdateSupplierMutation,
} from "../../../../src/generated/graphql"
import { isDetail } from "../../../../utils/isDetail"
import { error, success } from "../../../../utils/log"

interface addProps {}

const addLocation: NextPage<addProps> = () => {
  const router = useRouter()
  const [{ data: supplierData }] = useSupplierQuery({
    variables: { supplierId: +router.query.id || 0 },
  })
  const [, deleteSupplier] = useDeletesuppliersMutation()
  const [{ fetching: createLocationFetching }, CreateSupplier] =
    useUpdateSupplierMutation()
  //获取收集主要的数据
  const [obj, setObj] = useState({
    name: "",
    description: "",
  })
  useEffect(() => {
    setObj({
      name: supplierData?.supplier?.name,
      description: supplierData?.supplier?.description,
    })
  }, [supplierData])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  const [objectName, setObjectName] = useState<string>("")
  const getMainData = (e: any) => {
    obj[e.target.name] = e.target.value
    setObj({ ...obj })
  }

  //创建方法
  const CreateItemFunc = async (
    ob: any,
    other?: "saveAndCreate" | "saveAndContinueEdit"
  ) => {
    if (!!!obj.name) {
      return setIsCorrect(true)
    }
    const result = await CreateSupplier({
      updateSupplierId: +router.query.id,
      data: {
        name: ob.name.trim(),
        description: ob.description,
      },
    })
    if (result.error) {
      return console.log(result.error)
    }
    if (result?.data?.updateSupplier?.data) {
      success("更新")
      if (other) {
        if (other === "saveAndCreate") {
          setObjectName(obj.name)
          setObj({
            name: "",
            description: "",
          })
          return
        }
        router.push({
          pathname: `/buy/supplier/${result?.data?.updateSupplier?.data?.id}/change`,
        })
      } else {
        router.push({ pathname: "/buy/supplier", query: {} })
      }
    } else {
      console.log(result.data)
      error(result.data.updateSupplier.errors[0].message)
    }
  }
  return (
    <Container>
      <div className='Head'>
        {!!objectName && (
          <div className='correct'>{`对象${objectName}已经保存，请继续添加对象。`}</div>
        )}
        <div className='title'>
          <span>供应商</span>
          <span>{router.query.id || 0} </span>
          <span>{isDetail(router) ? "详情" : "编辑"}:</span>
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
          <DelButton
            onClick={async () => {
              const result = await deleteSupplier({ ids: [+router?.query?.id] })
              if (result?.data?.deletesuppliers) {
                router.push("/buy/supplier")
              }
            }}
          >
            删除
          </DelButton>
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
                onChange={getMainData}
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
                placeholder='拥有者'
                name='description'
                value={obj.description || ""}
                onChange={getMainData}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default addLocation

// const Container = styled.div`
//   padding: 0 15px;
//   box-sizing: border-box;
//   .correct {
//     background-color: green;
//     border-color: #ff6b84;
//     color: white;
//     height: 50px;
//     border-radius: 4px;
//     padding: 6px 12px;
//     margin-top: 10px;
//     box-sizing: border-box;
//   }
//   .incorrect {
//     background-color: #ff8585;
//     border-color: #ff6b84;
//     color: white;
//     height: 50px;
//     border-radius: 4px;
//     padding: 6px 12px;
//     box-sizing: border-box;
//   }
//   .item {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     column-gap: 20px;
//     font-size: 13px;
//     width: 100%;
//     /* border: 1px solid yellow; */
//     .item_item {
//       display: flex;
//       flex-direction: column;
//       row-gap: 5px;
//       color: #737373;
//       width: 100%;
//     }
//     input {
//       padding: 6px 12px;
//       /* width: 90%; */
//       border: 1px solid #ccc;
//       border-radius: 4px;
//       box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
//       transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
//       outline: none;
//       &:focus {
//         border-color: #66afe9;
//         box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
//           0 0 8px rgb(102 175 233 / 60%);
//       }
//       &::placeholder {
//         font-size: 13px;
//         color: #7c7c7ccc;
//       }
//     }
//     select {
//       padding: 6px 12px;
//       outline: none;
//       border-radius: 4px;
//       border: 1px solid #ccc;
//       background-color: #ffffff;
//       /* border:none; */
//       &:focus {
//         border-color: #66afe9;
//         box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
//           0 0 8px rgb(102 175 233 / 60%);
//       }
//     }
//     label {
//       /* border: 1px solid black; */
//       text-align: right;
//       width: 30%;
//     }
//   }

//   .Head {
//     display: flex;
//     flex-direction: column;
//     row-gap: 10px;
//     #NM {
//       font-size: 14px;
//       font-weight: bold;
//     }
//     .title {
//       display: flex;
//       justify-content: flex-start;
//       flex-direction: row;
//       column-gap: 5px;
//       margin: 18px 0 9px 0;
//       box-sizing: border-box;
//       font-weight: 500;
//       font-size: 18px;
//     }
//     .btn {
//       display: flex;
//       flex-direction: row;
//       justify-content: flex-start;
//       column-gap: 10px;
//     }
//     .content {
//       width: 100%;
//       display: flex;
//       margin-top: 30px;
//       flex-direction: column;
//       row-gap: 5px;
//       justify-content: center;
//       align-items: center;
//     }
//   }
//   .footer {
//     .advance {
//       border-bottom: 1px solid #ccc;
//       display: flex;
//       flex-direction: row;
//       column-gap: 10px;
//     }
//     .advance_content {
//       display: flex;
//       margin-top: 30px;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       row-gap: 5px;
//     }
//   }
// `

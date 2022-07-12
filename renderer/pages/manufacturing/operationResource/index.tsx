import moment from "moment"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import { Content } from "../../../components/Content/Content"
import { DeleteConfirm } from "../../../components/Modal/Delete"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { TD, TH } from "../../../components/PagePart/TH"
import {
  OperationResource,
  useDeleteoperationResourcesMutation,
  useOperationResourcesQuery,
  useUpdateOperationResourceMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"
const tabs = [
  {
    name: "所属操作",
    key: "operation_id",
  },
  {
    name: "生产资料",
    key: "resource_id",
  },
  {
    name: "所需生产资料数量",
    key: "quantity",
  },
  {
    name: "最后修改时间",
    key: "updated_at",
  },
]
interface workProps {}

const work: NextPage<workProps> = () => {
  const router = useRouter()
  const [Array, setArray] = useState<
    {
      name: string
      status: "1" | "2"
    }[]
  >([])
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [{ data }] = useOperationResourcesQuery({
    variables: {
      conditions: Array.map(({ name, status }) => {
        return {
          conditionName: name,
          conditionValue: status === "1" ? "asc" : "desc",
        }
      }),
      page: currentPage,
      size: pageSize,
    },
  })
  const [selectData, setSelectData] = useState<OperationResource[]>([])
  const [_, update] = useUpdateOperationResourceMutation()
  const [updateItemQueen, setUpdateItemQueen] = useState<OperationResource[]>(
    []
  )
  const [, deleteItems] = useDeleteoperationResourcesMutation()

  const updateFunc = async () => {
    for await (const item of updateItemQueen) {
      const result = await update({
        data: {
          operationId: item.operation.id,
          resourceId: item.resource.id,
          quantity: item.quantity,
        },
        updateOperationResourceId: item.id,
      })
      console.log(result)
      if (result?.data?.updateOperationResource?.data?.id) {
        success("修改成功！")
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== item.id))
      }
    }
  }
  const select = (item?: OperationResource) => {
    //单选数据
    if (item) {
      return () => {
        if (selectData.includes(item)) {
          setSelectData(selectData.filter((i) => i.id !== item.id))
          return
        }
        setSelectData([...selectData, item])
      }
    }
    //全选，没传就默认全选
    return () => {
      selectData.length === data?.operationResources?.total
        ? setSelectData([])
        : setSelectData(data?.operationResources?.data as OperationResource[])
    }
  }
  const DelItem = async () => {
    DeleteConfirm(async () => {
      const result = await deleteItems({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deleteoperationResources) {
        return success("删除成功！")
      }
      error("删除失败！")
    })
  }
  return (
    <ContentInfo>
      <Header>
        <div className='Operatio'>
          <span style={{ marginRight: "15px" }}>资源清单</span>
        </div>
        <div className='btn'>
          <div className='operation_btn operationFirst'>
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='保存'
              onClick={updateFunc}
            />
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='撤销'
              onClick={() => {
                setUpdateItemQueen([])
                router.reload()
              }}
            />
          </div>
          <div className='operation_btn operationSeconde'>
            <BlueBtn
              canClick={true}
              content='add'
              onClick={() =>
                router.push("/manufacturing/operationResource/add")
              }
            />
            <BlueBtn
              canClick={selectData.length !== 0}
              content='delete'
              onClick={DelItem}
            />
          </div>
        </div>
      </Header>
      <Content
        count={data?.operationResources?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => setPageSize(parseInt(size))}
        changePage={(page) => setCurrentPage(page)}
        goToPage={(page) => setCurrentPage(page)}
      >
        {data?.operationResources?.data?.length > 0 ? (
          <table cellSpacing={0} cellPadding={0}>
            <thead>
              <tr style={{ background: "rgba(66,66,66,0.1)" }}>
                <th
                  style={{
                    borderRight: "1px solid #ccc",
                  }}
                >
                  <input
                    style={style1}
                    type='checkbox'
                    checked={
                      selectData.length !== 0 &&
                      selectData.length === data?.operationResources?.total
                    }
                    onChange={select()}
                  />
                </th>
                {tabs.map((item, index) => {
                  return (
                    <TH
                      title={item.name}
                      index={index}
                      key={index + 1 + "s"}
                      {...testFunction({
                        arr: Array,
                        name: item.key,
                        setArray,
                      })}
                    />
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {data?.operationResources?.data?.map((item, _index) => {
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        selectData.includes(item as OperationResource) ||
                        updateItemQueen.map((i) => i.id).includes(item.id)
                          ? "#A4D070"
                          : "",
                    }}
                  >
                    <TD style={{ width: "20px", height: "29px" }}>
                      <input
                        style={style2}
                        type='checkbox'
                        checked={
                          selectData.includes(item as OperationResource) ||
                          updateItemQueen.map((i) => i.id).includes(item.id)
                        }
                        onChange={select(item as OperationResource)}
                      />
                    </TD>
                    <TD>
                      <div
                        style={pointer}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/operation/${item.operation.id}/detail`,
                          })
                        }
                      >
                        {item.operation.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={pointer}
                        onClick={() =>
                          router.push({
                            pathname: `/capacity/resource/${item.resource.id}/detail`,
                          })
                        }
                      >
                        {item.resource.name}
                      </div>
                    </TD>
                    <TD>
                      <input
                        type='text'
                        defaultValue={item.quantity}
                        onBlur={(e) => {
                          if (
                            parseInt(e.currentTarget.value) === item.quantity
                          ) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.quantity = parseInt(e.currentTarget.value)
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([
                            ...updateItemQueen,
                            item as OperationResource,
                          ])
                        }}
                      />
                    </TD>
                    <TD>
                      <div>{moment(+item.updatedAt).fromNow()}</div>
                    </TD>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div>没有数据</div>
        )}
      </Content>
    </ContentInfo>
  )
}

export default work
const Header = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  .operationFirst {
    width: 110px;
  }
  .operationSeconde {
    width: 60px;
  }
  .Operatio {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }
  .operation_btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`
const ContentInfo = styled.div`
  padding: 0 0.5rem;
  td {
    :focus {
      input {
        border: 1px solid #ccc;
        background: white;
      }
    }
    :active {
      input {
        border: 1px solid #ccc;
        background: white;
      }
    }
    input {
      border: none;
      background: none;
      outline: none;
      :focus {
        border: 1px solid #ccc;
        background: white;
      }
      :active {
        border: 1px solid #ccc;
        background: white;
      }
    }
  }
`
const style1 = {
  width: "18px",
  height: "18px",
  marginTop: "3px",
  marginLeft: "1px",
  cursor: "pointer",
}
const style2 = {
  width: "18px",
  height: "18px",
  marginTop: "5px",
  marginLeft: "1px",
  cursor: "pointer",
}
const pointer = { cursor: "pointer" }

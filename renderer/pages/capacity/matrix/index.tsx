import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import { Content } from "../../../components/Content/Content"
import { DeleteConfirm } from "../../../components/Modal/Delete"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { TD, TH } from "../../../components/PagePart/TH"
import {
  useDeletematrixsMutation,
  useMatrixsQuery,
  useUpdateMatrixMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"
const tabs = [
  {
    name: "名称",
    key: "name",
  },
  {
    name: "初始操作",
    key: "from_id",
  },
  {
    name: "目标操作",
    key: "to_id",
  },
  {
    name: "生产资料",
    key: "resource_id",
  },
  {
    name: "花费",
    key: "cost",
  },
  {
    name: "优先值",
    key: "priority",
  },
  {
    name: "所需时间（秒）",
    key: "duration",
  },
]
interface MatrixProps {}

const Matrix: NextPage<MatrixProps> = () => {
  const router = useRouter()
  const [Array, setArray] = useState<
    {
      name: string
      status: "1" | "2"
    }[]
  >([])
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [{ data }] = useMatrixsQuery({
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
  const [, deleteMatrix] = useDeletematrixsMutation()
  const [selectData, setSelectData] = useState<any[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<any[]>([])
  const [, update] = useUpdateMatrixMutation()

  const select = (item?) => {
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
      selectData.length === data?.matrixs?.total
        ? setSelectData([])
        : setSelectData(data?.matrixs?.data)
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteMatrix({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deletematrixs) {
        success("删除成功！")
        return
      }
      error("删除失败！")
    })
  }
  const updateMatrix = async () => {
    for await (const item of updateItemQueen) {
      const result = await update({
        data: {
          Duration: +item.Duration,
          cost: +item.cost,
          fromId: +item.from.id,
          toId: +item.to.id,
          name: item.name,
          priority: +item.priority,
          resourceId: +item.resource.id,
        },
        updateMatrixId: +item?.id,
      })
      if (result?.data?.updateMatrix?.data) {
        success("修改成功！")
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== item.id))
      }
    }
  }
  return (
    <ContentInfo>
      <Header>
        <div className='operation'>
          <span style={{ marginRight: "15px" }}>换线准备规则矩阵</span>
        </div>
        <div className='btn'>
          <div className='operation_btn operationFirst'>
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='保存'
              onClick={updateMatrix}
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
              onClick={() => router.push("/capacity/matrix/add")}
            />
            <BlueBtn canClick={true} content='delete' onClick={DelItem} />
          </div>
        </div>
      </Header>
      <Content
        count={data?.matrixs?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => setPageSize(parseInt(size))}
        changePage={(page) => setCurrentPage(page)}
        goToPage={(page) => setCurrentPage(page)}
      >
        {data?.matrixs?.data?.length > 0 ? (
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
                      selectData.length === data?.matrixs?.total
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
              {data?.matrixs?.data?.map((item, _index) => {
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        selectData.includes(item) ||
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
                          selectData.includes(item) ||
                          updateItemQueen.map((i) => i.id).includes(item.id)
                        }
                        onChange={select(item)}
                      />
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/capacity/matrix/${item.id}/detail`,
                          })
                        }
                      >
                        {item.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/operation/${item.from.id}/detail`,
                          })
                        }
                      >
                        {item.from.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/operation/${item.to.id}/detail`,
                          })
                        }
                      >
                        {item.to.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/capacity/matrix/${item.id}/detail`,
                          })
                        }
                      >
                        {item.resource.name}
                      </div>
                    </TD>
                    <TD>
                      <input
                        type='text'
                        defaultValue={item.cost}
                        onBlur={(e) => {
                          if (+e.currentTarget.value === item.cost) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.cost = +e.currentTarget.value
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([...updateItemQueen, item])
                        }}
                      />
                    </TD>
                    <TD>
                      <input
                        type='text'
                        defaultValue={item.priority}
                        onBlur={(e) => {
                          if (+e.currentTarget.value === item.priority) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.priority = +e.currentTarget.value
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([...updateItemQueen, item])
                        }}
                      />
                    </TD>
                    <TD>
                      <input
                        type='text'
                        defaultValue={item.Duration}
                        onBlur={(e) => {
                          if (+e.currentTarget.value === item.Duration) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.Duration = +e.currentTarget.value
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([...updateItemQueen, item])
                        }}
                      />
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

export default Matrix

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
  .operation {
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

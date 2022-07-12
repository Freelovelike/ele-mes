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
  useDeleteworksMutation,
  useUpdateWorkMutation,
  useWorksQuery,
  Work,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"
const tabs = [
  {
    name: "名称",
    key: "name",
  },
  {
    name: "操作",
    key: "operation_id",
  },
  {
    name: "数量",
    key: "quantity",
  },
  {
    name: "完成数量",
    key: "completed_quantity",
  },
  {
    name: "开始时间",
    key: "start_date",
  },
  {
    name: "结束时间",
    key: "end_date",
  },
  {
    name: "状态",
    key: "status",
  },
  {
    name: "需求",
    key: "demand",
  },
  {
    name: "拥有者",
    key: "owner",
  },
]
interface workProps {}
const statusMap = {
  proposed: "提议",
  approved: "核准",
  confirmed: "确定",
  completed: "完成",
  closed: "结束",
}
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
  const [{ data }] = useWorksQuery({
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
  const [selectData, setSelectData] = useState<Work[]>([])
  const [_, update] = useUpdateWorkMutation()
  const [updateItemQueen, setUpdateItemQueen] = useState<Work[]>([])
  const [, deleteItems] = useDeleteworksMutation()

  const updateFunc = async () => {
    for await (const item of updateItemQueen) {
      const result = await update({
        data: {
          resource: +item.resource.id,
          completedQuantity: item.completedQuantity,
          name: item.name,
          operationId: item.operation.id,
          ownerId: item.owner?.id,
          quantity: item.quantity,
          endDate: item.endDate,
          startDate: item.startDate,
          status: item.status,
        },
        updateWorkId: item.id,
      })

      if (result?.data?.updateWork?.data?.id) {
        success("修改成功！")
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== item.id))
      }
    }
  }
  const select = (item?: Work) => {
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
      selectData.length === data?.works?.total
        ? setSelectData([])
        : setSelectData(data?.works?.data as Work[])
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteItems({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deleteworks) {
        success("删除成功！")
        return
      }
      error("删除失败！")
    })
  }
  return (
    <ContentInfo>
      <Header>
        <div className='Operatio'>
          <span style={{ marginRight: "15px" }}>生产单</span>
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
              onClick={() => router.push("/manufacturing/work/add")}
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
        count={data?.works?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => {
          //改变页面条数
          setPageSize(parseInt(size))
        }}
        changePage={(page) => setCurrentPage(page)}
        goToPage={(page) => setCurrentPage(page)}
      >
        {data?.works?.data?.length > 0 ? (
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
                      selectData.length === data?.works?.total
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
              {data?.works?.data?.map((item, _index) => {
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        selectData.includes(item as Work) ||
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
                          selectData.includes(item as Work) ||
                          updateItemQueen.map((i) => i.id).includes(item.id)
                        }
                        onChange={select(item as Work)}
                      />
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/work/${item.id}/detail`,
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
                            pathname: `/manufacturing/operation/${item.operation.id}/detail`,
                          })
                        }
                      >
                        {item.operation.name}
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
                          setUpdateItemQueen([...updateItemQueen, item as Work])
                        }}
                      />
                    </TD>
                    <TD>
                      <input
                        type='text'
                        defaultValue={item.completedQuantity}
                        onBlur={(e) => {
                          if (
                            Number(e.currentTarget.value) ===
                            item.completedQuantity
                          ) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.completedQuantity = parseInt(
                                e.currentTarget.value
                              )
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([...updateItemQueen, item as Work])
                        }}
                      />
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/work/${item.id}/detail`,
                          })
                        }
                      >
                        {moment(item.startDate).format("MMM Do YYYY")}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/work/${item.id}/detail`,
                          })
                        }
                      >
                        {moment(item.endDate).format("MMM Do YYYY")}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer", minHeight: "20px" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/work/${item.id}/detail`,
                          })
                        }
                      >
                        {statusMap[item.status]}
                      </div>
                    </TD>
                    <TD>
                      <div>{item.demand?.name}</div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer", minHeight: "20px" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/work/${item.id}/detail`,
                          })
                        }
                      >
                        {item?.owner?.id}
                      </div>
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

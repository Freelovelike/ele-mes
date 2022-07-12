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
  Order,
  useDeleteordersMutation,
  useOrdersQuery,
  useUpdateOrderMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"

interface productProps {}

const headers = [
  {
    name: "外部ID（可选）",
    key: "name",
  },
  {
    name: "产品",
    key: "item_id",
  },
  {
    name: "收货地点",
    key: "location_id",
  },
  {
    name: "客户",
    key: "customer_id",
  },
  {
    name: "状态",
    key: "status",
  },
  {
    name: "数量",
    key: "quantity",
  },
  {
    name: "优先级",
    key: "priority",
  },
  {
    name: "截止日期",
    key: "dueDate",
  },
]
const product: NextPage<productProps> = () => {
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectData, setSelectData] = useState<Order[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<Order[]>([])
  const [Array, setArray] = useState<
    {
      name: string
      status: "1" | "2"
    }[]
  >([])
  const [{ data }] = useOrdersQuery({
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

  const router = useRouter()
  const [, update] = useUpdateOrderMutation()
  const [{ fetching: deleteItemFetching }, deleteItems] =
    useDeleteordersMutation()

  const select = (item?: Order) => {
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
      selectData.length === data?.orders?.total
        ? setSelectData([])
        : setSelectData(data?.orders?.data as Order[])
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteItems({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deleteorders) {
        success("删除成功！")
        return
      }
      error("删除失败！")
    })
  }
  const UpdateFunc = async () => {
    //先这么写
    for await (const item of updateItemQueen) {
      const result = await update({
        data: {
          dueDate: +item.dueDate,
          status: item.status,
          itemId: +item.item.id,
          locationId: +item.location.id,
          customerId: +item.customer.id,
          name: item.name,
          quantity: +item.quantity,
          priority: +item.priority,
        },
        updateOrderId: +item.id,
      })
      if (result?.data?.updateOrder) {
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== item.id))
      }
    }
  }
  return (
    <ContentInfo>
      <Header>
        <div className='Location'>
          <span style={{ marginRight: "15px" }}>销售订单</span>{" "}
        </div>
        <div className='btn'>
          <div className='operation_btn operationFirst'>
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='保存'
              onClick={UpdateFunc}
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
              onClick={() => router.push("/sales/saleOrder/add")}
            />
            <BlueBtn
              canClick={selectData.length !== 0}
              content='delete'
              onClick={DelItem}
              fetching={deleteItemFetching}
            />
          </div>
        </div>
      </Header>
      <Content
        count={data?.orders?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => {
          //改变页面条数
          setPageSize(parseInt(size))
        }}
        changePage={(page) => setCurrentPage(page)}
        goToPage={(page) => setCurrentPage(page)}
      >
        {data?.orders?.data?.length > 0 ? (
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
                    onChange={select()}
                    checked={
                      selectData.length !== 0 &&
                      selectData.length === data?.orders?.total
                    }
                  />
                </th>
                {headers.map(({ key, name }, index) => {
                  return (
                    <TH
                      title={name}
                      index={index}
                      key={index + 1 + "s"}
                      {...testFunction({
                        arr: Array,
                        name: key,
                        setArray,
                      })}
                    />
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {data?.orders?.data?.map((item: Order, _index) => {
                const Time = moment(item.dueDate).format("MMM Do YYYY")
                // new Date(item.dueDate).getFullYear() +
                // "-" +
                // (new Date(item.dueDate).getMonth() + 1) +
                // "-" +
                // new Date(item.dueDate).getDate()
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
                            pathname: `/sales/saleOrder/${item.id}/detail`,
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
                            pathname: `/sales/product/${item.location.id}/detail`,
                          })
                        }
                      >
                        {item.item.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/sales/location/${item.location.id}/detail`,
                          })
                        }
                      >
                        {item.location.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/buy/customer/${item.customer.id}/detail`,
                          })
                        }
                      >
                        {item.customer.name}
                      </div>
                    </TD>
                    <TD>
                      <select
                        name='statusSelect'
                        id='selectStatus'
                        defaultValue={item.status || ""}
                        onBlur={(e) => {
                          if (e.currentTarget.value === item.status) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.status = e.currentTarget.value
                            }
                          })
                        }}
                        onFocus={() => {
                          setUpdateItemQueen([...updateItemQueen, item])
                        }}
                      >
                        <option value='inquiry'>查询</option>
                        <option value='quote'>报价</option>
                        <option value='open'>开放</option>
                        <option value='closed'>已结束</option>
                        <option value='canceled'>已取消</option>
                      </select>
                    </TD>
                    <TD>
                      <input
                        type='text'
                        defaultValue={item.quantity || 0}
                        onBlur={(e) => {
                          if (Number(e.currentTarget.value) === item.quantity) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.quantity = Number(e.currentTarget.value)
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
                        defaultValue={item.priority || 0}
                        onBlur={(e) => {
                          if (Number(e.currentTarget.value) === item.priority) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.priority = Number(e.currentTarget.value)
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
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/sales/saleOrder/${item.id}/detail`,
                          })
                        }
                      >
                        {Time}
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

export default product
const Header = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  .operationFirst {
    column-gap: 10px;
  }
  .operationSeconde {
    width: 60px;
  }
  .Location {
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
  #selectStatus {
    border: none;
    background: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 0.01px;
    text-overflow: " ";
    ::-ms-expand {
      display: none;
    }
    ::-webkit-expand {
      display: none;
    }
    ::-ms-expand {
      display: none;
    }
    :active {
      border: 1px solid #000000;
      -webkit-appearance: block;
      -moz-appearance: block;
      background-color: #fff;
    }
  }
  input {
    ::-webkit-datetime-edit-text {
      display: none;
    }
    ::-webkit-datetime-edit-fields-wrapper {
      display: none;
    }
  }
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

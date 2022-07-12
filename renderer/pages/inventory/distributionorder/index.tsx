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
  DistributionOrder,
  useDeletedistributionOrdersMutation,
  useDistributionOrdersQuery,
  useUpdateDistributionOrderMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"

interface productProps {}

const product: NextPage<productProps> = () => {
  const router = useRouter()
  const [Array, setArray] = useState<
    {
      name: string
      status: "1" | "2"
    }[]
  >([])
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectData, setSelectData] = useState<DistributionOrder[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<DistributionOrder[]>(
    []
  )
  const [{ fetching: deleteItemFetching }, deleteDistributionOrder] =
    useDeletedistributionOrdersMutation()
  const [, update] = useUpdateDistributionOrderMutation()
  const [{ data }] = useDistributionOrdersQuery({
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
  const updateDistribution = async () => {
    for await (const item of updateItemQueen) {
      const result = await update({
        data: {
          destinationId: +item.destination.id,
          itemId: +item.item.id,
          name: item.name,
          originId: +item.origin.id,
          quantity: +item.quantity,
          receiptDate: +item.receiptDate,
          shippingDate: +item.shippingDate,
          status: item.status,
          demandId: +item.demand.id,
        },
        updateDistributionOrderId: item.id,
      })
      console.log(result)
      if (result?.data?.updateDistributionOrder?.data?.id) {
        success("修改成功！")
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== item.id))
      }
    }
  }

  const select = (item?: DistributionOrder) => {
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
      selectData.length === data?.distributionOrders?.total
        ? setSelectData([])
        : setSelectData(data?.distributionOrders?.data as DistributionOrder[])
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteDistributionOrder({
        ids: selectData.map((i) => i.id),
      })
      if (result?.data?.deletedistributionOrders) {
        success("删除成功！")
        return
      }
      error("删除失败！")
    })
  }
  return (
    <ContentInfo>
      <Header>
        <div className='Location'>
          <span style={{ marginRight: "15px" }}>配送订单</span>
        </div>
        <div className='btn'>
          <div className='operation_btn operationFirst'>
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='保存'
              onClick={updateDistribution}
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
              onClick={() => router.push("/inventory/distributionorder/add")}
            ></BlueBtn>
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
        count={data?.distributionOrders?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => setPageSize(parseInt(size))}
        changePage={(page) => setCurrentPage(page)}
      >
        {data?.distributionOrders?.data?.length > 0 ? (
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
                      selectData.length === data?.distributionOrders?.total
                    }
                  />
                </th>
                {[
                  {
                    key: "name",
                    value: "外部ID",
                  },
                  {
                    key: "item_id",
                    value: "物料",
                  },
                  {
                    key: "origin_id",
                    value: "出发地",
                  },
                  {
                    key: "destination_id",
                    value: "目的地",
                  },
                  {
                    key: "quantity",
                    value: "数量",
                  },
                  {
                    key: "shippingDate",
                    value: "发货日期",
                  },
                  {
                    key: "receiptDate",
                    value: "收货日期",
                  },
                  {
                    key: "状态",
                    value: "状态",
                  },
                ].map((item, index) => {
                  return (
                    <TH
                      title={item.value}
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
              {data?.distributionOrders?.data?.map((item, _index) => {
                const shippingTime = moment(item.shippingDate).format(
                  "MMM Do YYYY"
                )

                const receiptTime = moment(item.receiptDate).format(
                  "MMM Do YYYY"
                )
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        selectData.includes(item as DistributionOrder) ||
                        updateItemQueen.map((i) => i.id).includes(item.id)
                          ? "#A4D070"
                          : "",
                    }}
                  >
                    <TD style={{ width: "20px", height: "29px" }}>
                      <input
                        style={{
                          ...style2,
                          position: "sticky",
                          left: 0,
                        }}
                        type='checkbox'
                        checked={
                          selectData.includes(item as DistributionOrder) ||
                          updateItemQueen.map((i) => i.id).includes(item.id)
                        }
                        onChange={select(item as DistributionOrder)}
                      />
                    </TD>
                    <TD>
                      <div
                        className='name'
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/inventory/distributionorder/${item.id}/detail`,
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
                            pathname: `/sales/product/${item.item.id}/detail`,
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
                            pathname: `/sales/location/${item.origin.id}/detail`,
                          })
                        }
                      >
                        {item.origin.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/sales/location/${item.destination.id}/detail`,
                          })
                        }
                      >
                        {item.destination.name}
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
                            item as DistributionOrder,
                          ])
                        }}
                      />
                    </TD>
                    <TD>
                      <div>{shippingTime}</div>
                    </TD>
                    <TD>
                      <div>{receiptTime}</div>
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
                        onFocus={(e) => {
                          setUpdateItemQueen([
                            ...updateItemQueen,
                            item as DistributionOrder,
                          ])
                        }}
                      >
                        <option value='proposed'>提议的</option>
                        <option value='approved'>经核准的</option>
                        <option value='confirmed'>已确定</option>
                        <option value='completed'>completed</option>
                        <option value='closed'>已结束</option>
                      </select>
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
    width: 110px;
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

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
  Purchase,
  useDeletepurchasesMutation,
  usePurchasesQuery,
  useUpdatePurchaseMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"
const tabs = [
  {
    name: "外部ID",
    key: "name",
  },
  {
    name: "物料",
    key: "item",
  },
  {
    name: "收货地点",
    key: "location",
  },
  {
    name: "供应商",
    key: "supplier",
  },
  {
    name: "下单日期",
    key: "ordering_date",
  },
  {
    name: "收货日期",
    key: "receipt_date",
  },
  {
    name: "数量",
    key: "quantity",
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
    name: "最后修改时间",
    key: "updated_at",
  },
]
interface SupplierProps {}

const Purchase: NextPage<SupplierProps> = () => {
  const router = useRouter()
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [, update] = useUpdatePurchaseMutation()
  const [{ fetching: deleteItemFetching }, Deletesuppliers] =
    useDeletepurchasesMutation()
  const [selectData, setSelectData] = useState<Purchase[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<Purchase[]>([])
  const [Array, setArray] = useState<
    {
      name: string
      status: "1" | "2"
    }[]
  >([])
  const [{ data }] = usePurchasesQuery({
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
  const select = (item?: Purchase) => {
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
      selectData.length === data?.purchases?.total
        ? setSelectData([])
        : setSelectData(data?.purchases?.data as Purchase[])
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await Deletesuppliers({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deletepurchases) {
        success("删除成功！")
        return
      }
      error("删除失败！")
    })
  }
  const updateFunc = async () => {
    for await (const item of updateItemQueen) {
      const result = await update({
        data: {
          orderingDate: new Date(item.orderingDate),
          receiptDate: new Date(item.receiptDate),
          itemId: +item?.item?.id,
          locationId: +item?.location?.id,
          quantity: +item?.quantity,
          name: item?.name,
          status: item.status,
          supplierId: +item?.supplier?.id,
          demandId: +item?.demand?.id,
        },
        updatePurchaseId: +item.id,
      })
      if (result?.data?.updatePurchase) {
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== item.id))
      }
    }
  }
  return (
    <ContentInfo>
      <Header>
        <div className='Supplier'>
          <span style={{ marginRight: "15px" }}>采购订单</span>
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
              onClick={() => router.push("/buy/purchase/add")}
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
        count={data?.purchases?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => {
          //改变页面条数
          setPageSize(parseInt(size))
        }}
        changePage={(page) => setCurrentPage(page)}
        goToPage={(page) => setCurrentPage(page)}
      >
        {data?.purchases?.data?.length > 0 ? (
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
                      selectData.length === data?.purchases?.total
                    }
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
              {data?.purchases?.data?.map((item, _index) => {
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        selectData.includes(item as Purchase) ||
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
                          selectData.includes(item as Purchase) ||
                          updateItemQueen.map((i) => i.id).includes(item.id)
                        }
                        onChange={select(item as Purchase)}
                      />
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/buy/purchase/${item.id}/detail`,
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
                            pathname: `/sales/product/${item?.item?.id}/detail`,
                          })
                        }
                      >
                        {item?.item?.name || "NMD"}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/sales/location/${item?.location?.id}/detail`,
                          })
                        }
                      >
                        {item?.location?.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: `/buy/supplier/${item?.supplier?.id}/detail`,
                          })
                        }
                      >
                        {item?.supplier?.name}
                      </div>
                    </TD>
                    <TD>
                      <div>
                        {moment(item.orderingDate).format("MMM Do YYYY")}
                      </div>
                    </TD>
                    <TD>
                      <div>
                        {moment(item.receiptDate).format("MMM Do YYYY")}
                      </div>
                    </TD>
                    <TD>
                      {/* <div>{item.quantity}</div> */}
                      <input
                        type='text'
                        defaultValue={item.quantity}
                        onBlur={(e) => {
                          if (+e.currentTarget.value === item.quantity) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.quantity = +e.currentTarget.value
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([
                            ...updateItemQueen,
                            item as Purchase,
                          ])
                        }}
                      />
                    </TD>
                    <TD>
                      <select
                        name='statusSelect'
                        id='selectStatus'
                        defaultValue={item.status}
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
                            item as Purchase,
                          ])
                        }}
                      >
                        <option value='proposed'>提议</option>
                        <option value='approved'>核准</option>
                        <option value='confirmed'>确定</option>
                        <option value='completed'>完成</option>
                        <option value='closed'>结束</option>
                      </select>
                    </TD>
                    <TD>
                      <div>{item?.demand?.name}</div>
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

export default Purchase
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
  .Supplier {
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

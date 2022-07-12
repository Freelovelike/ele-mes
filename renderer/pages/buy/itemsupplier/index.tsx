import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import { Content } from "../../../components/Content/Content"
import { DeleteConfirm } from "../../../components/Modal/Delete"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { TD, TH } from "../../../components/PagePart/TH"
import {
  ItemSupplier,
  useDeleteitemSuppliersMutation,
  useItemSuppliersQuery,
  useUpdateItemSupplierMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"
const tabs = [
  {
    name: "成本",
    key: "cost",
  },
  {
    name: "优先值",
    key: "priority",
  },
  {
    name: "送货所需时间(天)",
    key: "lead_time",
  },
  {
    name: "收货地点",
    key: "location_id",
  },
  {
    name: "物料",
    key: "item_id",
  },
  {
    name: "供应商",
    key: "supplier_id",
  },
]
interface SupplierProps {}

const ItemSupplier: NextPage<SupplierProps> = () => {
  const router = useRouter()
  const [Array, setArray] = useState<
    {
      name: string
      status: "1" | "2"
    }[]
  >([])
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [{ data }] = useItemSuppliersQuery({
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
  const [, update] = useUpdateItemSupplierMutation()
  const [{ fetching: deleteItemFetching }, deleteItems] =
    useDeleteitemSuppliersMutation()
  const [selectData, setSelectData] = useState<ItemSupplier[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<ItemSupplier[]>([])

  const select = (item?: ItemSupplier) => {
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
      selectData.length === data?.itemSuppliers?.total
        ? setSelectData([])
        : setSelectData(data?.itemSuppliers?.data as ItemSupplier[])
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteItems({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deleteitemSuppliers) {
        success("删除成功！")
        return
      }
      error("删除失败！")
    })
  }
  return (
    <ContentInfo>
      <Header>
        <div className='Supplier'>
          <span style={{ marginRight: "15px" }}>物料供应商</span>
        </div>
        <div className='btn'>
          <div className='operation_btn operationFirst'>
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='保存'
              onClick={async () => {
                //先这么写
                for await (const item of updateItemQueen) {
                  const result = await update({
                    data: {
                      priority: item.priority,
                      cost: item.cost,
                      itemId: item.item.id,
                      leadTime: item.leadTime,
                      locationId: item.location.id,
                      supplierId: item.supplier.id,
                    },
                    updateItemSupplierId: item.id,
                  })
                  if (result.data.updateItemSupplier) {
                    setUpdateItemQueen(
                      updateItemQueen.filter((i) => i.id !== item.id)
                    )
                  }
                }
              }}
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
              onClick={() => router.push("/buy/itemsupplier/add")}
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
        count={data?.itemSuppliers?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => {
          //改变页面条数
          setPageSize(parseInt(size))
        }}
        changePage={(page) => setCurrentPage(page)}
        goToPage={(page) => setCurrentPage(page)}
      >
        {data?.itemSuppliers?.data?.length > 0 ? (
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
                      selectData.length === data?.itemSuppliers?.total
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
              {data?.itemSuppliers?.data?.map((item, _index) => {
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        selectData.includes(item as ItemSupplier) ||
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
                          selectData.includes(item as ItemSupplier) ||
                          updateItemQueen.map((i) => i.id).includes(item.id)
                        }
                        onChange={select(item as ItemSupplier)}
                      />
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
                          setUpdateItemQueen([
                            ...updateItemQueen,
                            item,
                          ] as ItemSupplier[])
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
                          setUpdateItemQueen([
                            ...updateItemQueen,
                            item,
                          ] as ItemSupplier[])
                        }}
                      />
                    </TD>
                    <TD>
                      <input
                        type='text'
                        defaultValue={item.leadTime}
                        onBlur={(e) => {
                          if (+e.currentTarget.value === item.leadTime) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.leadTime = +e.currentTarget.value
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([
                            ...updateItemQueen,
                            item,
                          ] as ItemSupplier[])
                        }}
                      />
                    </TD>

                    <TD>
                      <div
                        className='cursor'
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
                        className='cursor'
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
                        className='cursor'
                        onClick={() =>
                          router.push({
                            pathname: `/buy/supplier/${item.supplier.id}/detail`,
                          })
                        }
                      >
                        {item.supplier.name}
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

export default ItemSupplier
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
  .cursor {
    cursor: pointer;
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

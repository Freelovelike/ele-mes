import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import { Content } from "../../../components/Content/Content"
import { DeleteConfirm } from "../../../components/Modal/Delete"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { TD, TH } from "../../../components/PagePart/TH"
import {
  Inventory,
  useDeleteinventorysMutation,
  useInventorysQuery,
  useUpdateInventoryMutation,
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
  const [selectData, setSelectData] = useState<Inventory[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<Inventory[]>([])
  const [{ fetching: deleteItemFetching }, deleteItems] =
    useDeleteinventorysMutation()
  const [, update] = useUpdateInventoryMutation()
  const [{ data }] = useInventorysQuery({
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

  const select = (item?: Inventory) => {
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
      selectData.length === data?.inventorys?.total
        ? setSelectData([])
        : setSelectData(data?.inventorys?.data)
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteItems({
        ids: [...selectData.map((i) => i.id)],
      })
      if (result?.data?.deleteinventorys) {
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
          <span style={{ marginRight: "15px" }}>库存</span>
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
                      Minimum: item.Minimum,
                      itemId: item.item.id,
                      locationId: item.location.id,
                      onHand: item.onHand,
                    },
                    updateInventoryId: item.id,
                  })
                  if (result.data.updateInventory) {
                    success("修改成功！")
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
              onClick={() => router.push("/inventory/inventory/add")}
            ></BlueBtn>
            <BlueBtn
              canClick={true}
              content='delete'
              onClick={DelItem}
              fetching={deleteItemFetching}
            />
          </div>
        </div>
      </Header>
      <Content
        count={data?.inventorys?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => setPageSize(parseInt(size))}
        changePage={(page) => {
          setCurrentPage(page)
        }}
      >
        {data?.inventorys?.data?.length > 0 ? (
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
                      selectData.length === data?.inventorys?.total
                    }
                  />
                </th>
                {[
                  {
                    key: "location",
                    value: "地点",
                  },
                  {
                    key: "item",
                    value: "物料",
                  },
                  {
                    key: "onHand",
                    value: "现有库存",
                  },
                  {
                    key: "minimum",
                    value: "安全库存",
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
              {data?.inventorys?.data?.map((item, _index) => {
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
                        style={{
                          ...style2,
                          position: "sticky",
                          left: 0,
                        }}
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
                            pathname: `/sales/product/${item.item.id}/detail`,
                          })
                        }
                      >
                        {item.item.name}
                      </div>
                    </TD>
                    <TD>
                      <input
                        type='number'
                        defaultValue={item.onHand}
                        onBlur={(e) => {
                          if (parseInt(e.currentTarget.value) === item.onHand) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.onHand = parseInt(e.currentTarget.value)
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
                        type='number'
                        defaultValue={item.Minimum}
                        onBlur={(e) => {
                          if (
                            parseInt(e.currentTarget.value) === item.Minimum
                          ) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.Minimum = parseInt(e.currentTarget.value)
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

import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import { Content } from "../../../components/Content/Content"
import { DeleteConfirm } from "../../../components/Modal/Delete"
import { BlueBtn } from "../../../components/PagePart/BlueBtn"
import { TD, TH } from "../../../components/PagePart/TH"
import {
  Resource,
  useDeleteresourcesMutation,
  useResourcesQuery,
  useUpdateResourceMutation,
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
  const [selectData, setSelectData] = useState<Resource[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<Resource[]>([])
  const [{ fetching: deleteItemFetching }, deleteItems] =
    useDeleteresourcesMutation()
  const [, update] = useUpdateResourceMutation()
  const [{ data }] = useResourcesQuery({
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
  const updateFunc = async () => {
    for await (const item of updateItemQueen) {
      console.log({ item })
      const result = await update({
        data: {
          calendarBucketId: +item?.calendarBucket?.id, //标志，原本是calendarId
          maximum: +item?.maximum,
          locationId: +item?.location?.id,
          name: item?.name,
        },
        updateResourceId: +item?.id,
      })
      if (result?.data?.updateResource?.data) {
        success("修改成功！")
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== item.id))
      }
    }
  }
  const select = (item?: Resource) => {
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
      selectData.length === data?.resources?.total
        ? setSelectData([])
        : setSelectData(data?.resources?.data as Resource[])
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteItems({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deleteresources) {
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
          <span style={{ marginRight: "15px" }}>{"生产资料"}</span>
        </div>
        <div className='btn'>
          <div className='operation_btn operationFirst'>
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='保存'
              onClick={() => updateFunc()}
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
              onClick={() => router.push("/capacity/resource/add")}
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
        count={data?.resources?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => setPageSize(parseInt(size))}
        changePage={(page) => {
          setCurrentPage(page)
        }}
      >
        {data?.resources?.data?.length > 0 ? (
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
                      selectData.length === data?.resources?.total
                    }
                  />
                </th>
                {[
                  {
                    key: "name",
                    value: "名称",
                  },
                  {
                    key: "location",
                    value: "所在地点",
                  },
                  {
                    key: "maximum",
                    value: "默认个数",
                  },
                  {
                    key: "calendar",
                    value: "万用日历表",
                  },
                  {
                    key: "owner",
                    value: "拥有者",
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
              {data?.resources?.data?.map((item, _index) => {
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        selectData.includes(item as Resource) ||
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
                          selectData.includes(item as Resource) ||
                          updateItemQueen.map((i) => i.id).includes(item?.id)
                        }
                        onChange={select(item as Resource)}
                      />
                    </TD>
                    <TD>
                      <div
                        className='cursor'
                        onClick={() =>
                          router.push({
                            pathname: `/capacity/resource/${item.id}/detail`,
                          })
                        }
                      >
                        {item.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        className='cursor'
                        onClick={() =>
                          router.push(
                            `/sales/location/${item.location.id}/detail`
                          )
                        }
                      >
                        {item.location.name}
                      </div>
                    </TD>
                    <TD>
                      <input
                        type='number'
                        defaultValue={item.maximum}
                        onBlur={(e) => {
                          if (e.currentTarget.value === item.name) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.maximum = parseInt(e.currentTarget.value)
                            }
                          })
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select()
                          setUpdateItemQueen([
                            ...updateItemQueen,
                            item as Resource,
                          ])
                        }}
                      />
                    </TD>
                    <TD>
                      <div
                        className='cursor'
                        onClick={() => {
                          router.push(
                            `/manufacturing/calendarbucket/${item.calendarBucket?.id}/detail`
                          )
                        }}
                      >
                        {item.calendarBucket?.name}
                      </div>
                    </TD>
                    <TD>
                      <div
                        className='cursor'
                        onClick={() =>
                          router.push({
                            pathname: `/capacity/resource/${item.id}/detail`,
                          })
                        }
                      >
                        {item.owner?.name}
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
  .cursor {
    cursor: pointer;
  }
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

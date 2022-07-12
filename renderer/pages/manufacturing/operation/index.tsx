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
  useDeleteoperationsMutation,
  useOperationsQuery,
  useUpdateOperationMutation,
} from "../../../src/generated/graphql"
import { error, success } from "../../../utils/log"
import { testFunction } from "../../../utils/testFunction"
const tabs = [
  {
    name: "名称",
    key: "name",
  },
  {
    name: "类型",
    key: "type",
  },
  {
    name: "操作地点",
    key: "location_id",
  },
  {
    name: "持续时间（秒）",
    key: "duration",
  },
  {
    name: "每单位持续时间（秒）",
    key: "duration_per_unit",
  },
  {
    name: "拥有者",
    key: "owner",
  },
  {
    name: "最后更新时间",
    key: "updated_at",
  },
]
interface OperationProps {}

const Operation: NextPage<OperationProps> = () => {
  const names = { fixed_time: "固定计时", time_per: "按量计时" }
  const router = useRouter()
  const [Array, setArray] = useState<
    {
      name: string
      status: "1" | "2"
    }[]
  >([])
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [{ data }] = useOperationsQuery({
    variables: {
      conditions: Array.map(({ name, status }) => {
        return {
          conditionName: name,
          conditionValue: status === "1" ? "asc" : "desc",
        }
      }),
      size: pageSize,
      page: currentPage,
    },
  })
  const [selectData, setSelectData] = useState<any[]>([])
  const [updateItemQueen, setUpdateItemQueen] = useState<any[]>([])
  const [, update] = useUpdateOperationMutation()
  const [, deleteItems] = useDeleteoperationsMutation()

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
      selectData.length === data?.operations?.total
        ? setSelectData([])
        : setSelectData(data?.operations?.data)
    }
  }
  const DelItem = () => {
    DeleteConfirm(async () => {
      const result = await deleteItems({ ids: selectData.map((i) => i.id) })
      if (result?.data?.deleteoperations) {
        success("删除成功！")
        return
      }
      error("删除失败！")
    })
  }
  const UpdateOperation = async () => {
    for await (let i of updateItemQueen) {
      const result = await update({
        data: {
          duration: +i.duration,
          durationPerUnit: +i.durationPerUnit,
          locationId: +i.location.id,
          name: i.name,
          type: i.type,
          ownerId: +i?.owner?.id,
        },
        updateOperationId: +i.id,
      })

      if (result?.data?.updateOperation?.data) {
        success("修改成功！")
        setUpdateItemQueen(updateItemQueen.filter((i) => i.id !== i.id))
      } else {
        console.log("failed")
      }
    }
  }
  return (
    <ContentInfo>
      <Header>
        <div className='Operation'>
          <span style={{ marginRight: "15px" }}>操作</span>
        </div>
        <div className='btn'>
          <div className='operation_btn operationFirst'>
            <BlueBtn
              canClick={updateItemQueen.length > 0}
              content='保存'
              onClick={UpdateOperation}
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
              onClick={() => router.push("/manufacturing/operation/add")}
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
        count={data?.operations?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeSize={(size) => {
          //改变页面条数
          setPageSize(parseInt(size))
        }}
        changePage={(page) => setCurrentPage(page)}
        goToPage={(page) => setCurrentPage(page)}
      >
        {data?.operations?.data?.length > 0 ? (
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
                      selectData.length === data?.operations?.total
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
              {data?.operations?.data?.map((item, _index) => {
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
                            pathname: `/manufacturing/operation/${item.id}/detail`,
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
                            pathname: `/manufacturing/operation/${item.id}/detail`,
                          })
                        }
                      >
                        {names[item.type]}
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
                      <input
                        type='text'
                        defaultValue={item.duration}
                        onBlur={(e) => {
                          if (Number(e.currentTarget.value) === item.duration) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.duration = e.currentTarget.value
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
                        defaultValue={item.durationPerUnit}
                        onBlur={(e) => {
                          if (
                            Number(e.currentTarget.value) ===
                            item.durationPerUnit
                          ) {
                            setUpdateItemQueen(
                              updateItemQueen.filter((i) => i.id !== item.id)
                            )
                            return
                          }
                          updateItemQueen.map((i) => {
                            if (i.id === item.id) {
                              i.durationPerUnit = e.currentTarget.value
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
                        style={{ cursor: "pointer", minHeight: "20px" }}
                        onClick={() =>
                          router.push({
                            pathname: `/manufacturing/operation/${item.id}/detail`,
                          })
                        }
                      >
                        {item.owner?.name}
                      </div>
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

export default Operation
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
  .Operation {
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

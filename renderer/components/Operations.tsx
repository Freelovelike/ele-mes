import React, { useState } from "react"
import { Operation, useOperationsQuery } from "../src/generated/graphql"
import { Content } from "./Content/Content"
import { BlueBtn } from "./PagePart/BlueBtn"
import { TD } from "./PagePart/TH"
import { Box, Btn, Line, P, TableBox, TDP, TH } from "./Products"

export const Operations: React.FC<OperationsProps> = ({ Select, setOpen }) => {
  const [num, setNum] = useState<number>()
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const Arr = [
    "Select",
    "名称",
    "对象",
    "地点",
    "持续时间",
    "每单位的持续时间",
    "拥有者",
  ]
  const [{ data: operations }] = useOperationsQuery({
    variables: { size: 14, page: currentPage },
  })

  return (
    <Box>
      <Line top='14px' content='start' gap='15px' height='30px'>
        <P>操作</P>
      </Line>
      <Line top='5px' content='end' gap='10px' height='22px'>
        <BlueBtn canClick={true} content='add'></BlueBtn>
        <BlueBtn canClick={false} content='delete'></BlueBtn>
      </Line>
      <TableBox>
        <Content
          count={operations?.operations?.total}
          pageSize={pageSize}
          currentPage={currentPage}
          onChangeSize={(size) => {
            setPageSize(parseInt(size))
          }}
          changePage={(page) => setCurrentPage(page)}
          goToPage={(page) => setCurrentPage(page)}
        >
          <table>
            <thead>
              <tr>
                {Arr.map((item, index) => {
                  return <TH key={index}>{item}</TH>
                })}
              </tr>
            </thead>
            {operations?.operations?.data ? (
              <tbody>
                {operations.operations.data.length > 0 ? (
                  <>
                    {operations.operations.data.map((item, index) => {
                      const obj = item.operationMaterials.filter((item) => {
                        return item.type === "end"
                      })
                      return (
                        <tr
                          key={index}
                          style={{ background: num === index ? "#A4D070" : "" }}
                          onClick={() => {
                            setNum(index)
                          }}
                        >
                          <TD>
                            {num === index ? (
                              <Btn
                                title='选择'
                                onClick={() => {
                                  Select(item as Operation), setOpen(false)
                                }}
                              >
                                select
                              </Btn>
                            ) : (
                              ""
                            )}
                          </TD>
                          <TD>
                            <TDP>{item.name}</TDP>
                          </TD>
                          <TD>
                            <TDP>{obj[0]?.item.name}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.location.name}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.duration}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.durationPerUnit}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.owner?.name}</TDP>
                          </TD>
                        </tr>
                      )
                    })}
                  </>
                ) : (
                  <tr>
                    <TD>暂无数据</TD>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                {new Array(14).fill(0).map((_item, index) => {
                  return (
                    <tr key={index}>
                      {new Array(7).fill(0).map((_item, index) => {
                        return (
                          <TD
                            key={index}
                            style={{
                              height: "22px",
                              width: "117px",
                            }}
                            className='skeleton skeleton-text'
                          />
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            )}
          </table>
        </Content>
      </TableBox>
    </Box>
  )
}
interface OperationsProps {
  Select: (value: Operation) => void
  setOpen: (value: React.SetStateAction<boolean>) => void
}

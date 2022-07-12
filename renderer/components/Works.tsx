import React, { useState } from "react"
import { useWorksQuery, Work } from "../src/generated/graphql"
import { Content } from "./Content/Content"
import { BlueBtn } from "./PagePart/BlueBtn"
import { TD } from "./PagePart/TH"
import { Box, Btn, Line, P, TableBox, TDP, TH } from "./Products"

export const Works: React.FC<WorksProps> = ({ Select, setOpen }) => {
  const Arr = [
    "Select",
    "名称",
    "操作",
    "起始时间",
    "结束时间",
    "状态",
    "拥有者",
  ]
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [num, setNum] = useState<number>()
  const [{ data: items }] = useWorksQuery({
    variables: { size: 14, page: currentPage },
  })
  return (
    <Box>
      <Line top='14px' content='start' gap='15px' height='30px'>
        <P>生产单</P>
      </Line>
      <Line top='5px' content='end' gap='10px' height='22px'>
        <BlueBtn canClick={true} content='add'></BlueBtn>
        <BlueBtn canClick={false} content='delete'></BlueBtn>
      </Line>
      <TableBox>
        <Content
          count={items?.works?.total}
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
            {items?.works?.data ? (
              <tbody>
                {items.works.data.length > 0 ? (
                  <>
                    {items.works.data.map((item, index) => {
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
                                  Select(item as Work), setOpen(false)
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
                            <TDP>{item.operation.name}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.startDate}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.endDate}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.status}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item?.owner?.name}</TDP>
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
interface WorksProps {
  Select: (value: Work) => void
  setOpen: (value: React.SetStateAction<boolean>) => void
}

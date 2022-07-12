import React, { useState } from "react"
import { Customer, useCustomersQuery } from "../src/generated/graphql"
import { Content } from "./Content/Content"
import { BlueBtn } from "./PagePart/BlueBtn"
import { TD } from "./PagePart/TH"
import { Box, Btn, Line, P, TableBox, TDP, TH } from "./Products"

export const Customers: React.FC<CustomersProps> = ({ Select, setOpen }) => {
  const Arr = ["Select", "名称", "描述", "拥有者"]
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [num, setNum] = useState<number>()
  const [{ data: customers }] = useCustomersQuery({
    variables: { size: 14, page: currentPage },
  })
  return (
    <Box>
      <Line top='14px' content='start' gap='15px' height='30px'>
        <P>客户</P>
      </Line>
      <Line top='5px' content='end' gap='10px' height='22px'>
        <BlueBtn canClick={true} content='add'></BlueBtn>
        <BlueBtn canClick={false} content='delete'></BlueBtn>
      </Line>
      <TableBox>
        <Content
          count={customers?.customers?.total}
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
            {customers?.customers?.data ? (
              <tbody>
                {customers.customers.data.length > 0 ? (
                  <>
                    {customers.customers.data.map((item, index) => {
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
                                  Select(item as Customer), setOpen(false)
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
                            <TDP>{item.description}</TDP>
                          </TD>
                          <TD>
                            <TDP>{item.order[0]?.name}</TDP>
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
                      {new Array(4).fill(0).map((_item, index) => {
                        return (
                          <TD
                            key={index}
                            style={{
                              height: "22px",
                              width: "105px",
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
interface CustomersProps {
  Select: (value: Customer) => void
  setOpen: (value: React.SetStateAction<boolean>) => void
}

import React, { useState } from "react"
import styled from "styled-components"
import { Item, useItemsQuery } from "../src/generated/graphql"
import { Content } from "./Content/Content"
import { BlueBtn } from "./PagePart/BlueBtn"
import { TD } from "./PagePart/TH"

export const Products: React.FC<ProductsProps> = ({ Select, setOpen }) => {
  const Arr = ["Select", "名称", "描述"]
  const [pageSize, setPageSize] = useState<number>(100)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [num, setNum] = useState<number>()
  const [{ data: items }] = useItemsQuery({
    variables: { size: 14, page: currentPage },
  })

  return (
    <Box>
      <Line top='14px' content='start' gap='15px' height='30px'>
        <P>物料</P>
      </Line>
      <Line top='5px' content='end' gap='10px' height='22px'>
        <BlueBtn canClick={true} content='add'></BlueBtn>
        <BlueBtn canClick={false} content='delete'></BlueBtn>
      </Line>
      <TableBox>
        <Content
          count={items?.items?.total}
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
            {items?.items?.data ? (
              <tbody>
                {items.items.data.length > 0 ? (
                  <>
                    {items.items.data.map((item, index) => {
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
                                  Select(item), setOpen(false)
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
                      {new Array(3).fill(0).map((_item, index) => {
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
interface ProductsProps {
  Select: (value: Item) => void
  setOpen: (value: React.SetStateAction<boolean>) => void
}
export const Box = styled.div`
  width: 100%;
  height: 98%;
`
export const Line = styled.div<{
  height: string
  content: string
  gap: string
  top: string
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ content }) => content};
  height: ${({ height }) => height};
  column-gap: ${({ gap }) => gap};
  margin-top: ${({ top }) => top};
`
export const P = styled.p`
  font-weight: 400;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`
export const TableBox = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
  width: 100%;
  height: 79%;
  box-sizing: border-box;
  border-radius: 6px;
`
export const TH = styled.th`
  min-width: 100px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #4e4e4e;
  user-select: none;
  padding: 2px;
`
export const TDP = styled.p`
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 1px;
  font-size: 15px;
`
export const Btn = styled.div`
  width: 50px;
  height: 20px;
  background: #1f91be;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  user-select: none;
  &:hover {
    background: #197aa0;
  }
  &:active {
    background: #197aa0;
    box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.4);
  }
`

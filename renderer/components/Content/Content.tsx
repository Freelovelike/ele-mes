import { NextComponentType, NextPageContext } from "next"
import React from "react"
import styled from "styled-components"

/**
 * @children 子组件
 * @count 总数
 * @pageSize 每页数量
 * @currentPage 当前页
 * @onChangeSize 改变每页数量
 * @onChangePage 改变页码,把useState的set方法传进来即可
 * @gotoPage 跳转页码
 */
interface ContentProps {
  children?: React.ReactNode
  goToPage?: (page: number) => void
  onChangeSize?: (size: string) => void
  changePage?: React.Dispatch<React.SetStateAction<number>>
  count?: number
  currentPage?: number
  pageSize?: number
}

export const Content: NextComponentType<NextPageContext, {}, ContentProps> = ({
  children,
  count,
  currentPage,
  goToPage,
  pageSize,
  onChangeSize,
  changePage,
}) => {
  const pre = () => {
    if (changePage) {
      currentPage - 1 > 0 ? changePage(currentPage - 1) : changePage(1)
    }
  }
  const preDouble = () => {
    changePage ? changePage(1) : alert("没找到方法ChangePage")
  }
  const next = () => {
    if (changePage) {
      const pageFW = Math.ceil(count / pageSize)
      currentPage < pageFW ? changePage(currentPage + 1) : changePage(pageFW)
    }
  }
  const nextDouble = () => {
    changePage
      ? changePage(Math.ceil(count / pageSize))
      : alert("没找到方法ChangePage")
  }
  const inputValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //@ts-ignore
    goToPage ? goToPage(parseInt(e.target.value)) : alert("没找到方法goToPage")
  }
  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeSize
      ? onChangeSize(e.target.value)
      : alert("没找到方法onChangeSize")
  }
  return (
    <Container>
      <Contents>{children}</Contents>
      <Footer>
        <div className='占位'></div>
        <div className='middleInfo'>
          <div className='middleInfo-pre'>
            <span className='pre' onClick={pre}></span>
            <span className='preDouble' onClick={preDouble}></span>
            <span className='line'></span>
          </div>
          <input
            type='text'
            className='pageNationInput'
            defaultValue={currentPage || 1}
            onKeyDown={(e) => {
              e.key === "Enter" && inputValue(e)
            }}
          />
          <span>共{Math.ceil(count / pageSize) || 1}页</span>
          <div className='middleInfo-next'>
            <span className='line'></span>
            <span className='nextDouble' onClick={nextDouble}></span>
            <span className='next' onClick={next}></span>
          </div>
          <select
            name='select'
            id='select'
            className='selectC'
            onChange={selectValue}
          >
            <option value='100'>{100}</option>
            <option value='500'>{500}</option>
            <option value='1000'>{1000}</option>
            <option value='100000000'>{"全部"}</option>
          </select>
        </div>
        <div className='endInfo'>{`${1}-${count}  共${count}条`}</div>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  table {
    tr:nth-child(2n) {
      background-color: rgba(0, 0, 0, 0.1);
    }
    tr {
      th:nth-child(-n + 2) {
        z-index: 1;
        position: sticky;
        left: 0;
      }
      td:nth-child(-n + 2) {
        position: sticky;
        left: 0;
        z-index: 1;
      }
      td:nth-child(2) {
        left: 21px;
      }
      th:nth-child(2) {
        left: 21px;
      }
    }
  }
`
const Contents = styled.div`
  max-height: 76vh;
  overflow: auto;
  word-wrap: normal;
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ececec;
  height: 2.78vh;
  .middleInfo-next {
    margin-right: 10px;
    position: relative;
    width: 60px;
    display: flex;
    align-items: center;
    .next {
      position: absolute;
      right: 0;
      bottom: -10px;
      :before {
        content: "";
        position: absolute;
        right: -5px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-left: 8px solid #666666;
      }
      :after {
        content: "";
        display: inline-block;
        width: 2px;
        height: 14px;
        background-color: #666666;
      }
      :active {
        background-color: red;
      }
    }
    .nextDouble {
      position: absolute;
      right: 20px;
      bottom: -12px;
      :before {
        content: "";
        position: absolute;
        right: -8px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-left: 8px solid #666666;
      }
      :after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-left: 8px solid #666666;
      }
    }
    .line {
      position: absolute;
      left: 10px;
      margin-right: 10px;
      display: inline-block;
      width: 2px;
      height: 14px;
      background-color: #ccc;
    }
  }
  .middleInfo-pre {
    position: relative;
    width: 80px;
    display: flex;
    align-items: center;
    .pre {
      position: absolute;
      left: 0;
      bottom: 8px;
      :before {
        content: "";
        position: absolute;
        display: inline-block;
        width: 2px;
        height: 14px;
        bottom: -14px;
        background-color: #666666;
      }
      :after {
        content: "";
        position: absolute;
        left: -5px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-right: 8px solid #666666;
      }
    }
    .preDouble {
      position: absolute;
      left: 30px;
      bottom: 8px;
      :before {
        content: "";
        position: absolute;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-right: 8px solid #666666;
      }
      :after {
        content: "";
        position: absolute;
        left: -8px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-right: 8px solid #666666;
      }
    }
    .line {
      position: absolute;
      right: 10px;
      display: inline-block;
      width: 2px;
      height: 14px;
      background-color: #ccc;
    }
  }
  .pageNationInput {
    outline: none;
    width: 50px;
    margin-right: 5px;
  }
  .middleInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .endInfo {
    justify-self: end;
    align-self: flex-end;
  }
`

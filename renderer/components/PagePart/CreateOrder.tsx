import Image from "next/image"
import React from "react"
import styled from "styled-components"
import confirm from "../../assets/Image/confirm.svg"
import Confirm from "../../assets/Image/Confirms.svg"
import halfOpen from "../../assets/Image/halfOpen.svg"
import HalfOpen from "../../assets/Image/HalfOpens.svg"
import lock from "../../assets/Image/lock.svg"
import Lock from "../../assets/Image/Locks.svg"
import no from "../../assets/Image/no.svg"
import No from "../../assets/Image/Nos.svg"
import open from "../../assets/Image/open.svg"
import Open from "../../assets/Image/Opens.svg"

export const CreateOrder: React.FC<CreateOrderProps> = ({
  isChoiceProduct,
  isChoiceAction,
}) => {
  const DefaultArr = [
    {
      noClickPic: Open,
      onClickPic: open,
      isClick: false,
      width: "17px",
      height: "16px",
    },
    {
      noClickPic: HalfOpen,
      onClickPic: halfOpen,
      isClick: false,
      width: "13px",
      height: "16px",
    },
    {
      noClickPic: Lock,
      onClickPic: lock,
      isClick: false,
      width: "13px",
      height: "16px",
    },
    {
      noClickPic: Confirm,
      onClickPic: confirm,
      isClick: false,
      width: "12px",
      height: "7px",
    },
    {
      noClickPic: No,
      onClickPic: no,
      isClick: false,
      width: "8px",
      height: "8px",
    },
  ]
  const [choiceStatus, setStatus] = React.useState([
    {
      noClickPic: Open,
      onClickPic: open,
      isClick: true,
      width: "17px",
      height: "16px",
    },
    {
      noClickPic: HalfOpen,
      onClickPic: halfOpen,
      isClick: false,
      width: "13px",
      height: "16px",
    },
    {
      noClickPic: Lock,
      onClickPic: lock,
      isClick: false,
      width: "13px",
      height: "16px",
    },
    {
      noClickPic: Confirm,
      onClickPic: confirm,
      isClick: false,
      width: "12px",
      height: "7px",
    },
    {
      noClickPic: No,
      onClickPic: no,
      isClick: false,
      width: "8px",
      height: "8px",
    },
  ])
  const StatusBtn = (
    noClickPic: string,
    onClickPic: string,
    isClick: boolean,
    width: string,
    height: string,
    index: number
  ) => {
    const KEY = Math.random()
    return (
      <StatusButton
        isClick={isClick}
        key={KEY}
        onClick={() => {
          DefaultArr[index].isClick = true
          setStatus(DefaultArr)
        }}
      >
        <div style={{ position: "relative", width: width, height: height }}>
          <Image
            src={isClick ? onClickPic : noClickPic}
            layout='fill'
            quality={100}
          />
        </div>
      </StatusButton>
    )
  }
  const Reg = /^[0-9]$/
  return (
    <Box isChoiceAction={isChoiceAction} isChoiceProduct={isChoiceProduct}>
      <Header>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "18px",
            color: "#333333",
            marginLeft: "25px",
          }}
        >
          {isChoiceProduct ? "创建订单" : "未选择"}
        </p>
      </Header>
      <Line style={{ height: "29px" }}>
        <LineBox style={{ fontWeight: "bold" }}>参考</LineBox>
        <LineBox>wffw</LineBox>
      </Line>
      <Line>
        <LineBox style={{ fontWeight: "bold" }}>开始日期</LineBox>
        <LineBox>
          <DateInput id='inputBox' type='datetime-local' />
        </LineBox>
      </Line>
      <Line>
        <LineBox style={{ fontWeight: "bold" }}>结束日期</LineBox>
        <LineBox>
          <DateInput id='inputBox' type='datetime-local' />
        </LineBox>
      </Line>
      <Line>
        <LineBox style={{ fontWeight: "bold" }}>数量</LineBox>
        <LineBox>
          <DateInput type='number' placeholder='1' />
        </LineBox>
      </Line>
      <Line>
        <LineBox style={{ fontWeight: "bold" }}>完成数量</LineBox>
        <LineBox>
          <DateInput type='number' placeholder='0' />
        </LineBox>
      </Line>
      <Line>
        <LineBox style={{ fontWeight: "bold" }}>状态</LineBox>
        <LineBox>
          <Status>
            {choiceStatus.map((item, index) => {
              return StatusBtn(
                item.noClickPic,
                item.onClickPic,
                item.isClick,
                item.width,
                item.height,
                index
              )
            })}
          </Status>
        </LineBox>
      </Line>
    </Box>
  )
}
interface CreateOrderProps {
  isChoiceProduct: boolean
  isChoiceAction: boolean
}
const Box = styled.div<{ isChoiceProduct: boolean; isChoiceAction: boolean }>`
  width: 935px;
  height: ${({ isChoiceProduct, isChoiceAction }) =>
    isChoiceProduct && isChoiceAction
      ? "267px"
      : isChoiceProduct && !isChoiceAction
      ? "223px"
      : "26px"};
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`
const Header = styled.div`
  width: 935px;
  height: 25px;
  background: #88b2c6;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  user-select: none;
`
const Line = styled.div`
  width: 935px;
  height: 42px;
  display: flex;
`
const LineBox = styled.div`
  width: 467px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 5px;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
`
const DateInput = styled.input`
  width: 457px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease-in-out;
  &:focus {
    border: 1px solid #66afe9;
    box-shadow: 0px 0px 8px rgba(102, 175, 233, 0.6),
      0px 1px 1px rgba(0, 0, 0, 0.08);
  }
`
const Status = styled.div`
  width: 180px;
  height: 32px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  user-select: none;
  column-gap: -1px;
`
const StatusButton = styled.div<{ isClick: boolean }>`
  width: 38px;
  height: 32px;
  background: ${({ isClick }) => (isClick ? "#286090" : "#ECECEC")};
  border: 1px solid #204d74;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    box-shadow: ${({ isClick }) =>
      isClick ? "" : "inset 0px 3px 5px rgba(0, 0, 0, 0.13)"};
  }
`

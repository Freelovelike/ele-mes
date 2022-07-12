import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ADD from "../../assets/Image/add.svg"
import DELETE from "../../assets/Image/delete.svg"

export const BlueBtn: React.FC<BlueBtnProps> = ({
  content,
  canClick,
  onClick,
  fetching,
}) => {
  return (
    <Box
      content={content}
      canClick={canClick}
      onClick={canClick ? onClick : null}
    >
      {content === "add" ? (
        <div style={{ width: "10px", height: "10px", position: "relative" }}>
          <Image src={ADD} layout='fill' quality={100} />
        </div>
      ) : content === "delete" ? (
        <div style={{ width: "10px", height: "2px", position: "relative" }}>
          <Image src={DELETE} layout='fill' quality={100} />
        </div>
      ) : (
        <>
          {fetching ? (
            <span style={{ fontSize: "10px" }}>{`正在${content}..`}</span>
          ) : (
            <>{content}</>
          )}
        </>
      )}
    </Box>
  )
}
export const DelButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border-color: red;
  padding: 6px 12px;
  background-color: #ff5252;
  border-color: #ff3838;
  color: #fff;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.42857143em;
  text-align: center;
  cursor: pointer;
  :hover {
    background-color: #ff3838;
  }
`
interface BlueBtnProps {
  content: "保存" | "撤销" | "add" | "delete"
  canClick: boolean
  onClick?: () => void
  fetching?: boolean
}
const Box = styled.div<{ canClick: boolean; content: string }>`
  user-select: none;
  width: ${({ content }) =>
    content === "add" || content === "delete" ? "22px" : "52px"};
  height: ${({ content }) =>
    content === "add" || content === "delete" ? "22px" : "30px"};
  opacity: ${({ canClick }) => (canClick ? 1 : 0.65)};
  cursor: ${({ canClick }) => (canClick ? "pointer" : "not-allowed")};
  background: #337ab7;
  border: 1px solid #2e6da4;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 13px;
  line-height: 16px;
  &:hover {
    background: ${({ canClick }) => (canClick ? "#286090" : "#337ab7")};
    border-color: ${({ canClick }) => (canClick ? "#204d74" : "#2e6da4")};
  }
  &:active {
    background: ${({ canClick }) => (canClick ? "#204d74" : "#337ab7")};
    border-color: ${({ canClick }) => (canClick ? "#122b40" : "#2e6da4")};
  }
`

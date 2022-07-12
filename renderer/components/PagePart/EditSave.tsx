import React from "react"
import styled from "styled-components"

export const EditSave: React.FC<EditSaveProps> = ({ addMore, onClick }) => {
  return (
    <Box onClick={onClick}>
      {addMore ? "保存并增加另一个" : "保存并继续编辑"}
    </Box>
  )
}
interface EditSaveProps {
  addMore: boolean
  onClick?: () => void
}
const Box = styled.div`
  font-size: 13px;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
  &:hover {
    border: 1px solid #adadad;
    background: #e6e6e6;
  }
  &:active {
    background: #d4d4d4;
    border: 1px solid #8c8c8c;
    box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.13);
  }
`

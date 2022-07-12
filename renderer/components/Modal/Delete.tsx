import React from "react"
import ReactDOM from "react-dom/client"
import styled from "styled-components"
import { Dialog } from "./Dialog"

export const DeleteConfirm = (
  yes?: () => void,
  no?: () => void,
  title?: string,
  content?: string
) => {
  const onYes = () => {
    component && root.render(React.cloneElement(component, { visible: false }))
    root.unmount()
    div.remove()
    yes && yes()
  }
  const onNo = () => {
    component && root.render(React.cloneElement(component, { visible: false }))
    root.unmount()
    div.remove()
    no && no()
  }
  const component = (
    <Dialog
      visible={true}
      closeOnClickMask={false}
      onClose={() => {
        onNo()
      }}
    >
      <Box isVisible={true} id='Prompt'>
        <P color='rgba(236, 55, 16, 1)' font='24px' left='185px' top='31px'>
          {title || "是否删除？"}
        </P>
        <P
          style={{ width: "400px", height: "84px" }}
          color='rgba(11, 13, 67, 0.3)'
          font='20px'
          left='40px'
          top='81px'
        >
          {content || "确认删除后将删除相关资源且无法恢复，请谨慎操作！"}
        </P>
        <Line height='0px' left='4px' rotate='0deg' top='182px' width='472px' />
        <Line
          height='0px'
          left='200px'
          rotate='90deg'
          top='226px'
          width='80px'
        />
        <Btn
          radius='0px 0px 0px 4px'
          color='rgba(11, 13, 67, 0.3)'
          onClick={onNo}
        >
          取消
        </Btn>
        <Btn
          radius='0px 0px 4px 0px'
          left='240px'
          color='rgba(46, 50, 249, 1)'
          onClick={onYes}
        >
          确定
        </Btn>
      </Box>
    </Dialog>
  )
  const div = document.createElement("div")
  div.id = "active-dialog-rootNode"
  document.body.appendChild(div)
  const root = ReactDOM.createRoot(div)
  component && root.render(component)
}

const P = styled.p<moveProps>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  color: ${({ color }) => color};
  font-size: ${({ font }) => font};
`
interface lineProps {
  width?: string
  height?: string
  rotate?: string
  top?: string
  left?: string
}
interface moveProps {
  top?: string
  left?: string
  color?: string
  font?: string
  radius?: string
}
const Line = styled.div<lineProps>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid rgba(15, 7, 32, 0.1);
  transform: rotate(${({ rotate }) => rotate});
`
const Btn = styled.div<moveProps>`
  position: absolute;
  width: 240px;
  height: 86px;
  bottom: -1px;
  left: ${({ left }) => left};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${({ radius }) => radius};
  color: ${({ color }) => color};
  font-size: 24px;
  &:hover {
    background: #2e32f9;
    color: #ffffff;
  }
  &:active {
    background: #1a1dca;
    color: #ffffff;
  }
`
const Box = styled.div`
  position: absolute;
  width: 480px;
  height: 270px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 4px 8px 32px rgba(0, 0, 18, 0.2);
  border-radius: 8px;
  z-index: 999;
  display: ${({ isVisible }: IfDeleteProps) => (isVisible ? "block" : "none")};
`
interface IfDeleteProps {
  isVisible: boolean
}

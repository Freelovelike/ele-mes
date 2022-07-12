import React from "react"
import styled from "styled-components"

interface CheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = () => {
  return <Container>Checkbox</Container>
}

const Container = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #000;
`

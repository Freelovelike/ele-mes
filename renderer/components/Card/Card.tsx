import { NextComponentType, NextPageContext } from "next"
import React from "react"
import styled from "styled-components"

export const Card: NextComponentType<NextPageContext, {}, cardProps> = ({
  title,
  content,
  customer,
  children,
}) => {
  return (
    <Container>
      {title ? (
        <Title>
          <div>{title}</div>
        </Title>
      ) : null}

      {customer ? <Content>{children}</Content> : <Content>{content}</Content>}
    </Container>
  )
}

interface cardProps {
  title?: string
  content?: React.ReactNode | string
  children?: React.ReactNode | React.ReactNode[]
  customer?: boolean
}

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 4px rgb(0, 0, 0, 0.4);
  height: 100%;
  background-color: #e9e9e9;
  border-radius: 4px;
`
const Title = styled.div`
  padding: 5px 15px;
  background-color: #88b2c6;
  border-color: #ddd;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`
const Content = styled.div`
  padding: 15px;
`

import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import styled from "styled-components"

interface test1Props {
  detailRouterPath: string
  supplierRouterPath: string
}

const Menu: NextPage<test1Props> = ({
  detailRouterPath,
  supplierRouterPath,
}) => {
  const router = useRouter()
  const isShowPath =
    (router.pathname.includes("product") ||
      router.pathname.split("/").includes("operation") ||
      router.pathname.includes("resource") ||
      router.pathname.includes("supplypath")) &&
    !router.pathname.includes("skill")
  const isDetailOrChange =
    router.query?.operation?.includes("change") ||
    router.query?.operation?.includes("detail")
  const isSupplier = router.pathname.includes("supplypath")
  useEffect(() => {}, [])

  return (
    <Container>
      <span>
        <div
          className={isDetailOrChange ? "active" : ""}
          onClick={() =>
            isDetailOrChange
              ? ""
              : detailRouterPath === "back"
              ? router.back()
              : router.push(detailRouterPath ?? "/")
          }
        >
          编辑
        </div>
        {isShowPath ? (
          <div
            className={isSupplier ? "active" : ""}
            onClick={() =>
              isSupplier
                ? ""
                : router.push({ pathname: supplierRouterPath ?? "/" })
            }
          >
            供应路径
          </div>
        ) : null}
      </span>
    </Container>
  )
}

export default Menu

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  span {
    display: flex;
    flex-direction: row;
    border-width: 2px 0px 1px 0px;
    border-top-color: #a6adc8;
    border-bottom-color: #a6adc8;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
  div {
    padding: 5px 10px 10px;
    color: #aaaaaa;
    border-width: 2px 0px 1px 0px;
    border-top-color: #a6adc8;
    border-bottom-color: #a6adc8;
    user-select: none;
    :hover {
      background-color: #f5f5f5;
      border-top: 2px solid rgba(0, 0, 0, 0.5);
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
      color: #333333;
      cursor: pointer;
    }
  }
  .active {
    background-color: #f5f5f5;
    border-top: 2px solid #a6adc8;
    border-bottom: 0.5px solid #a6adc8;
    color: #333333;
    :hover {
      cursor: grab;
      background-color: #f5f5f5;
      border-top: 2px solid #a6adc8;
      border-bottom: 0.5px solid #a6adc8;
      color: #333333;
    }
  }
`

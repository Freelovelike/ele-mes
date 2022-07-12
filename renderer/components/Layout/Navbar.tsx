import Image from "next/image"
import Router, { useRouter } from "next/router"
import { useEffect } from "react"
import { useSessionstorageState } from "rooks"
import styled from "styled-components"
import AvatarSvg from "../../assets/Image/Ellipse.svg"
import LogoSvg from "../../assets/Image/LOGO.svg"
// import LogoSvg from "../../assets/Image/Logo.svg"
import { useMeQuery } from "../../src/generated/graphql"

const NavBarList = [
  {
    name: "销售",
    path: "/sales",
    children: [
      {
        name: "销售订单",
        path: "/saleOrder",
      },
      {
        name: "物料",
        path: "/product",
        children: [
          {
            path: "/add",
            name: "添加物料",
          },
        ],
      },
      {
        name: "地点",
        path: "/location",
      },
      {
        name: "客户",
        path: "/customer",
      },
    ],
  },
  {
    name: "库存",
    path: "/inventory",
    children: [
      {
        name: "库存",
        path: "/inventory",
      },
      {
        name: "配送订单",
        path: "/distributionorder",
      },
      {
        name: "物料配送",
        path: "/distribution",
      },
    ],
  },
  {
    name: "产能",
    path: "/capacity",
    children: [
      {
        name: "技能",
        path: "/skill",
      },
      {
        name: "生产资料",
        path: "/resource",
      },
      {
        name: "换线准备规则矩阵",
        path: "/matrix",
      },
    ],
  },
  {
    name: "购买",
    path: "/buy",
    children: [
      {
        name: "采购订单",
        path: "/purchase",
      },
      {
        name: "供应商",
        path: "/supplier",
      },
      {
        name: "物料供应商",
        path: "/itemsupplier",
      },
    ],
  },
  {
    name: "生产制造",
    path: "/manufacturing",
    children: [
      {
        name: "万用日历集",
        path: "/calendarbucket",
      },
      {
        name: "生产单",
        path: "/work",
      },
      {
        name: "计划编辑器",
        path: "/planEditor",
      },
      {
        name: "操作",
        path: "/operation",
      },
      {
        name: "操作:物料清单",
        path: "/operationMaterial",
      },
      {
        name: "操作:资源清单",
        path: "/operationResource",
      },
    ],
  },
  {
    name: "系统管理",
    path: "/exec",
    children: [
      {
        name: "执行",
        path: "/load",
      },
    ],
  },
]
const vir = [
  {
    name: "供应路径",
    path: "/supplypath",
    children: [
      {
        name: "物料供应路径",
        path: "/item",
      },
      {
        name: "操作供应路径",
        path: "/operation",
      },
      {
        name: "资源供应路径",
        path: "/resource",
      },
    ],
  },
]
const treePath = (tree, path, paths = []) => {
  if (!tree) return []
  for (const data of tree) {
    paths.push(data)
    if (path === data.path) return paths
    if (data.children) {
      const findChildren = treePath(data.children, path, paths)
      if (findChildren.length) return findChildren
    }
    paths.pop()
  }
  return []
}
const findName = (routes, path: string) => {
  for (const route of routes) {
    if (path === route.path) {
      return route.name
    }
    if (route.children) {
      const result = findName(route.children, path)
      if (result) {
        return result
      }
    }
  }
}
export default () => {
  const [RouterHistory, setRouterHistory] = useSessionstorageState(
    "RouterHistory",
    [
      {
        name: "Home",
        path: "/",
        updateAt: "2020-01-01",
      },
    ]
  )
  const [{ data }] = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    const routeChangeStart = (url: string) => {
      if (url.includes("/login") || url.includes("/404")) return
      let name
      if (
        url.split("/").at(-1) === "change" ||
        url.split("/").at(-1) === "detail"
      ) {
        name =
          findName(NavBarList.concat(vir), "/" + url.split("/").at(-3)) +
          " " +
          decodeURI(url.split("/").at(-2))
      } else if (url.split("/").at(-1) === "add") {
        name =
          "增加" +
          " " +
          findName(
            NavBarList.concat(vir),
            "/" + decodeURI(url.split("/").at(-2))
          )
      } else if (url.includes("supplypath")) {
        name =
          findName(vir, "/" + url.split("/").at(-2)) +
          " " +
          decodeURI(url.split("/").at(-1))
      } else {
        name = findName(NavBarList.concat(vir), "/" + url.split("/").at(-1))
      }
      const index = RouterHistory.findIndex(({ path }) => {
        return path === url
      })
      if (index === -1) {
        if (RouterHistory.length === 10) {
          RouterHistory.splice(1, 1)
        }
        RouterHistory.push({
          name,
          path: url,
          updateAt: new Date().toLocaleString(),
        })
        setRouterHistory([...RouterHistory])
      } else {
        if (RouterHistory[index].name !== "Home") {
          RouterHistory[index].updateAt = new Date().toLocaleString()
          RouterHistory[index].name = name
        }
        setRouterHistory([
          ...RouterHistory.sort((a, b) => {
            return (
              new Date(a.updateAt).getTime() - new Date(b.updateAt).getTime()
            )
          }),
        ])
      }
    }
    router.events.on("routeChangeStart", routeChangeStart)
    return () => {
      router.events.off("routeChangeStart", routeChangeStart)
    }
  }, [])
  return (
    <Nav>
      <Container>
        <NavMeun>
          <Logo onClick={() => router.push("/")} src={LogoSvg} priority />
          <NabBar>
            {NavBarList.map(({ children, name, path: TabPath }, index) => {
              return (
                <NabBarItem key={index}>
                  {name}
                  <NabBarItemChildren>
                    {children?.map(({ name, path }, index) => {
                      return (
                        <NabBarItemChildrenItem
                          key={index}
                          onClick={() => router.push(TabPath + path)}
                        >
                          {name}
                        </NabBarItemChildrenItem>
                      )
                    })}
                  </NabBarItemChildren>
                </NabBarItem>
              )
            })}
          </NabBar>
          <NavRight>
            <Avatar
              src={AvatarSvg}
              layout='fixed'
              width={30}
              height={30}
            ></Avatar>
            <UserName>{data?.me?.data?.username || "小薇"}</UserName>
            <NabBarItemChildren style={{ width: "120px" }}>
              <NabBarItemChildrenItem
                onClick={() => {
                  localStorage.clear()
                  sessionStorage.clear()
                  setRouterHistory([
                    {
                      name: "Home",
                      path: "/",
                      updateAt: "2020-01-01",
                    },
                  ])
                  Router.replace("/login")
                }}
              >
                注销
              </NabBarItemChildrenItem>
            </NabBarItemChildren>
          </NavRight>
        </NavMeun>
        <BreadCrumbs>
          {typeof window !== "undefined" &&
            RouterHistory?.map(({ name, path }, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "13px",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "15px",
                      lineHeight: "18px",
                    }}
                    onClick={() => {
                      name === "Home" ? router.push("/") : router.push(path)
                    }}
                  >
                    {name}
                  </span>
                  <div
                    style={{
                      width: "17px",
                      height: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 3px",
                    }}
                  >
                    <svg width={10} height={10} viewBox='0 0 10 10'>
                      {index !== RouterHistory.length - 1 ? (
                        <Ploygon points='0,0 10,5 0,10' />
                      ) : (
                        <></>
                      )}
                    </svg>
                  </div>
                </div>
              )
            })}
        </BreadCrumbs>
      </Container>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  height: 90.563px;
  border: 1px solid #000;
  padding: 0;
  margin: 0;
`

const Container = styled.div`
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  position: relative;
  background: #d0d4e2;
  /* box-sizing: border-box; */
  ::after {
    content: "";
    display: block;
    clear: both;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    position: absolute;
    top: 53.56px;
    left: 0;
    width: 100%;
    height: 0px;
    background: yellow;
  }
`
const Logo = styled(Image)`
  width: 184px;
  height: 50px;
  cursor: pointer;
`
const NavMeun = styled.div`
  height: 53.56px;
  display: flex;
  /* background: yellow; */
`

const BreadCrumbs = styled.div`
  display: flex;
  height: 34.56px;
  user-select: none;
  /* background: red; */
`

const NabBar = styled.div`
  display: flex;
  height: 53.56px;
`
const NabBarItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 10px;
  height: 18px;
  line-height: 18px;
  position: relative;
  font-size: 13px;
  user-select: none;
  font-family: Open sans;
  &:hover {
    background: #a6adc8;
    ul {
      display: block;
    }
  }
`

const NabBarItemChildren = styled.ul`
  width: 200px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  display: none;
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 10;
  background: #fff;
  padding: 3px 0;
`
const NabBarItemChildrenItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`
const NavRight = styled.div`
  width: 120px;
  cursor: pointer;
  user-select: none;
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    background: #a6adc8;
    ul {
      display: block;
    }
  }
`
const Avatar = styled(Image)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`
const UserName = styled.div`
  margin-left: 10px;
`

const Ploygon = styled.polygon``

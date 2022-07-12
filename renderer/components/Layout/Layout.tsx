import dynamic from "next/dynamic"

const NossrNavBar = dynamic(() => import("./Navbar"), { ssr: false })

export const Layout = ({ children }) => {
  return (
    <>
      <NossrNavBar />
      <main>{children}</main>
    </>
  )
}

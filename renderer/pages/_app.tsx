import "moment/locale/zh-cn"
import { withUrqlClient } from "next-urql"
import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { Layout } from "../components/Layout/Layout"
import "../components/styled/global.css"
import { createUrqlClient } from "../utils/exchanges"
const NotLayoutPath = ["/login", "/register", "/SvgTest", "test"]

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <title
          onClick={() => {
            window.location.href = "/"
          }}
        >
          APSU | MES
        </title>
      </Head>
      {NotLayoutPath.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  )
}

export default withUrqlClient(createUrqlClient)(MyApp)

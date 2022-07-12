import { AuthConfig, authExchange } from "@urql/exchange-auth"
import { cacheExchange, CacheExchangeOpts } from "@urql/exchange-graphcache"
import { NextUrqlClientConfig } from "next-urql"
import { dedupExchange, fetchExchange, makeOperation } from "urql"
import { calendar } from "./changeFile/calendar"
import { calendarBucket } from "./changeFile/calendarBucket"
import { customer } from "./changeFile/customer"
import { distribution } from "./changeFile/distribution"
import { distributionOrderCahceFile } from "./changeFile/distributionorder"
import { inventory } from "./changeFile/inventory"
import { Item } from "./changeFile/Item"
import { LLocation } from "./changeFile/location"
import { matrix } from "./changeFile/matrix"
import { operation } from "./changeFile/operation"
import { operationMaterial } from "./changeFile/operationMaterial"
import { operationResource } from "./changeFile/operationResource"
import { order } from "./changeFile/order"
import { purchaseCache } from "./changeFile/purchaseCache"
import { resource } from "./changeFile/resource"
import { skillchange } from "./changeFile/skill"
import { supplier } from "./changeFile/supplier"
import { supplier_item } from "./changeFile/supplier_item"
import { user } from "./changeFile/user"
import { work } from "./changeFile/work"
import { errorExchange } from "./errorExchange"

export const cacheExchangeConfig: CacheExchangeOpts = {
  keys: {
    UserCreateResponse: () => null,
    Token: () => null,
    ItemsResponse: () => null,
    LocationsResponse: () => null,
    CustomersResponse: () => null,
    OrdersResponse: () => null,
    ResourcesResponse: () => null,
    InventorysResponse: () => null,
    DistributionsResponse: () => null,
    OperationsResponse: () => null,
    OperationResponse: () => null,
    WorksResponse: () => null,
    Item: () => null,
    SuppliersResponse: () => null,
    Location: () => null,
    Resource: () => null,
    OperationResource: () => null,
    OperationMaterial: () => null,
    Nodes: () => null,
    NodesResponse: () => null,
    CalendarsResponse: () => null,
    SchedulesResponse: () => null,
    MatrixsResponse: () => null,
    ItemSuppliersResponse: () => null,
    Operation: () => null,
    OperationResourcesResponse: () => null,
    FieldError: () => null,
    OperationMaterialsResponse: () => null,
    PurchasesResponse: () => null,
    SkillsResponse: () => null,
    ResourceSkillsResponse: () => null,
    CalendarBucketsResponse: () => null,
    DistributionOrdersResponse: () => null,
  },
  updates: {
    Mutation: {
      ...Item,
      ...user,
      ...customer,
      ...order,
      ...resource,
      ...inventory,
      ...distribution,
      ...work,
      ...operationResource,
      ...operationMaterial,
      ...calendar,
      ...matrix,
      ...supplier_item,
      ...supplier,
      ...purchaseCache,
      ...calendarBucket,
      ...LLocation,
      ...operation,
      ...skillchange,
      ...distributionOrderCahceFile,
    },
  },
}

const getAuth: AuthConfig<{ token: string }>["getAuth"] = async ({
  authState,
  mutate,
}) => {
  if (!authState) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) return { token }
    }
    return null
  }
  return null
}

const addAuthToOperation: AuthConfig<{
  token: string
}>["addAuthToOperation"] = ({ authState, operation }) => {
  if (!authState || !authState.token) return operation

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {}

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
      credentials: "include",
    },
  })
}

export const authConfig: AuthConfig<{ token: string }> = {
  getAuth,
  addAuthToOperation,
}
//"http://localhost:5000/graphql"
export const createUrqlClient: NextUrqlClientConfig = (ssrExchange, ctx) => ({
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/graphql"
      : process.env.NEXT_PUBLIC_SERVER_URL,
  // url: "https://www.kknd.cn/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange(cacheExchangeConfig),
    authExchange(authConfig),
    errorExchange,
    fetchExchange,
    ssrExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
})

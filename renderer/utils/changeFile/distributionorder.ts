import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateDistributionOrderMutation,
  DeletedistributionOrdersMutation,
  DistributionOrdersDocument,
  DistributionOrdersQuery,
  UpdateDistributionOrderMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const distributionOrderCahceFile = {
  createDistributionOrder: (
    result: DataFields,
    _args: Variables,
    cache: Cache,
    _info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "distributionOrders")
      .forEach((field) => {
        betterUpdateQuery<
          CreateDistributionOrderMutation,
          DistributionOrdersQuery
        >(
          cache,
          { query: DistributionOrdersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createDistributionOrder.errors) return query
            if (query?.distributionOrders)
              query.distributionOrders.data = [
                ...query.distributionOrders.data,
                result.createDistributionOrder.data,
              ]
            return query
          }
        )
      })
  },
  updateDistributionOrder: (
    result: DataFields,
    _args: Variables,
    cache: Cache,
    _info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "distributionOrders")
      .forEach((field) => {
        betterUpdateQuery<
          UpdateDistributionOrderMutation,
          DistributionOrdersQuery
        >(
          cache,
          { query: DistributionOrdersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateDistributionOrder.errors) return query
            query.distributionOrders.data = query.distributionOrders.data.map(
              (i) =>
                i.id === result.updateDistributionOrder.data.id
                  ? result.updateDistributionOrder.data
                  : i
            )
            return query
          }
        )
      })
  },
  deletedistributionOrders: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    _info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "distributionOrders")
      .forEach((field) => {
        betterUpdateQuery<
          DeletedistributionOrdersMutation,
          DistributionOrdersQuery
        >(
          cache,
          { query: DistributionOrdersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletedistributionOrders) return query
            query.distributionOrders.data =
              query.distributionOrders.data.filter(
                (i) => ![...(args.ids as number[])].includes(i.id)
              )
            return query
          }
        )
      })
  },
}

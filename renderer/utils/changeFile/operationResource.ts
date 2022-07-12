import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateOperationResourceMutation,
  DeleteoperationResourcesMutation,
  OperationResourcesDocument,
  OperationResourcesQuery,
  UpdateOperationResourceMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const operationResource = {
  createOperationResource: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    console.log(cache.inspectFields("Query"))
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operationResources")
      .forEach((field) => {
        betterUpdateQuery<
          CreateOperationResourceMutation,
          OperationResourcesQuery
        >(
          cache,
          { query: OperationResourcesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createOperationResource.errors) return query
            query.operationResources.data = [
              ...query.operationResources.data,
              result.createOperationResource.data,
            ]
            return query
          }
        )
      })
  },

  updateOperationResource: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operationResources")
      .forEach((field) => {
        betterUpdateQuery<
          UpdateOperationResourceMutation,
          OperationResourcesQuery
        >(
          cache,
          { query: OperationResourcesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateOperationResource.errors) return query
            query.operationResources.data = query.operationResources.data.map(
              (i) =>
                i.id === result.updateOperationResource.data.id
                  ? result.updateOperationResource.data
                  : i
            )
            return query
          }
        )
      })
  },
  deleteoperationResources: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operationResources")
      .forEach((field) => {
        betterUpdateQuery<
          DeleteoperationResourcesMutation,
          OperationResourcesQuery
        >(
          cache,
          { query: OperationResourcesDocument, variables: field.arguments },
          result,
          (result, query) => {
            console.log({ result, query })
            if (!result.deleteoperationResources) return query
            query.operationResources.data =
              query.operationResources.data.filter(
                (i) => ![...(args.ids as number[])].includes(i.id)
              )
            return query
          }
        )
      })
  },
}

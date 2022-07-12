import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateOperationMaterialMutation,
  DeleteoperationMaterialsMutation,
  OperationMaterial,
  OperationMaterialsDocument,
  OperationMaterialsQuery,
  UpdateOperationMaterialMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const operationMaterial = {
  createOperationMaterial: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operationMaterials")
      .forEach((field) => {
        betterUpdateQuery<
          CreateOperationMaterialMutation,
          OperationMaterialsQuery
        >(
          cache,
          { query: OperationMaterialsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createOperationMaterial.errors) return query
            query.operationMaterials.data = [
              ...(query.operationMaterials.data as OperationMaterial[]),
              result.createOperationMaterial.data as OperationMaterial,
            ]
            return query
          }
        )
      })
  },
  updateOperationMaterial: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operationMaterials")
      .forEach((field) => {
        betterUpdateQuery<
          UpdateOperationMaterialMutation,
          OperationMaterialsQuery
        >(
          cache,
          { query: OperationMaterialsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateOperationMaterial.errors) return query
            query.operationMaterials.data = query.operationMaterials.data.map(
              (i) =>
                i.id === result.updateOperationMaterial.data.id
                  ? (result.updateOperationMaterial.data as OperationMaterial)
                  : i
            )
            return query
          }
        )
      })
  },
  deleteoperationMaterials: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    console.log({ a: cache.inspectFields("Query") })

    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operationMaterials")
      .forEach((field) => {
        betterUpdateQuery<
          DeleteoperationMaterialsMutation,
          OperationMaterialsQuery
        >(
          cache,
          { query: OperationMaterialsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteoperationMaterials) return query
            query.operationMaterials.data =
              query.operationMaterials.data.filter(
                (i) => ![...(args.ids as number[])].includes(i.id)
              )
            return query
          }
        )
      })
  },
}

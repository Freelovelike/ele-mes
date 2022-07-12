import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateMatrixMutation,
  DeletematrixsMutation,
  MatrixsDocument,
  MatrixsQuery,
  UpdateMatrixMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const matrix = {
  createMatrix: (
    result: DataFields,
    _args: Variables,
    cache: Cache,
    _info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "matrixs")
      .forEach((field) => {
        betterUpdateQuery<CreateMatrixMutation, MatrixsQuery>(
          cache,
          { query: MatrixsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createMatrix.errors) return query
            query.matrixs.data = [
              ...query.matrixs.data,
              result.createMatrix.data,
            ]
            return query
          }
        )
      })
  },
  deletematrixs: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "matrixs")
      .forEach((field) => {
        betterUpdateQuery<DeletematrixsMutation, MatrixsQuery>(
          cache,
          { query: MatrixsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletematrixs) return query
            query.matrixs.data = query.matrixs.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
  updateMatrix: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "matrixs")
      .forEach((field) => {
        betterUpdateQuery<UpdateMatrixMutation, MatrixsQuery>(
          cache,
          { query: MatrixsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.updateMatrix.data.id) return query
            query.matrixs.data = query.matrixs.data.map((i) =>
              i.id === result.updateMatrix.data.id
                ? result.updateMatrix.data
                : i
            )
            return query
          }
        )
      })
  },
}

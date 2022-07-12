import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateOperationMutation,
  DeleteoperationsMutation,
  Operation,
  OperationsDocument,
  OperationsQuery,
  UpdateOperationMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
const operation = {
  deleteoperations: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operations")
      .forEach((field) => {
        betterUpdateQuery<DeleteoperationsMutation, OperationsQuery>(
          cache,
          { query: OperationsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteoperations) return query
            query.operations.data = query.operations.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
  createOperation: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operations")
      .forEach((field) => {
        betterUpdateQuery<CreateOperationMutation, OperationsQuery>(
          cache,
          { query: OperationsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createOperation.errors) return query
            query.operations.data = [
              result.createOperation.data as Operation,
              ...query.operations.data,
            ]
            return query
          }
        )
      })
  },
  updateOperation: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "operations")
      .forEach((field) => {
        betterUpdateQuery<UpdateOperationMutation, OperationsQuery>(
          cache,
          { query: OperationsDocument, variables: field.arguments },
          result,
          (result, query) => {
            console.log("update")

            if (result.updateOperation.errors) return query
            query.operations.data = query.operations.data.map((i) =>
              i.id === result.updateOperation.data.id
                ? (result.updateOperation.data as Operation)
                : i
            )
            return query
          }
        )
      })
  },
}

export { operation }

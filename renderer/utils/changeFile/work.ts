import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateWorkMutation,
  DeleteworksMutation,
  UpdateWorkMutation,
  Work,
  WorksDocument,
  WorksQuery,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const work = {
  createWork: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "works")
      .forEach((field) => {
        betterUpdateQuery<CreateWorkMutation, WorksQuery>(
          cache,
          { query: WorksDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createWork.errors) return query
            if (query?.works)
              query.works.data = [
                ...(query.works.data as Work[]),
                result.createWork.data as Work,
              ]
            return query
          }
        )
      })
  },
  updateWork: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "works")
      .forEach((field) => {
        betterUpdateQuery<UpdateWorkMutation, WorksQuery>(
          cache,
          { query: WorksDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateWork.errors) return query
            query.works.data = query.works.data.map((i) =>
              i.id === result.updateWork.data.id
                ? (result.updateWork.data as Work)
                : i
            )
            return query
          }
        )
      })
  },
  deleteworks: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    console.log("deleteWork", result, args, cache, info)
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "works")
      .forEach((field) => {
        betterUpdateQuery<DeleteworksMutation, WorksQuery>(
          cache,
          { query: WorksDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteworks) return query
            query.works.data = query.works.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}

import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateResourceMutation,
  DeleteresourcesMutation,
  ResourcesDocument,
  ResourcesQuery,
  UpdateResourceMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const resource = {
  createResource: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    console.log(cache.inspectFields("Query"))
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "resources")
      .forEach((field) => {
        betterUpdateQuery<CreateResourceMutation, ResourcesQuery>(
          cache,
          { query: ResourcesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createResource.errors) return query
            if (query.resources.data.length === 0) return query
            query.resources.data = [
              ...query.resources.data,
              result.createResource.data,
            ]
            return query
          }
        )
      })
  },
  updateResource: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "resources")
      .forEach((field) => {
        betterUpdateQuery<UpdateResourceMutation, ResourcesQuery>(
          cache,
          { query: ResourcesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateResource.errors) return query
            query.resources.data = query.resources.data.map((i) =>
              i.id === result.updateResource.data.id
                ? result.updateResource.data
                : i
            )
            return query
          }
        )
      })
  },
  deleteresources: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "resources")
      .forEach((field) => {
        betterUpdateQuery<DeleteresourcesMutation, ResourcesQuery>(
          cache,
          { query: ResourcesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteresources) return query
            query.resources.data = query.resources.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}

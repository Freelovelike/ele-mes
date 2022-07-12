import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateLocationMutation,
  DeletelocationsMutation,
  LocationsDocument,
  LocationsQuery,
  UpdateLocationMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
const LLocation = {
  deletelocations: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "locations")
      .forEach((field) => {
        betterUpdateQuery<DeletelocationsMutation, LocationsQuery>(
          cache,
          { query: LocationsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletelocations) return query
            query.locations.data = query.locations.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
  createLocation: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "locations")
      .forEach((field) => {
        betterUpdateQuery<CreateLocationMutation, LocationsQuery>(
          cache,
          { query: LocationsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createLocation.errors) return query
            query.locations.data = [
              result.createLocation.data,
              ...query.locations.data,
            ]
            return query
          }
        )
      })
  },
  updateLocation: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "locations")
      .forEach((field) => {
        betterUpdateQuery<UpdateLocationMutation, LocationsQuery>(
          cache,
          { query: LocationsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateLocation.errors) return query
            query.locations.data = query.locations.data.map((i) =>
              i.id === result.updateLocation.data.id
                ? result.updateLocation.data
                : i
            )
            return query
          }
        )
      })
  },
}

export { LLocation }

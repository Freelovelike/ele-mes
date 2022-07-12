import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateSkillMutation,
  DeleteskillsMutation,
  SkillsDocument,
  SkillsQuery,
  UpdateSkillMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const skillchange = {
  createSkill: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "skills")
      .forEach((field) => {
        betterUpdateQuery<CreateSkillMutation, SkillsQuery>(
          cache,
          { query: SkillsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createSkill.errors) return query
            query.skills.data = [...query.skills.data, result.createSkill.data]
            return query
          }
        )
      })
  },
  updateSkill: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "skills")
      .forEach((field) => {
        betterUpdateQuery<UpdateSkillMutation, SkillsQuery>(
          cache,
          { query: SkillsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateSkill.errors) return query
            query.skills.data = [...query.skills.data, result.updateSkill.data]
            return query
          }
        )
      })
  },
  deleteskills: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "skills")
      .forEach((field) => {
        betterUpdateQuery<DeleteskillsMutation, SkillsQuery>(
          cache,
          { query: SkillsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteskills) return query
            query.skills.data = query.skills.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}

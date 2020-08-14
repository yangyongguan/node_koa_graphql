import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import { Activity } from './activity'
import { UserList } from './user'

/* 汇总 并创建查询对象 */
let QueryObj = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    activityInfo: Activity,
    userList: UserList
  })
})

/* 创建 Schema 对象 */
export default  new GraphQLSchema({
  query: QueryObj
})

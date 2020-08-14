import {
  GraphQLSchema,
  GraphQLObjectType // 对象类型
} from 'graphql'

import { Activity } from './activity'
import { UserList } from './user'

/* 查询对象 */
let QueryObj = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    activityInfo: Activity,
    userList: UserList
  })
})

export default  new GraphQLSchema({
  query: QueryObj
})

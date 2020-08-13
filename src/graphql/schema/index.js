import {
  GraphQLSchema,
  GraphQLObjectType, // 对象类型
  GraphQLString, // 字符串类型
  GraphQLInt // int类型
} from 'graphql'
import ActivityController from '../../controller/ActivityController'

/* 定义活动信息对象 */
const activityType = new GraphQLObjectType({
  name: 'activity',
  description: '活动信息对象',
  fields() {
    return {
      id: { type: GraphQLInt },
      title: { type: GraphQLString },
      imgUrl: { type: GraphQLString },
      description: { type: GraphQLString },
      startTime: { type: GraphQLString }
    }
  }
})

/* 定义用户列表对象 */
const ActivityInfo = {
  name: 'ActivityInfo',
  type: activityType,
  args: { //定义参数
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  async resolve(parent, args, context, info) {
    let result = await ActivityController.queryActivityInfoById(args.id).then((res) => {
      return res
    })
    return result.data.activity;
  }
}

/* 用户列表查询对象 */
let QueryObj = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    activityInfo: ActivityInfo
  })
})

export default  new GraphQLSchema({
  query: QueryObj
})

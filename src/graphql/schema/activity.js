import {
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

/* 定义活动对象 */
export const Activity = {
  name: 'ActivityInfo',
  type: activityType,
  args: { //定义参数
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  async resolve(parent, args, context, info) {
    /* 请求接口 */
    let result = await ActivityController.queryActivityInfoById(args.id).then((res) => {
      return res
    })
    return result.data.activity;
  }
}

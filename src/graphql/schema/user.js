import {
  GraphQLSchema,
  GraphQLObjectType, // 对象类型
  GraphQLList, // 数组类型
  GraphQLString, // 字符串类型
  GraphQLInt, // int类型
  GraphQLFloat // float类型
} from 'graphql'
import LiveInfo from '../data/liveInfo.json'

/* 定义单个用户对象 */
const UserType = new GraphQLObjectType({
  name: 'User',
  description: '单个用户对象', // 这里写详细点有助于自动生成文档，减少前后端沟通成本
  fields() {
    return {
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      money: { type: GraphQLFloat }
    }
  }
})

/* 定义用户列表对象 */
const UserList = {
  name: 'UserList',
  type: new GraphQLList(UserType),
  async resolve(root, params, options) {
    // let result = await ArticleController.queryArticle({
    //   id: params.id,
    //   limit: params.limit,
    //   skip: params.skip
    // });
    return LiveInfo.data.userList;
  }
}

/* 用户列表查询对象 */
let userListQueryObj = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    userList: UserList
  })
})

export default  new GraphQLSchema({
  query: userListQueryObj
})

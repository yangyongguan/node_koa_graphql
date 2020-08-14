import {
  GraphQLObjectType, // 对象类型
  GraphQLList, // 数组类型
  GraphQLString, // 字符串类型
  GraphQLInt, // int类型
  GraphQLFloat // float类型
} from 'graphql'
import LiveInfo from '../data/liveInfo.json'

/* 定义账户对象 模型 */
const AccountType = new GraphQLObjectType({
  name: 'account',
  description: '用户下的账户对象',
  fields() {
    return {
      username: { type: GraphQLString },
      paasword: { type: GraphQLString }
    }
  }
})

/* 定义用户对象 模型 */
const UserType = new GraphQLObjectType({
  name: 'User',
  description: '单个用户对象', // 这里写详细点有助于自动生成文档，减少前后端沟通成本
  fields() {
    return {
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      money: { type: GraphQLFloat },
      friends: { type: new GraphQLList(GraphQLString) },
      account: { type: AccountType }
    }
  }
})

/* 定义用户列表 resolvers解析器（决定查询）返回什么数据 */
export const UserList = {
  name: 'UserList',
  type: new GraphQLList(UserType),
  async resolve(root, params, options) {
    return LiveInfo.data.userList
  }
}

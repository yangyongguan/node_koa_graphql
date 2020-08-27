import {
  GraphQLObjectType, // 对象类型
  GraphQLList, // 数组类型
  GraphQLString, // 字符串类型
  GraphQLInt, // int类型
  GraphQLFloat, // float类型
  GraphQLScalarType
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

/*
* 自定义类型类型，用于解决数据类型可能会有多种类型， 模型
* https://www.apollographql.com/docs/apollo-server/schema/scalars-enums
*/
const MyDate = new GraphQLScalarType({
  name: 'MyDate',
  description: '自定义的 Date 类型',
  // 返回的数据
  serialize(value) {
    // value sent to the client
    // Implement custom behavior by setting the 'result' variable
    if (typeof value === 'number') {
      return new Date(value).format('yyyy-MM-dd hh:mm:ss')
    }
    return value
  },
  parseValue(value) {
    // value from the client
    // Implement custom behavior here by setting the 'result' variable
    return value
  },
  parseLiteral(ast) {
    // return a literal value, such as 1 or 'static string'
    return ast.value
  }
})

/* 定义用户对象 模型 */
const UserType = new GraphQLObjectType({
  name: 'User',
  description: '单个用户对象', // 这里写详细点有助于自动生成文档，减少前后端沟通成本
  fields() {
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      money: { type: GraphQLFloat },
      friends: { type: new GraphQLList(GraphQLString) },
      time: { type: MyDate },
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

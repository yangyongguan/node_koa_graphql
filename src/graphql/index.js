import { gql } from 'apollo-server-koa'
import LiveInfo from './data/liveInfo.json'
/*
    GraphQL 自带一组默认标量类型：
    Int：有符号 32 位整数。
    Float：有符号双精度浮点值。
    String：UTF‐8 字符序列。
    Boolean：true 或者 false。
    ID：ID 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。ID 类
    https://www.apollographql.com/docs/apollo-server/schema/schema/#scalar-types
*/
export const typeDefs = gql`
  # 模型
  type User {
    name: String,
    age: Int,
    money: Float
  }
  type Activity {
    id: Int!,
    title: String!,
    imgUrl: String,
    description: String,
    startTime: String
  }
  type JoinInfo {
    isApplay: Boolean,
    isOrder: Boolean
  }

  # 查询
  type Query {
    userList: [User],
    activityInfo: Activity,
    joinInfo: JoinInfo
  }
`;
// 解析器（决定查询）返回什么数据
export const resolvers = {
  Query: {
    userList: () => LiveInfo.data.userList,
    activityInfo: () => LiveInfo.data.activity,
    joinInfo: () => LiveInfo.data.joinInfo
  }
};

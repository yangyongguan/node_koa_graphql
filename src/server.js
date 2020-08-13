import koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-body'
import { ApolloServer, gql } from 'apollo-server-koa'
import schema from './graphql/index'
const app = new koa()
const router = new KoaRouter()
import FetchTool from './utils/fetchTool'
// import schema from './src/graphql/schema.js'
// import executableSchema from './src/graphql/executableSchema'
// router.post('/graphql', koaBody(), graphqlKoa({ schema: executableSchema }))
// router.get('/graphql', graphqlKoa({ schema: executableSchema }))
// router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

const books = [{
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
}, {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
}];
const typeDefs = gql`
  # 模型
  type Book {
    title: String
    author: String
  }

  # 查询
  type Query {
    books: [Book]
  }
`;
// 解析器（决定查询，突变）返回什么数据
const resolvers = {
    Query: {
        books: () => books,
    },
};

// 创建Graphql server
const server = new ApolloServer({
    typeDefs, resolvers
})
//apollo server使用koa中间件
server.applyMiddleware({app})
router.get('/activity/info', async ctx => {
    await FetchTool.$post('/frontend/live/info', {
        activityId: ctx.params.activityId
    }).then((res) => {
        ctx.body = res
    }).catch((error) => {
        ctx.body = error
    })
})
router.post('/', ctx => {
    ctx.body = "post 哈哈哈"
})
router.all('/', ctx => {
    ctx.body = "post get 哈哈哈"
})
app.use(koaBody())
.use(async (ctx, next) => {
    ctx.params = {
        ...ctx.query,
        ...ctx.request.body
    }
    await next()
})
.use(router.routes())
.use(router.allowedMethods())
app.listen(3000, console.log("app is start at port 3000"))

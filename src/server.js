import koa from 'koa'
import KoaRouter from '@koa/router'
import koaBody from 'koa-body'
import { ApolloServer } from 'apollo-server-koa'
import FetchTool from './utils/fetchTool'
// import { resolvers, typeDefs } from './graphql/index'
import schema from './graphql/schema/index'
// import schema from './graphql/schema/user'
const app = new koa()
const router = new KoaRouter()

// router.post('/graphql', koaBody(), graphqlKoa({ schema: executableSchema }))
// router.get('/graphql', graphqlKoa({ schema: executableSchema }))
// router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

/* 创建Graphql server */
// const server = new ApolloServer({
//     typeDefs, resolvers
// })
/* 自建立schema */
const server = new ApolloServer({
  schema
})

/* apollo server使用koa中间件 */
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

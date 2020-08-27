import koa from 'koa'
import KoaRouter from '@koa/router'
import koaBody from 'koa-body'
import { ApolloServer, ApolloError } from 'apollo-server-koa'
import FetchTool from './utils/fetchTool'
import './utils/extend'
// import { resolvers, typeDefs } from './graphql/index'
// import schema from './graphql/schema/user'
import schema from './graphql/schema/index'
const app = new koa()
const router = new KoaRouter()

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
router.redirect("/vhall", "graphql");
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

/* 创建Graphql server */
// const server = new ApolloServer({
//     typeDefs, resolvers
// })
/* 自建立schema */
const server = new ApolloServer({
  schema,
  debug: false,
  formatError: error => {
    console.warn(error)
    return new ApolloError('请求参数错误', 500, {
      code: error.extensions.code,
      msg: error.extensions.exception,
      path: error.path
    })
  },
  context: ctx => {
    // 用户认证之类可以在此做
    const isLogin = true
    if (!isLogin) {
      // 认证失败，抛出错误
      throw new ApolloError('用户认证失败', 502);
    }
  }
})
/* apollo server使用koa中间件 */
server.applyMiddleware({ app })
app.listen(3000, console.log("app is start at port 3000"))

const Koa = require('koa');
const app = new Koa();
const {ApolloServer, gql} = require('apollo-server-koa'); // graphql-koa插件
const schema = require('./server/graphql/index.js'); //自定义的GraphQL的表

const server = new ApolloServer({ //创建Graphql server
    schema,
    context: ({ ctx }) => {
        // let token = ctx.
    }
});
server.applyMiddleware({app}); //apollo server使用koa中间件

app.listen(9527, ()=> { //监听端口
    console.log(`server running success at ${server.graphqlPath}`)
})

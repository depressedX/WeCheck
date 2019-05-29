const Koa = require('koa')


const app=  new Koa()
app.use(function(ctx){
    ctx.body = JSON.stringify({
        status:404,
        message:'I was missing',
        data:{}
    })
})

app.listen(3000)
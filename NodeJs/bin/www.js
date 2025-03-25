let app = require('../app')
let port = 3001

let createServe = require('../socket/index')
const server = app.listen(8000)

createServe(server)

app.listen(port,()=>{
    console.log('服务器已启动，端口号为' + port)
})

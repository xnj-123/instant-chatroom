const {Server} = require('socket.io')
const db = require('../mysql/index')
module.exports = function (httpServe){
    const io = new Server(httpServe,{
        cors:{
            origin:'*'
        }
    })
    let users = {}
    io.on('connection', socket=>{
        socket.on('login',(id)=>{
            users[id] = socket.id;
            socket.name = id;
            console.log(id+'Id用户上线了，机号为'+users[id],users)
        })
        socket.on('disconnect',()=>{
            if(users.hasOwnProperty(socket.name)){
                delete users[socket.name]
                console.log(socket.name+'Id用户离开了，机号为'+socket.id)
            }
        })
        socket.on('sendM',async(message)=>{
            let {sendId,receiveID,content,Ctype} = message
            try {
                await db.query(`INSERT INTO singleChat (sendId, receiveID, content, Ctype,status)
                 VALUES (?, ?,?, ?,1);`,[sendId,receiveID,content,Ctype])
                
                if(users[receiveID]){
                    socket.to(users[receiveID]).emit('getM')
                }
                
            } catch (error) {
            console.log(error) 
            }   
        })

    })
}
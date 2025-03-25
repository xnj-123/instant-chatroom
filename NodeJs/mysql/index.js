let mysql = require('mysql')

let tables = require('./table')

let dbConfig = {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'chatroom',
    waitForConnections: true,  
    connectionLimit: 10,  
    queueLimit: 0  
}

let pool = mysql.createPool(dbConfig)

function query(sql,params){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
                return;}
            connection.query(sql,params,(err,data)=>{
                if(err){
                    reject(err)
                    return;
                }
                resolve(data)
                connection.release()
            })
        })
    })
}

async function ensureTableExists(tableDefinition) {  
    try {  
        await query(tableDefinition);  
    } catch (err) {  
        console.error('Error creating table:', err);  
    }  
}  

let promises = tables.map(item => ensureTableExists(item));  

Promise.all(promises)  
  .then(() => {  
    console.log('所有表都已成功创建或已存在');  
  })  
  .catch(err => {  
    console.error('在创建表时发生错误:', err);  
  });  
  
module.exports = {
    query
}
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

let db = require('../../mysql');

let sendM = require('../../utils/sendMail');
let randNum = require('../../utils/randNum');

let config = require('../../config')

let tokenmidddle = require('../../middleware/tokenmiddle')

router.post('/' , (req,res,next)=>{
    res.json({
        messahe:'adw'
    })
})

router.get('/getcode/:email',async (req,res,next)=>{
    let email = req.params.email;
    const code = randNum.generateVerificationCode();
    try {
        let x = await db.query('SELECT * FROM users WHERE email = ?',[email])
        if(x.length > 0){
            res.json({
                code:404,
                message:'账号已存在'
            })
        }else{
            await sendM.sendVerificationEmail(email,code);       
            res.json({
                code:200
            })
        
            db.query('SELECT * FROM verification WHERE email = ?',[email]).then(async data=>{
                try {
                    await db.query('INSERT INTO verification (email, code, codeDate) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE  code = VALUES(code), codeDate = VALUES(codeDate);',[email,code])            
                } catch (error) {
                    console.log(error)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            code:404,
            message:error
        })  
    }


})

router.post('/register',async (req,res,next)=>{
    let {email,username,password,validate} = req.body;
    console.log(email)
    let avatar = 'http://127.0.0.1:3000/images/1.jpg'
    try {
        let a = await db.query('SELECT * FROM verification WHERE email = ?;',[email])
        if(a.length == 0){
            res.json({
                code:404,
                messgae:'邮箱未验证'
            })
        }
        else if(a[0].code != validate){
            res.json({
                code:404,
                message:'验证码错误'
            })
        }
        else if(new Date() - a[0].codeDate > 70000){
            res.json({
                code:404,
                message:'验证码已失效'
            })
        }
        else{
            await db.query('INSERT INTO users (username,email,password,avatar) VALUES (?,?,?,?)',[username,email,password,avatar])
            res.json({
                code:200,
                data:null
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            code:'404',
            message:error
        })
    }
})

router.post('/login',async (req,res,next)=>{
    let {email,password} = req.body;
    try {
        let result = await db.query('SELECT * from users WHERE email=?',[email])
        if(result.length==0){
            res.json({
                code:404,
                message:'不存在该用户'
            })
        }
        else if(result[0].password != password){
            res.json({
                code:404,
                message:'密码错误'
            })
        }
        else{
            let userId = result[0].id;
            let token = jwt.sign({email,userId},config.KEYTOKRN,{
                expiresIn: 60 * 60 *24*7
            })
            res.json({
                code:200,
                token:token
            })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/getUserInfo',tokenmidddle,(req,res,next)=>{
    let {email} = req.user
    db.query('SELECT * FROM users WHERE email = ?',[email]).then(data=>{
        res.json({
            code:'200',
            message:'成功',
            data:data[0]
        })
    }).catch(err=>console.log(err))
        
})

router.get('/searchUser/:username',tokenmidddle,async (req,res,next)=>{
    let {userId} = req.user;
    let username = req.params.username
    try {
        let result = await db.query(`SELECT * FROM users WHERE username LIKE '%${username}%' AND id <> ${userId};`);
        let people = result.map(user =>({id:user.id,username:user.username,email:user.email,avatar:user.avatar}));
        res.json({
            code:200,
            data:people
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/addFriend/:friendId',tokenmidddle,async (req,res,next)=>{
    let {userId} = req.user;
    let friendID = req.params.friendId;
    try {
        let result = await db.query(`SELECT * FROM Friends WHERE (userid = ${userId} AND friendID = ${friendID}) OR (userid = ${userId} AND friendID = ${friendID});`);
        if(result.length>0){
            res.json({
                code:304,
                message:'已发送好友申请或已是好友'
            })
        }else{
            await db.query(`INSERT INTO friends (userid, friendID, state) VALUES (${userId}, ${friendID}, 2);`)
            await db.query(` INSERT INTO friends (userid, friendID, state) VALUES (${friendID}, ${userId}, 1);`)
            res.json({
                code:200,
                message:'已发送好友申请'
            })
        }
    } catch (error) {
        
    }
})

router.get('/getFriendState',tokenmidddle,(req,res,next)=>{
    let {userId} = req.user
    db.query(`SELECT   
    f.id AS friend_request_id,  
    u.id AS friend_id,  
    u.username,  
    u.avatar, 
    u.email, 
    f.addTime,  
    f.state  
FROM   
    Friends f  
JOIN   
    users u ON f.friendID = u.id  
WHERE   
    f.userid = ${userId} AND   
    (f.state = 1 OR f.state = 2)
    ORDER BY     
    f.addTime DESC;`,[userId]).then(data=>{
        res.json({
            code:200,
            data,
        })
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/agreeFriend/:friendId',tokenmidddle,async (req,res,next)=>{
    let {userId} = req.user;
    let friendID = req.params.friendId;
    
    try {
        await db.query(`UPDATE friends SET state = 0 WHERE userid = ? AND friendID = ?;`,[userId,friendID]);
        await db.query(`UPDATE friends SET state = 0 WHERE userid = ? AND friendID = ?;`,[friendID,userId]);
        res.json({
            code:200,
            message:'添加成功'
        })
        db.query(`INSERT INTO singleChat (sendId, receiveID, content, Ctype, status) VALUES (?, ?,'我们已经是好友了，你可以和我聊天', 0, 1);`,[userId,friendID])
    } catch (error) {
        console.log(error)
    }
})

router.get('/rejectFriend/:friendId',tokenmidddle,async (req,res,next)=>{
    let {userId} = req.user;
    let friendID = req.params.friendId;
    
    try {
        await db.query(`DELETE FROM friends WHERE userid = ? AND friendID = ?;`,[userId,friendID]);
        await db.query(`DELETE FROM friends WHERE userid = ? AND friendID = ?;`,[friendID,userId]);
        res.json({
            code:200,
            message:'添加成功'
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/getFriendList',tokenmidddle,async (req,res,next)=>{
    let {userId} = req.user;
    db.query(`SELECT u.*  
FROM users u  
JOIN friends f ON u.id = f.friendID  
WHERE f.userid = ? AND f.state = 0;
`,[userId]).then(data=>{
        res.json({
            code:200,
            data
        })
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/getChat/:friendId',tokenmidddle,(req,res,next)=>{
    let {userId} = req.user;
    let friendId = req.params.friendId
    db.query(`SELECT   
    latestMessages.*,  
    (SELECT COUNT(*) FROM singleChat WHERE (sendId = ${friendId} AND receiveID = ${userId} AND status = 1)) AS unreadCount  
FROM (  
    SELECT sc1.*  
    FROM singleChat sc1  
    INNER JOIN (  
        SELECT   
            CASE   
                WHEN sendId = ${userId} THEN receiveID   
                ELSE sendId   
            END AS otherId,  
            MAX(Ctime) AS latestTime  
        FROM singleChat  
        WHERE (sendId = ${userId} AND receiveID = ${friendId}) OR (sendId = ${friendId} AND receiveID = ${userId})  
        GROUP BY otherId  
    ) sc2 ON (sc1.sendId = sc2.otherId AND sc1.receiveID = ${userId} AND sc1.Ctime = sc2.latestTime)  
       OR (sc1.sendId = ${userId} AND sc1.receiveID = sc2.otherId AND sc1.Ctime = sc2.latestTime)  
) AS latestMessages;`).then(data=>{
        res.json({
            code:200,
            data:data[0]
        })
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/getChatMessage',tokenmidddle,async (req,res,next)=>{
    let {userId} = req.user;
    let {friendId} = req.body;
    try {
        let res1 = await db.query(`SELECT * FROM singlechat WHERE (sendId = ${userId} AND receiveID = ${friendId}) 
        OR (sendId = ${friendId} AND receiveID = ${userId}) ORDER BY Ctime ASC  `)
        let res2 = await db.query('SELECT * FROM users WHERE id=?',[friendId])
        res.json({
            code:200,
            data:{
                friendInfo:res2[0],
                message:res1
            }
        })
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router;
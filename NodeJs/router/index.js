let express = require('express');
const path = require('path');

let router = express.Router();


router.get('/',async (req,res,next)=>{
    res.json({
        code:200
    })
})


module.exports = router;
var userService = require('./userService');

var createUserControllerFn = async(req,res)=>
{
    try
    {
        console.log(req.body);
        var status = await userService.createUserDBService(req.body)
        console.log(status)
        if(status){
            res.send({"status":true,"message":"User created successfully"});
        }
        else {
            res.send({"status":false,"message":"Error creating user"});
        }
    }
    catch(err){
        console.log(err);
    }
}

var loginUserControllerFn = async(req,res)=>
{
    var result = null;
    try
    {
        req.session.email = req.body.email
        var result = await userService.loginuserDBService(req.body)
        if(result.status){
            res.send({"status":true,"message":result.msg});
        }
        else {
            res.send({"status":false,"message":result.msg});
        }
    }
    catch(err){
        console.log(err);
        res.send({"status":false,"message":err.msg});
    }
}

var sessionControllerFn = async(req,res)=>{
        if(req.session.email){
            return res.json({valid: true, email: req.session.email})
        } else {
            return res.json({valid: false})
        }
}

module.exports = { createUserControllerFn, loginUserControllerFn, sessionControllerFn }

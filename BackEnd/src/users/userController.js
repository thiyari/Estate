const session = require('express-session');
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
        req.session.username = req.body.user
        req.session.password = req.body.password
        req.session.isLoggedIn = true;
        var result = await userService.loginuserDBService(req.body)
        session.id = result.id
        req.session.save()
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

var logoutUserControllerFn = async(req,res)=>
    {
        if(req.session.username){
            req.session.destroy();
            res.clearCookie('connect.sid');
            return res.json({valid: true})
        } else {
            return res.json({valid: false})
        }
    }

var sessionControllerFn = async(req,res)=>{
        if(req.session.username){
            return res.json({valid: true, 
                username: req.session.username, 
                password: req.session.password, 
                id: session.id,
                isLoggedIn: req.session.isLoggedIn
            })
        } else {
            return res.json({valid: false})
        }
}

var fetchImagesControllerFn = async(req,res)=>{
    const result = await (userService.fetchImagesDBService())
    if(result.status){
       return res.send({message:"All Images",data:result.data});
    }
    else {
        return res.send({message:'No Images',data:{}});
    }
}
    

var changepasswordUserControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                console.log(req.body)
                var result = await userService.changepassworduserDBService(req.body)
                console.log(result)
                if(result.status){
                    return res.send({"status": true, "message": result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }
        }
    
var usersControllerFn = async(req,res)=>{
            const result = await (userService.fetchUsersDBService())
            if(result.status){
               return res.send({"status":true,users: result});
            }
            else {
                return res.send({"status":false,users:{}});
            }
        }    

var profileControllerFn = async(req,res)=>{
            const result = await (userService.fetchProfileDBService(req.params.id))
            if(result.status){
               return res.send({"status":true,profile: result});
            }
            else {
                return res.send({"status":false,profile:{}});
            }
        }         

        

 var profileFnameControllerFn = async(req,res)=>
            {
                var result = null;
                try
                {
                    var result = await userService.profileFnameUserDBService(req.params.id,req.body)
                    if(result.status){
                        return res.send({"status": true, "message": result.msg});
                    }
                    else {
                        return res.send({"status": false, "message": result.msg});
                    }
                }
                catch(err){
                    console.log(err);
                    res.send({"status":false,"message":err.msg});
                }
            }  

var profileLnameControllerFn = async(req,res)=>
                {
                    var result = null;
                    try
                    {
                        var result = await userService.profileLnameUserDBService(req.params.id,req.body)
                        if(result.status){
                            return res.send({"status": true, "message": result.msg});
                        }
                        else {
                            return res.send({"status": false, "message": result.msg});
                        }
                    }
                    catch(err){
                        console.log(err);
                        res.send({"status":false,"message":err.msg});
                    }
                }          



var profileUserControllerFn = async(req,res)=>
                    {
                        var result = null;
                        try
                        {
                            var result = await userService.profileUnameUserDBService(req.params.id,req.body)
                            if(result.status){
                                return res.send({"status": true, "message": result.msg});
                            }
                            else {
                                return res.send({"status": false, "message": result.msg});
                            }
                        }
                        catch(err){
                            console.log(err);
                            res.send({"status":false,"message":err.msg});
                        }
                    }        



var profileEmailControllerFn = async(req,res)=>
                {
                    var result = null;
                    try
                    {
                        var result = await userService.profileEmailUserDBService(req.params.id,req.body)
                        if(result.status){
                            return res.send({"status": true, "message": result.msg});
                        }
                        else {
                            return res.send({"status": false, "message": result.msg});
                        }
                    }
                    catch(err){
                        console.log(err);
                        res.send({"status":false,"message":err.msg});
                    }
                }        


var profilePhoneControllerFn = async(req,res)=>
                {
                    var result = null;
                    try
                    {
                        var result = await userService.profilePhoneUserDBService(req.params.id,req.body)
                        if(result.status){
                            return res.send({"status": true, "message": result.msg});
                        }
                        else {
                            return res.send({"status": false, "message": result.msg});
                        }
                    }
                    catch(err){
                        console.log(err);
                        res.send({"status":false,"message":err.msg});
                    }
                }   

var profileUploadImagesControllerFn = async(req,res)=>
    {
        var result = null;
        try
        {
            var result = await userService.profileUploadImageDBService(req.params.id,req.body)
            if(result.status){
                return res.send({"status": true, "message": result.msg});
            }
            else {
                return res.send({"status": false, "message": result.msg});
            }
        }
        catch(err){
            console.log(err);
            res.send({"status":false,"message":err.msg});
        }

    }



    var profileDeleteImageControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profileDeleteImageDBService(req.params.id,req.body)
                if(result.status){
                    return res.send({"status": true, "message": result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }
    
        }
    


    var profilePropertyLocationControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profilePropertyLocationDBService(req.params.id,req.body)
                if(result.status){
                    return res.send({"status": true, "message": result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }
    
        }


    var profilePropertyAreaControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profilePropertyAreaDBService(req.params.id,req.body)
                if(result.status){
                    return res.send({"status": true, "message": result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }
    
        }

    var profilePropertyTypeControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profilePropertyTypeDBService(req.params.id,req.body)
                if(result.status){
                    return res.send({"status": true, "message": result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }
    
        }

    var profilePhaseControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profilePhaseDBService(req.params.id,req.body)
                if(result.status){
                    return res.send({"status": true, "message": result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }
    
        }


    var profileRoomsControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profileRoomsDBService(req.params.id,req.body)
                if(result.status){
                    return res.send({"status": true, "message": result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }
    
        }


module.exports = { 
    createUserControllerFn, 
    loginUserControllerFn, 
    logoutUserControllerFn,
    sessionControllerFn, 
    fetchImagesControllerFn,
    changepasswordUserControllerFn,
    usersControllerFn, 
    profileControllerFn,
    profileFnameControllerFn,
    profileLnameControllerFn,
    profileUserControllerFn,
    profileEmailControllerFn,
    profilePhoneControllerFn,
    profileUploadImagesControllerFn,
    profileDeleteImageControllerFn,
    profilePropertyLocationControllerFn,
    profilePropertyAreaControllerFn,
    profilePropertyTypeControllerFn,
    profilePhaseControllerFn,
    profileRoomsControllerFn
}

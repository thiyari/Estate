const session = require('express-session');
var userService = require('./userService');

var createUserControllerFn = async(req,res)=>
{
    try
    {
        var status = await userService.createUserDBService(req.body)
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

var adminKeyControllerFn = async(req,res)=>
    {
        try
        {
            var status = await (userService.adminKeyDBService(req.params.key))
            if(status){
                res.send({"status":true,"message":"Admin credentials created successfully"});
            }
            else {
                res.send({"status":false,"message":"Error creating credentials"});
            }
        }
        catch(err){
            console.log(err);
        }
    }


var createServicesControllerFn = async(req,res)=>
    {
        try
        {
            var status = await userService.createServicesDBService(req.body)
            if(status){
                res.send({"status":true,"message":"Service request created successfully"});
            }
            else {
                res.send({"status":false,"message":"Error creating a service request"});
            }
        }
        catch(err){
            console.log(err);
        }
    }


    

var createContactsControllerFn = async(req,res)=>
    {
        try
        {
            var status = await userService.createContactsDBService(req.body)
            if(status){
                res.send({"status":true,"message":"Contact created successfully"});
            }
            else {
                res.send({"status":false,"message":"Error creating a contact"});
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
        var result = await userService.loginuserDBService(req.body)
        req.session.username = req.body.user
        req.session.password = req.body.password
        req.session.isLoggedIn = true;
        session.id = result.id
        session.logstatus = result.logstatus
        req.session.save()
        if(result.status){
            res.send({"status":true,"message":result.msg,"logstatus":result.logstatus});
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
                isLoggedIn: req.session.isLoggedIn,
                logstatus: session.logstatus
            })
        } else {
            return res.json({valid: false})
        }
}

var fetchProfilesControllerFn = async(req,res)=>{
    const result = await (userService.fetchProfilesDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}

var contactsControllerFn = async(req,res)=>{
    const result = await (userService.fetchContactsDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}


var servicesControllerFn = async(req,res)=>{
    const result = await (userService.fetchServicesDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}


var fetchProfilesApprovalsControllerFn = async(req,res)=>{
    const result = await (userService.fetchProfilesApprovalsDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}


var adminProfilesControllerFn = async(req,res)=>{
    const result = await (userService.fetchAdminProfilesDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}

var fetchProfilesPropertyidControllerFn = async(req,res)=>{
    const result = await (userService.fetchProfilesPropertyidDBService(req.params.propertyid))
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}


var fetchProfilesPlotsControllerFn = async(req,res)=>{
    const result = await (userService.fetchProfilesPlotsDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}

var fetchProfilesHousesControllerFn = async(req,res)=>{
    const result = await (userService.fetchProfilesHousesDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}

var fetchProfilesCommercialControllerFn = async(req,res)=>{
    const result = await (userService.fetchProfilesCommercialDBService())
    if(result.status){
       return res.send({message:"Success",records:result.data});
    }
    else {
        return res.send({message:'Failed',records:result.data});
    }
}

var changepasswordUserControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.changepassworduserDBService(req.body)
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
        

 var ApprovalSanctionControllerFn = async(req,res)=>
            {
                var result = null;
                try
                {
                    var result = await userService.ApprovalSanctionDBService(req.params.id,req.body)
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
                var result = await userService.profileDeleteImageDBService(req.params.id, req.body)
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

        var profileDeleteControllerFn = async(req,res)=>
            {
                var result = null;
                try
                {
                    var result = await userService.profileDeleteDBService(req.params.id)
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
            

        var deleteServicesControllerFn = async(req,res)=>
            {
                var result = null;
                try
                {
                    var result = await userService.deleteServicesDBService(req.params.id)
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

        var deleteContactsControllerFn = async(req,res)=>
            {
                var result = null;
                try
                {
                    var result = await userService.deleteContactsDBService(req.params.id)
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

    var profileAreaTypeControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profileAreaTypeDBService(req.params.id,req.body)
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


    var profileFloorControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profileFloorDBService(req.params.id,req.body)
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

    var profileCurrencyControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profileCurrencyDBService(req.params.id,req.body)
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


    var profileZipControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profileZipDBService(req.params.id,req.body)
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

    var profilePropertyAddressControllerFn = async(req,res)=>
        {
            var result = null;
            try
            {
                var result = await userService.profilePropertyAddressDBService(req.params.id,req.body)
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

    var forgotPasswordControllerFn = async (req, res) => {

        var result = null;
        try
        {
            var result = await userService.forgotPasswordDBService(req.body)
            if(result.success){
                return res.send({"status": true, "message": result.msg, "output": result.output});
            }
            else {
                return res.send({"status": false, "message": result.msg});
            }
        }
        catch(err){
            console.log(err);
            res.send({"status":false,"message":err.msg});
        }
          };


var verifyPasswordControllerFn = async(req, res) => {

            var result = null;
            try
            {
                var result = await userService.verifyPasswordDBService(req.params)
                if(result.success){
                    return res.render("reset",{email: result.email, status: result.msg});
                }
                else {
                    return res.send({"status": false, "message": result.msg});
                }
            }
            catch(err){
                console.log(err);
                res.send({"status":false,"message":err.msg});
            }

          };



var resetPasswordControllerFn = async(req,res) => {

        var result = null;
        try
        {
            var result = await userService.resetPasswordDBService(req.params, req.body)
            if(result.success){
                return res.render("reset",{email: result.email, status: result.msg});
            }
            else {
                return res.send({"status": false, "message": result.msg});
            }
        }
        catch(err){
            console.log(err);
            res.send({"status":false,"message":err.msg});
        }

    };
          


    var emailControllerFn = async (req, res) => {

        var result = null;
        try
        {
            var result = await userService.emailDBService(req.body)
            if(result.success){
                return res.send({"status": true, "message": result.msg, "output": result.output});
            }
            else {
                return res.send({"status": false, "message": result.msg});
            }
        }
        catch(err){
            console.log(err);
            res.send({"status":false,"message":err.msg});
        }
    };

module.exports = { 
    createUserControllerFn, 
    loginUserControllerFn, 
    logoutUserControllerFn,
    sessionControllerFn, 
    fetchProfilesControllerFn,
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
    profileRoomsControllerFn,
    profileFloorControllerFn,
    profileCurrencyControllerFn,
    profileZipControllerFn,
    profilePropertyAddressControllerFn,
    fetchProfilesPlotsControllerFn,
    fetchProfilesHousesControllerFn,
    fetchProfilesCommercialControllerFn,
    fetchProfilesPropertyidControllerFn,
    createContactsControllerFn,
    adminKeyControllerFn,
    adminProfilesControllerFn,
    profileDeleteControllerFn,
    fetchProfilesApprovalsControllerFn,
    ApprovalSanctionControllerFn,
    contactsControllerFn,
    createServicesControllerFn,
    servicesControllerFn,
    deleteServicesControllerFn,
    deleteContactsControllerFn,
    forgotPasswordControllerFn,
    verifyPasswordControllerFn,
    resetPasswordControllerFn,
    emailControllerFn,
    profileAreaTypeControllerFn
}

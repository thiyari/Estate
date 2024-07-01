var userModel = require('./userModel')
var imageModel = require('./imageModel')
var key = '123456789asdflkj';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

        return new Promise(function myFn(resolve,reject){
                var encrypted = encryptor.encrypt(userDetails.password);
                async function insert(){
                        await userModel.create({
                                firstname: userDetails.firstname,
                                lastname: userDetails.lastname,
                                email: userDetails.email,
                                password: encrypted 
                        });
                        
                }
                insert().then(function (err){
                        if(err){
                                reject(false)
                        } else {
                                resolve(true)
                        }
                });
        });

}


module.exports.loginuserDBService = (userDetails) => {
        return new Promise(async function myFn(resolve,reject){
                result = await userModel.findOne({email:userDetails.email});
                if(result != undefined && result != null){
                        var decrypted = encryptor.decrypt(result.password);
                        if(decrypted == userDetails.password){
                                resolve({status: true, msg: "user validated successfully"});
                        } else {
                                reject({status: false, msg: "user validation failed"});
                        }
                } else {
                        reject({status: false, msg: "Invalid data"})
                }
        })
}

module.exports.uploadImageDBService = (uploadDetails) => {
        return new Promise(async function myFn(resolve,reject){
                async function upload(){
                        console.log(uploadDetails)
                        const image = new imageModel({
                                image: uploadDetails.img
                        })
                        await image.save() 
                }
                upload().then(function(err){
                        if(err){
                                reject({status: false, msg:"Image upload failed"})
                        } else {
                                resolve({status: true, msg:"Image Uploaded Successfully!"})
                        }
                })
        })
}

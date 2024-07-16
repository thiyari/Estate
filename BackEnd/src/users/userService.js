var userModel = require('./userModel')
var key = '123456789asdflkj';
var encryptor = require('simple-encryptor')(key);
const session = require('express-session')

module.exports.createUserDBService = (userDetails) => {
        return new Promise(function myFn(resolve,reject){
                var encrypted = encryptor.encrypt(userDetails.password);
                async function insert(){
                        await userModel.create({
                                firstname: userDetails.firstname,
                                lastname: userDetails.lastname,
                                username: userDetails.username,
                                email: userDetails.email,
                                password: encrypted,
                                phone: userDetails.phone,
                                area: userDetails.area,
                                location: userDetails.location,
                                zip: userDetails.zip,
                                phase: userDetails.phase,
                                images: userDetails.images,
                                rooms: userDetails.rooms, 
                                floor: userDetails.floor,
                                currency: userDetails.currency,
                                price: userDetails.price,
                                property: userDetails.property,
                                address: userDetails.address
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
                result = await userModel.findOne({username:userDetails.user});
                if(result != undefined && result != null){
                        var decrypted = encryptor.decrypt(result.password);
                        if(decrypted == userDetails.password){
                                console.log(true)
                                resolve({status: true, msg: "user validated successfully", id: result._id});
                        } else {
                                reject({status: false, msg: "user validation failed"});
                        }
                } else {
                        reject({status: false, msg: "Invalid data"})
                }
        })
}

module.exports.fetchImagesDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await userModel.find().sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: 'Invalid data'})
                }
        })
}



module.exports.changepassworduserDBService = (userDetails) => {
        return new Promise(async function myFn(resolve,reject){
                result = await userModel.updateOne(
                                { username: userDetails.username }, 
                                { $set: { password: encryptor.encrypt(userDetails.password) }})
                .catch( error => {
                           console.log(error);
                         }
                      );
                console.log('user updated');

                if(result != undefined && result != null){
                        resolve({status: true, msg:"password changed"});
                } else {
                        reject({status: false, msg:"changing password failed"});
                }
        })
}


module.exports.fetchUsersDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await userModel.find({}).select({username: 1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: 'Invalid data'})
                }
        })
}
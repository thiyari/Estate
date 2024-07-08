var userModel = require('./userModel')
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
                                property: userDetails.property
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


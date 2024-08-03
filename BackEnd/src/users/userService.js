var dataModel = require('./userModel')
var key = '123456789asdflkj';
var admin_key = 'Admin31072024';
var encryptor = require('simple-encryptor')(key);
const dotenv = require("dotenv");


module.exports.adminKeyDBService = (userData) => {
        return new Promise(function myFn(resolve,reject){
                if (userData === admin_key) {
                        var encrypted = encryptor.encrypt(process.env.DEFAULT_ADMIN_PWD);
                        async function insert(){
                                await dataModel.users.create({
                                        username: process.env.DEFAULT_ADMIN_USER,
                                        password: encrypted,
                                        logstatus: "admin"
                                });
                                
                        }
                        insert().then(function (err){
                                if(err){
                                        reject(false)
                                } else {
                                        resolve(true)
                                }
                        });
                } 
        });

}

module.exports.createUserDBService = (userDetails) => {
        return new Promise(function myFn(resolve,reject){
                var encrypted = encryptor.encrypt(userDetails.password);
                async function insert(){
                        await dataModel.users.create({
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
                                address: userDetails.address,
                                requests: userDetails.requests,
                                propertyid: userDetails.propertyid,
                                logstatus: userDetails.logstatus,
                                commission: userDetails.commission
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


module.exports.createServicesDBService = (userDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await dataModel.services.create({
                                firstname: userDetails.firstname,
                                lastname: userDetails.lastname,
                                email: userDetails.email,
                                phone: userDetails.phone,
                                requests: userDetails.requests,
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

module.exports.createContactsDBService = (userDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await dataModel.contacts.create({
                                firstname: userDetails.firstname,
                                lastname: userDetails.lastname,
                                email: userDetails.email,
                                phone: userDetails.phone,
                                comments: userDetails.comments,
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
                result = await dataModel.users.findOne({username:userDetails.user});
                if(result != undefined && result != null){
                        var decrypted = encryptor.decrypt(result.password);
                        if(decrypted == userDetails.password){
                                resolve({status: true, msg: "Password Validated Successfully", id: result._id, logstatus: result.logstatus});
                        } else {
                                reject({status: false, msg: "Password Validation failed"});
                        }
                } else {
                        reject({status: false, msg: "Invalid data"})
                }
        })
}

module.exports.fetchProfilesDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({requests: "Approved"}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}

module.exports.fetchContactsDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.contacts.find({}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}

module.exports.fetchServicesDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.services.find({}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}


module.exports.fetchProfilesApprovalsDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({requests: "Pending"}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}

module.exports.fetchAdminProfilesDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({logstatus: "admin"}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}


module.exports.fetchProfilesPropertyidDBService = (propertyid) => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({propertyid: propertyid, requests: "Approved"});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}


module.exports.fetchProfilesPlotsDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({property: "Open Plot",requests: "Approved"}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}

module.exports.fetchProfilesHousesDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({$or:
                        [
                                {property: "Flat", requests: "Approved"},
                                {property: "Independent House", requests: "Approved"},
                                {property: "Duplex Home", requests: "Approved"}
                        ]}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}

module.exports.fetchProfilesCommercialDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({property: "Commercial",requests: "Approved"}).sort({_id:-1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: result})
                }
        })
}


module.exports.changepassworduserDBService = (userDetails) => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.updateOne(
                                { username: userDetails.username }, 
                                { $set: { password: encryptor.encrypt(userDetails.password) }})
                .catch( error => {
                           console.log(error);
                         }
                      );

                if(result != undefined && result != null){
                        resolve({status: true, msg:"password changed"});
                } else {
                        reject({status: false, msg:"changing password failed"});
                }
        })
}


module.exports.fetchUsersDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({}).select({_id: 0, username: 1});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: 'Invalid data'})
                }
        })
}


module.exports.fetchProfileDBService = (Id) => {
        return new Promise(async function myFn(resolve,reject){
                result = await dataModel.users.find({_id:Id});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({satus: false, data: 'Invalid data'})
                }
        })
}


module.exports.ApprovalSanctionDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{requests:data.requests, commission:data.commission},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Requests Status Updated as Approved"});
                        } else {
                           reject({success:false,msg:"updating approval status failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileFnameUserDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{firstname:data.firstname},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"First name changed"});
                        } else {
                           reject({success:false,msg:"changing first name failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileLnameUserDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{lastname:data.lastname},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Last name changed"});
                        } else {
                           reject({success:false,msg:"changing last name failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileUnameUserDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{username:data.username},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"User name changed"});
                        } else {
                           reject({success:false,msg:"changing user name failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileEmailUserDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{email:data.email},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Email changed"});
                        } else {
                           reject({success:false,msg:"changing email failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profilePhoneUserDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{phone:data.phone},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Phone name changed"});
                        } else {
                           reject({success:false,msg:"changing phone number failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileUploadImageDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findOneAndUpdate({_id: id},{$push:{images:data.images}},{upsert:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Images uploaded successfully"});
                        } else {
                           reject({success:false,msg:"Uploading images failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}

module.exports.profileDeleteImageDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findOneAndUpdate({_id: id},{$pull:{images: data.image}})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Image Deleted successfully"});
                        } else {
                           reject({success:false,msg:"Deleting image failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}



module.exports.deleteServicesDBService = async (id) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.services.findByIdAndDelete(id)
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Service Deleted successfully"});
                        } else {
                           reject({success:false,msg:"Deleting service failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}



module.exports.profileDeleteDBService = async (id) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndDelete(id)
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Profile Deleted successfully"});
                        } else {
                           reject({success:false,msg:"Deleting profile failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profilePropertyLocationDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{location:data.location},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Property Location updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating Property Location failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}

module.exports.profilePropertyAreaDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{area:data.area},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Property Area updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating Property Area failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profilePropertyTypeDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{property:data.property},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Property Type updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating Property Type failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profilePhaseDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{phase:data.phase},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Phase updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating Phase failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileRoomsDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{rooms:data.rooms},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Phase updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating Phase failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileFloorDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{floor:data.floor},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Floor updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating Floor failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileCurrencyDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{currency:data.currency},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Currency updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating Currency failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profileZipDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{zip:data.zip},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Zip code updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating zip code failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}


module.exports.profilePropertyAddressDBService = async (id,data) => {
        return new Promise(async function myFn(resolve,reject){
        await dataModel.users.findByIdAndUpdate(id,{address:data.address},{new:true})
                .then((docs)=>{
                        if(docs) {
                           resolve({success:true,msg:"Property Address updated successfully"});
                        } else {
                           reject({success:false,msg:"Updating property adddress failed"});
                        }
                    }).catch((err)=>{
                       reject(err);
                    });               
        })
}

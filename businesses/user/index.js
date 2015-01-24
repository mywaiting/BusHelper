/**
 * Created by root on 15-1-24.
 */
var UserModel = require('../../db/models/user');

function User(){
    this.updateUser = function(json,callback){
        console.log(json);
        UserModel.updateOrCreate({
            name:json.name
        },{
            latitude:json.latitude,
            longitude:json.longitude
        },function(err,doc){
            if(err){
                console.log('debug1');
                callback(err);
            }else{
                console.log('debug2');
                callback(err,doc);
            }
        });
        console.log("done");
    };
    this.addUser = function(json,callback){
        UserModel.create(json,function(err){
            callback(err);
        });
    };
};
module.exports = User;
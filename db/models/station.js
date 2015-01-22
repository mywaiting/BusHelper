/**
 * Created by root on 15-1-21.
 */
var schema = require("../db.js");

var Station = schema.define('Station',{
    name: {type: schema.String, limit: 255, allowNull: false, index: true},
    lat: {type: schema.String, limit: 255, allowNull: false},
    lng: {type: schema.String, limit: 255, allowNull: false}
},{
    indexes: {
        index1: {
            columns: 'email, createdByAdmin'
        }
    },
    primaryKeys: ["name", "lat"],
    foreignKeys: [{
        localCol: "name",
        foreignTable: "user",
        foreignCol: "username",
        onDelete: true,
        onUpdate: true
    }]
});

schema.autoupdate(function(err){
    if(err){
        console.log("");
    }
});

module.exports = Station;
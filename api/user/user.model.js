var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    email :{
        type: String,
        unique : false,
        required : true
    },
    password : {
        type: String,
        unique : false,
        required : true
    }
}, {
    timestamps: true
});


var newsModel = mongoose.model('Users', usersSchema);
module.exports = newsModel;
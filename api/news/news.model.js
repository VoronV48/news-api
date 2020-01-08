var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var newsSchema = new Schema({
    title :{
        type: String,
        unique : false,
        required : true
    },
    news : {
        type: String,
        unique : false,
        required : true
    },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true
});

module.exports = newsSchema;
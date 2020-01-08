var mongoose = require('mongoose');
var newsSchema = require('./news.model');

newsSchema.statics = {
    create : function(data, cb) {
        var news = new this(data);
        news.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var newsModel = mongoose.model('News', newsSchema);
module.exports = newsModel;
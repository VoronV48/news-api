
var News = require('./news.dao');
exports.createNews = function (req, res, next) {
    var news = {
        title: req.body.title,
        news: req.body.news
    };

    if (news.title == "" || news.news == "") {
        res.json({
            message : "Заполните поле title и news обязательно"
        })
    }else if (news.title == "" && news.news == "") {
        res.json({
            message : "Заполните поле title и news обязательно"

        })
    }
    News.create(news, function(err) {
        if(err) {
            return res.json({
                error : err
            })
        }

        return res.json({
            message : "News created successfully"
        })
    })
}

exports.getNews = function(req, res, next) {
  var page = parseInt(req.query.page)
  var size = 6
  var query = {}
  if(page < 0 || page === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  // Find some documents
       News.find({},{},query,function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if (data.length <= 0){
                    return res.json({
                        message: 'Страница пуста'
                    })
                } else {
                    response = {"message" : data};
                }
            }
            res.json(response);
        });
    // News.get({}, function(err, news) {
    //     if(err) {
    //         res.json({
    //             error: err
    //         })
    //     }
    //     res.json({
    //         news:news
    //     })
    // })
}

exports.findNews = function(req, res, next) {
    News.get({_id: req.params._id}, function(err, news) {
        if(err) {
            res.json({
                error: err
            })
        }
        if (news.length <= 0) {
            return res.json({
                message: 'Ничего не найдено'
            })
        } else {
            res.json({
                news:news
            })
            
        }
        
    })
    
}

exports.updateNews = function(req, res, next) {
  
    var news = {
        title: req.body.title,
        news: req.body.news
    }
    if (news.title == "" || news.news == "") {
        res.json({
            message : "Заполните поле title и news обязательно"
        })
    }else if (news.title == "" && news.news == "") {
        res.json({
            message : "Заполните поле title и news обязательно"

        })
    }
    News.update({_id: req.params.id}, news, function(err, news) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "news updated successfully"
        })
    })
}

exports.removeNews = function(req, res, next) {
    News.delete({_id: req.params.id}, function(err, news) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "News deleted successfully"
        })
    })
}

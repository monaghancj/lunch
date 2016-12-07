const dal = require('./api/dal.js');

var designDocC = {
    _id: '_design/circles',
    views: {
        'circles': {
            map: function(doc) {
                if (doc.type === 'circles') {
                    emit(doc._id);
                }
            }.toString()
        }
    }
}

var designDocR = {
    _id: '_design/restaurants',
    views: {
        'restaurants': {
            map: function(doc) {
                if (doc.type === 'restaurants') {
                    emit(doc._id);
                }
            }.toString()
        }
    }
}

var designDocF = {
    _id: '_design/friends',
    views: {
        'friends': {
            map: function(doc) {
                if (doc.type === 'friends') {
                    emit(doc._id);
                }
            }.toString()
        }
    }
}

var designDocS = {
    _id: '_design/sessions',
    views: {
        'sessions': {
            map: function(doc) {
                if (doc.type === 'sessions') {
                    emit(doc._id);
                }
            }.toString()
        }
    }
}

dal.createView(designDocC, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dal.createView(designDocR, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dal.createView(designDocF, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dal.createView(designDocS, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

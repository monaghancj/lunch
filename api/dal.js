const path = require('path')
const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const fetchConfig = require('zero-config')
var R = require('ramda')

var config = fetchConfig(path.join(__dirname, '..'), {dcValue: 'test'})
const urlFormat = require('url').format
const db = new PouchDB(urlFormat(config.get("cloudant")))

const dal = {
  createFriend: createFriend,
  listFriends: listFriends,
  getFriend: getFriend,
  deleteFriend: deleteFriend,
  updateFriend: updateFriend,
  //-----------------------//
  createCircle: createCircle,
  listCircles: listCircles,
  getCircle: getCircle,
  deleteCircle: deleteCircle,
  updateCircle: updateCircle,
  //-----------------------//
  createSession: createSession,
  listSessions: listSessions,
  getSession: getSession,
  deleteSession: deleteSession,
  updateSession: updateSession,
  //-----------------------//
  createRestaurant: createRestaurant,
  listRestaurants: listRestaurants,
  getRestaurant: getRestaurant,
  deleteRestaurant: deleteRestaurant,
  updateRestaurant: updateRestaurant,
  //-----------------------//
  createView: createView
}


//  -------   FRIENDS   --------  //
function createFriend(friend, callback) {
  const id = "friends_" + friend.email
  callback(null, {
    "ok": true,
    "id": id,
    "rev": "1-01204iof7876hd34500",
  })
}

function listFriends( callback ) {
  const sortBy = 'friends'
  const sortToken = ''
  const limit = 100
  listDocs(sortBy, sortToken, limit, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function getFriend( id, callback ) {
  callback(null, {
    "ok": true,
    "id": id,
    "rev": "1-01204iof7876hd34500",
  })
}

function deleteFriend( id, callback ) {
  callback(null, {
    "ok": true,
    "id": "friends_thescienceguy@sciguy.com",
    "rev": "2-9nadf8293r82jdf82"
  })
}

function updateFriend( friend, callback ) {
  callback(null, {
    "ok": true,
    "id": friend._id,
    "rev": "2-9A6157A5EA545C99B00FF904EEF05FD9F"
  })
}

//  --------  CIRCLES  ---------  //
function createCircle(circle, callback) {
  const id = "circles_" + circle.email
  callback(null, {
    "ok": true,
    "id": id,
    "rev": "1-01204iof7876hd34500",
  })
}

function listCircles( callback ) {
  const sortBy = 'circles'
  const sortToken = ''
  const limit = 100
  listDocs(sortBy, sortToken, limit, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function getCircle( id, callback ) {
  getDocByID(id, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function deleteCircle( id, callback ) {
  callback(null, {
    "ok": true,
    "id": "circles_someUniqueIdentifier",
    "rev": "2-9nadf8293r82jdf82"
  })
}

function updateCircle( circle, callback ) {
  // db.get('mydoc', function(err, doc) {
  //   if (err) { return console.log(err); }
  //   db.put({
  //     _id: 'mydoc',
  //     _rev: doc._rev,
  //     title: "Let's Dance"
  //   }, function(err, response) {
  //     if (err) { return console.log(err); }
  //     // handle response
  //   });
  // });
  callback(null, {
    "ok": true,
    "id": circle._id,
    "rev": "2-9A6157A5EA545C99B00FF904EEF05FD9F"
  })
}

//  --------  SESSIONS  ---------  //
function createSession(session, callback) {
  const id = "Sessions_" + Date.now()
  callback(null, {
    "ok": true,
    "id": id,
    "rev": "1-01204iof7876hd34500",
  })
}

function listSessions( callback ) {
  const sortBy = 'sessions'
  const sortToken = ''
  const limit = 100
  listDocs(sortBy, sortToken, limit, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function getSession( id, callback ) {

  callback(null, {
    "ok": true,
    "id": id,
    "rev": "1-01204iof7876hd34500",
  })
}

function deleteSession( id, callback ) {
  callback(null, {
    "ok": true,
    "id": "sessions_someUniqueDateIdentifier",
    "rev": "2-9nadf8293r82jdf82"
  })
}

function updateSession( session, callback ) {
  callback(null, {
    "ok": true,
    "id": session._id,
    "rev": "2-9A6157A5EA545C99B00FF904EEF05FD9F"
  })
}

//  --------  RESTAURANTS  ---------  //
function createRestaurant(restaurant, callback) {
  const id = "Restaurants_" + Date.now()
  restaurant["type"] = 'restaurant'
  callback(null, {
    "ok": true,
    "id": id,
    "rev": "1-01204iof7876hd34500",
  })
}

function listRestaurants( callback ) {
  const sortBy = 'restaurants'
  const sortToken = ''
  const limit = 100
  listDocs(sortBy, sortToken, limit, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function getRestaurant( id, callback ) {
  callback(null, {
    "ok": true,
    "id": id,
    "rev": "1-01204iof7876hd34500",
  })
}

function deleteRestaurant( id, callback ) {
  callback(null, {
    "ok": true,
    "id": "restaurants_someUniqueDateIdentifier",
    "rev": "2-9nadf8293r82jdf82"
  })
}

function updateRestaurant( restaurant, callback ) {
  // db.get('mydoc', function(err, doc) {
  //   if (err) { return console.log(err); }
  //   db.put({
  //     _id: 'mydoc',
  //     _rev: doc._rev,
  //     title: "Let's Dance"
  //   }, function(err, response) {
  //     if (err) { return console.log(err); }
  //     // handle response
  //   });
  // });
  callback(null, {
    "ok": true,
    "id": restaurant._id,
    "rev": "2-9A6157A5EA545C99B00FF904EEF05FD9F"
  })
}

//  ---------   UTILITY   ---------  //
function createView(designDoc, callback) {
    if (typeof designDoc == "undefined" || designDoc === null) {
        return callback(new Error('400Missing design document.'));
    } else {
        db.put(designDoc).then(function(response) {
          console.log('Put Design Doc Complete')
            return callback(null, response);
        }).catch(function(err) {
            return callback(err);
        });
    }
}

function listDocs(sortBy, startKey, limit, callback) {
  db.query(sortBy, {        //TELL IT TO SHOW DOCS
    include_docs: true,
    startkey: startKey,
    limit: limit
  }, function(err, data) {
    if (err) return callback(err)
    if (startKey !== '') data.rows.shift()
    callback(null, data)
  })
}

function getDocByID(id, callback) {
    if (typeof id == "undefined" || id === null) {
        return callback(new Error('400Missing id parameter'));
    } else {
        db.get(id, function(err, data) {
            if (err) return callback(err);
            if (data) {
              return callback(null, data)
            }
        });
    }
}

module.exports = dal

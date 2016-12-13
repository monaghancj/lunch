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
  // Call to couch retrieving a document with the given _id value.
  if (typeof friend == "undefined" || friend === null) {
    return callback(new Error('400Missing data for create'));
  } else if (friend.hasOwnProperty('_id') === true) {
    return callback(new Error('400Unnecessary id property within data.'));
  } else if (friend.hasOwnProperty('_rev') === true) {
    return callback(new Error('400Unnecessary rev property within data'));
  } else if (friend.hasOwnProperty('name') !== true) {
    return callback(new Error('400Missing name property within data'));
  } else if (friend.hasOwnProperty('phone') !== true) {
    return callback(new Error('400Missing phone property within data'));
  } else {
    friend.type = 'friends'
    db.post(friend, function(err, response) {
      if (err)
        return callback(err);
      if (response)
        return callback(null, response);
    })
  }
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
  getDocByID(id, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function deleteFriend( id, callback ) {
  removeDocByID(id, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function updateFriend( friend, callback ) {
  updateDoc(friend, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

//  --------  CIRCLES  ---------  //
function createCircle(circle, callback) {
  // Call to couch retrieving a document with the given _id value.
  if (typeof circle == "undefined" || circle === null) {
    return callback(new Error('400Missing data for create'));
  } else if (circle.hasOwnProperty('_id') === true) {
    return callback(new Error('400Unnecessary id property within data.'));
  } else if (circle.hasOwnProperty('_rev') === true) {
    return callback(new Error('400Unnecessary rev property within data'));
  } else if (circle.hasOwnProperty('name') !== true) {
    return callback(new Error('400Missing name property within data'));
  } else if (circle.hasOwnProperty('friends') !== true) {
    return callback(new Error('400Missing your friends'));
  } else {
    circle.type = 'circles';
    db.post(circle, function(err, response) {
      if (err)
        return callback(err);
      if (response)
        return callback(null, response);
    })
  }
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
  removeDocByID(id, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function updateCircle( circle, callback ) {
  updateDoc(circle, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

//  --------  SESSIONS  ---------  //
function createSession(session, callback) {
  session.type = 'sessions'
  db.post(session, function(err, response) {
    if (err) return callback(err);
    if (response) return callback(null, response);
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
  getDocByID(id, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function deleteSession( id, callback ) {
  removeDocByID(id, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function updateSession( session, callback ) {
  updateDoc(session, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
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
  getDocByID(id, (err, result) => {
    if (err) callback(err, null)
    callback(null, result)
  })
}

function deleteRestaurant( id, callback ) { // NOT NEEDED
  callback(null, {
    "ok": true,
    "id": "restaurants_someUniqueDateIdentifier",
    "rev": "2-9nadf8293r82jdf82"
  })
}

function updateRestaurant( restaurant, callback ) {
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

function removeDocByID(id, callback) {
    if (typeof id == "undefined" || id === null) {
        return callback(new Error('400Missing id for delete'));
    } else {
      db.get(id, function(err, doc) {
        if (err) { return callback(err); }
        db.remove(doc, function(err, response) {
          if (err) { return callback(err); }
          callback(null, response)
        })
      })
    }
}

function updateDoc(data, callback) {
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for update'))
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing id property from data'))
    } else if (data.hasOwnProperty('_rev') !== true) {
        return callback(new Error('400Missing rev property from data'))
    } else {
      db.put(data, function(err, response) {
        if (err) return callback(err)
        if (response) return callback(null, response)
      })
    }
}

module.exports = dal

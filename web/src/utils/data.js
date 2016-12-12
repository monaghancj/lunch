const fetch = require('isomorphic-fetch')
const url = process.env.REACT_APP_API
const APIKey = 'AIzaSyAaBlfGybqXLxKdfjW_4U5loA30yFaCy5I'
const { pick, map } = require('ramda')

module.exports = function() {
  const listRestaurants = function(zip) {
    return fetch(`http://opentable.herokuapp.com/api/restaurants?zip=${zip}`)
      .then(res => res.json())
  }
  const getZipCode = function(long, lat) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${APIKey}`)
      .then(res => res.json())
  }
  const remove = function (model, id) {
    return fetch(`${url}/${model}/${id}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
  }
  const list = function (model) {
    return fetch(`${url}/${model}`)
      .then(res => res.json())
  }

  const post = function (model, doc) {
    return fetch(`${url}/${model}`, {
      method: 'post',
      body: JSON.stringify(doc),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      return res
    })
    .catch(error => console.log("CAUGHT: " + error))
  }

  const get = function(model, id) {
    return fetch(`${url}/${model}/${id}`)
      .then(res => res.json())
  }

  const put = function(model, doc) {
    return fetch(`${url}/${model}/${doc._id}`, {
      method: 'put',
      body: JSON.stringify(doc),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.log(error))
  }

  return {
    listRestaurants,
    getZipCode,
    list,
    post,
    get,
    remove,
    put
  }
}

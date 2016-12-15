const fetch = require('isomorphic-fetch')
const url = process.env.REACT_APP_API
const APIKey = 'AIzaSyAaBlfGybqXLxKdfjW_4U5loA30yFaCy5I'
const { pick, map } = require('ramda')

module.exports = function() {
  const setAuth = () => 'Bearer ' + window.localStorage.getItem('id_token')

  const text = () => {
    return fetch(`text`,{
      headers: {
        'content-type': 'application/json'
      }
    })
    .catch(err => console.log(err))
  }

  const listRestaurants = function(zip) {
    return fetch(`${url}/res/${zip}`,{
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err))
  }
  const getRestaurantRef = function(zip, price) {
    return fetch(`${url}/resRef/${zip}/${price}`, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err))
  }
  const getZipCode = function(long, lat) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${APIKey}`, {
      headers: {
        Authorization: setAuth()
      }
    })
      .then(res => res.json())
  }
  const remove = function (model, id) {
    return fetch(`${url}/${model}/${id}`, {
      method: 'delete',
      headers: {
        Authorization: setAuth(),
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
  }
  const list = function (model) {
    return fetch(`${url}/${model}`,{
      headers: {
        Authorization: setAuth()
      }
    })
      .then(res => res.json())
  }

  const post = function (model, doc) {
    return fetch(`${url}/${model}`, {
      method: 'post',
      body: JSON.stringify(doc),
      headers: {
        Authorization: setAuth(),
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => { return res })
    .catch(error => console.log("CAUGHT: " + error))
  }

  const get = function(model, id) {
    return fetch(`${url}/${model}/${id}`, {
      headers: {
        Authorization: setAuth()
      }
    })
      .then(res => res.json())
  }

  const put = function(model, doc) {
    return fetch(`${url}/${model}/${doc._id}`, {
      method: 'put',
      body: JSON.stringify(doc),
      headers: {
        Authorization: setAuth(),
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.log(error))
  }

  return {
    listRestaurants,
    getRestaurantRef,
    getZipCode,
    list,
    post,
    get,
    remove,
    put,
    text
  }
}

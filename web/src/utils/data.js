const fetch = require('isomorphic-fetch')
const url = process.env.REACT_APP_API

module.exports = function() {
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

  const get = function( model, id) {
    return fetch(`${url}/${model}/${id}`)
      .then(res => res.json())
  }

  return {
    list,
    post,
    get
  }
}

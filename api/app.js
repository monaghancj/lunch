require('dotenv').config()
const http = require('http')
const app = require('express')()
const jwt = require('express-jwt')
const cors = require('cors')
const fetch = require('isomorphic-fetch')
app.use(cors({ origin: true, credentials: true }))
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const dal = require('./dal.js')

app.use(bodyParser.json())

const checkJwt = jwt({
  secret: process.env.AUTH0_SECRET
})

// logger
app.use(function(req, res, next) {
  console.log(`${req.url}: ${req.method}`)
  next()
})

app.get('/res/:zip', (req, res, next) => {
  return fetch(`http://opentable.herokuapp.com/api/restaurants?zip=${req.params.zip}`)
    .then(result => result.json())
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => console.log("ERR: " + err))
})

app.get('/resRef/:zip/:price', (req, res, next) => {
  return fetch(`http://opentable.herokuapp.com/api/restaurants?zip=${req.params.zip}&price=${req.params.price}`)
    .then(result => result.json())
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => console.log("ERR: " + err))
})

app.get('/protected', checkJwt, (req, res, next) =>
  res.send({ message: 'Your are authorized' })
)

//  ------  FRIENDS   ------  //
app.post('/friends', (req, res, next) => {
  dal.createFriend(req.body, (err, result) => {
    if (err) console.log(err)
    res.status(201).send(result)
  })
})

app.put('/friends/:id', (req, res, next) => {
  // Check that _id and _rev is given in body
  dal.updateFriend(req.body, (err, result) => {
    if (err) console.log(err)
    res.status(201).send(result)
  })
})

app.get('/friends', (req, res, next) => {
  dal.listFriends( (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.get('/friends/:id', (req, res, next) => {
  dal.getFriend(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.delete('/friends/:id', (req, res, next) => {
  dal.deleteFriend(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

//  ------  CIRCLES  ------  //
app.post('/circles', (req, res, next) => {
  dal.createCircle(req.body, (err, result) => {
    if (err) console.log(err)
    res.status(201).send(result)
  })
})

app.put('/circles/:id', (req, res, next) => {
  dal.updateCircle(req.body, (err, result) => {
    if (err) console.log(err)
    res.status(201).send(result)
  })
})

app.get('/circles', (req, res, next) => {
  dal.listCircles( (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.get('/circles/:id', (req, res, next) => {
  // if id is valid then get otherwise handle error
  dal.getCircle(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.delete('/circles/:id', (req, res, next) => {
  dal.deleteCircle(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

//  ------  SESSIONS  ------  //
app.post('/sessions', (req, res, next) => {
  dal.createSession(req.body, (err, result) => {
    if (err) console.log(req.body)
    res.status(201).send(result)
  })
})

app.put('/sessions/:id', (req, res, next) => {
  dal.updateSession(req.body, (err, result) => {
    if (err) console.log(err)
    res.status(201).send(result)
  })
})

app.get('/sessions', (req, res, next) => {
  dal.listSessions( (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.get('/sessions/:id', (req, res, next) => {
  dal.getSession(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.delete('/sessions/:id', (req, res, next) => {
  dal.deleteSession(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

//  ------  RESTAURANTS  ------  //
app.post('/restaurants', (req, res, next) => {
  dal.createRestaurant(req.body, (err, result) => {
    if (err) console.log(err)
    res.status(201).send(result)
  })
})

app.put('/restaurants/:id', (req, res, next) => {
  dal.updateRestaurant(req.body, (err, result) => {
    if (err) console.log(err)
    res.status(201).send(result)
  })
})

app.get('/restaurants', (req, res, next) => {
  dal.listRestaurants( (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.get('/restaurants/:id', (req, res, next) => {
  dal.getRestaurant(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

app.delete('/restaurants/:id', (req, res, next) => {
  dal.deleteRestaurant(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.status(200).send(result)
  })
})

//  -------   Default Catch   --------  //
app.get('*', (req, res) => res.send({
   ok: true
}))

//  -------   Server Setup  ------  //
var server = http.createServer(app)
server.listen(port, () => console.log('Opened server on ', server.address().port))

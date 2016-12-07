const http = require('http')
const app = require('express')()
const cors = require('cors')
app.use(cors({ origin: true, credentials: true }))
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const dal = require('./dal.js')

app.use(bodyParser.json())

//  ------  FRIENDS   ------  //
app.post('/friends', (req, res, next) => {
  dal.createFriend(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.put('/friends/:id', (req, res, next) => {
  // Check that _id and _rev is given in body
  dal.updateFriend(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.get('/friends', (req, res, next) => {
  dal.listFriends( (err, result) => {
    res.status(200).send(result)
  })
})

app.get('/friends/:id', (req, res, next) => {
  dal.getFriend(req.params.id, (err, result) => {
    res.status(200).send(result)
  })
})

app.delete('/friends/:id', (req, res, next) => {
  dal.deleteFriend(req.params.id, (err, result) => {
    res.status(200).send(result)
  })
})

//  ------  CIRCLES  ------  //
app.post('/circles', (req, res, next) => {
  dal.createCircle(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.put('/circles/:id', (req, res, next) => {
  dal.updateCircle(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.get('/circles', (req, res, next) => {
  dal.listCircles( (err, result) => {
    res.status(200).send(result)
  })
})

app.get('/circles/:id', (req, res, next) => {
  dal.getCircle(req.params.id, (err, result) => {
    console.log('API : ' + JSON.stringify(result))
    res.status(200).send(result)
  })
})

app.delete('/circles/:id', (req, res, next) => {
  dal.deleteCircle(req.params.id, (err, result) => {
    res.status(200).send(result)
  })
})

//  ------  SESSIONS  ------  //
app.post('/sessions', (req, res, next) => {
  dal.createSession(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.put('/sessions/:id', (req, res, next) => {
  dal.updateSession(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.get('/sessions', (req, res, next) => {
  dal.listSessions( (err, result) => {
    res.status(200).send(result)
  })
})

app.get('/sessions/:id', (req, res, next) => {
  dal.getSession(req.params.id, (err, result) => {
    res.status(200).send(result)
  })
})

app.delete('/sessions/:id', (req, res, next) => {
  dal.deleteSession(req.params.id, (err, result) => {
    res.status(200).send(result)
  })
})

//  ------  RESTAURANTS  ------  //
app.post('/restaurants', (req, res, next) => {
  dal.createRestaurant(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.put('/restaurants/:id', (req, res, next) => {
  dal.updateRestaurant(req.body, (err, result) => {
    res.status(201).send(result)
  })
})

app.get('/restaurants', (req, res, next) => {
  dal.listRestaurants( (err, result) => {
    res.status(200).send(result)
  })
})

app.get('/restaurants/:id', (req, res, next) => {
  dal.getRestaurant(req.params.id, (err, result) => {
    res.status(200).send(result)
  })
})

app.delete('/restaurants/:id', (req, res, next) => {
  dal.deleteRestaurant(req.params.id, (err, result) => {
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

const React = require('react')
const { BrowserRouter, Match } = require('react-router')
const Circle = require('./pages/circles/show')
const Circles = require('./pages/circles/index')
const CirclesForm = require('./pages/circles/form')
const Friend = require('./pages/friends/show')
const Friends = require('./pages/friends/index')
const FriendsForm = require('./pages/friends/form')
const Home = require('./pages/home')
const About = require('./pages/about')

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/about" component={About} />
          <Match exactly pattern="/circles" component={Circles} />
          <Match pattern="/circles/new" component={CirclesForm} />
          <Match pattern="/circles/:id/show" component={Circle} />
          <Match pattern="/circles/:id/edit" component={CirclesForm} />
          <Match exactly pattern="/friends" component={Friends} />
          <Match pattern="/friends/new" component={FriendsForm} />
          <Match pattern="/friends/:id/show" component={Friend} />
          <Match pattern="/friends/:id/edit" component={FriendsForm} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App

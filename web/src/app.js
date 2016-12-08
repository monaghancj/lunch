const React = require('react')
const { BrowserRouter, Match } = require('react-router')
const Circle = require('./pages/circles/show')
const Circles = require('./pages/circles/index')
const CirclesForm = require('./pages/circles/form')
const Home = require('./pages/home')
const About = require('./pages/about')

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/circles" component={Circles} />
          <Match pattern="/circles/new" component={CirclesForm} />
          <Match pattern="/circles/:id/show" component={Circle} />
          <Match pattern="/circles/:id/edit" component={CirclesForm} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App

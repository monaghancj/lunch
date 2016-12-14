const React = require('react')
const { HashRouter, Match, Redirect } = require('react-router')
const auth = require('./utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)
const Circle = require('./pages/circles/show')
const Circles = require('./pages/circles/index')
const CirclesForm = require('./pages/circles/form')
const Friend = require('./pages/friends/show')
const Friends = require('./pages/friends/index')
const FriendsForm = require('./pages/friends/form')
const Restaurants = require('./pages/restaurants/index')
const Restaurant = require('./pages/restaurants/show')
const Session = require('./pages/session/show')
const SessionForm = require('./pages/session/form')
const Home = require('./pages/home')
const About = require('./pages/about')

const App = React.createClass({
  render() {
    return (
      <HashRouter>
        <div>
          {/* <Match exactly pattern="/" component={Home} /> */}
          <Match exactly pattern="/" render={props => <Home auth={auth} {...props} /> } />
          <MatchWhenAuthorized exactly pattern="/about" component={About} />
          <MatchWhenAuthorized exactly pattern="/circles" component={Circles} />
          <MatchWhenAuthorized pattern="/circles/new" component={CirclesForm} />
          <MatchWhenAuthorized pattern="/circles/:id/show" component={Circle} />
          <MatchWhenAuthorized pattern="/circles/:id/edit" component={CirclesForm} />
          <MatchWhenAuthorized exactly pattern="/friends" component={Friends} />
          <MatchWhenAuthorized pattern="/friends/new" component={FriendsForm} />
          <MatchWhenAuthorized pattern="/friends/:id/show" component={Friend} />
          <MatchWhenAuthorized pattern="/friends/:id/edit" component={FriendsForm} />
          <MatchWhenAuthorized exactly pattern="/restaurants" component={Restaurants} />
          {/* <Match pattern="/restaurant/:name/show" component={Restaurant} /> */}
          <MatchWhenAuthorized exactly pattern="/session/:id/show" component={Session} />
          <MatchWhenAuthorized pattern="/session/new" component={SessionForm} />
        </div>
      </HashRouter>
    )
  }
})

const MatchWhenAuthorized = ({component: Component, ...rest}) =>
  <Match {...rest} render={ props =>
    auth.loggedIn() ?
      <div>
        <button onClick={e => auth.logout() }>logout</button>
        <Component {...props} />
      </div> : <Redirect to="/" />
  }/>

module.exports = App

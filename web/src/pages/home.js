const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  getInitialState: function() {
    return {
      defaultCircle: ''
    }
  },
  render() {
    return (
      <div>
        <h1>Grabba</h1>
        <div className="pa4 tc">
          <Link className="br-100 h4 w4 dib bg-light-green no-underline"
               alt="avatar"
               to="/session/new">
            <span className="washed-green h4">GO</span>
          </Link>
        </div>
        <div>
          <Link to="/circles">Circles</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/friends">Friends</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    )
  }
})

module.exports = Home

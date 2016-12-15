const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  getInitialState: function() {
    return {
      defaultCircle: ''
    }
  },
  componentDidMount() {
    if (!this.props.auth.loggedIn() &&
      this.props.location.hash.indexOf('access_token') === -1) {
      this.props.auth.login()
    }
  },
  render() {
    return (
      <div>
        <h1 className="tc light-red f1 mb0">Grabba</h1>
        <div className="pa4 tc">
          <Link className="br-100 h4 w4 dib bg-light-green no-underline"
               alt="avatar"
               to="/session/new">
            <span className="washed-green h4">GO</span>
          </Link>
        </div>
        <div className="tc">
          <Link
            className="ma1 f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-orange"
            to="/circles">Circles</Link>
          <Link
            className="ma1 f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-red"
            to="/restaurants">Restaurants</Link>
          <Link
            className="ma1 f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-blue"
            to="/friends">Friends</Link>
          <Link
            className="ma1 f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-purple"
            to="/about">About</Link>
        </div>
      </div>
    )
  }
})

module.exports = Home

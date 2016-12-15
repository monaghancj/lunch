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
        <div className="tc ma4 mb5">
          <Link
            className="br-100 h4 w4 dib bg-light-green no-underline ba b--light-yellow hover-bg-light-gray  bw4"
            alt="avatar"
            to="/session/new">
            <div style={{paddingTop:'42px'}} className="dib v-mid pt4">
              <span className="f2 silver o-60 hover-light-green">GO</span>
            </div>

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

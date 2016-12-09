const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
import confirm from 'react-confirm2'
const { map } = require('ramda')

const Friend = React.createClass({
  getInitialState: function() {
    return {
      friend: {
        name: ''
      },
      removed: false
    };
  },
  componentDidMount: function() {
    data.get('friends', this.props.params.id)
      .then(friend => {
        this.setState({friend})
      })
  },
  handleRemove(e) {
    e.preventDefault()
    data.remove('friends', this.props.params.id)
      .then(result =>
        this.setState({removed: true})
      )
  },
  render() {
    return (
      <div>
        { this.state.removed ? <Redirect to="/friends"/> : null }
        <h1>{this.state.friend.name}</h1>
        <h3>{this.state.friend.phone}</h3>
          <Link   //Not finished
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-blue"
            to={`/friends/${this.state.friend._id}/edit`}>
            Edit
          </Link>
          <a
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-red"
            onClick={this.handleRemove}>
              Remove
          </a>
          <Link
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green"
            to={"/friends"}>
              Return
          </Link>
      </div>
    )
  }
})

module.exports = Friend

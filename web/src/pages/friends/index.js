const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
const { map } = require('ramda')

const Friends = React.createClass({
  getInitialState: function() {
    return {
      friends: []
    }
  },
  componentDidMount: function() {
    data.list('friends')
      .then(res => {
        this.setState({friends:res.rows})
      })
  },
  render() {
    const transform = map(friend => {
      return <div key={friend.id}>
               <Link
                 className="no-underline"
                 to={`/friends/${friend.id}/show`}>
                 {friend.doc.name}
               </Link>
             </div>
    })
    return (
      <div>
        <h1 className="tc light-red fw4">Your Friends</h1>
        {transform(this.state.friends)}
        <Link
          className="f6 ma1 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-blue"
          to="/friends/new" >
          Add Friend
        </Link>
        <Link
          className="f6 ma1 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green"
          to="/">
          Home
        </Link>
      </div>
    )
  }
})

module.exports = Friends

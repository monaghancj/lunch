const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const { map, pluck, concat } = require('ramda')
import StarRatingComponent from 'react-star-rating-component'

const SessionForm = React.createClass({
  getInitialState: function() {
    return {
      session: {
        circle: {},
        recipients: [],
        rating: 1,
        zip: 29464
      },
      friends: [],
      circles: [],
      resolved: false
    }
  },
  componentDidMount: function() {
    var session = this.state.session
    session.id = Date.now()
    data.list('circles').then(res => this.setState({
      circles: pluck('doc', res.rows),
      session
    }))
    data.list('friends').then(res => this.setState({ friends: pluck('doc', res.rows) }))
  },
  handleChange(field) {
    return (e) => {
      let session = {...this.state.session}
      session[field] = e.target.value
      this.setState({session})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    data.post('sessions', this.state.session)
      .then(res => {
        this.setState({
          id: res.id,
          resolved: true })
      })
      .catch(err => console.log(err))
  },
  handleSelectCircle(circle) {
    return (e) => {
      e.preventDefault()
      var session = this.state.session
      session.circle = circle
      circle.friends.map(friend => {
        data.get('friends', friend._id)
          .then( res => session.recipients.push(res) )
      })
      this.setState({ session })
    }
  },
  handleSelectFriend(friend) {
    return (e) => {
      let session = this.state.session
      session.recipients.push(friend)
      this.setState({session})
    }
  },
  onStarClick(nextValue, prevValue, name) {
    let session = this.state.session
    session.rating = nextValue
    this.setState({session});
  },
  render() {
    const transformCircles = map(circle => {
      return <div key={circle._id} onClick={this.handleSelectCircle(circle)} className="mib">
              {circle.name}
             </div>
    })
    const transformFriends = map(friend => {
      return <div key={friend._id} onClick={this.handleSelectFriend(friend)}>
              {friend.name}
             </div>
    })
    const transformRecipients = map(friend => {
      return <div key={friend._id}>
              {friend.name}
             </div>
    })
    return (
      <div>
        {this.state.resolved ? <Redirect to={`/session/${this.state.id}/show`} props={this.state.session} /> : null}
        <h1>Get Ready</h1>
        <div className="mib">
          <h3>Recipients: </h3>
          {transformRecipients(this.state.session.recipients)}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3>Circle</h3>
            {transformCircles(this.state.circles)}
          </div>
          <div>
            <h3>Friends</h3>
            {transformFriends(this.state.friends)}
          </div>
          <div>
            <h3>$$$$$</h3>
            <StarRatingComponent
                name="priceRating"
                starCount={4}
                value={this.state.session.rating}
                onStarClick={this.onStarClick}
            />
          </div>
          <div>
            <button>Lets GO</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = SessionForm

const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const { map, pluck } = require('ramda')

const SessionForm = React.createClass({
  getInitialState: function() {
    return {
      session: {
        circle: {},
        price: ''
      },
      peopleIncluded: [],
      friends: [],
      circles: []
    }
  },
  componentDidMount: function() {
    data.list('circles').then(res => this.setState({circles: pluck('doc', res.rows)}))
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
      .then(res =>
        this.setState({ resolved: true })
      )
  },
  handleSelectCircle(circle) {
    return (e) => {
      console.log('in')
      var session = this.state.session
      session.circle = circle
      this.setState({session})
    }

  },
  handleSelectFriend(friend) {
    return (e) => {
      let circle = this.state.session.circle
      let peopleIncluded = this.state.peopleIncluded
      peopleIncluded.concat(circle.friends)
      console.log(this.state.circles)
      this.setState({
        circle,
        peopleIncluded
      })
    }

  },
  render() {
    const transformCircles = map(circle => {
      return <div onClick={this.handleSelectCircle(circle)} className="mib">
              {circle.name}
             </div>
    })
    const transformFriends = map(friend => {
      return <div key={friend._id} onClick={this.handleSelectFriend(friend)}>
              {friend.name}
             </div>
    })
    return (
      <div>
        {this.state.resolved ? <Redirect to="/session" props={this.state.session}/> : null}
        <h1>Get Ready</h1>
        <form>
          <div>
            <h3>Circle</h3>
            {transformCircles(this.state.circles)}
          </div>
          <div>
            <h3>Friends</h3>
            {transformFriends(this.state.friends)}
          </div>
          <div>
            <label>Price Rating (0-4)</label>
            <input value={this.state.session.price} onChange={this.handleChange('price')}/>
          </div>
          <div>
            <button onSubmit={this.handleSubmit}>Lets GO</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = SessionForm

const React = require('react')
const data = require('../../utils/data')()
const { Link, Redirect } = require('react-router')
const Select = require('react-select')
var R = require('ramda')
const {contains, pluck, not, reject, filter, map, remove} = R

const CirclesForm = React.createClass({
  getInitialState: function() {
    return {
      circle: {
        friends: [],
        isDefault: false
      },
      allFriends: [],
      restFriends: [],
      resolved: false
    }
  },
  componentDidMount: function() {
    var editCircle = {}
    if (this.props.params.id) {
      data.get('circles', this.props.params.id)
        .then(circle => editCircle = circle)
    }
    data.list('friends').then(res => {
      var allFriends = pluck('doc', res.rows)
      if (!(R.isEmpty(editCircle))) {
        var circleFriendsIDs = pluck("_id", editCircle.friends)
        var restFriends = reject(person =>
          contains(person._id, circleFriendsIDs)
        , allFriends)

        this.setState({
          allFriends,
          restFriends,
          circle: editCircle
        })
      } else {
        this.setState({
          allFriends,
          restFriends: allFriends
        })
      }
    })
  },
  handleChange(field) {
    return (e) => {
      let circle = {...this.state.circle}
      circle[field] = e.target.value
      this.setState({circle})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.circle)
    data.post('circles', this.state.circle)
      .then(res =>
        this.setState({ resolved: true })
      )
  },
  handleCheck() {
    var circle = this.state.circle
    if (this.state.circle.isDefault) {
      circle.isDefault = false
    } else {
      circle.isDefault = true
    }
    this.setState({circle})
  },
  handleRemoveFriend(friend){
    return (e) => {
      var restFriends = this.state.restFriends
      restFriends.push(friend)
      var circle = this.state.circle
      var newArray = reject(person => {
        return person._id === friend._id
      }, this.state.circle.friends)
      circle.friends = newArray
      this.setState({ circle, restFriends })
    }
  },
  handleAddFriend(friend) {
    return (e) => {
      var circle = this.state.circle
      circle.friends.push(friend)
      var restFriends = reject(person => {
        return person._id === friend._id
      }, this.state.restFriends)
      this.setState({
        circle,
        restFriends
      })
    }
  },
  render() {
    const transformCircle = map(friend => {
      return <div key={friend._id}>
              {friend.name}
              <div className="dib w1 h1 ba br2" onClick={this.handleRemoveFriend(friend)}>-</div>
             </div>
    })
    const transform = map(friend => {
      return <div key={friend._id}>
              {friend.name}
             </div>
    })
    const transformRest = map(friend => {
      return <div className="" key={friend._id}>
              {friend.name}
              <div className="dib w1 h1 ba br2" onClick={this.handleAddFriend(friend)}>+</div>
             </div>
    })
    return (

      <div>
        {this.state.resolved ? <Redirect to="/circles"/> : null}
        <h1> Circle Form </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <input value={this.state.circle.name} onChange={this.handleChange('name')}/>
          </div>
          <div>
            <label>Default?</label>
            <div className="w2 h2 bg-green" onClick={this.handleCheck}>{this.state.circle.isDefault ? <p>X</p> : null}</div>
          </div>
          <div className="ba dib w5 vat">
            <p>Circle Friends</p>
            {transformCircle(this.state.circle.friends)}
          </div>
          <div className="ba dib w5 vat">
            <p>Rest Friends</p>
            {transformRest(this.state.restFriends)}
          </div>
          <div>
            <button
              className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green">
              Submit
            </button>
          </div>
        </form>
        <Link
          className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-red"
          to={"/circles"}>
            Cancel
        </Link>
      </div>
    )
  }
})

module.exports = CirclesForm

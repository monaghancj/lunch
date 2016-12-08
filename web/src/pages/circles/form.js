const React = require('react')
const data = require('../../utils/data')()
const { Redirect } = require('react-router')
const Select = require('react-select')
var FilteredMultiSelect = require('react-filtered-multiselect')
var R = require('ramda')
const {contains, pluck, not, reject, filter} = R

const CirclesForm = React.createClass({
  getInitialState: function() {
    return {
      circle: {
        friends: [],
        isDefault: false
      },
      allFriends: [],
      options: [],
      resolved: false,
      Friends: []
    }
  },
  componentDidMount: function() {
    var circleTarget = {}
    if (this.props.params.id) {
      data.get('circles', this.props.params.id)
        .then(circle => circleTarget = circle)
    }
    data.list('friends').then(res => {
      var options = pluck('doc', res.rows)
      var circleFriendsIDs = pluck("id", circleTarget.friends)
      var newArray = reject(person => {
        contains(person._id, circleFriendsIDs)
      }, options)
      console.log(newArray)
      console.log(options)

      // res.rows.map(friend => {
      //   var insideCircle = false
      //   circleTarget.friends.map( circleFriend => {
      //     if (circleFriend.id === friend.id)  { insideCircle = true }
      //   })
      //   if (!insideCircle) options.push({value: friend.id, text: friend.doc.name})
      // })
      if (R.isEmpty(circleTarget)) {
        this.setState({
          allFriends:res.rows,
          Friends: res.rows,
          options
        })
      } else {
        this.setState({
          allFriends:res.rows,
          Friends: res.rows,
          options,
          circle: circleTarget
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
    data.post('circles', this.state.circle)
      .then(res => {
        this.setState({ resolved: true })
      })
  },
  handleFriendSelect(e) {
    var circle = this.state.circle
    circle.friends.push(e[0])
    var allFriends = this.state.allFriends
    var restFriends = []
    allFriends.map(allFriend => {
      var insideCircle = false
      circle.friends.map(circleFriend =>  {
        if (allFriend.id === circleFriend.value ) {
          insideCircle = true
        }
      })
      if (!insideCircle) {
        restFriends.push(allFriend)
      }
    })
    var options = []
    restFriends.map(friend => options.push({value: friend.id, text: friend.doc.name}))
    this.setState({circle, allFriends: restFriends, options})
  },
  handleFriendRemove(friend){
    return (e) => {
      var circle = this.state.circle
      var circleFriends = []
      var allFriends = this.state.allFriends
      var options = []
      this.state.circle.friends.map(circleFriend => circleFriend.value !== friend ? circleFriends.push(circleFriend) : null)
      circle.friends = circleFriends

      var target = {}
      this.state.Friends.map(f => {
        f.id === friend ? target=f : null
      })

      if (!R.isEmpty(target)) {
        allFriends.push(target)
      }

      this.state.allFriends.map( friend => {
        options.push({ value: friend.id, text: friend.doc.name })
      })

      this.setState({circle, options, allFriends})
    }
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
  render() {
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
          <div>
            {this.state.circle.friends.map(friend => <div>{friend.text ? friend.text : friend.name}<div onClick={this.handleFriendRemove(friend.value)}>X</div></div>)}
            <FilteredMultiSelect
              onChange={this.handleFriendSelect}
              options={this.state.options}
            />
          </div>
          <div>
            <button >Submit</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = CirclesForm

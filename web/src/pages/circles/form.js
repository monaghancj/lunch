const React = require('react')
const data = require('../../utils/data')()
const { Redirect } = require('react-router')
const Select = require('react-select')
var FilteredMultiSelect = require('react-filtered-multiselect')

const CirclesForm = React.createClass({
  getInitialState: function() {
    return {
      circle: {
        friends: []
      },
      allFriends: [],
      options: [],
      resolved: false,
      Friends: []
    }
  },
  componentDidMount: function() {
    data.list('friends').then(res => {
      var options = []
      res.rows.map(friend => options.push({value: friend.id, text: friend.doc.name}))
      this.setState({
        allFriends:res.rows,
        Friends: res.rows,
        options
      })
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
      circle.friends.map(circleFriend => circleFriend.value !== friend ? circleFriends.push(circleFriend) : null)
      circle.friends = circleFriends

      var target = {}
      this.state.Friends.map(f => f.id === friend ? target=f : null)
      console.log('target: ' + target)
      allFriends.push(target)

      this.state.allFriends.map( friend => options.push({ value: friend.id, text: friend.doc.name }) )
      this.setState({circle, options, allFriends})
    }
  },
  render() {
    return (
      <div>
        {JSON.stringify(this.state.allFriends)}
        {this.state.resolved ? <Redirect to="/circles"/> : null}
        <h1> Circle Form </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <input value={this.state.circle.name} onChange={this.handleChange('name')}/>
          </div>
          <div>
            <label>Name</label>
            <input value={this.state.circle.name} onChange={this.handleChange('name')}/>
          </div>
          <div>
            {this.state.circle.friends.map(friend => <div>{friend.text}<div onClick={this.handleFriendRemove(friend.value)}>X</div></div>)}
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

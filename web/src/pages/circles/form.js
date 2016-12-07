const React = require('react')
const data = require('../../utils/data')()
const { Redirect } = require('react-router')
const Select = require('react-select')

const CirclesForm = React.createClass({
  getInitialState: function() {
    return {
      circle: {
        friends: []
      },
      allFriends: [],
      resolved: false
    }
  },
  componentDidMount: function() {
    data.list('friends').then(res => {
      console.log(res)
      this.setState({allFriends:res.rows})
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
  render() {
    const handleSelect = val => {
      var array = this.state.circle.friends
      array.push(val[0])
      var circle = this.state.circle
      circle.friends = array
      this.setState({circle})
    }
    return (
      <div>
        {JSON.stringify(this.state)}
        {this.state.resolved ? <Redirect to="/circles"/> : null}
        <h1>New Circle</h1>
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
            <Select
              className="br2 ba b--light-silver mb3"
              multi={true}
              name="team-members-select"
              value="Add-Member"
              options={this.state.allFriends}
              onChange={handleSelect}
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

const React = require('react')
const data = require('../../utils/data')()
const { Link, Redirect } = require('react-router')

const FriendsForm = React.createClass({
  getInitialState: function() {
    return {
      friend: {
        name: '',
        phone: '',
        preferences: {

        }
      }
    }
  },
  handleChange(field) {
    return (e) => {

    }
  },
  handleSubmit(e) {
    e.preventDefault()
  },
  render() {
    return (
      <div>
        <h1>Friends Form</h1>
        <div>
          <form>
            <div>
              <label>Name</label>
              <input value={this.state.friend.name} onChange={this.handleChange('name')}/>
            </div>
            <div>
              <label>Phone</label>
              <input value={this.state.friend.phone} onChange={this.handleChange('phone')}/>
            </div>
            <h3>Preferences</h3>
            <div>
              <label>Preferences</label>
              <input value={this.state.friend.preferences} onChange={this.handleChange('preferences')}/>
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
          <Link
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-red"
            to={"/friends"}>
              Cancel
          </Link>
        </div>
      </div>
    )
  }
})

module.exports = FriendsForm

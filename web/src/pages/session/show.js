const React = require('react')
const data = require('../../utils/data')()
const { map } = require('ramda')


const Session = React.createClass({
  getInitialState: function() {
    return {
      session: {
        recipients: []
      }
    }
  },
  componentDidMount: function() {
    data.get('sessions', this.props.params.id)
      .then(res => {
        console.log(res)
        this.setState({session:res})})
  },
  render() {
    const transformRecipients = map(friend => {
      console.log(friend)
      return <div key={friend._id}>
              {friend.name}
             </div>
    })
    return (
      <div>
        <h1>Session</h1>

        <div>
          <h2>Circle</h2>
          {transformRecipients(this.state.session.recipients)}
        </div>
        <div>
          <button>Send Message</button>
        </div>
      </div>
    )
  }
})

module.exports = Session

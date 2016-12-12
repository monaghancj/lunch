const React = require('react')

const Session = React.createClass({
  getInitialState: function() {
    return {
      session: {}
    }
  },
  componentDidMount: function() {
    var session = Date.now()
    this.setState({session})
  },
  render() {
    return (
      <div>
        <h1>Session</h1>
        {JSON.stringify(this.state.session)}
      </div>
    )
  }
})

module.exports = Session

const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()

const SessionForm = React.createClass({
  getInitialState: function() {
    return {
      session: {
        circle: '',
        price: ''
      },
      friends: [],
      circles: []
    }
  },
  componentDidMount: function() {
    var circles
    var friends
    data.get('circles').then(res => circles = res)
    data.get('friends').then(res => friends = res)
    this.setState({
      circles,
      friends
    })
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
  render() {
    return (
      <div>
        {this.state.resolved ? <Redirect to="/session" props={this.state.session}/> : null}
        <h1>Tell us Just a wittle but</h1>
        <form>
          <div>
            <label>Circle</label>
            <input value={this.state.session.circle} onChange={this.handleChange('circle')}/>
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

const React = require('react')
const data = require('../../utils/data')()
const { map,split } = require('ramda')
const {Link, Redirect} = require('react-router')
const APIKey = 'AIzaSyAaBlfGybqXLxKdfjW_4U5loA30yFaCy5I'

const Session = React.createClass({
  getInitialState: function() {
    return {
      session: {
        recipients: [],
        restaurantRef: {},
        resolved: false
      }
    }
  },
  componentDidMount: function() {
    data.get('sessions', this.props.params.id)
      .then(res => {
        data.getRestaurantRef(res.zip, res.rating)
          .then(result => {
            console.log(result)
            var session = res
            session.restaurantRef = result.restaurants[Math.floor((Math.random() * (result.restaurants.length)) + 1)]
            this.setState({ session })
          })

      })
  },
  handleNext() {
    data.getRestaurantRef(this.state.session.zip, this.state.session.rating)
      .then(result => {
        console.log(result)
        var session = this.state.session
        session.restaurantRef = result.restaurants[Math.floor((Math.random() * (result.restaurants.length)) + 1)]
        this.setState({session})
      })
  },
  handleCall() {
    console.log('call')
    window.location.href=`tel:${this.state.session.restaurantRef.phone}`
  },
  handleGo() {
    console.log('GO')
    this.setState({resolved: true})
  },
  render() {
    const transformRecipients = map(friend => {
      return <div key={friend._id}>
              {friend.name}
             </div>
    })
    return (
      <div className="tc w-70-ns">
        {this.state.resolved ? <Redirect to={`/`} /> : null}
        <h1 className="tc mb0 pa2">{this.state.session.restaurantRef.name}</h1>
        <div className="tc pv2 pv5-ns">
          <img src={this.state.session.restaurantRef.image_url} className="w-50-ns w-90 br2"/>
          <div>
            <a className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib light-green ma1 hover-green" onClick={this.handleGo}>Go</a>
            <a className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib green ma1 hover-dark-green" onClick={this.handleCall}>Call</a>
            <a className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib light-red ma1 hover-red" onClick={this.handleNext}>Next</a>
            <Link className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib red ma1 hover-dark-red" to="/">Home</Link>
          </div>
          {JSON.stringify(this.state.session.restaurantRef)}
        </div>
        <div>
          <h2>Circle</h2>
          {transformRecipients(this.state.session.recipients)}
        </div>
        <div>
          <button>Send Message</button>
        </div>
        <div>

        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    )
  }
})

module.exports = Session

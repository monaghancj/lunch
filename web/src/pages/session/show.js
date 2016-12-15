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
            var session = res
            session.restaurantRef = result.restaurants[Math.floor((Math.random() * (result.restaurants.length)) + 1)]
            this.setState({ session })
          })

      })
  },
  handleText() {
    // this.state.session.recipients.map( recipient => {
    //   console.log(recipient)
    //   client.sendMessage({
    //     to: '8438229929',
    //     from: twilioNumber,
    //     body: 'Happy Holidays, Lord Vador'
    //   });
    // })
    console.log('text')
    data.text()
  },
  handleNext() {
    data.getRestaurantRef(this.state.session.zip, this.state.session.rating)
      .then(result => {
        var session = this.state.session
        session.restaurantRef = result.restaurants[Math.floor((Math.random() * (result.restaurants.length)) + 1)]
        this.setState({session})
      })
  },
  handleCall() {
    window.location.href=`tel:${this.state.session.restaurantRef.phone}`
  },
  handleGo() {
    this.setState({resolved: true})
  },
  render() {
    const transformRecipients = map(friend => {
      return <div key={friend._id}>
              {friend.name}
             </div>
    })
    return (
      <div className="tc w-70-ns center">
        {this.state.resolved ? <Redirect to={`/`} /> : null}
        <h1 className="tc mb0 pa2">{this.state.session.restaurantRef.name}</h1>
        <div className="tc center pv2 pv5-ns pb1">
          <img src={this.state.session.restaurantRef.image_url} className="w-50-ns w-90 br3"/>
          <div>
            <a className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib light-green ma1 hover-green" onClick={this.handleGo}>Go</a>
            <a className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib green ma1 hover-dark-green" onClick={this.handleCall}>Call</a>
            <a className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib light-red ma1 hover-red" onClick={this.handleNext}>Next</a>
          </div>
        </div>
        <div>
          <h1 className="mb0">Circle</h1>
          {transformRecipients(this.state.session.recipients)}
        </div>
        <div>
          <a className="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib blue ma1 hover-light-blue"
            onClick={this.handleText}>Send Message</a>
        </div>
      </div>
    )
  }
})

module.exports = Session

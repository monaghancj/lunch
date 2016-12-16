const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const { map, pluck, concat } = require('ramda')
import StarRatingComponent from 'react-star-rating-component'

const SessionForm = React.createClass({
  getInitialState: function() {
    return {
      session: {
        circle: {},
        recipients: [],
        rating: 1,
        zip: 29464
      },
      friends: [],
      circles: [],
      resolved: false
    }
  },
  componentDidMount: function() {
    var session = this.state.session
    session.id = Date.now()
    data.list('circles').then(res => this.setState({
      circles: pluck('doc', res.rows),
      session
    }))
    data.list('friends').then(res => this.setState({ friends: pluck('doc', res.rows) }))
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        data.getZipCode(position.coords.latitude, position.coords.longitude)
          .then(res => {
            var session = this.state.session
            session.zip = res.postalCodes[0].postalCode
            this.setState({session})
          })
      })
    }
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
      .then(res => {
        this.setState({
          id: res.id,
          resolved: true })
      })
      .catch(err => console.log(err))
  },
  handleSelectCircle(circle) {
    return (e) => {
      e.preventDefault()
      var session = this.state.session
      session.circle = circle
      Promise.all(circle.friends.map(friend => {
        return data.get('friends', friend._id)
          .then( res => session.recipients.push(res))
        })
      ).then(res => {
        //console.log('got all my friends.')
        this.setState({ session })
      })

    }
  },
  handleSelectFriend(friend) {
    return (e) => {
      let session = this.state.session
      session.recipients.push(friend)
      this.setState({session})
    }
  },
  onStarClick(nextValue, prevValue, name) {
    let session = this.state.session
    session.rating = nextValue
    this.setState({session})
  },
  render() {
    const transformCircles = map(circle => {
      return <div
                key={circle._id}
                onClick={this.handleSelectCircle(circle)}
                className="dib w3 h3 br-100 ba mr2 tc hover-light-red">
              <span
                style={{lineHeight: '60px'}}
                className="">{circle.name}</span>
             </div>
    })
    const transformFriends = map(friend => {
      return <div key={friend._id} onClick={this.handleSelectFriend(friend)} className="hover-light-red dib mv1 mh2 tc">
              {friend.name}
             </div>
    })
    const transformRecipients = map(friend => {
      return <div key={friend._id} className="light-red">
              {friend.name}
             </div>
    })
    return (
      <div className="center w-90 w-70-ns bg-near-white br3 mb5">
        {this.state.resolved ? <Redirect to={`/session/${this.state.id}/show`} props={this.state.session} /> : null}
        <h1 className="tc light-red pt3 mb0">Get Ready</h1>
        <p className="tc m0 light-red">- Select Circle(s) and/or Friend(s) -</p>
        <div className="dib ml2">
          <h1 className="fw1 mb0">Recipients </h1>
          {transformRecipients(this.state.session.recipients)}
        </div>
        <form onSubmit={this.handleSubmit} className="ml2">
          <div className="dib ml1">
            <h1 className="fw1 mb0">Circle</h1>
            {transformCircles(this.state.circles)}
          </div>
          <div>
            <h1 className="fw1 mb0 ml1">Friends</h1>
            {transformFriends(this.state.friends)}
          </div>
          <div>
            <h1 className="mb0 dib fw1 ml1">Pricing: </h1>
            <StarRatingComponent
                className="dib v-btm"
                name="priceRating"
                starCount={4}
                renderStarIcon={() => <span className="f2"> $&nbsp; </span>}
                value={this.state.session.rating}
                onStarClick={this.onStarClick}
                starColor={`#00cc66`}
                emptyStarColor={`#ffffff`}
            />
          </div>
          <div className="tc h3 mt3">
            <button className="f6 ma1 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-blue v-mid">Lets GO</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = SessionForm

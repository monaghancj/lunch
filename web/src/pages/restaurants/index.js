const React = require('react')
const { map, pick } = require('ramda')
const data = require('../../utils/data')()
const { Link } = require('react-router')

const Restaurants = React.createClass({
  getInitialState: function() {
    return {
      restaurants: [],
      zip: '29464'
    }
  },
  componentDidMount: function() {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     data.getZipCode(position.coords.longitude, position.coords.latitude)
    //       .then(res => {
    //         console.log(res.results)
    //         var array = pluck('address_components'), res.results)
    //         console.log(array)
    //
    //       })
    //   })
    // }
    data.listRestaurants(this.state.zip)
      .then(res => this.setState({restaurants:res.restaurants}))
  },
  render() {
    const transform = map(restaurant => {
      return <div className="fl w-50 w-25-m w-20-l pa2" key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.name}/show`} className="db link dim tc">
                  <img src={restaurant.image_url} alt={restaurant.name} className="w-100 db black-10 br2" />
                  <dl className="mt2 f6 lh-copy">
                    <dt className="clip">Title</dt>
                    <dd className="ml0 black truncate w-100">{restaurant.name}</dd>
                  </dl>
                </Link>
              </div>
    })
    return (
      <div>
        <h2>Restaurants</h2>
        <div className="cf pa2">
          {transform(this.state.restaurants)}
        </div>
        <Link
          className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green"
          to="/">
          Home
        </Link>
      </div>
    )
  }
})

module.exports = Restaurants

const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
const { map } = require('ramda')

const Circles = React.createClass({
  getInitialState: function() {
    return {
      circles: []
    }
  },
  componentDidMount: function() {
    data.list('circles')
      .then(res => {
        this.setState({circles:res.rows})
      })
  },
  render() {
    const transform = map(circle => {
      return <div key={circle.id}>
               <Link
                 className="no-underline"
                 to={`/circles/${circle.id}/show`}>
                 {circle.doc.name}
               </Link>
             </div>
    })
    return (
      <div>
        <h2>Your Circles</h2>
        {transform(this.state.circles)}
        <Link to="/circles/new"  >Form </Link>
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Circles

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
      return <div key={circle.id} className="dib w3 h3 bw1 br-100 ba mr2 tc hover-light-red">
               <Link
                 className="no-underline black"
                 to={`/circles/${circle.id}/show`}>
                 <span
                   style={{lineHeight: '60px'}}
                   className="no-underline black">{circle.doc.name}</span>
               </Link>
             </div>
    })
    return (
      <div className="center tc w-90 w-70-ns br3 mb5">
        <h1 className="tc light-red fw4">Your Circles</h1>
        <div className="ma3">
          {transform(this.state.circles)}
        </div>
        <div className="ma4">
          <Link to="/circles/new" className="f6 ma1 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green v-mid" > New </Link>
          <Link to="/" className="f6 ma1 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-blue v-mid">Home</Link>
        </div>
      </div>
    )
  }
})

module.exports = Circles

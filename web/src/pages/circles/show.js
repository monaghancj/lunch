const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
import confirm from 'react-confirm2'
const { map } = require('ramda')

const Circle = React.createClass({
  getInitialState: function() {
    return {
      circle: {
        id: '',
        name: '',
        friends: []
      },
      removed: false
    };
  },
  componentDidMount: function() {
    data.get('circles', this.props.params.id)
      .then(circle => {
        console.log('Circle: ' + circle)
        this.setState({circle})
      })
  },
  render() {
    const transform = map(friend => {
      return <div key={friend}>
               <Link
                 className="no-underline"
                 to={`/friends/${friend}`}>
                 {friend}
               </Link>
             </div>
    })
    return (
      <div>
        { this.state.removed ? <Redirect to="/circles"/> : null }
        {JSON.stringify(this.state.circle)}
        <h1>{this.state.circle.name}</h1>
        {transform(this.state.circle.friends)}
          <Link   //Not finished
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-blue"
            to={`/circles/${this.state.circle.id}/edit`}>
            Edit
          </Link>
          {/* <a
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-red"
            onClick={this.handleRemove}>
              Remove
          </a>*/}
          <Link
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green"
            to={"/circles"}>
              Return
          </Link>
      </div>
    )
  }
})

module.exports = Circle

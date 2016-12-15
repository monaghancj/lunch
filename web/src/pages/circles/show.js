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
        console.log(circle)
        this.setState({circle})
      })
  },
  handleRemove(e) {
    e.preventDefault()
    data.remove('circles', this.props.params.id)
      .then(result =>
        this.setState({removed: true})
      )
  },
  render() {
    const transform = map(friend => {
      return <div key={friend.id} className="light-red ma1">
               <Link
                 className="no-underline"
                 to={`/friends/${friend.id}`}>
                 {friend.name}
               </Link>
             </div>
    })
    return (
      <div className="center w-90 w-70-ns tc br3 mb5">
        { this.state.removed ? <Redirect to="/circles"/> : null }
        <h1>{this.state.circle.name}</h1>
        <div>
          {transform(this.state.circle.friends)}
        </div>
        <div className="ma3">
          <Link   //Not finished
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-blue"
            to={`/circles/${this.state.circle._id}/edit`}>
            Edit
          </Link>
          <a
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-red"
            onClick={this.handleRemove}>
              Remove
          </a>
          <Link
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green"
            to={"/circles"}>
              Return
          </Link>
        </div>
      </div>
    )
  }
})

module.exports = Circle

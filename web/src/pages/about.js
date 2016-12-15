const React = require('react')
const { Link } = require('react-router')

const About = React.createClass({
  render() {
     return (
         <div className="ma3 ma5-ns center">
             <h1 className="tc light-red fw4">About</h1>
             <p>&nbsp;&nbsp;&nbsp;&nbsp;This application will help you manage where you and your circle of friends will grabba &nbsp; &lt; favorite consumable &gt; </p>
             <Link
               className="f6 ma1 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-blue"
               to="/">
               Home
             </Link>
         </div>
      )
  }
})

module.exports = About

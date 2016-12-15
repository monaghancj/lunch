const React = require('react')
const { Link } = require('react-router')

const About = React.createClass({
  render() {
     return (
         <div className="ma3 ma5-ns center">
             <h1 className="tc light-red fw4">About</h1>
             <p className="helvetica white">&nbsp;&nbsp;&nbsp;&nbsp;This application will help you manage where you and your circle of friends will grabba &nbsp; &lt; favorite consumable &gt; </p>
         </div>
      )
  }
})

module.exports = About

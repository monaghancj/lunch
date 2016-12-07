const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  render() {
     return (
         <div>
             <h1>Home</h1>
             <Link to="/circles">Circles</Link>
             <Link to="/about">About</Link>
         </div>
      )
  }
})

module.exports = Home

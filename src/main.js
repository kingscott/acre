import React from 'react'
import ReactDOM from 'react-dom'

const Main = React.createClass({
  render () {
    return (
      <p> Hello, world! </p>
    )
  }
})

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)

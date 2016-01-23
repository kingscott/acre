import React from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import injectTapEventPlugin from 'react-tap-event-plugin'

const Main = React.createClass({
  render () {
    return (
      <div style={{fontFamily: 'Roboto'}}>
        <Map />
      </div>
    )
  }
})

injectTapEventPlugin()

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)

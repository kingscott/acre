import React from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Search from './components/Search'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Style inherited by each city data point tag
const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute'
}

const Main = React.createClass({
  getInitialState () {
    return {
      la: 43.701100,
      lo: -79.416300,
      newData: [],
      myCopy: []
    }
  },

  passData (coords, copy, data) {
    this.setState({la: coords.la, lo: coords.lo, myCopy: copy, newData: data.map((e, i) => {
      return <div className="pin" style={greatPlaceStyle} key={i} lat={e.coords.la} lng={e.coords.lo}></div>
    })})
  },

  render () {
    return (
      <div style={{fontFamily: 'Roboto'}}>
        <Search passData={this.passData} />
        <Map la={this.state.la} lo={this.state.lo} data={this.state.newData} copy={this.state.myCopy}/>
      </div>
    )
  }
})

injectTapEventPlugin()

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)

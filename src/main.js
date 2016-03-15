import React from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Search from './components/Search'
import injectTapEventPlugin from 'react-tap-event-plugin'

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
    console.log(coords, copy, data)
    this.setState({la: coords.la, lo: coords.lo, myCopy: copy, newData: data})
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
